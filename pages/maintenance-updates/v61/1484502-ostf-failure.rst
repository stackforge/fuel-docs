.. _mos61mu-1484502:

[vCenter][OSTF] Test fails in dual hypervisor mode
==================================================

OpenStack Testing Framework (OSTF, Fuel Health Check) always runs the tests
using the ``TestVM`` image and randomly chosen availability zone.
If the ``nova`` availability zone is chosen, then the test runs successfuly,
otherwise it fails. The fix forces OSTF to take the image format into
consideration when choosing the availability zone.

Affected packages
-----------------

* **CentOS/@6.1:** fuel-ostf=6.1.0-772.1


Fixed packages
--------------

* **CentOS/@6.1:** fuel-ostf=6.1.0-773.1

Patching scenario - Fuel Master node
------------------------------------

Run the following commands on the Fuel Master node::

        dockerctl shell ostf
        yum clean expire-cache
        yum -y update fuel-agent
