
.. _fuel-passwd-ops:

Fuel Access Control
===================

Access to the Fuel Dashboard is controlled
in Mirantis OpenStack 5.1 and later.
This implementation is enhanced to be more robust
in Release 5.1.1 and 6.0.
Authentication is under control of :ref:`keystone-term`.

The default username/password can be changed:

- During Fuel installation; see :ref:`fuel-passwd-ug`.

- From the main Fuel UI screen; see :ref:`start-create-env-ug`.

- Using the Fuel CLI; see :ref:`cli-fuel-password`

If the password for the Fuel Dashboard
is changed using the Fuel UI or the Fuel CLI,
the new password is stored only in Keystone;
it is not written to any file.
If you forget the password,
you can change it
by using the **keystone** command on the Fuel Master Node:

::

  keystone --os-endpoint=http://10.20.0.2:35357/v2.0 --os-token=admin_token password-update

To run or disable authentication,
modify */etc/nailgun/settings.yaml* (``AUTHENTICATION_METHOD``)
in the Nailgun container.

Most endpoints (including
The :ref:`astute-term`, :ref:`cobbler-term`,
Postgres, MCollective, and :ref:`keystone-term` endpoints
that used to be protected with the default password
are now protected by passwords
that are unique for each Fuel installation.
Almost all endpoints in Fuel are protected
and they require an authentication token.
**admin_token** is stored in the */etc/fuel/astute.yaml* file.

:ref:`Nailgun`<nailgun-term>`
and OSTF were not protected in earlier releases;
in 5.1,they are protected by the authentication token.
Beginning with Release 5.1.1 and 6.0,
the `Nailgun` and `OSTF` services are added to Keystone
and the hardcoded URLs are replaced with
endpoints that point to their URLs
to enable service discovery.

Fuel Authentication is implemented
by a special Keystone instance
that is installed in a new container
on the Fuel Master during installation:

- Fuel Menu generates passwords for fresh installations;
  the upgrade script generates passwords when upgrading.
  The password is stored in the Keystone database.

- The `nailgun` and `ostf` users are created
  in the `services` project with admin roles.
  This means that the Keystone service catalog
  can be used to discover their URLs
  and to authenticate requests in middleware,
  rather than requiring that each request by middleware
  be validated using the keystone admin token
  as was done in Release 5.1.

  Some Nailgun URLs are not protected;
  they are defined in *nailgun/middleware/keystone.py*
  in the public_url section.

- The admin_token token does not expire for 24 hours
  so it does not need to be stored in the browser cache.

- A cron script runs daily in the Keystone container
  to delete outdated tokens
  using the **keystone-manage token_flush** command.
  [What is the name of the cron script?]

- Support for cookies is added in Release 5.1.1 and 6.0
  which allows the API to be tested from the browser.

- **keystonemiddleware** replaces the deprecated
  **keystonevclinet.middleware**.
  [For what?]

Beginning with Release 5.1.1 and 6.0,
the user must supply a password
when upgrading Fuel from an earlier release.
This password can be supplied on the command line
before running the installation script
or in response to the prompt.
[Is this the current password for the Fuel Dashboard
or is it the password that will be assigned
to the Fuel Dashboard after upgrade?]
A Puppet run for Keystone then adds the new project
and the `nailgun` and `ostf` users.

