.. _mos61mu-1470831:

[IBP] Speed up the image building
=================================

The existing scheme of the image-based provisioning creates the image
on-the-fly using a live file system. Sometimes, this leads to the
slowness of the image creation which in turn can lead to
the provisioning-time failure. The fix turns off the journaling of the
file system that is used during the image creation.
See `LP1470831 <https://bugs.launchpad.net/bugs/1470831>`_.

Affected packages
-----------------

* **CentOS/@6.1:** fuel-agent=6.1.0-7132.1

Fixed packages
--------------

* **CentOS/@6.1:** fuel-agent=6.1.0-7133.1

Patching scenario - Fuel Master node
------------------------------------

Run the following commands on the Fuel Master node::

        dockerctl shell mcollective
        yum clean expire-cache
        yum -y update fuel-agent
