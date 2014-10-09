
.. _heat-test-prepare:

Preparing Heat for Testing
--------------------------

The platform tests are run in the tenant you've specified in
'OpenStack Settings' tab during OpenStack installation. By default that is
'admin' tenant. Perform the following actions under that tenant to prepare Heat
for testing of its autoscaling feature:

1. Download the `image of Linux Fedora with pre-installed cloud-init and heat-cfntools
   packages <http://murano-files.mirantis.com/F17-x86_64-cfntools.qcow2>`_.

2. Then upload the image into OpenStack Image Service (Glance)
   into 'admin' tenant and name it 'F17-x86_64-cfntools'.

Now Heat autoscaling is ready for testing. Note that this test creates a stack
with two instances of Linux Fedora and it may fail if Compute node doesn't
have enough resources.

