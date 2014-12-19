
The Fuel UI allows users to set external DNS and NTP servers
------------------------------------------------------------

Note:  This feature was removed from 6.0 and is scheduled for 6.1.
So this file is not included in the 6.0 Release Notes but is left
here so it can be revived for 6.1.

Fuel 6.0 allows operators to specify DNS and NTP servers that are outside the
Fuel environment. The */etc/resolv.conf* files on the target nodes are pointed
to the controller DNS and NTP services, which forward local queries to the Fuel
master node and forward external queries to the specified external DNS and NTP
servers. See the `Support External DNS and NTP
<https://blueprints.launchpad.net/fuel/+spec/external-dns-ntp-support>`_
blueprint for implementation details.

