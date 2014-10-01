
.. _public-key-ug:

Public Key
++++++++++

The Public Key field defines the SSH key that will be used by each target node.
Fuel pushes this key to each target node that is created in the initial deployment
and to each node that is :ref:`added<redeploy-node-ops>`
to this environment after the initial deployment.


.. image:: /_images/user_screen_shots/public-key.png
   :width: 80%

Note that the Public Key defined here
is used only for the target nodes in this environment;
if you create other environments,
you must configure the public key for each of them.

To upload an SSH key on the Fuel Master node or any deployed node,
generate it with the following command on your client:

::

   ssh-keygen -t rsa

Then copy it by using the ``ssh-copy-id`` command, if available:

::

   ssh-copy-id root@node-ip

Or add the content of your key ``.ssh/id_rsa.pub`` to the node's 
``/root/.ssh/authorized_keys`` file.

.. note::

   The default root password on the Fuel Master node is ``r00tme``.
