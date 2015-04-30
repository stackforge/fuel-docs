
External DNS and NTP support for Controller nodes
-------------------------------------------------

With Fuel 6.1 you can now change NTP and DNS servers
for Slave or Host nodes through the Fuel UI.

This way if the Fuel Master node does not
have access to the Internet or if it is disabled
after the deployment, you can change the NTP
and DNS servers for the Slave or Host nodes and not
have it routed through the Fuel Master node.

See the `Support External DNS and NTP
<https://blueprints.launchpad.net/fuel/+spec/external-dns-ntp-support>`_.
