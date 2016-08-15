
.. _add-mongodb-ug:

Add a MongoDB node
------------------

Fuel deploys MongoDB version 2.6. Using the Fuel web UI, you can add any number of
MongoDB roles (or standalone nodes) to a new environment only. To add
additional MongoDB roles to an existing environment, use shell commands.

For new environments, we recommend that you deploy MongoDB on standalone nodes.
For existing environments, we recommend that you configure one MongoDB node
for each controller node.

**To add a MongoDB node to an existing environment:**

#. Add an entry for every new MongoDB node to the ``connection`` parameter
   in the ``ceilometer.conf`` file on each controller node. This entry should
   specify the new node's IP address for the Management logical network.

#. Open the ``astute.yaml`` file on any deployed MongoDB node and determine
   which node has the ``primary-mongo`` role. Write down the value of the
   ``fqdn`` parameter that you will use to connect to this node.

   For more information, see `MongoDB nodes configuration
   <http://docs.openstack.org/developer/fuel-docs/userdocs/fuel-user-guide/file-ref/astute-yaml-target.html#mongodb-nodes-configuration>`_.

#. Retrieve the ``db_password`` value from the
   ``ceilometer`` configuration section in the ``astute.yaml`` file.
   You will use this password to access the primary MongoDB node.

   For more information, see `Ceilometer configuration
   <http://docs.openstack.org/developer/fuel-docs/userdocs/fuel-user-guide/file-ref/astute-yaml-target.html#ceilometer-configuration>`_.

#. Log in to the MongoDB node that has the ``primary-mongo`` role.

   .. code-block:: console

     ssh ... <fqdn_OF_PRIMARY_MONGO_NODE>

#. Log in to Mongo:

   .. code-block:: console

     mongo -u admin -p <db_PASSWORD> admin

#. Configure each MongoDB node to be added to your environment:

   .. code-block:: console

     ceilometer:PRIMARY> rs.add <MANAGEMENT_IP_ADDRESS_OF_NODE>

#. Verify that each MongoDB node is successfully added to your environment:

   .. code-block:: console

    ceilometer:PRIMARY> rs.status()

#. Restart the Ceilometer services.

.. seealso::

   - :ref:`add-nodes-ug`
