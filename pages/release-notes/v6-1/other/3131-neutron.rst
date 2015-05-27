.. _neutron-rn:

OpenStack Networking (Neutron)
------------------------------

Resolved Neutron Issues
+++++++++++++++++++++++

* In rare circumstances, there was no connectivity to instances in HA
  neutron environment. Open vSwitch streams that enable network access
  to VM instances were dropped. Ports created when
  ``neutron-openvswitch-agent`` was down got a DOWN status and
  ``binding:vif_type=binding_failed`` as it should be. When an agent
  is rebooted, it should be able to recreate ports according to the
  DB, but instead it logged a warning and created a port with the DOWN
  status. The fix adds the rebinding chance on the agent startup
  in order to recover ports created while the agent was down. This
  includes DHCP and router ports. See `LP1393771`_.

* During the boot process on clusters with Neutron networking,
  instances get IP address from the DHCP server with a delay that is
  caused by the DHCP NAK messages. The problem is due to a special
  setting in the DHCP server (``dnsmasq``). The delay also depends on
  the DHCP client. See `LP1455113`_.

Known Neutron Issues
++++++++++++++++++++

The Pacemaker can turn DHCP agent resource into unmanaged state
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Pacemaker monitors DHCP agents on all the controller nodes and restarts
them if they seem to be dead. By default, Pacemaker tries to clean all
the artefacts created by the agent (namespaces, ports, processes).
In case of a large number of networks, this procedure can take too
long to finish, and the resource will be marked as unmanaged.
See `LP1436414`_.

If it happens, you can clean up  the resources by executing the
following command::

  pcs resource cleanup p_neutron-dhcp-agent

To prevent such cases:

#. Disable the cleanup on starting/stopping of Neutron DHCP agent
   resource using the following command::

     pcs resource update p_neutron-dhcp-agent \
     remove_artifacts_on_stop_start=true --force

#. Disable and enable the resource to apply changes.

The resource can be restarted without removing any artefacts (for
example, to apply configuration changes), as it supports the reload
operation. To apply this option, change one of the resource parameters.
For example, execute::

  pcs resource update p_neutron-dhcp-agent debug=true

The resource should be reloaded. If it restarts instead of reloading
from the very first try, change the parameter again.

Other issues
~~~~~~~~~~~~

* Neutron router namespaces are managed by Neutron L3 agent; and in
  case of unstable communication between L3 agent and Neutron server,
  namespaces can be duplicated after the router rescheduling. Such
  behaviour is expected and usually shouldn't break connection to and
  from instances. Instances also should receive metadata, as usual.
  See `LP1452768`_.

.. _`LP1393771`: https://bugs.launchpad.net/mos/6.1.x/+bug/1393771
.. _`LP1455113`: https://bugs.launchpad.net/mos/6.1.x/+bug/1455113
.. _`LP1436414`: https://bugs.launchpad.net/fuel/+bug/1436414
.. _`LP1452768`: https://bugs.launchpad.net/mos/6.1.x/+bug/1452768
