
.. _dns-ntp-support-ug:

Change the DNS and NTP server settings
--------------------------------------

If the Fuel Master node does not have access to the Internet
or if you plan to disable Internet access after deployment, you
may want to change the NTP and DNS servers for the nodes and omit
routing through the Fuel Master node.

**To change the DNS and NTP server settings:**

#. In the Fuel web UI, click the guilabel:`Networks` tab.
#. Click :guilabel:`Other`.
#. Type the DNS server IP address or NTP server IP address or FQDN.
#. Click :guilabel:`Save Settings`.

   .. note::
      Fuel does not verify if the specified DNS and NTP services are
      available. Verify that you specify correct values.
