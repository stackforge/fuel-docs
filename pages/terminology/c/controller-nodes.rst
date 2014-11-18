
.. _controller-node-term:

Controller node
---------------

A Controller :ref:`node<node-term>` is a server
with the Controller :ref:`role<role-term>` assigned to it,
usually using the :ref:`assign-roles-ug` screen.

The Controller manages all activities in the environment.
`nova-controller` maintains the life cycle of the Controller.
along with :ref:`RabbitMQ<rabbitmq-term>`; :ref:`HAProxy<haproxy-term>`; 
:ref:`MySQL<mysql-term>` and :ref:`Galera<galera-cluster-term>`;
the :ref:`Pacemaker Cluster<pacemaker-term>`
(which includes :ref:`Corosync<corosync-term>`);
:ref:`Keystone<keystone-term>`; :ref:`Glance<glance-term>`;
and :ref:`Cinder<cinder-term>`.
Other services that may optionally run on the Controller include
:ref:`Heat<heat-term>`, :ref:`Neutron<neutron-term>`,
:ref:`Swift<swift-object-storage-term>`, :ref:`Ceph<ceph-term>` Monitor,
:ref:`Ceilometer<ceilometer-term>`,
:ref:`Sahara<sahara-term>`, and :ref:`Murano<murano-term>`.
See :ref:`Controller Node Architecture<controller-arch>`.

To achieve :ref:`High Availability<ha-term>` for the environment,
you must deploy a cluster of at least three Controller nodes.

The Fuel UI does not allow you to assign the
:ref:`Compute<compute-nodes-term>` role
to the server that runs the Controller role
in most cases.
It is possible, although not recommended,
to run both the Compute and Controller roles
on a single server by editing the *openstack.yaml* file.

    .. note:: In environments that use vCenter as the hypervisor,
       the  Nova-compute service can run **only** on Controller nodes.
       Because of this, Fuel does not allow you
       to :ref:`assign<assign-roles-vcenter-ug>`
       the "Compute" role to any node
       when vCenter is selected as the hypervisor.


