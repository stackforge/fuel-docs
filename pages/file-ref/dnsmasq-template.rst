
.. raw:: pdf

   PageBreak


.. _dnsmasq-template-ref:

dnsmasq.template
----------------

Fuel Master Node:
**/etc/cobbler/dnsmasq.template**

The *dnsmasq.template* file defines the DHCP networks
that configure additional Fuel (PXE) networks
when multiple cluster networks are configured.

Usage
~~~~~

#. Log into the cobbler :ref:`docker-term` container:
   ::

     dockerctl shell cobbler

#. Edit file.
   ::

     vi /etc/cobbler/dnsmasq.template

#. Rebuild the dnsmasq configuration and reload it:
   ::

     cobbler sync


#. Exit the Cobbler docker container:
   ::

     exit

File Format
~~~~~~~~~~~

Each fuelweb_admin network must be defined in this file:

.. code-block:: sh

   dhcp-range=<env-name>,<IP-addr-range>
   dhcp-option=net:<env-name>,option:router,<IP-addr-of-gateway>
   dhcp-boot=net:<env-name>,pxelinux.0,boothost,<Fuel-Master-IP-addr>

:env-name:   Unique name of this network in **dnsmasq**

:IP-addr-range:

:IP-addr-of-gatewar:   IP address of gateway (router) in the network segment

:Fuel-Master-IP-addr:   IP address of the Fuel Master node

For example:

.. code-block:: sh

   dhcp-range=alpha,10.110.1.68,10.110.1.127,255.255.255.192
   dhcp-option=net:alpha,option:router,10.110.1.65
   dhcp-boot=net:alpha,pxelinux.0,boothost,10.110.0.2

The network must forward the DHCP packets for the other logical
networks that are defined in the
:ref:`network_1.yaml<network-1-yaml-ref>` file.
On most routers, this is done using a DHCP or BOOTP protocol.
It is also possible to set up a proxy using
the Linux **dhcp-helper** program
so that the target nodes can boot.

Note that the *dnsmasq.template* file is managed
by :ref:`Puppet<puppet-term>`
so all changes are overwritten/removed when the Puppet container is restarted
or the Fuel Master node is rebooted.


See also
~~~~~~~~

- :ref:`mcn-ops`

- :ref:`mcn-arch`

- :ref:`network_1.yaml<network-1-yaml-ref>`

