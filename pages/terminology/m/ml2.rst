
.. _ml2-term:

ML2
---

The ML2 (Modular Layer 2) plug-in
is a framework that allows OpenStack Neutron networking
to simultaneously utilize a variety of Layer 2 networking technologies.
Fuel 5.1 and later releases support ML2 drivers.

Two types of ML2 drivers can be implemented:

- **type drivers** each manage one network type.
  They manage type-specific network state information,
  validate the network, and allocate tenant networks.
  Network types that are currently supported
  include local, flat, vlan, gre, and vxlan.

- **mechanism drivers** manage network mechanisms.
  They create, update, and delete network and port resources.
  Two methods are exposed for each action:

  - ACTION_RESOUCE__precommit -- called within the context
    of the database transaction
    to validate the action being taken
    and modify the mechanism driver's private database.
    This method cannot communicate with anything outside Neutron
    because it should not block.
  - ACTION_RESOURCE_postcommit -- called after the database transaction
    is complete
    to push the resource change to the entity
    that is responsible for applying that change.
    For example, it pushes the change to an external network controller
    that updates the network resources.

For more information, see:

- :ref:`ml2-create-ops` gives instructions for implementing
  an ML2 driver.

- Richard Boswell's `article <http://www.revolutionlabs.net/2013/11/part-2-how-to-install-openstack-havana_15.html>`_
  includes a detailed example of implementing an ML2 driver;
  look for the "ML2 Configuration" section about half-way through the article.

- `Neutron/ML2 Wiki <https://wiki.openstack.org/wiki/Neutron/ML2>`_
  gives an overview of ML2.


