.. _configure-vmware-vcenter-settings:

=================================
Configure VMware vCenter settings
=================================

If your environment is integrated with VMware vCenter, you can specify a
Certificate Authority (CA) bundle file to use for verifying the VMware vCenter
server certificate for the OpenStack Compute service, OpenStack Block Storage
service, and OpenStack Image service.

**To configure the VMware vCenter certificate verification:**

#. Log in to the Fuel web UI.
#. Navigate to the :guilabel:`VMware` tab.
#. Configure the VMware vCenter certificate verification depending on your
   environment needs:

   * If you plan to deploy an environment for testing purposes or want to
     speed up the deployment process, disable the certificate
     verification by selecting
     :guilabel:`Bypass vCenter certificate verification` in the
     :guilabel:`VMware vCenter Settings` section.
   * If VMware vCenter is using a self-signed certificate:

     #. In the :guilabel:`CA file` section, upload a custom CA certificate.
     #. Leave :guilabel:`Bypass vCenter certificate verification` unchecked.
   * To use a VMware vCenter server certificate emitted by a known CA, for
     example, GeoTrust, leave the :guilabel:`CA file` section empty and the
     :guilabel:`Bypass vCenter certificate verification` unchecked.
#. Click :guilabel:`Save Changes`.