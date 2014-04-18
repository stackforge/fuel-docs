.. _identity-service-term:

Identity Service
----------------

The OpenStack Identity service
provides a central directory of users
mapped to the OpenStack services they can access.
It acts as a common authentication system across the cloud operating system
and can integrate with existing backend directory services such as LDAP.
It supports multiple forms of authentication
including standard username and password credentials,
token-based systems and AWS-style logins.

The catalog also provides a queryable list
of all of the services deployed in an OpenStack cloud in a single registry.
Users and third-party tools can programmatically determine
which resources they can access.

As an administrator, OpenStack Identity enables you to:

* Configure centralized policies across users and systems.
* Create users and tenants and define permissions
  for compute, storage and networking resources
  using role-based access control (RBAC) features.
* Integrate with an existing directory such as LDAP,
  allowing for a single source of identity authentication
  across the enterprise

As a user, OpenStack Identity enables you to:

* Get a list of the services that you can access
* Make API requests or log into the web dashboard
  to create resources owned by your account

Pacemaker uses an OpenStack Resource Agent to manage
the Identity Service in OpenStack High Availability deployments.
For information about the High Availability Identity service, see
`Highly Available OpenStack Identity <http://docs.openstack.org/high-availability-guide/content/s-keystone.html>`.

