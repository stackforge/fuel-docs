
.. _nova_rn_7.0:

Nova
----

Known issues
+++++++++++++++

* Due to the problem with scheduler's caching, in small environments,
  an attemt to launch a batch of identical instances fails with
  *No valid host was found* error.
  Launching a single instance after that generates the same error.
  Restarting `nova-scheduler` service solves the problem.
  See `LP1461537`_.


Resolved issues
+++++++++++++++

* When one of the memcached servers is rebooted, all the tokens it holds
  are lost. In that case, an `admin` token that `neutronclient`
  holds becomes invalid.
  The ``token_endpoint.Token`` plugin used by Nova does not
  attempt to get a new token from Keystone in case of
  401 errors.
  To fix this, identity.v2.Password is now used by `neutronclient`.
  The ``auth_plugin`` option is specified in `nova.conf`:

  .. code-block:: ini

     [neutron]
     auth_plugin=v2password

  See `LP1486503`_.

.. Links
.. _`LP1486503`: https://bugs.launchpad.net/fuel/+bug/1486503
.. _`LP1461537`: https://bugs.launchpad.net/mos/7.0.x/+bug/1461537
