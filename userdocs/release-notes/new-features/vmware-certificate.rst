=====================================================
Verification of the VMware vCenter server certificate
=====================================================

Added a capability to specify a Certificate Authority (CA) bundle file
to use for verifying the VMware vCenter server certificate for
the OpenStack Compute service, OpenStack Block Storage service, and
OpenStack Image service.

Depending on the needs of your environment, you can configure the VMware
vCenter server certificate verification on the :guilabel:`VMware` tab in
the Fuel web UI:

* If you plan to deploy an environment for testing purposes or want
  to speed up the deployment process, you can disable the certificate
  verification by checking
  :guilabel:`Bypass vCenter certificate verification`.

* If VMware vCenter is using a self-signed certificate, upload a CA
  certificate in the :guilabel:`CA file` field.
  Leave :guilabel:`Bypass vCenter certificate verification` unchecked.

* If a VMware vCenter server certificate is emitted by a known CA,
  for example, GeoTrust, leave the :guilabel:`CA file` field empty
  and :guilabel:`Bypass vCenter certificate verification` unchecked.

See :ref:`configure-vmware-vcenter-settings`