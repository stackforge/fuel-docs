* Sometimes, a RabbitMQ node cannot restart after a failover because of
  a hanging epmd process.

  To solve the problem, proceed with the following:

  #. if Murano is installed in your environment, stop its RabbitMQ
     by running::

       service rabbit-server-murano stop

  #. find the emd process's pid::

       px aux | grep epmd

  #. kill this process::

      kill <epmd pid>

     If epmd does not finish, run::

      kill -s 9 <epmd pid>

  #. if Murano is installed in your environment, start its RabbitMQ
     by running::

       service rabbit-server-murano start

  After you perform the steps above, Pacemaker will successfully start
  the RabbitMQ node.

  See `LP1467024 <https://bugs.launchpad.net/fuel/+bug/1467024>`_.
