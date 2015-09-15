* Deployment of Murano with detached services (e.g. Database, Keystone,
  RabbitMQ) will fail with an error message similar to the
  following one::

     Could not set 'file' on ensure: No such file or directory

  Currently, Murano works only in the standard reference architecture
  -- all-in-one Controller.
  See `LP1491334 <https://bugs.launchpad.net/bugs/1491334>`_.
