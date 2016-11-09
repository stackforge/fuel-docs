.. _access_shell:

=====================
Access shell on nodes
=====================

While maintaining your OpenStack environment or performing advanced
configuration tasks, you may need to access the Fuel Master node and
Fuel slave nodes at the shell level. Operating systems on all nodes
run the **bash** shell supporting standard Unix system commands.
Each node's system has its own console that you can use directly, but
standard practice is to use SSH to access consoles of Fuel nodes.

**To access the shell on nodes through SSH:**

#. Generate a public SSH key by typing on your client:

   .. code-block:: console

      ssh-keygen -t rsa

#. Log in to the Fuel web UI.
#. Go to :guilabel:`Settings -> General -> Operating System Access`.
#. Paste the public key to the :guilabel:`Authorized SSH keys` field.

   Fuel uploads public keys to each Fuel slave node it deploys.
   However, you cannot upload the keys to the Fuel Master node
   and Fuel slave nodes that have already been deployed through the Fuel
   web UI. Proceed with the steps below to upload public keys to
   the Fuel Master node and deployed Fuel slave nodes.

#. To upload the SSH key to the Fuel Master node, type on your client:

   .. code-block:: console

      ssh-copy-id -i .ssh/id_rsa.pub root@<FUEL_MASTER_IP>

   <FUEL_MASTER_IP>
    The IP address of the Fuel Master node.

   Alternatively, add the required public key stored in
   the ``.ssh/id_rsa.pub`` file to the ``/root/.ssh/authorized_keys``
   directory on the Fuel Master node.

#. SSH to the Fuel Master node:

   .. code-block:: console

      ssh root@<FUEL_MASTER_IP>

#. Type :command:`fuel nodes` or :command:`fuel node list` to get the IP
   addresses of all Fuel slave nodes.

   **Example of system response:**

   .. code-block:: console

      id | status | name             | cluster | ip         | mac               | roles      | pending_roles | online
      ---|--------|------------------|---------|------------|-------------------|------------|---------------|-------
      5  | ready  | Untitled (4d:4d) | 2       | 10.110.0.3 | b2:8b:55:17:ae:40 | controller |               | True
      8  | ready  | Untitled (3a:7f) | 2       | 10.110.0.6 | 92:93:99:70:14:4c | compute    |               | True
      6  | ready  | Untitled (34:84) | 2       | 10.110.0.4 | f2:b3:1a:74:da:41 | cinder     |               | True
      7  | ready  | Untitled (f0:9b) | 2       | 10.110.0.5 | 56:09:fe:c6:06:40 | compute    |               | True

#. To upload the SSH key to a deployed Fuel slave node, type:

   .. code-block:: console

      ssh-copy-id -i .ssh/id_rsa.pub root@<FUEL_SLAVE_IP>

   Alternatively, add the required public key stored in
   the ``.ssh/id_rsa.pub`` file to the ``/root/.ssh/authorized_keys``
   directory on the required Fuel slave node.

#. SSH to the Fuel slave node using either its IP address or ID:

   * To :command:`ssh` using an IP address, type, for example:

     .. code-block:: console

        ssh 10.110.0.4

   * To :command:`ssh` using an ID shown in the first column of
     the :command:`fuel nodes` command output, type, for example:

     .. code-block:: console

        ssh node-6

Now, you can use :command:`ssh` to access the console of the Fuel Master node
and consoles of the Fuel slave nodes from the Fuel Master node.
Besides, you can use :command:`scp` and :command:`sftp` commands to securely
copy files to the nodes.