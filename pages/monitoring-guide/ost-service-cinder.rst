.. _Monitoring-Ost-cinder:

Cinder
------

Processes
_________

API
+++

Generally run on *controler node*. Process **cinder-api** listening on http port **8776**

Scheduler
+++++++++

Generally run on *controler node*.
Process **cinder-scheduler**

Volume
++++++

Generally run on *storage* or *compute* node.
Process **cinder-volume**

Metrics
_______

- number of snapshots in progress
- number of snapshots deleting
- number of volumes deleting
- number of volumes creating
- 
