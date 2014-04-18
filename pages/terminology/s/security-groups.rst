
.. _security-groups-term:

Security groups
---------------
Sets of IP filter rules that are applied to an instance's networking.
Most projects provide a "default" security group
that is applied to instances that have no security group defined.
See the `Security groups web page <http://docs.openstack.org/trunk/openstack-ops/content/security_groups.html>`_
for more information.

Avoid creating a secure group that refers to itself as a source.
Such a configuration generates N^2 rules in *iptables*
(where N is the number of FMs).
This significantly impacts networking performance in large deployments.

Note that Sahara does does not provide a default security group.
See this `note in <https://review.openstack.org/#/c/71299/>`_
for information about defining a default security group for Sahara).
