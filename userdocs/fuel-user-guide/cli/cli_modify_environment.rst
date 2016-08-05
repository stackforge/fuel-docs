.. _cli-modify-env:

=========================================
Modify an Openstack environment using CLI
=========================================

You can modify your OpenStack environment after deployment
by downloading the ``.yaml`` configuration files, editing settings, and
then uploading the configuration files back to the Nailgun
server. After uploading the files, you must redeploy your OpenStack
environment.

Before modifying any settings, back up your OpenStack environment
configuration.

If you upload any changes for provisioning or deployment operations,
you freeze the configuration for the entire environment;
any changes you later make to the networks, cluster,
or disk configurations using the Fuel web UI will not be implemented.
To modify these parameters, you must edit the appropriate section of
each node's configuration file and then apply the changes using Fuel CLI.

You can download the following configurations:

* ``network``
* ``settings``
* ``node --disk``
* ``node --network``
* ``provisioning``
* ``deployment``

When performing operations with nodes using :command:`fuel deployment` and
:command:`fuel provisioning` commands, you can specify specific nodes.
For example:

.. code-block:: console

   fuel --env 1 deployment --node 1,2,3

When downloading configurations using :command:`fuel deployment` and
:command:`fuel provisioning` commands, Fuel automatically generates
the following files:

* For deployment:

  ``master.yaml``
   Includes details about the Fuel Master node configuration for a specified
   OpenStack environment.

  ``<NODE_ID>.yaml``
   Includes details about the node deployment. The ``<NODE_ID>.yaml`` file 
   contains deployment details and is identical to the ``astute.yaml`` file
   stored on a specific node. The deployment tasks consume parameters
   included in ``<NODE_ID>.yaml`` through hiera .

* For provisioning:

  ``engine.yaml``
   Includes credentials for the provisioning service (Cobbler) engine.

  ``node-<NODE_ID>.yaml``
   Includes details about provisioning for each node.

.. seealso::

   * :ref:`file-ref`
   * :ref:`cli-provision`
   * :ref:`cli-deploy`

**To modify an OpenStack environment using CLI:**

#. Back up your configuration.
#. Download the ``.yaml`` configuration file(s).

   **Example**

   ::

    fuel --env 1 network download
    fuel --env 1 settings download
    fuel --env 1 deployment default
    fuel --env 1 provisioning download
    fuel node --node-id 2 --disk --download

#. Modify the downloaded file(s).
#. Save the changes.
#. Upload the files to the Nailgun server:

   **Example:**

   ::

    fuel --env 1 provisioning upload
    fuel node --node-id 2 --disk --upload

#. Redeploy your OpenStack environment
#. Create a backup of the updated OpenStack environment.

   .. note::
      You may want to delete the downloaded ``.yaml``
      files, as they may contain unencrypted passwords. This
      may pose a security threat.


