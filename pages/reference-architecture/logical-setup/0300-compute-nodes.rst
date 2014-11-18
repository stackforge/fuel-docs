
.. _compute-arch:

Compute Nodes
-------------

OpenStack compute nodes are, in many ways, the foundation of your
environment; they are the servers on which your users will create their
Virtual Machines (VMs) and host their applications. Compute nodes need
to talk to controller nodes and reach out to essential services such
as RabbitMQ and MySQL. They use the same approach that provides
redundancy to the end-users of Horizon and REST APIs, reaching out to
controller nodes using the VIP and going through HAProxy.

.. image:: /_images/logical-diagram-compute.*
  :width: 40%
  :align: center

