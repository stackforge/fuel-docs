.. _enable-experimental-features:

Enable experimental features
----------------------------

Experimental features provide useful functionality, but may not be mature
enough for environments that require high levels of stability. By default,
experimental features are disabled. You can enable experimental features
during the installation of the Fuel Master or anytime later.

**To enable experimental features:**

#. Log in to the Fuel Master node CLI.
#. Open the ``/etc/fuel/astute.yaml`` file for editing.
#. Add ``experimental`` to the ``feature_groups`` section.

   **Example:**

   ::

     "FEATURE_GROUPS":
     - experimental

#. Apply the Nailgun Puppet manifest by typing:

   ::

     puppet apply /etc/puppet/modules/fuel/examples/nailgun.pp
