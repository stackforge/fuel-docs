
.. :host-aggregates-term:

Host Aggregates
---------------

A host aggregate is a grouping of hosts;
one host can be in more than one host aggregate.
Host aggregates are only exposed to cloud administrators.

You can assign a :ref:`availability zone`<availability-zones-term>` name
to a host aggregate.
Users can then request that availability zone
when creating an instance.

For more information, see:

- `Segregating your Cloud <http://docs.openstack.org/openstack-ops/content/scaling.html#Availability_Zones_and_Host_Aggregates>`_ 
  provides good conceptual information,
  although it is out-dated in that it still requires
  configuration changes to the *nova.conf* file.
- `Host Aggregates <http://docs.openstack.org/grizzly/openstack-compute/admin/content/host-aggregates.html>`_
- Russell Bryant's `Availability Zones and Host Aggregates in OpenStack Compute (Nova) <http://blog.russellbryant.net/2013/05/21/availability-zones-and-host-aggregates-in-openstack-compute-nova/>`_ article.


