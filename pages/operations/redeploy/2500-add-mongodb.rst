
.. _add-mongodb-ops:

Add a MongoDB node
------------------

Additional :ref:`MongoDB<mongodb-term>` roles can be added
to an existing deployment by using shell commands.
Any number of MongoDB roles (or standalone nodes)
can be deployed into an OpenStack environment
using the Fuel Web UI during the initial deployment
but you cannot use the Fuel Web UI to add MongoDB nodes
to an existing environment.

Fuel installs MongoDB
as a backend for :ref:`ceilometer-term`.
Ideally, you should configure one MongoDB node
for each Controller node in the environment so,
if you add Controller nodes,
you should also add MongoDB nodes.

To add one or more MongoDB nodes to the environment:

#. Open the :ref:`astute.yaml<astute-yaml-target-ref>` file on any deployed MongoDB node
   and determine which node has the `primary-mongo` role;
   see :ref:`astute-mongodb-nodes-ref`.
   Write down the value of the **fqdn** parameter;
   you will use this to **ssh** to this node.

#. Retrieve the `db_password` value from the
   :ref:`astute-ceilometer-config-ref` section of same file.
   You will use this password to access the primary MongoDB node.

#. Connect to the MongoDB node that has the `primary-mongo` role
   and log into Mongo:

   ::

     ssh ... <fqdn-of-primary-mongo-node>
     mongo -u admin -p <db_password> admin

#. Configure each MongoDB node to be added to the environment:

   ::

     ceilometer:PRIMARY> rs.add ("<management-ip-address-of-node>")

#. Restart the ceilometer services.

