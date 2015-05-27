
.. _cinder-rn:

OpenStack Block Storage (Cinder)
--------------------------------

Resolved Cinder Issues
+++++++++++++++++++++++


Known Cinder Issues
++++++++++++++++++++

* It is impossible to get to know whether a volume has any
  dependent snapshots. Neither :command:`cinder list` command
  nor :command:`cinder show` command does show snapshot list
  or details. This is unacceptable for a user, as Cinder, for
  example, does not allow deletion of the volume with a dependent
  snapshot. See `LP1405862`_.


.. Links
.. _`LP1405862`: https://bugs.launchpad.net/mos/6.1.x/+bug/1405862
