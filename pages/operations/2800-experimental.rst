
.. _experimental-features-op:

Enable Experimental Features
============================

Beginning with Fuel 5.1,
:ref:`experimental features<experimental-features-term>`
are disabled by default.
Experimental features provide useful functionality
but may not be mature enough to be appropriate
for environments that require high levels of stability.

To enable experimental features,
execute the following on a running Fuel Master node.
You should do this before
:ref:`creating<create-env-ug>` and
:ref:`configuring<configure-env-ug>` your environment
if you want to have access to Experimental features
during those phases,
or after you have deployed your cloud
if you want to access the experimental features post-deployment.
You can also enable Experimental Features
after you :ref:`upgrade<upgrade-patch-top-ug>` your Fuel Master to 5.1.

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

- Restart the :ref:`nailgun-term` container with dependencies by running:
  ::

    dockerctl restart nailgun
    dockerctl restart nginx
    cobbler sync

For more details about configuring nailgun settings
see `Extending OpenStack Settings
<http://docs.mirantis.com/fuel-dev/develop/nailgun/customization/settings.html>`_.

Alternatively, you can build a custom ISO
with the experimental features enabled:
::

    make FEATURE_GROUPS=experimental iso


