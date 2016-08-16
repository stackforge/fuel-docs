.. _network-templates-create:

Create a network template
-------------------------

You can use one of the network templates provided in Network templates
examples.
However, if these templates do not meet your networking requirements,
you can create your own. We strongly recommend to use the ``default.yaml``
network template provided in this documentation to build your own network
template.

.. note::
   When you configure a network using network templates, you cannot apply
   changes to the nodes network configuration using the Fuel web UI. For
   example, if you configure an OpenStack environment using network
   templates, deploy the OpenStack environment, and later decide to add
   new nodes, you must update network configuration of these nodes using
   network templates and do not use the Fuel web-UI. However, templates do
   not describe the level 2 and level 3 network settings. Therefore, you
   must set them using Fuel web UI, CLI, or API.

After uploading a network template, you must create and/or
delete networks and node groups using the Fuel CLI to reflect the uploaded
network configuration. Otherwise, the configuration specified in the network
template will not take effect and may result in malfunction.

**To create a network template:**

#. Create a ``.yaml`` file.
#. Specify your network configuration in the ``.yaml`` file following
   the conventions described in :ref:`network-templates-structure`.
#. Log in to the Fuel Master node CLI.
#. Display the ID of the environment in which you want to upload the
   template:

   ::

     fuel environment

#. Upload the network template to Fuel:

   ::

     fuel --env <ENV_ID> network-template --upload --dir <PATH>

   **Example:**

   ::

     fuel --env 1 network-template --upload --dir /home/stack/

#. Add or delete custom networks that you have introduced through
   the network template:

   * If you need to delete a network:

     #. View the ID of the network by typing:

        ::

          fuel network-group

        **Example of system response:**

        ::

          id | name          | vlan_start | cidr         | gateway  |group_id
          ---+---------------+------------+--------------+----------+--------
          24 | private       |            |              |          | 4
          23 | private       |            |              |          | 5
          22 | storage       | 102        | 10.10.1.0/24 | 10.1.1.1 | 5
          25 | management    | 101        | 10.10.0.0/24 | 10.0.0.1 | 4
          21 | public        |            | 10.10.0.0/24 | 10.10.0.1| 4

     #. Delete the required network groups using the network ID.

        ::

          fuel network-group --delete --env <env_id> --network <network_id>


   * If you need to add a new network, type:

     ::

       fuel network-group --create --node-group <node_group_id> --name
       <network_name> --vlan <vlan_id> --cidr <cidr_id>

#. Add or delete custom network groups as described in
   :ref:`cli-network-group`.

#. Configure L2 and L3 network settings:

   .. note:: You cannot modify VLAN settings through the Fuel web UI or CLI
             Configure VLAN settings in the network template.

   * Using Fuel web UI:

     #. Log in to the Fuel web UI.
     #. Click :guilabel:`Networks`.
     #. Configure :guilabel:`Network Settings` as required.

   .. note:: If you add additional node network group with different from the
             default node group settings, update the network template with the
             required changes.

   * Using Fuel CLI:

     #. Log in to the Fuel CLI.
     #. Download network configuration:

        ::

        fuel --env <env_ID> network --download

     #. Make the required changes in the network ``.yaml`` file.
     #. Upload the configuration to the Fuel Master node:

        ::

        fuel --env <env_ID> network --upload

.. seealso::

   - :ref:`cli-network-group`
   - :ref:`cli-network-template`
