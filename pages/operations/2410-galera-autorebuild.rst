
.. index:: HowTo: Galera Cluster Autorebuild

.. _enable-galera-autorebuild:

HowTo: Enable/Disable Galera Cluster Autorebuild Mechanism
==========================================================

By default, the autorebuild mechanism is enabled,
so Fuel reassembles a Galera cluster automatically
without any user interaction.

  - The OCF Galera script checks every node in the Galera Cluster
    for the SEQNO position.
    This allows it to find the node with the most recent data.

  - The script checks for the status of the current node,
    if it is synchronized with the quorum, the procedure stops;
    otherwise, SEQNO is obtained and
    stored in the Corosync CIB as a variable.

  - The script sleeps for 300 seconds,
    allowing other nodes to join the Corosync quorum
    and push their UUIDs and SEQNOs, too.

  - For every node in the quorum, the script compares the UUID and SEQNO.
    If at least one node has a higher SEQNO,
    it bootstraps the node as the Primary Component,
    allowing other nodes to join the newly formed cluster later;

  - The Primary Component node is started with
    the `--wsrep-new-cluster` option, forming a new quorum.

To prevent the `autorebuild feature` you should do::

  crm_resource unmanage clone_p_mysql

To re-enable `autorebuild feature` you should do::

  crm_resource manage clone_p_mysql

To check GTID and SEQNO across all nodes saved in Corosync CIB you should do::

  cibadmin --query --xpath "//nodes/*/*/nvpair[@name=\"gtid\"]"

To try an automated reassemble without reboot if cluster is broken just issue::

  crm resource restart clone_p_mysql

To remove all GTIDs and SEQNOs from Corosync CIB
and allow the OCF script to reread the data
from the `grastate.dat` file, you should do::

  cibadmin --delete-all --query --xpath "//nodes/*/*/nvpair[@name=\"gtid\"]"
  --force


