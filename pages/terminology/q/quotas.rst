
.. _quotas:

quotas
------
OpenStack uses quotas to limit the resources one tenant consumes
and thus prevent system capacities from being exhausted without notification.
Fuel has a deployment setting to enable/disable quotas;
they are disabled by default.

You can set quotas from Horizon;
use the "Edit Quotas" form in the tenant panel.
You can also use the **nova quota-update** command;
For more information about how quotas work
and how to use the */nova quota-upate** command, see
`Manage quotas <http://docs.openstack.org/user-guide-admin/content/cli_set_quotas.html>`_.
