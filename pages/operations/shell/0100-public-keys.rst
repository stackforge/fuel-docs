
.. _public-keys-ops:

Uploading Public Keys
---------------------

You access the shell on the Fuel Master node
and the target nodes using SSH,
and you must define a Public Key to use SSH.

Fuel provides a field that defines the Public Key
for all target nodes it deploys;
see :ref:`public-key-ug` for more information.


To upload an SSH key on the Fuel Master node or any deployed node,
generate it with the following command on your client:

::

   ssh-keygen -t rsa

Then copy it by using the ``ssh-copy-id`` command, if available:

::

   ssh-copy-id -i .ssh/id_rsa.pub root@node-ip

You can instead add the content of your key ``.ssh/id_rsa.pub``
to the node's ``/root/.ssh/authorized_keys`` file.

