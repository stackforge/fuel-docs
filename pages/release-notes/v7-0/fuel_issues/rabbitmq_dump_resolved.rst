* RabbitMQ can now keep non-default ``users/vhosts/etc``
  after a failover. You will need to use the dump_rabbit_definitions
  task to back up the non-default definitions (``users/vhosts/etc``)
  See `LP1383258 <https://bugs.launchpad.net/fuel/+bug/1383258>`_.
