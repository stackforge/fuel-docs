
External DNS and NTP support
----------------------------

With Fuel 6.1 you can now change NTP and DNS servers
for Slave nodes through the Fuel web UI.

This way if the Fuel Master node does not
have access to the Internet or if it is disabled
after the deployment, you can change the NTP
and DNS servers for the Slave nodes and not
have it routed through the Fuel Master node.

You can specify the following values
for the Slave nodes:

* DNS-servers
* NTP-servers

The values need to be specified strictly
as an IP address for DNS-servers and IP or FQDN
for NTP-servers.

Fuel does not check if the specified DNS and NTP
services are actually available. Make sure
you specify the correct ones.

See the `Support External DNS and NTP
<https://blueprints.launchpad.net/fuel/+spec/external-dns-ntp-support>`_.
