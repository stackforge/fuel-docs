
.. _experimental-features-term:

Experimental features
---------------------

Experimental features provide functionality
that may be useful to some customers
but has not been subjected to the rigorous testing
that is required for environments
that need high levels of stability.
The following technologies are currently defined as experimental:

- Zabbix

Beginning with Fuel 5.1,
experimental features are disabled by default.
To enable them on a running Fuel Master node:

- Manually modify the */etc/fuel/version.yaml* file
  to add "experimental" to the "feature_groups" list
  in the "VERSION" section.
  For example:
  ::

    VERSION:
      ...
      feature_groups:
        - mirantis
        - experimental

- Restart the :ref:`nailgun-term` server by running:
  ::

    dockerctl shell nailgun
    supervisorctl restart


