.. _network-template-delete:

Delete a network template
-------------------------

You can delete a network template that you have previously uploaded.

.. warning::

   Do not delete network templates that are used in your OpenStack
   environment as it may result in failure of the whole network
   configuration.

**To delete a network template:**

#. Log in to the Fuel Master node CLI.
#. Type:

   ::

     fuel --env <ENV_ID> network-template --delete

   **Example:**

   ::

     fuel --env 1 network-template --delete

.. seealso::

   - :ref:`cli-network-group`
   - :ref:`cli-network-template`
