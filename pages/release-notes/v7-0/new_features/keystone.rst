
.. _keystone-features:

Keystone-related features
+++++++++++++++++++++++++

* Now Fuel deploys Keystone under Apache mod_wsgi as a server
  instead of a standalone eventlet service. This change improves
  Keystone service performance and OpenStack cloud scalability.