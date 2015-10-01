.. _templates-networking-examples:

Network Template Examples
=========================

You can use network templates to configure Fuel to use
one or two networks for all OpenStack network traffic.

Configuring Two Networks
------------------------

Fuel supports the two-network configuration where one network interface is
dedicated for PXE traffic and another network interface, or bonding, for
all other traffic.

**To configure two networks:**

1. Apply the following patch to Nailgun:

* https://review.openstack.org/#/c/227040/

2. Apply the following patch to the Puppet manifests:

* https://review.openstack.org/#/c/225941/

3. Create a new network for all non-PXE traffic:

   ::

    # fuel network-group --create --name everything --cidr <cidr>
    --gateway <gateway> --nodegroup <nodegroup>

4. Set the ``render_addr_mask`` parameter to `internal` for this network by
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

4. Save `network template for two networks <examples/network_templates/two_networks.yaml>`_
   as ``network_template_<env id>.yaml``.

   .. note::
      Verify that ``nic_mapping`` matches your configuration.

5. Upload the network template by typing:

   ::

    # fuel network-template --upload --env <env id>

6. Deploy the environment.

   When Fuel completes the deployment, verify that only one bridge is
   configured by typing:

   ::

    # ip -4 a

    1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
    inet 127.0.0.1/8 scope host lo
    valid_lft forever preferred_lft forever
    8: br-fw-admin: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default
    inet 10.108.5.3/24 brd 10.108.5.255 scope global br-fw-admin
    valid_lft forever preferred_lft forever
    16: vr-host-base: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    inet 240.0.0.5/30 scope global vr-host-base
    valid_lft forever preferred_lft forever
    30: hapr-host: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    inet 240.0.0.1/30 scope global hapr-host
    valid_lft forever preferred_lft forever

Configuring a Single Network
----------------------------

Fuel supports a single network configuration where one network interface is
responsible for all OpenStack traffic. This configuration is common in the
proof of concept deployments where no additional network interfaces are
available.

**To configure a single network:**

1. Apply the following patches to Nailgun:

* https://review.openstack.org/#/c/227040/
* https://review.openstack.org/#/c/226844/

2. Apply the following patch to the Puppet manifests:

* https://review.openstack.org/#/c/225941/

3. Modify the admin network through the database by typing:

   ::

    # dockerctl shell postgres
    # sudo -u postgres psql nailgun
    nailgun=# UPDATE network_groups SET meta='{"unmovable": true, "use_gateway":
        true, "notation": "ip_ranges", "render_addr_mask": "internal",
        "render_type": null, "map_priority": 0, "configurable": false}'
        WHERE id=1;

   .. note::
      You cannot modify the admin network using CLI.

4. Save `network template for one network <examples/network_templates/one_network.yaml>`_
   as ``network_template_<env id>.yaml``.

5. Upload the network template by typing:

   ::

    # fuel network-template --upload --env <env id>

6. Deploy the  environment.

7. Proceed to :ref:`neutron_config`.

.. _neutron_config:

Configure Neutron
+++++++++++++++++

After you deploy your environment, allocate the correct floating IP pool
to the network.

**To allocate the correct floating IP pool:**

#. Clear the gateway from `router04`.
#. Delete the `net04_ext__subnet` subnet.
#. Create a new subnet with the floating IP pool from the single network.
#. Set gateway on `router04`.
