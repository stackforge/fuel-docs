.. index:: HowTo: Changing upstream DNS server

.. _change-upstream-dns-op:

HowTo: Changing upstream DNS server
===================================


Fuel by default configures all deployed nodes to use the Fuel
master node as dns server. The fuel master node is running
dnsmasq to provide dns services, the default upstream dns
server is 8.8.8.8 but can be changed while deploying the Fuel
master node or after deployment. The following steps show
how to change the upstream dns server after deployment:


#. On the fuel master node get a shell inside cobbler container
   ::
   dockerctl shell cobbler

#. Edit the file /etc/dnsmasq.upstream change "nameserver 8.8.8.8" to your preferred upstream dns server
   ::
   vi /etc/dnsmasq.upstream

#. Exit the docker container (No need to restart dnsmasq)
   ::
   exit

