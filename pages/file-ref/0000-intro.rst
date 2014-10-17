
.. raw:: pdf

   PageBreak

.. _file-reference:

Fuel File Reference Pages
=========================

This section provides reference pages
for select configuration files that Fuel uses.

.. warning::  Be very careful when modifying the configuration files.
   A simple typo when editing these files
   may severely damage your environment.

   When you modify the YAML files,
   you will receive a warning
   that some attributes were modified from the outside.
   Some features may become inaccessible
   from the  UI after you do this.

These pages are under development;
the information presented here has been reviewed
but may not be complete.

+-------------------------------+-------------+-------------------------------+
| File                          | Node        | Description                   |
+===============================+=============+===============================+
| :ref:`astute-yaml-master-ref` | Fuel Master | Configuration attributes      |
|                               |             | passed to :ref:`puppet-term`  |
+-------------------------------+-------------+-------------------------------+
| :ref:`astute-yaml-target-ref` | Target      | Configuration attributes      |
|                               |             | passed to Puppet              |
+-------------------------------+-------------+-------------------------------+
| :ref:`engine-yaml-ref`        | Fuel Master | Provisioning engine (Cobbler) |
|                               |             | and basic configuration of    |
|                               |             | target nodes                  |
+-------------------------------+-------------+-------------------------------+
| :ref:`openstack-yaml-ref`     | Fuel Master | Basic configuration of target |
|                               |             | nodes                         |
+-------------------------------+-------------+-------------------------------+
| :ref:`settings-yaml-ref`      | Fuel Master | Information from "Settings"   |
|                               |             | tab on UI                     |
+-------------------------------+-------------+-------------------------------+
|                               |             |                               |
+-------------------------------+-------------+-------------------------------+

.. include:: /pages/file-ref/astute-yaml-master.rst
.. include:: /pages/file-ref/astute-yaml-target.rst
.. include:: /pages/file-ref/engine-yaml.rst
.. include:: /pages/file-ref/openstack-yaml.rst
.. include:: /pages/file-ref/settings-yaml.rst


