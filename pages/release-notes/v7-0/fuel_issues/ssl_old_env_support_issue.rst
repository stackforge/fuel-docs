* Mirantis OpenStack 6.1 environments do not support HTTPS connection
  to the Fuel Master node. As a workaround, do not enforce SSL
  connection by making sure that the ``force_https`` parameter
  is set to ``false`` in the ``/etc/fuel/astute.yaml`` file.
  The ``false`` value is a default one. Do not change it to ``true``
  If you have an environment older than 7.0.

  Sample::

     SSL:
     force_https: false

  See `LP1497271 <https://bugs.launchpad.net/fuel/+bug/1497271>`_.
  See also :ref:`tls-ssl-ops`.
