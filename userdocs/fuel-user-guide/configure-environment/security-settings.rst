
.. raw:: pdf

  PageBreak

.. _security-settings-ug:

Configure security settings
---------------------------

You can configure security settings using the :guilabel:`Settings` tab
of the Fuel web UI.

**To configure security settings:**

#. In the Fuel web UI, click the :guilabel:`Settings` tab.
#. Open the :guilabel:`Security` panel.
#. Select a setting described below and modify as needed.

   .. list-table:: **Security settings**
      :widths: 10 25
      :header-rows: 1

      * - Section
        - Setting with description
      * - **Public TLS**
        - * TLS for OpenStack public endpoints
             Enables TLS termination on HAProxy for OpenStack services.

          * HTTPS for Horizon
             Secures access to Horizon enabling HTTPS instead of HTTP.
      * - **SSH security**
        - * Restrict SSH service on network
             When enabled, provide at least one working IP address
             (the Fuel Master node IP is already added).
             Add new addresses instead of replacing the provided
             Fuel Master node IP.
             When disabled (by default), the admin, management, and storage networks
             can connect only to the SSH service.

          * Restrict access to
             The option sets access restriction to the specified range of IP addresses.

          * Brute force protection
             Grants access from all networks (except the provided ones),
             but Fuel checks the networks against the brute force attack.
