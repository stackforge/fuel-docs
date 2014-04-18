
.. _tenant-term:

Tenant
------

OpenStack Compute defines a tenant as a group of users.

- In the Dashboard,
  tenants are represented as projects.
- One tenant can contain zero or more users.
- One user can be associated with one or more tenants.
- A role can be assigned to each tenant and user pairing.

See the `OpenStack Compute <http://www.openstack.org/software/openstack-compute/>`_
web page for more information.

Use the `keystone <http://docs.openstack.org/developer/python-keystoneclient/man/keystone.html>`_ command line utility
to query and manage a tenant project.
The most common commands are:

**keystone tenant-list**
	List all tenants on the system, showing ID, name,
	and whether they are enabled or disabled.

To list all projects with their ID, name, and whether they are enabled or disabled:


Create a project named new-project:

  $ keystone tenant-create --name new-project --description 'my new project'

