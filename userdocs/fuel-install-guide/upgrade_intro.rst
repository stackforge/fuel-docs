.. _upgrade_intro:

============
Upgrade Fuel
============

You can upgrade the Fuel Master node to the latest Fuel version.

The following table describes available upgrades for the Fuel software:

+----------------------+------------------------+--------------------------+
| Initial Fuel version | Fuel is upgraded to    | Upgraded Fuel can manage |
+======================+========================+==========================+
| 5.0                  | 5.1, then to 5.1.1,    | 2014.1-5.0               |
|                      | then to 6.0            |                          |
|                      |                        | 2014.1.1-5.0.2           |
|                      |                        |                          |
|                      |                        | 2014.1.1-5.1             |
|                      |                        |                          |
|                      |                        | 2014.1.3-5.1.1           |
|                      |                        |                          |
|                      |                        | 2014.2-6.0               |
+----------------------+------------------------+--------------------------+
| 5.0                  | 5.0.1, then to 5.1,    | 2014.1-5.0               |
|                      |                        |                          |
|                      | then to 5.1.1          | 2014.1.1-5.0.1           |
|                      |                        |                          |
|                      | then to 6.0            | 2014.1.1-5.0.2           |
|                      |                        |                          |
|                      |                        | 2014.1.1-5.1             |
|                      |                        |                          |
|                      |                        | 2014.1.3-5.1.1           |
|                      |                        |                          |
|                      |                        | 2014.2-6.0               |
+----------------------+------------------------+--------------------------+
| 5.0.1                | 5.1, then to 5.1.1     | 2014.1.1-5.0.1           |
|                      |                        |                          |
|                      | then to 6.0            | 2014.1.1-5.0.2           |
|                      |                        |                          |
|                      |                        | 2014.1.1-5.1             |
|                      |                        |                          |
|                      |                        | 2014.1.3-5.1.1           |
|                      |                        |                          |
|                      |                        | 2014.2-6.0               |
+----------------------+------------------------+--------------------------+
| 5.1                  | 5.1.1, then to 6.0     | 2014.1.1-5.1             |
|                      |                        |                          |
|                      |                        | 2014.1.3-5.1.1           |
|                      |                        |                          |
|                      |                        | 2014.2-6.0               |
+----------------------+------------------------+--------------------------+
| 6.0                  | 6.1, then apply all 6.1| 2014.2.6.0               |
|                      | updates, then to 7.0   | 2014.2.2-6.1             |
|                      |                        | 2015.x-7.0               |
|                      |                        |                          |
|                      |                        |                          |
|                      |                        |                          |
+----------------------+------------------------+--------------------------+
| 6.1                  | Apply all 6.1 updates, | 2014.2-6.0               |
|                      |                        |                          |
|                      | then to 7.0            | 2014.2.2-6.1             |
|                      |                        |                          |
|                      |                        | 2015.x-7.0               |
|                      |                        |                          |
+----------------------+------------------------+--------------------------+
| 7.0                  | Apply all 7.0 updates, | 2014.2.2-6.1             |
|                      |                        |                          |
|                      | then to 8.0            | 2015.1.0-7.0             |
|                      |                        |                          |
|                      |                        | liberty-8.0              |
+----------------------+------------------------+--------------------------+

This section includes the following topics.

.. toctree::
   :maxdepth: 3

   upgrade/upgrade-internals
   upgrade/backup-fuel
   upgrade/restore-fuel
   upgrade/upgrade-fuel
   upgrade/upgrade-local-repo
   upgrade/upgrade-apply-patches

.. note:: Fuel does not support upgrades for plugins. The old plugin
          versions may not be compatible with the new version of Fuel.
          Therefore, you must uninstall the Fuel plugins before
          upgrading Fuel. See :ref:`plugins_upgrade_uninstall_plugin`.
