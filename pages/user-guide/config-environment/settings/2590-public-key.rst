
.. _public-key-ug:

Public Key
++++++++++

The Public Key field defines the SSH key
that will be pushed to each target node when it is created.
This key will be used for target nodes that are created
in the initial deployment
and for nodes that are added to this environment after the initial deployment:


.. image:: /_images/user_screen_shots/public-key.png
   :width: 80%

Note that this key is used only for the environment
that is controlled by this Controller cluster;
if you create other environments,
you will need to redefine the public key for each of them.

Users can upload the SSH key that will be used to access the Fuel Master node
using the **ssh-copy-id** command,
but the key to used for the target nodes
must be defined in the "Public Key" box.


