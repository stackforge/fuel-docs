.. _sysreq_fuel_master_node_network_reqs:

Fuel Master Node network requirements
-------------------------------------

To deploy the Fuel Slave nodes on which you will run your Controller,
Compute, Storage or other nodes, the Fuel Master node must have access to the
Internet.

When you deploy the Fuel Slave nodes, the Fuel Master node connects to the
preconfigured repositories through the Internet and installs the selected
operating system and the OpenStack packages on the nodes.

For security reasons, you may not want to connect the Fuel Master node to
the Internet. In this case, set up a local repository with the required
installation packages and configure these repositories on the Fuel Master
node.

.. warning:: You can run only one Fuel Master node in a network set, or the
             product will behave unexpectedly.

.. seealso::

    - :ref:`upgrade_local_repo`
