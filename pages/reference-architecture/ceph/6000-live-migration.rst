.. _ceph-live-migrate-arch:

Live Migration 
-------------- 
Live migration is the ability to move virtual machine instances
from one Compute node to another
while the instances continue to run.
Fuel deploys Ceph to support Live Migration
characterized as follows:

:Live:    The VM does not need to be stopped for the migration.

:Volume backed:    The ephemeral volume of the VM
     is shared between two or more Compute nodes
     because it is the Ceph cluster.

:Native:    QEMU directs a QEMU-to-QEMU connection
     to transfer ZVM state information between the Compute nodes.

:Peer-to-Peer:    Live Migration is initiated on one Compute node
     and that source Compute node manages the migration
     rather than having the **libvert** clients talk
     to both the source and destination Compute nodes.

:Managed:    **libvert** oversees the migration
     to ensure that it completes successfully
     and to respond appropriately if it fails.

The logical steps for implementing a live migration are:

- Nova-compute calls **libvert** to start the migration.

- **libvert** calls QEMU, passing the URL of the remote node,
  an identification of the hard drive to use
  and the VM configuration to use.

- The VM configuration is transferred to the target node,
  which then picks up the VM that was migrated
  over the WEMU to the connection.

- Flags are set to persist the VM on the destination node
  and to mark the state of the source node as migrated.
  This ensures that, if either of the nodes is contacted,
  the VM remains migrated
  rather than having modifications made to the VM on the source node.

The Fuel implementation of Ceph makes some improvements
to the Live Migration functionality
compared to vanilla OpenStack:

- The vanilla Nova compute is somewhat confused
  about the meanings of volume-backed and shared storage Live Migration;
  Fuel sets up the environment to use a true volume-backed model
  for Live Migration.

- Nova Compute does not update the VNC listen address
  as it migrates a VM.
  To work around this,
  administrators must set the VNC address to all 0's,
  which also allows anyone to connect to the VNC on any compute node.
  Mirantis OpenStack adds an empty table row
  to limit access to the VNC.

The current Fuel implementation still has some shortcomings:
[Is this really part of Live Migration?]

- Root SSH is not set up between all nodes.
  You can work around this by connecting a non-root user with **sudo**.

- Fuel hardwires the number of
  `PGs <http://ceph.com/docs/giant/dev/placement-group/>`_
  (Placement Groups) rather than calculating them
  based on the number of Ceph-OSD nodes.
  You can tune this number based on
  the size of the Ceph cluster and the workload;
  [where does one set this?]

- Fuel deploys a single storage network for the cluster.
  Ceph uses two networks for traffic
  (one for Glance server traffic, one for application traffic)
  so you must either run both types of traffic on the storage network
  or run one type of traffic on the storage network
  and the other on the administrative network.
  [What is the default configuration and how does one modify it?]

- Only the primary Ceph monitor is listed in the *ceph.conf* file
  on each Ceph-OSD node.
  Ideally, all Ceph monitors should be listed there.
  You can manually edit that file to provide that information.

- Fuel does not provide dedicated monitoring for the Ceph cluster;
  this is a problem especially when running a large cloud environment.
  The Puppet manifests are set up to support this
  but you must manually modify the manifests.
  [Do we have instructions for doing this?]

- Fuel forces you to choose either LVM or Ceph
  as the Cinder storage backend
  although Cinder itself can support multiple storage backends in parallel.
  [Why would one want to use Cinder LVM rather than Ceph?]
  You can manually tweak the configuration
  [how and using what file?]
  to make Cinder support both LVM and Ceph.

- The RBD driver has a configuration variable
  to determine which pool to use
  for a specific component but this is not adequate;
  you must instead pass an environment variable
  in the init script for each component.

- When you snapshot a Ceph-backed VM,
  the Ceph driver erroneously uses a data clone.
  In other words, if you have a VM that was started from Ceph
  and you want to create a snapshot,
  Nova calls QEMU IMG,
  which dlownloads the image to local storage,
  converts it from raw-to-raw,
  and then uploads it back into Ceph;
  it should, instead, just clone the image.
