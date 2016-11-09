.. _debug-mode:

==========================================
Enable debug mode for an OpenStack service
==========================================

Most OpenStack services use the same configuration options to enable the
debug logging that is also used to troubleshoot your OpenStack environment.

**To enable the debug mode for an OpenStack service:**

#. Log in to each controller node.
#. Locate and open the required OpenStack service configuration file in the
   ``/etc`` directory, for example, ``/etc/nova/nova.conf``.
#. In the ``DEFAULT`` section, change the value for the ``debug`` parameter
   to ``True``:

   .. code-block:: ini

    debug = True

   If the configuration file that you edit contains the ``use_syslog``
   parameter, change its value to ``False``:

   .. code-block:: ini

    use_syslog = False

   Disabling syslog will protect the Fuel Master node from overloading debug
   messages.

#. Save the changes.
#. The following services require additional configuration to enable the debug
   mode:

   * For Cinder, edit the configuration file on *each node with Cinder role*.
   * For Glance, edit two configuration files: ``/etc/glance/glance-api.conf``
     and ``/etc/glance/glance-registry.conf``.
   * For Ironic, edit the ``/etc/nova/nova.conf`` file of the ``nova-compute``
     service configured to work with Ironic.

#. Restart the service. See :ref:`restart-service`.

.. caution:: Remember to revert the original values in the OpenStack service
             configuration file when troubleshooting is done.
