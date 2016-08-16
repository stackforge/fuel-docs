.. _network-templates-create:

Create a network template
-------------------------

You can use one of the network templates provided in Network templates
examples.
However, if these templates do not meet your networking requirements,
you can create your own.

.. note::
   When you configure a network using network templates, you cannot apply
   changes to the network configuration using the Fuel web UI. For example,
   if you configure an OpenStack environment using network templates, deploy
   the OpenStack environment, and later decide to add new nodes, you must
   update network configuration of these nodes using network templates
   and not use the Fuel web-UI.

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

.. seealso::

   - :ref:`cli-network-group`
   - :ref:`cli-network-template`
