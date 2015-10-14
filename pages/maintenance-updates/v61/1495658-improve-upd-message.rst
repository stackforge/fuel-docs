.. _mos61mu-1495658:

Unclear message about MOS maintenance updates
=============================================

This change updates the message for repository connectivity and
maintenance updates for the fuel master. It also includes a proper
documentation link.
See `LP1452389 <https://bugs.launchpad.net/bugs/1495658>`_.

Affected packages
-----------------
* **Centos/@6.1:**
- fuel-6.1.0-6024.2.gerrit225997.1.git1b0f1a4.noarch.rpm
- fuel-image-6.1.0-6024.2.gerrit225997.1.git1b0f1a4.noarch.rpm

Fixed packages
--------------
* **Centos/@6.1:**
- fuel-6.1.0-6024.2.gerrit225997.1.git1b0f1a4.noarch.rpm
- fuel-image-6.1.0-6024.2.gerrit225997.1.git1b0f1a4.noarch.rpm

Patching scenario
-----------------

#. Run the following commands on Fuel master node::

        yum clean expire-cache
        yum -y update fuel-library

TODO:...