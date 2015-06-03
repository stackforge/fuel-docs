.. _mg-dhcp-agent:

DHCP agent
++++++++++

The *neutron-dhcp-agent* relies on **dnsmasq** to handle the DHCP
requests which provide network configuration to instances.

| We recommend you perform the following checks to detect anomalies:

* There must be at least one **dnsmasq** process per tenant network
  when DHCP is enabled.
* Too many DHCPNAK entries in dnsmasq logs could be the symptom of
  connectivity issues with the instances.
