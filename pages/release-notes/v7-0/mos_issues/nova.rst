
.. _nova_rn_7.0:

Nova
----

Resolved issues
+++++++++++++++

* When one of memcahced servers is rebooted, all tokens it holds
  are lost. In that case, an `admin` token that `neutronclient`
  holds becomes invalid.
  The ``token_endpoint.Token`` plugin used by Nova, does not
  make an attempt to get a new token from Keystone in case of
  401 errors.
  To fix this, identity.v2.Password is now used by neutronclient.
  The `auth_plugin` option is specified in `nova.conf`:

  .. code-block: ini
     :linenos:

     [neutron]
     auth_plugin=v2password

  See `LP1486503`_.

.. Links
.. _`LP1486503`: https://bugs.launchpad.net/fuel/+bug/1486503
