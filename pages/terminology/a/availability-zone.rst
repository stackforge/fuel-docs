
.. _availability-zone-term:

Availability Zone
-----------------

An Availability Zone is a name given to a
:ref:`host aggregate<host-aggregates-term>`.
An Availability Zone can be used to segregate your cloud environment;
for example, to identify hosts that are equipped for
heavy computational activities
or that have some sort of specialized equipment attached to them.
Users can specify an Availability Zone
when launching an instance in Horizon;
the :ref:`Nova scheduler <scheduler-term>` then uses the Availability Zone
as a criteria when allocating an instance to a node.

