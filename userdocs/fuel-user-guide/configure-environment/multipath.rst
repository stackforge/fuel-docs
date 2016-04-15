========================================================================
Configure an OpenStack environment on nodes with multipath block devices
========================================================================

As a cloud administrator, you can deploy your OpenStack environment on servers
with disks provided by storage systems with multipath routing enabled.

The **advantages** of using multipath disk configuration feature are:

* Fuel properly discovers multipath block devices showing one storage device
  on server per single multi-path back-end block device.

* You can map multipath block devices to whatever required - a host operating
  system, Cinder LVM, MongoDB storage, and so on.

* You can deploy an OpenStack environment with multiple multi-path block
  devices attached to a single node.

* You are enabled to combine configuration of multipath block devices with
  directly attached drives within a single node.

**Limitations:**

If you want to have base operating system on a multipath device, configure the multipath device to locate on first LUN that is ``LUN0``. Other options are currently not supported.

**Basic workflow:**

.. image:: /_images/deliverables/multipath_workflow.png
   :scale: 80 %

**To configure your Openstack environment on the nodes with the multi-path block devices:**

#. Configure bootstrap:

   * If you use FC card drivers, add the required drivers by running
     the following command on the Fuel Master node:

     .. code-block:: console

      fuel-bootstrap build --package package_name

     .. note:: If the required package does not locate in the preconfigured
        repositories for bootstrap, specify the repository by passing
        the :option:`--repo 'type uri distribution [components][,priority]'`
        argument to the :command:`fuel-bootstrap build` command.

     .. seealso::

      * `Dynamically build Ubuntu-based bootstrap on master node
        <https://specs.openstack.org/openstack/fuel-specs/specs/8.0/dynamically-build-bootstrap.html#bootstrap-generator>`_

   * If it is iSCSI adapter, no additional configurations of related Fuel
     plugins for the nailgun-agent to discover multipath block devices
     are required.

#. On receiving the ``new node appeared online`` notification, you can view
   the disks information details in the Fuel web UI, the :guilabel:`Nodes` tab.
   The details include the paths that correspond to the underlying paths
   to the multipath devices.

#. If you use FC card drivers, configure IBP images for provisioning
   proceeding with one of the following options:

   * In the Fuel web UI, go to the :guilabel:`Settings > Provision`
     and specify the :guilabel:`Initial packages` to provision.

   * In CLI:

     #. Run:

        .. code-block:: console

         fuel settings --env-id=<env_id> --download

     #. Change the initial package name
        in the ``editable/provision/packages/value`` section
        of the ``openstack.yaml`` file.

        .. note:: If the required package locates in the repository
           not already included in the list, add the repository details
           to the ``editable/repo_setup/repos/value``
           of the ``openstack.yaml`` file.

     #. Run the following command to re-upload the settings:

        .. code-block:: console

          fuel settings --env-id=<env_id> --upload

#. Deploy your OpenStack environment as described in :ref:`deploy-env`.