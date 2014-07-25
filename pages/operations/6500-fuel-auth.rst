
.. _fuel-passwd-ops:

Fuel Access Control
===================

Access to the Fuel Dashboard is controlled
in Mirantis OpenStack 5.1 and later.
Authentication is under control of :ref:`keystone-term`.

The default username/password is admin/admin.
This can be changed:

- During Fuel installation; see :ref:`fuel-passwd-ug`.

- From the main Fuel UI screen; see :ref:`start-create-env-ug`.

- Using the Fuel CLI; see :ref:`cli-fuel-password`

Most endpoints (including
The :ref:`astute-term`, :ref:`cobbler-term`,
Postgres, MCollective, and :ref:`keystone-term` endpoints
that used to be protected with the default password
are now protected by passwords
that are unique for each Fuel installation.
Nailgun and OSTF were not protected in earlier releases
but are now protected by the authentication token.
Some Nailgun URLs are not protected;
they are defined in *nailgun/middleware/keystone.py* in the public_url section.

The password is stored in the *astute.yaml* file
and in the */etc/fuel/client/config.yaml* file.

Keystone is installed in a new container
during the Fuel Master installation.
Almost all endpoints in Fuel are protected
and they require an authentication token.

If the password is changed using the Fuel UI or the Fuel CLI,
the new password is stored only in Keystone;
it is not written to any file.
If you forget the password,
you can change it
by using the **keystone** command on the Fuel Master Node:

::

  keystone --os-endpoint=http://10.20.0.2:35357/v2.0 --os-token=admin_token password-update


You can find admin_token in the */etc/fuel/astute.yaml* file.

.. Warning::

  The password must be changed in the */etc/fuel/astute.yaml* file
  or it will not be possible to run the upgrade process.
  You can do this either by editing this file directly
  or by changing the password in the Fuel Setup screens.


To run or disable authentication,
modify */etc/nailgun/settings.yaml* (``AUTHENTICATION_METHOD``)
in the Nailgun container.

