.. _000-plugins-faq:

FAQ
-----

How can I add a custom role?
----------------------------

There is no way to define a role in Fuel 6.0 or older.
Starting with Fuel 6.1 you can use the Operating System role as a workaround.

In the **tasks.yaml** file use the `base-os` string to specify which task should be
used for the role deployment.

.. code-block:: yaml

    - role: ['base-os']
      stage: post_deployment
      type: shell
      parameters:
        cmd: ./deploy.sh
        timeout: 42

In your Fuel Plug-in documentation make sure you instruct the user to:

* Assign the Operating System role to the required node;
* Specify a name to give to this node, such as *zabbix-01*.

In the deployment script you can query the `user_node_name` variable
and decide if the script should deploy Zabbix related packages on the node.

.. code-block:: yaml

    ...
    user_node_name: zabbix-01
    ...


Where can I find Fuel Plug-in Builder source code?
--------------------------------------------------

**fuel-plugin-builder** is located in the `fuel-plugins <https://github.com/stackforge/fuel-plugins/tree/master/fuel_plugin_builder>`_ repository.


Are there any Fuel Plug-in examples?
------------------------------------

The `Fuel plug-ins <https://github.com/stackforge/fuel-plugins>`_ repository has
several useful examples.

How can I reuse Puppet modules from Fuel?
-----------------------------------------

The current design is that every plug-in should have all the necessary components
to be then deployed.
This means that every plug-in should have its own copy of Fuel Puppet modules.
If you do not want to keep a copy of Fuel library manifests in your repository,
you can use **pre_build_hook** to download the required modules during the
plug-in build process. To do this, add the following code into your hook:

.. code-block:: bash

    #!/bin/bash
    set -eux

    ROOT="$(dirname `readlink -f $0`)"
    MODULES="${ROOT}"/deployment_scripts/puppet/modules
    mkdir -p "${MODULES}"
    REPO_PATH='https://github.com/stackforge/fuel-library/tarball/f43d885914d74fbd062096763222f350f47480e1'
    RPM_REPO="${ROOT}"/repositories/centos/
    DEB_REPO="${ROOT}"/repositories/ubuntu/

    wget -qO- "${REPO_PATH}" | \
        tar -C "${MODULES}" --strip-components=3 -zxvf - \
        stackforge-fuel-library-f43d885/deployment/puppet/{inifile,stdlib}

The code copies the *inifile* and *stdlib* modules from the **fuel-library** repository.

.. warning::

    To reuse the existing Puppet manifests you can also specify several Puppet
    modules in your task with a colon separator: for example,
    *puppet_modules: "puppet/modules:/etc/puppet/modules"*.
    Note that we do not
    recommend using this approach, because Fuel puppet modules can be changed
    during an OpenStack update procedure; this can lead to compatibility failures.

How can I download the packages required for a plug-in?
-------------------------------------------------------

Use **wget** in your **pre_build_hook** script to download the packages
to the required directories:

.. code-block:: bash

    #!/bin/bash
    set -eux

    ROOT="$(dirname `readlink -f $0`)"
    RPM_REPO="${ROOT}"/repositories/centos/
    DEB_REPO="${ROOT}"/repositories/ubuntu/

    wget -P "${RPM_REPO}" http://mirror.fuel-infra.org/fuel-plugins/6.0/centos/glusterfs-3.5.2-1.mira2.x86_64.rpm
    wget -P "${DEB_REPO}" http://mirror.fuel-infra.org/fuel-plugins/6.0/ubuntu/glusterfs-client_3.5.2-4_amd64.deb

This example downloads two packages to your plug-in directories before Fuel Plugin Builder starts
building repositories.

Why is there no /etc/astute.yaml file when I run pre_deployment task?
----------------------------------------------------------------------

If you have a task with the "stage: pre_deployment" parameter set, you will not find
the **/etc/astute.yaml** file on the target node during the task execution.
The file **/etc/astute.yaml** is a symlink that is created before Fuel
deploys a role.

The target node can have several roles. Each role contains its own file with
deployment data.

Here is an example of a node with
ID 2 and two roles, Controller and Cinder:

::

    root@node-2:~# ls -l /etc/ | grep yaml
    -rw------- 1 root     root      8712 Nov 19 12:48 controller.yaml
    -rw------- 1 root     root      8700 Nov 19 12:48 cinder.yaml

Let's assume that we need the deployment data file for Controller role. We can use the '/etc/controller.yaml' file directly in the deployment script.
