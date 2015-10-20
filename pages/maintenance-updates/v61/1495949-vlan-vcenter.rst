.. _mos61mu-1495949:

[vCenter] nova-compute.conf doesn't contain vlan_interface option
=================================================================

The ``vlan_interface`` option is not present in the `nova-compute.conf` file,
if the Cluster was deployed in dual hypervisor mode with VLANManager. The fix
adds the option to the config file.

Affected packages
-----------------

* **CentOS/@6.1:** fuel-library6.1=6.1.0-6763.1


Fixed packages
--------------

* **CentOS/@6.1:** fuel-library6.1=6.1.0-6764.1

Patching scenario - Fuel Master node
------------------------------------

Run the following commands on the Fuel Master node::

        yum clean expire-cache
        yum -y update fuel-library6.1

.. note:: After updating the fuel-library package on the Fuel Master node, only
   newly created environments are deployed with the fixed configuration files.
   In order to fix the existing environments, execute the commands below.

Patching scenario - OpenStack Controller nodes
----------------------------------------------

Add the following option to the ``[vmware]`` section of the nova-compute configuration file::

        vlan_interface=N

where ``N`` is the name of your vlan interface.
