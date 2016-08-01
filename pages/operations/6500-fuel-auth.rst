
.. _fuel-passwd-ops:

Fuel Access Control
===================

Access to the Fuel Dashboard is controlled
in Mirantis OpenStack 5.1 and later.
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

  keystone --os-endpoint=http://<your_master_ip>:35357/v2.0 --os-token=<admin_token> password-update

The default value of <your_master_ip> is 10.20.0.2.
The port number of 35357 never changes.

The <admin_token> is stored in the */etc/fuel/astute.yaml* file
on the Fuel Master node.

To run or disable authentication,
modify */etc/nailgun/settings.yaml* (``AUTHENTICATION_METHOD``)
in the Nailgun container.

All endpoints except the agent updates and version endpoint
are protected by an authentication token,
obtained from Keystone by logging into Fuel
as the `admin` user with the appropriate password.

Services such as :ref:`astute-term`, :ref:`cobbler-term`,
Postgres, MCollective, and :ref:`keystone-term`),
which used to be protected with the default password,
are now each protected by a user/password pair
that is unique for each Fuel installation.

Beginning with release 6.0,
the `Nailgun` and `OSTF` services endpoints are added to
Keystone and now it is possible to use the Keystone service
catalog to obtain URLs of those services instead
of hardcoding them.

Fuel Authentication is implemented by a dedicated Keystone instance
that Fuel installs in a new :ref:`docker<docker-term>` container on the Fuel Master.

- Fuel Menu generates passwords for fresh installations;
  the upgrade script generates passwords when upgrading.
  The password is stored in the Keystone database.

- The `nailgun` and `ostf` users are created
  in the `services` project with admin roles.
  They are used to authenticate requests in middleware,
  rather than requiring that each request by middleware
  be validated using the Keystone admin token
  as was done in Release 5.1.

- Some Nailgun URLs are not protected;
  they are defined in *nailgun/middleware/keystone.py*
  in the public_url section.

- The authentication token does not expire for 24 hours
  so it is not necessary to store the username and password in
  the browser cache.

- A cron script runs daily in the Keystone container
  to delete outdated tokens
  using the **keystone-manage token_flush** command.
  It can be seen using the **crontab -l** command
  in the Keystone container.

- Support for storing authentication token in cookies
  is added in releases 5.1.1 and 6.0;
  this allows the API to be tested from the browser.

- The **keystonemiddleware** python package replaces
  the deprecated **keystoneclinet.middleware** package;
  this is an internal change that makes the implementation more stable.
  All recent fixes and changes are made to **keystonemiddleware**;
  which was extracted from **keystoneclinet.middleware**
  in earlier releases.

Beginning with releases 5.1.1 and 6.0,
the user must supply a password
when upgrading Fuel from an earlier release.
This password can be supplied on the command line
when running the installation script
or in response to the prompt (this is the same password
that is used to access Fuel UI).
