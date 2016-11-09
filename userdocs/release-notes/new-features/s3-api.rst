======================================
S3 API authentication through Keystone
======================================

Implemented the possibility to enable Keystone to authenticate queries
to S3 API on RadosGW using the Fuel CLI and Fuel web UI.

.. note::

   Enablement of the Keystone authentication for S3 API increases the load
   on the Keystone service. Consult with documentation and Mirantis support
   on mitigating the risks related with the high load of the Keystone service.

See `LP1540426`_ | `spec`_

.. _`LP1540426`: https://bugs.launchpad.net/mos/+bug/1540426
.. _`spec`: https://specs.openstack.org/openstack/fuel-specs/specs/10.0/s3-keystone-integration.html