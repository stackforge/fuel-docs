* There are several packages that do not get updated during
  the Fuel upgrade process. On the Fuel Master node, run
  ``yum -y update`` to install Mirantis OpenStack 7.0 system
  packages. Note there are approximately 190 packages to update,
  and it will take several minutes to complete. You will need to
  restart your Fuel Master host in order to apply the kernel update.
  See also `LP1496762 <https://bugs.launchpad.net/fuel/+bug/1496762>`_.
