* High Availability (HA) will fail if a node runs out of RAM and swap
  memory, because Pacemaker resources will not
  migrate from the affected node.
  The recommendation is to employ
  external monitoring along with STONITH.
  See `LP11422186 <https://bugs.launchpad.net/bugs/1422186>`_.
