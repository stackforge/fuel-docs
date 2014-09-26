
.. _ephemeral-storage-term:

Ephemeral storage
-----------------

Ephemeral storage is used for scratch space
and as temporary storage for the operating system in a guest VM.
Ephemeral storage is allocated for an instance;
its size is determined by the flavor of the instance.
Ephemeral storage persists through a reboot of the guest operating system
but is deleted when the instance is deleted.

The Nova Compute service manages ephemeral storage.

- By default, ephemeral drives are stored locally on Compute nodes.

- If Ceph is configured for the environment,
  Nova-compute stores ephemeral drives in Ceph.

- Other storage options are possible,
  such as an NFS share that is mounted from a SAN.

