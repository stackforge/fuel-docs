========================================================================
Configure an OpenStack environment on nodes with multipath block devices
========================================================================

You can deploy your OpenStack environment on servers
with disks provided by storage systems with multipath I/O.

The **advantages** of using multipath disk configuration feature include:

* Fuel properly discovers multipath block devices showing one storage device
  on server per single multi-path back-end block device.

* You can map multipath block devices to a host operating
  system, Cinder LVM, MongoDB storage, and so on.

* You can deploy an OpenStack environment with multiple multi-path block
  devices attached to a single node.

* You can combine configuration of multipath block devices with
  directly attached drives within a single node.

**Limitations:**

If you want to have the base operating system on a multipath device,
configure the multipath device on the first LUN, that is ``LUN0``.
Other options are not supported.

**Basic workflow:**

.. image:: /_images/deliverables/multipath_workflow.png
   :scale: 80 %

**To configure your Openstack environment on the nodes with the multi-path block devices:**

#. Configure bootstrap:

   * If you need an additional FC card driver, add the required drivers by running
     the following command on the Fuel Master node:

     .. code-block:: console

      fuel-bootstrap build --package package_name --label fc_bootstrap

     .. note:: If the required package does not locate in the preconfigured
        repositories for bootstrap, specify the repository by passing
        the :option:`--repo 'type uri distribution [components][,priority]'`
        argument to the :command:`fuel-bootstrap build` command.

#. After you receive the ``new node appeared online`` notification,
   view the disks information in the :guilabel:`Nodes` tab.
   The details include the paths that correspond to the underlying paths
   to the multipath devices.

#. If you need an additional FC card driver, configure IBP images for
   provisioning proceeding with one of the following options:

   * In the Fuel web UI, click the :guilabel:`Settings > Provision`
     and specify the :guilabel:`Initial packages` to provision.

   * In CLI:

     #. Download the OpenStack environment configuration file:

        .. code-block:: console

         fuel settings --env-id=<env_id> --download

     #. Change the initial package name in the
        ``editable/provision/packages/value`` section of the
        ``openstack.yaml`` file.

        .. note:: If the required package locates in the repository
           not already included in the list, add the repository details
           to the ``editable/repo_setup/repos/value``
           of the ``openstack.yaml`` file.

     #. Upload the modified settings back to Fuel:

        .. code-block:: console

          fuel settings --env-id=<env_id> --upload

#. Deploy your OpenStack environment as described in :ref:`deploy-env`.

.. seealso::

      * `Dynamically build Ubuntu-based bootstrap on the Fuel master node
        <https://specs.openstack.org/openstack/fuel-specs/specs/8.0/dynamically-build-bootstrap.html#bootstrap-generator>`_