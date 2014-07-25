
.. _fuel-passwd-ops:

Fuel Access Control
===================

Access to the Fuel Dashboard is controlled
in Mirantis OpenStack 5.1 and later.
Authentication is under control of :ref:`keystone-term`.

The default user/password is admin/admin.
This can be changed:

- During Fuel installation; see :ref:`fuel-passwd-ug`.

- From the main Fuel UI screen; see :ref:`start-create-env-ug`.

- Using the Fuel CLI; see :ref:`cli-fuel-password`

- By editing the *astute.yaml* file.

Most endpoints (including astute, cobbler, postgres, mcdirective,
keystone, nailgun and OSTF) are protected
and require the authentication token.
The endpoints that are not protected
are defined in *nailgun/middleware/keystone.py* in the public_url section.

The password and the admin_token
are stored in the *astute.yaml* file
and in the */etc/fuel/client/config.yaml* file.

Keystone is installed in new container during master installation.
Almost all endpoints in fuel are protected
and they required authentication token.

If the password is changed using the Fuel UI or the Fuel CLI,
the new password is stored only in keystone;
it is not written to any file.
If you forget the password,
you can change it and the admin_token
by using the keystone client on the Fuel Master Node:

::

  keystone --os-endpoint=http://10.20.0.2:35357/v2.0 --os-token=admin_token password-update
    

.. Warning::

  The password must be changed in the */etc/fuel/astute.yaml* file
  or it will not be possible to run the upgrade process.
  You can do this either by editing this file directly
  or by changing the password in the Fuel Setup screens.


To run or disable authentication,
we should change /etc/nailgun/settings.yaml (AUTHENTICATION_METHOD)
in the nailgun container.

