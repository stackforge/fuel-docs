========================================================================
Configure an OpenStack environment on nodes with multipath block devices
========================================================================

You can deploy your OpenStack environment on servers with disks provided
by storage systems with multipath I/O.

The **advantages** of using the multipath disk configuration feature include:

* Proper discovering of multipath block devices and showing one storage
  device on server per a single multipath back-end block device.

* Mapping multipath block devices to a host operating system, Cinder LVM,
  MongoDB storage, and so on.

* Deploying an OpenStack environment with multiple multipath block devices
  attached to a single node.

* Combining a configuration of multipath block devices with the directly
  attached drives within a single node.

.. note::

   Fuel supports only multipath block devices provided by Host-Based
   Adapter (HBA).

**To configure an OpenStack environment on nodes with multipath block devices:**

#. Verify that the default bootable device meets the needs of your
   environment.

   By default, Fuel boots the first detected disk. If you want to specify
   the bootable device, proceed to :ref:`select-bootable-device`.

#. If you need an additional HBA card driver be run in the environment:

   #. Log in to the Fuel Master node.
   #. Add the HBA card driver by running:

      .. code-block:: console

         fuel-bootstrap build --package <package_name> --label fc_bootstrap

      .. note::

        If the required package is not located in the preconfigured
        for bootstrap repositories, specify the repository by passing
        the :option:`--repo 'type uri distribution [components][,priority]'`
        argument to the :command:`fuel-bootstrap build` command.

   #. Log in to the Fuel web UI.
   #. On the :guilabel:`Nodes` tab, view the disks information on receiving
      the ``new node appeared online`` notification.

      The disks` details include the paths that correspond to the underlying
      paths to the multipath block devices.

   #. Configure the IBP (image-based provisioning) images for provisioning
      proceeding with one of the following options:

      * Using the Fuel web UI:
   
        #. Log in to the Fuel web UI.
        #. Click the :guilabel:`Settings > Provision` tab.
        #. Specify the :guilabel:`Initial packages` to provision.

      * Using the Fuel CLI:

        #. Log in to the Fuel Master node.
        #. Download the OpenStack environment configuration file:

           .. code-block:: console

              fuel settings --env-id=<env_id> --download

        #. Open ``settings_<env_id>.yaml`` for editing.
        #. In the ``editable/provision/packages/value`` section,
           change the initial package name.

           .. note::

              If the required package is located in the repository that is not
              included in the list, add the repository details to
              ``editable/repo_setup/repos/value`` of the 
              ``settings_<env_id>.yaml`` file.

        #. Upload the modified settings to Fuel:

           .. code-block:: console

             fuel settings --env-id=<env_id> --upload

#. Deploy your OpenStack environment as described in :ref:`deploy-env`.

.. seealso::

   * `Dynamically build Ubuntu-based bootstrap on the Fuel master node
     <https://specs.openstack.org/openstack/fuel-specs/specs/8.0/dynamically-build-bootstrap.html#bootstrap-generator>`_