.. _bootstrap_troubleshoot:

Troubleshoot custom bootstrap building
--------------------------------------

**Automatic Fuel deployment has failed**

Automatic bootstrap image building can fail with one of the
following error messages:

.. code-block:: console

    "WARNING: Ubuntu bootstrap build has been skipped.
    Please build and activate bootstrap manually with CLI command
    `fuel-bootstrap build --activate`.
    While you don't activate any bootstrap - new nodes cannot be discovered
    and added to cluster.
    For more information please visit
    https://docs.mirantis.com/openstack/fuel/fuel-master/"

or

.. code-block:: console

    WARNING: Failed to build the bootstrap image, see
    /var/log/fuel-bootstrap-image-build.log
    for details. Perhaps your Internet connection is broken. Please fix the
    problem and run `fuel-bootstrap build --activate`.
    While you don't activate any bootstrap - new nodes cannot be discovered
    and added to cluster.
    For more information please visit
    https://docs.mirantis.com/openstack/fuel/fuel-master/"


You typically receive such error messages when software
repositories are unavailable.

To resolve the issue:

* If the Fuel Master node has an Internet connection,
  verify network connectivity to the software repositories.

* If you use a local repository mirror:

  * Follow the instructions provided in the ``fuel-mirror``
    utility https://github.com/openstack/fuel-mirror
  * Additionally, analyze the following log files:

    - ``/var/log/fuel-bootstrap-image-build.log``
    - ``/var/log/puppet/bootstrap_admin_node.log``


**A node has an old ``cmdline`` or a wrong bootstrap image**

``fuel-bootstrap`` has a limitation with UX issue.
You can not change a bootstrap image on nodes already added
to an environment (serialized).
This issue relates to the current architecture restriction.

The problem may occur under the following conditions:

* You have a deprecated CentOS bootstrap image in the ``active`` state; or
  you power on nodes before the Fuel Master node is completely deployed
  when ``ubuntu-bootstrap`` on the Fuel Master node has not been activated yet.

* You start a node and add it to an OpenStack environment, or
  you start or reset deployment on an environment, or any other case
  that triggers Fuel to store a node and create a cobbler system.

  .. code-block:: console

     cobbler system report --name default |grep -i Profile

  **System response:**

  .. code-block:: console

     Profile : bootstrap

* Fuel (Сobbler) creates a system with the CentOS bootstrap image.

  .. code-block:: console

    $ cobbler system report --name node-1

  **System response:**

  .. code-block:: console

    ...
     Profile : bootstrap (centos-bootstrap)
    ...

* Then, you change the active bootstrap, which makes
  astute change the cobbler default profile to ``ubuntu-bootstrap``:

  .. code-block:: console

    $ cobbler system report --name default |grep -i Profile

  **System response:**

  .. code-block:: console

    Profile : ubuntu_bootstrap

  But the stored system still use the old bootstrap data.

**To enable the new bootstarp image:**

#. Remove the node from db, reboot, and re-discover it

   .. warning::

      All node data will be destroyed!

   .. code-block:: console

      # fuel node --node-id 1 --delete-from-db

#. Manually update the cobbler profile:

   .. note::

      No data will be destroyed.

   .. code-block:: console

    $ cobbler system edit --name node-1 --profile=ubuntu_bootstrap
    $ cobbler system report --name node-1 |grep Profile

   **System response:**

   .. code-block:: console

    Profile : ubuntu_bootstrap

#. Reboot the node.
