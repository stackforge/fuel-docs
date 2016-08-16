.. _one-network:

Configure a single network topology
-----------------------------------

Fuel supports a single network configuration where one network interface is
responsible for all OpenStack traffic. This configuration is common in the
proof of concept deployments where no additional network interfaces are
available.

**To configure a single network:**

#. Save `network template for one network
   </./../network_templates/one_network.yaml>`_
   as ``network_template_<env id>.yaml``.

#. Upload the network template by typing:

   ::

    # fuel network-template --upload --env <env id>

#. Deploy the OpenStack environment.
#. Allocate the correct floating IP pool to the network.

   #. Clear the gateway from `router04`.
   #. Delete the `admin_floating_net__subnet` subnet.
   #. Create a new subnet with the floating IP pool from the single network.
   #. Set gateway on `router04`.
