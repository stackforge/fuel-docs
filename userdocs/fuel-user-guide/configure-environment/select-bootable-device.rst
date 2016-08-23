.. _select-bootable-device:

===================================
Select a bootable device for a node
===================================

By default, Fuel boots the first disk it detects.

**To select a bootable device:**

* Using the Fuel web UI:

  #. Log in to the Fuel web UI.
  #. Click the :guilabel:`Nodes` tab.
  #. In :guilabel:`Disk Configuration`, select the required disk as bootable.

* Using the Fuel CLI:

  #. Log in to the the Fuel Master node CLI.
  #. Download the configuration file of the node:

     .. code-block:: console

        fuel node --node-id <node_id> --disk --download

  #. In the ``disks.yaml``, set ``bootable: True`` for the required node's
     disk. For example:

     .. code-block:: yaml

        id: vda
        name: vda
        bootable: True
        size: 50380
        volumes:
          - keep_data: false

     .. note::

        Only one disk can have the ``bootable: True`` attribute at the same
        time. Otherwise, an error will occur on the settings upload.

  #. Upload the changes:

     .. code-block:: console

        fuel node --node-id <node_id> --disk --upload
