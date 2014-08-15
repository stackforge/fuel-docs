
.. _security-groups-term:

Security groups
---------------

A Security Group is a set of IP filter rules
that is associated with an instance when it is created
to define the networking access to an instance.
The default OpenStack Security Group does not allow
any network access to Instances
(so ping and SSH do not work).
Security Groups are associated with a project (tenant);
most projects provide a "default" security group
that is applied to instances that have no security group defined.
The project administrator can either add rules
to the default Security Group
or define alternate Security Groups
from which the user can select when creating an instance.

Avoid creating a Security Group that refers to itself as a source.
Such a configuration generates N^2 rules in *iptables*
(where N is the number of FMs).
This significantly impacts networking performance in large deployments.

Note that Sahara does does not provide a default security group.
See this `note <https://review.openstack.org/#/c/71299/>`_
for information about defining a default security group for Sahara).

For more information about creating and using Security Groups, see:

- `Security groups web page <http://docs.openstack.org/trunk/openstack-ops/content/security_groups.html>`_
  gives an overview of Security Groups
  and instructions for defining them.

- `Launch an Instance <http://docs.openstack.org/user-guide/content/dashboard_launch_instances_from_image.html>`_
  gives instructions for associating a Security Group with an Instance
  using the OpenStack dashboard (Horizon).

- `Configure access and security for instances <http://docs.openstack.org/user-guide/content/Launching_Instances_using_Dashboard.html#security_groups_add_rule>`_
  gives detailed instructions for adding rules to a Security Group.


