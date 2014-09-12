
.. _syslog-ug:

Configuring syslog
++++++++++++++++++

Fuel deploys the OpenStack environment to use
the standard Linux **syslog** facility
to log the activity of all services.
By default, **rsyslog** is configured
to use the Fuel Master node as the remote syslog server
that contains all logs generated on all nodes in the environment.

If you prefer to use an external server for rsyslog,
specify the IP address and port number in this field:

.. image:: /_images/user_screen_shots/syslog.png
   :width: 80%

See :ref:`logs-top-tshoot` for more details.

