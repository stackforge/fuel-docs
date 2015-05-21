
.. _role-term:

Role
----

A role is a functional set of services
that Fuel installs as a whole on a :ref:`node<node-term>`.

Fuel can deploy the following roles;
see :ref:`assign-roles-ug`:

- :ref:`Controller<controller-node-term>`:
  No other roles should be deployed on the Controller nodes
  to avoid resource contention that can lead to poor performance.

  - Fuel prevents the :ref:`Compute role<compute-nodes-term>`
    from being installed on Controller nodes
    although you can disable this restriction
    by manually editing the :ref:`openstack.yaml<openstack-yaml-ref>` file
    in non-production environments.

  - Fuel allows the :ref:`Ceph<ceph-term>` OSD
    to be deployed on the Controller node
    but this is strongly discouraged for production environments
    because it degrades the Controller performance.

- :ref:`Compute<compute-nodes-term>`:
  Any of the Storage roles can be assigned
  to the same server(s) that run the Compute role
  and this is commonly done for small environments.
  For larger production environments,
  having dedicated servers for the Compute and Storage nodes
  usually yields better performance.

- Storage:
    See :ref:`Storage Node Architecture<storage-arch>`.

    Fuel can deploy two types of Storage roles:

    - :ref:`Cinder<cinder-term>` LVM

    - :ref:`Ceph<cinder-term>` OSD


    Note that :ref:`Swift<swift-object-storage-term>` storage
    runs on the Controller node(s)
    when Ceph is not enabled for image storage in the environment;
    it is not a separate role
    that can be deployed on its own server.

- :ref:`Telemetry -- MongoDB<mongodb-term>`:
  This is the database used for :ref:`Ceilometer<ceilometer-term>`
  (OpenStack Telemetry).
  It should be deployed on its own node in production environments
  because it can severely degrade (or even crash)
  the Controller node it runs on
  when sampling large amounts of data at short intervals.
  See :ref:`ceilometer-mongodb-plan` for more information.


