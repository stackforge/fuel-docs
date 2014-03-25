Detailed Port Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The following table describes the detailed  port configuration and VLAN
assignment.

+--------+-------------------+--------+-----------+-------------------------+
| Switch | Server name       | Server | tagged /  | VLAN ID                 |
| Port   |                   | NIC    | untagged  |                         |
+========+===================+========+===========+=========================+
| G0/1   | Fuel              | eth0   | untagged  | 104                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/2   | Fuel              | eth1   | untagged  | 100                     |
+--------+-------------------+--------+-----------+-------------------------+
| G0/3   | Compute Node 1    | eth0   | tagged    | 101, 102, 104 (untagged)|
+--------+-------------------+--------+-----------+-------------------------+
| G0/4   | Compute Node 1    | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/5   | Compute Node n    | eth0   | tagged    | 101, 102, 104 (untagged)|
+--------+-------------------+--------+-----------+-------------------------+
| G0/6   | Compute Node n    | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/7   | Controller Node 1 | eth0   | tagged    | 101, 102, 104(untagged) |
+--------+-------------------+--------+-----------+-------------------------+
| G0/8   | Controller Node 1 | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/9   | Controller Node 2 | eth0   | tagged    | 101, 102, 104 (untagged)|
+--------+-------------------+--------+-----------+-------------------------+
| G0/10  | Controller Node 2 | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/11  | Controller Node 3 | eth0   | tagged    | 101, 102, 104 (untagged)|
+--------+-------------------+--------+-----------+-------------------------+
| G0/12  | Controller Node 3 | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/13  | Cinder Node       | eth0   | tagged    | 101, 102, 104 (untagged)|
+--------+-------------------+--------+-----------+-------------------------+
| G0/14  | Cinder Node       | eth1   | tagged    | 100, 103                |
+--------+-------------------+--------+-----------+-------------------------+
| G0/24  | Router (default   | ---    | untagged  | 100                     |
|        | gateway)          |        |           |                         |
+--------+-------------------+--------+-----------+-------------------------+


Connect the servers to the switch as in the diagram below:

.. image:: /_images/preinstall_d_switch_connect.jpg
   :align: center
   :width: 75%

The following diagram describes the network topology for this environment.

.. image:: /_images/preinstall_d_logic_network.jpg
   :align: center
   :width: 75%
