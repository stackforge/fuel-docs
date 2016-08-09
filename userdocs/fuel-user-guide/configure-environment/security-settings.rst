
.. raw:: pdf

  PageBreak

.. _security-settings-ug:

Configure security settings
---------------------------

Fuel web UI enables configuring security settings in the :menuselection:`Settings` tab.
You can configure:

* :guilabel:`Public TLS`
* :guilabel:`SSH security`

In the :guilabel:`Public TLS` section, you can enable the following options:

* :guilabel:`TLS for OpenStack public endpoints`

  .. note:: Enables TLS termination on HAProxy for OpenStack services

* :guilabel:`HTTPS for Horizon`

  .. note:: Secure access to Horizon enabling HTTPS instead of HTTP

In the :guilabel:`Public TLS` section, you can enable the following options:

* :guilabel:`Restrict SSH service on network`

  .. note::

     When enabled, provide at least one working IP address (the Fuel Master node IP is already added).
     Add new addresses instead of replacing the provided Fuel Master node IP.
     When disabled (by default), the admin, management, and storage networks can connect only to the SSH service.

* :guilabel:`Restrict access to`

  .. note:: The option set an access restriction to the specified range of IP addresses.

* :guilabel:`Brute force protection`

  .. note::

     The enabled option grants the access from all networks (except the provided ones),
     but Fuel will check the networks against the brute force attack.


**To configure security settings:**

#. In the Fuel web UI, click the :menuselection:`Settings` tab.
#. Select the :guilabel:`Security` section.
#. Select a setting and modify as needed.
