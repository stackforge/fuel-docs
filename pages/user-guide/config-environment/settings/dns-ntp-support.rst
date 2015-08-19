
.. _dns-ntp-support-ug:

DNS and NTP Servers
+++++++++++++++++++

If the Fuel Master node does not have access to the Internet
or if it is disabled after the deployment, you can change the NTP
and DNS servers for the nodes and not have it routed through the
Fuel Master node.

You can specify the following values for the nodes:

* DNS
* NTP-servers

If specifying a DNS server, the value must be an IP address.
For NTP servers, the value specified may be an IP or FQDN.

Fuel does not check if the specified DNS and NTP services are actually
available. Make sure you specify the correct ones.
