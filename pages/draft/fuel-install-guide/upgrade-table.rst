
.. _upgrade-table:

Fuel upgrade table
==================

* If you are running Fuel 4.x or earlier, you cannot upgrade to 7.0.
* If you are running Fuel 5.x, you cannot upgrade *directly* to 7.0.
  You will need to upgrade from 5.x to 6.x first, and then you can
  upgrade to 7.0.
* If you are running Fuel 6.x, you can upgrade to Fuel 7.0.

The following table summarizes the available progressions
for upgrades of the Fuel Master node:

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
|                      | then to 7.0            | 2014.2.2-6.1             |
|                      |                        | 2015.x-7.0               |
+----------------------+------------------------+--------------------------+

.. note::

    *  Fuel 7.0 can only deploy 7.0 environments.

    *  Fuel 7.0 can manage environments deployed with Fuel 6.x provided that
       the Fuel Master node was upgraded to 7.0 rather than freshly installed.
       You can always check environment versions that you can manage on the
       "Releases" tab of your Fuel web UI.
