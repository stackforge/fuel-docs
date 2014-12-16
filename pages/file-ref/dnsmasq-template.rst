
.. raw:: pdf

   PageBreak


.. _dnsmasq-template-ref:

dnsmasq.template
----------------

Fuel Master Node:
**/etc/cobbler/dnsmasq.template**

The *dnsmasq.template* file defines the DHCP networks
used for :ref:`Multiple Cluster Networks<mcn-term>`.
The networks listed here must match
the `fuelweb_admin` networks that are defined in Fuel.

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

   dhcp-range=<name>,<start-IP-addr>,<end-IP-addr>,<netmask>,[<leasetime>]
   dhcp-option=net:<name>,option:router,<IP-addr-of-gateway>
   dhcp-boot=net:<name>,pxelinux.0,boothost,<Fuel-Master-IP-addr>

:env-name:   Unique name of this network in **dnsmasq**

:start-IP-addr:    Starting IP address of DHCP range

:end-IP-addr:	Ending IP address of DHCP range

:netmask:	Netmask for DHCP network

:leasetime:     DHCP lease time; default value is 60 minutes

:IP-addr-of-gateway:   IP address of gateway (router) in the network segment

:Fuel-Master-IP-addr:   IP address of the Fuel Master node

For example:

.. code-block:: sh

   dhcp-range=alpha,10.110.1.68,10.110.1.127,255.255.255.192,120m
   dhcp-option=net:alpha,option:router,10.110.1.65
   dhcp-boot=net:alpha,pxelinux.0,boothost,10.110.0.2

The network must forward the DHCP packets for the other logical
networks that are defined in the
:ref:`network_1.yaml<network-1-yaml-ref>` file.
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

