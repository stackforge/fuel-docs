
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

The values need to be specified strictly as an IP address for DNS
and IP or FQDN for NTP-servers.

Fuel does not check if the specified DNS and NTP services are actually
available. Make sure you specify the correct ones.
