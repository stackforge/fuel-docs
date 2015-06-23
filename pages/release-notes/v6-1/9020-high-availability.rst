
.. _high-availability-rn:

Issues in High Availability
===========================

Known issues in High Availability
---------------------------------

With the Mirantis OpenStack environment deployed in
High Availability (HA) mode, shutting down one of the
controllers will cause some requests to OpenStack to fail
even if the controller comes back online. The requests that
will fail are the ones processed by the controller.
The workaround is to restart the affected service.
See `LP1463802 <https://bugs.launchpad.net/fuel/+bug/1463802>`_.

