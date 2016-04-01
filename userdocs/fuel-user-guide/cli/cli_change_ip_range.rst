
.. _cli_change_ip_range:


Add network ranges
------------------

To add network ranges, edit the network configuration file:
add the IP network range to ``ip_ranges`` and change
``notation`` from ``cidr`` to ``ip_ranges``.

Step-by-step:

#. On the Fuel Master node, download the network configuration file::

      fuel network --env <ENV-ID> -d

   where <ENV_ID> is the ID of the environment (a number) that you can
   get by issuing the ``fuel env`` command.

   For example::

      fuel network --env 1 -d

#. Open the downloaded **/root/network_<ENV-ID>.yaml** file for editing.
#. Add your list of IP network ranges under the ``ip_ranges``
   parameter.

   Sample::

      ip_ranges:
      - - 192.168.0.1
        - 192.168.0.90
      - - 192.168.0.100
        - 192.168.0.254

#. In the same network configuration file, change ``notation: cidr``
   to ``notation: ip_ranges``.

   Sample::

      meta:
        cidr: 192.168.0.0/24
        configurable: true
        map_priority: 2
        name: management
        notation: ip_ranges
        render_addr_mask: internal

#. Upload the edited network configuration file::

      fuel network --env <ENV-ID> -u
