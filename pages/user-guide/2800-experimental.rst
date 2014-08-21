
.. _experimental-features-ug:

Enable Experimental Features (Optional)
=======================================


Beginning with Fuel 5.1,
:ref:`experimental features<experimental-features-term>` are disabled by default.
Experimental features provide useful functionality
but may not be mature enough to be appropriate
for environments that require high levels of stability.

To enable experimental features on a running Fuel Master node:

- Log into your Fuel Master console as *root*.

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

- Restart the :ref:`nailgun-term` web server by running:
  ::

    dockerctl shell nailgun
    supervisorctl restart nailgun

For more details about configuring nailgun settings
see `Extending OpenStack Settings
<http://docs.mirantis.com/fuel-dev/develop/nailgun/customization/settings.html>`_.

