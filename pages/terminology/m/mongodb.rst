.. _mongodb-term:

MongoDB
-------
MongoDB is an open source NoSQL document database
optimized to host very large tables on commodity hardware.
See the `MongoDB web site <https://www.mongodb.org>`_.

Mirantis OpenStack 5.0 and later
(OpenStack :ref:`icehouse-term` and later)
implements MongoDB to use as a backend for :ref:`ceilometer-term`.
The MongoDB role should be activated
only if you are running Ceilometer;
other OpenStack services continue to use :ref:`mysql-term`.

