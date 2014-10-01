
.. _public-keys-ops:

Uploading Public Keys
---------------------

You access the shell on the Fuel Master node
and the target nodes using SSH,
and you must define a Public Key to use SSH.

#. Generate a Public Key with the following command on your client:

   ::

      ssh-keygen -t rsa

#. Populate the :ref:`Public Key<public-key-ug>` field
   with this key.
   Fuel uploades this Public Key to all target nodes it deploys.
 
#. To upload this SSH key to the Fuel Master node or any deployed node,
   use the following command sequence:

   ::

      ssh-agent
      ssh-copy-id -i .ssh/id_rsa.pub root@<ip-addr>

   <*ip-addr*> is the IP address for the Fuel Master node,
   which is the same IP address you use to access the Fuel console.

   You can use this same command to add a public key
   to a deployed target node.
   See :ref:`ssh-to-target-nodes-ops` for information
   about getting the <*ip-addr*> values for the target nodes.

   You can instead add the content of your key
   (stored in the ``.ssh/id_rsa.pub`` file)
   to the node's ``/root/.ssh/authorized_keys`` file.


