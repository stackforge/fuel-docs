.. _sysreq_fuel_master_node_network_reqs:

Fuel Master Node network requirements
-------------------------------------

To deploy the Fuel Target nodes on which you will run your Controller,
Compute, and Storage nodes, the Fuel Master node must have access to the
Internet. The software repositories are preconfigured on the Fuel Master node.

When you deploy the Fuel Target nodes, the Fuel Master node connects to the
pre-configured repositories through the Internet and installs the selected
operating system and the OpenStack packages on the nodes.

For security reasons, you may not want to connect the Fuel Master node to
the Internet. In this case, set up a local repository with the required
installation packages and configure these repositories on the Fuel Master
node. 

.. seealso::

   - :ref:`Set up a local repository`
