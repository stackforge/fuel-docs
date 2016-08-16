.. _two-networks:

Configure the two-network topology
----------------------------------

Fuel supports two-network configuration where one network is
dedicated for PXE traffic and another network for
all other traffic.

**To configure a two-network topology:**

1. Create a new network for all non-PXE traffic:

   ::

    # fuel network-group --create --name everything --cidr <cidr>
    --gateway <gateway> --nodegroup <nodegroup>

2. Set the ``render_addr_mask`` parameter to `internal` for this network by
   typing:

   ::

    # fuel network-group --set --network 39 --meta '{"name":
    "everything", "notation": "cidr", "render_type": null, "map_priority": 2,
    "configurable": true, "use_gateway": true, "render_addr_mask":
    "internal", "vlan_start": null, "cidr": "10.108.31.0/24"}'

   This parameter is required by the Fuel library. The Fuel library requires
   a value called ``internal_address`` for each node.
   This value is set to the node's IP address from a network group which has
   ``render_addr_mask`` set to `internal` in its metadata. Therefore, update
   ``render_addr_mask`` for this network.

3. Save `network template for two networks
   </./../network_templates/two_networks.yaml>`_
   as ``network_template_<env id>.yaml``.

   .. note::
      Verify that ``nic_mapping`` matches your configuration.

4. Upload the network template by typing:

   ::

    # fuel network-template --upload --env <env id>

5. Deploy the environment.
6. After Fuel completes the deployment, verify that only one bridge is
   configured by typing:

   ::

    # ip -4 a

   **Example of system output:**

   ::

    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group
    default
    inet 127.0.0.1/8 scope host lo
    valid_lft forever preferred_lft forever
    8: br-fw-admin: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue
    state UP group default
    inet 10.108.5.3/24 brd 10.108.5.255 scope global br-fw-admin
    valid_lft forever preferred_lft forever
    16: vr-host-base: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc
    pfifo_fast state UP group default qlen 1000
    inet 240.0.0.5/30 scope global vr-host-base
    valid_lft forever preferred_lft forever
    30: hapr-host: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast
    state UP group default qlen 1000
    inet 240.0.0.1/30 scope global hapr-host
    valid_lft forever preferred_lft forever
