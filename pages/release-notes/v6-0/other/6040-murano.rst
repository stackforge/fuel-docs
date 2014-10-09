
.. _murano-rn:

Application Catalog System (Murano)
-----------------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Murano no longer changes deployment status to "successful" when Heat stack failed.
  See `LP1353589 <https://bugs.launchpad.net/bugs/1353589>`_.

* Deployment no longer hangs in the **Agent task**
  execution stage.
  See `LP1383360 <https://bugs.launchpad.net/bugs/1383360>`_.

* Murano is now present in Keystone service list.
  See `LP1362037 <https://bugs.launchpad.net/bugs/1362037>`_.

* RabbitMQ now handles Murano users correnctly
  and so no longer loses Murano users
  when the Primary Controller in an HA cluster is shut down.
  See `LP1372483 <https://bugs.launchpad.net/fuel/+bug/1372483>`_.

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

* Murano requires the Neutron network type.
  If you choose nova-network as the network type during deployment,
  the option to install the Murano project is greyed out.
  This is a design decision made by the OpenStack community;
  it allows us to focus our efforts on Neutron,
  and we see little demand for Murano support on Nova-network.


