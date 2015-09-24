* Mirantis OpenStack 6.1 environments do not support HTTPS connection
  to the Fuel Master node. As a workaround, do not enforce SSL
  connection by making sure that the ``force_https`` parameter
  is set to ``false`` in the ``/etc/fuel/astute.yaml`` file.

  Sample::

     SSL:
     force_https: true

  See `LP1497271 <https://bugs.launchpad.net/fuel/+bug/1497271>`_.
  See also :ref:`tls-ssl-ops`.
