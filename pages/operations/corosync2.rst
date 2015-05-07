.. _corosync2:

Notes on Corosync and Pacemaker
===============================

Keep in mind the following on
Corosync and Pacemaker:

* If you restart the Corosync service, you will need to
  restart the Pacemaker as well.

* Corosync 1.x cannot be upgraded to 2.x without full
  cluster downtime. All Pacemaker resources, such as Neutron
  agents, DB and AMQP clusters and others, will be hit by the
  downtime as well.

* All location constraints for cloned the Pacemaker resources
  must be removed as a part of the Corosync version upgrade
  procedure.
