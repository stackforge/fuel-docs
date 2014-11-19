
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

  keystone --os-endpoint=http://<your_master_node>:35357/v2.0 --os-token=admin_token password-update

The default value of <your_master_node> is 10.20.0.2.
The port number does not change.

**admin_token** is stored in the */etc/fuel/astute.yaml* file
on the Fuel Master node.

To run or disable authentication,
modify */etc/nailgun/settings.yaml* (``AUTHENTICATION_METHOD``)
in the Nailgun container.

All endpoints except the agent updates and version endpoint
are protected by an authentication token,
obtained from Keystone by logging into Fuel
as the `admin` user and the appropriate password.

Services such as :ref:`astute-term`, :ref:`cobbler-term`,
Postgres, MCollective, and :ref:`keystone-term`,
which used to be protected with the default password,
are now each protected by a user/password pair
that is unique for each Fuel installation.

Fuel Authentication is implemented
by a dedicated Keystone instance
that is installed in a new container
on the Fuel Master during installation:

- Fuel Menu generates passwords for fresh installations;
  the upgrade script generates passwords when upgrading.
  The password is stored in the Keystone database.

- Some Nailgun URLs are not protected;
  they are defined in *nailgun/middleware/keystone.py*
  in the public_url section.

- A cron script runs daily in the Keystone container
  to delete outdated tokens
  using the **keystone-manage token_flush** command.
  It can be seen using the **crontab -l** command
  in the Keystone container.

- Support for storing authentication token in cookies
  is added in release 5.1.1;
  this allows the API to be tested from the browser.

Beginning with release 5.1.1,
the user must supply a password
when upgrading Fuel from an earlier release.
This password can be supplied on the command line
when running the installation script
or in response to the prompt (this is the same password
that is used to access Fuel UI).
See :ref:`upgrade-ug` for instructions.
