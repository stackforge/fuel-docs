.. _reinstall-node:

================
Reinstall a node
================

You may need to reinstall a node in case of failures on the root partition,
for example, failure to upgrade the operating system.

**To reinstall a node**:

#. Log in to the Fuel Master node CLI.

#. Reprovision the node by issuing:

   ::

     fuel node --node-id <NODE_ID> --provision

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

   **Example:**

   ::

     fuel node --node-id 1 --provision

#. Redeploy the node:

   ::

     fuel node --node-id <NODE_ID> --deploy