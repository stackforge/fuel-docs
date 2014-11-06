
.. _ceilometer-mongodb-rn:

OpenStack Telemetry (Ceilometer) and MongoDB Database
-----------------------------------------------------

[TBD]

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

MongoDB cannot store dictionary objects with keys that use $ and . special characters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The special characters '.' and '$' are special characters for the MongoDB database
and so cannot be used as keys in dictionary objects.
When Ceilometer processes data samples
that contain these characters in the resource metadata
(for example, has tag names with dots in them),
the sample writing fails.
This usually occurs when metric data is collected
from images with special tags
(such as images Sahara creates with tags like '_sahara_tag_1.2.1').
All data samples that do not contain these forbidden symbols
are processed as usual without any problems.
Do not create images, VMs, and other cloud resources
that contain resource metadata keys that use the $ and . special characters.
See `LP1360240 <https://bugs.launchpad.net/bugs/1360240>`_.

Additional MongoDB roles cannot be added to an existing deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Fuel installs :ref:`mongodb-term`
as a backend for :ref:`ceilometer-term`.
Any number of MongoDB roles (or standalone nodes)
can initially be deployed into an OpenStack environment
but, after the environment is deployed,
additional MongoDB roles cannot be added.
Be sure to deploy an adequate number of MongoDB roles
(one for each Controller node is ideal)
during the initial deployment.
See `LP1308990 <https://bugs.launchpad.net/fuel/+bug/1308990>`_.

* Deployment of HA cluster with Ceilometer
  fails with Puppet errors.
  See `LP1338608 <https://bugs.launchpad.net/bugs/1338608>`_.
