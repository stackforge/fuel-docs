====================================================
Creation of targeted diagnostic snapshots with Timmy
====================================================

Replaced Shotgun with Timmy, a diagnostic utility for OpenStack environments
that simplifies and optimizes OpenStack troubleshooting.

Timmy enables you to create a diagnostic snapshot of your OpenStack
environment through CLI depending on your needs:

* Gather logging information from a single node or a subset of nodes
  filtered by an assigned role or a service running on the node.
* Designate the time frame which logging information should cover.
* Specify services, the logging information of which to be included into
  a snapshot.
* Specify a folder or a list of folders from where logging information
  should be retrieved, filter the logging files included in that folders
  by date and time, and include this logging information into the diagnostic
  snapshot.

See :ref:`create-snapshot` | `blueprint <https://blueprints.launchpad.net/fuel/+spec/shotgun-retirement>`__