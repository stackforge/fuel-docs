
.. _ssh-to-target-nodes-ops:

SSH to target nodes
-------------------

You can SSH to any of the target nodes in your environment
from the Fuel Master node.

Use the **fuel node list** command to get a list
like the following:
::


    id | status | name             | cluster | ip         | mac               | roles      | pending_roles | online
    ---|--------|------------------|---------|------------|-------------------|------------|---------------|-------
    5  | ready  | Untitled (4d:4d) | 2       | 10.110.0.3 | b2:8b:55:17:ae:40 | controller |               | True  
    8  | ready  | Untitled (3a:7f) | 2       | 10.110.0.6 | 92:93:99:70:14:4c | compute    |               | True  
    6  | ready  | Untitled (34:84) | 2       | 10.110.0.4 | f2:b3:1a:74:da:41 | cinder     |               | True  
    7  | ready  | Untitled (f0:9b) | 2       | 10.110.0.5 | 56:09:fe:c6:06:40 | compute    |               | True  

You can ssh to any of the nodes using the IP address.
For example, to ssh to the Cinder node:
::

    ssh 10.110.0.4

You can also use the "id" shown in the first column,
for example:
::

    ssh node-6
