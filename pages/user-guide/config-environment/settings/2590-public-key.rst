
.. _public-key-ug:

Public Key
++++++++++

The Public Key field defines the SSH key
that will be used by each target node.
Fuel pushes this key to each target node
that is created in the initial deployment
and to each node that is :ref:`added<redeploy-node-ops>`
to this environment after the initial deployment.


.. image:: /_images/user_screen_shots/public-key.png
   :width: 80%

Note that the Public Key defined here
is used only for the target nodes in this environment;
if you create other environments,
you must configure the public key for each of them.

See :ref:`public-keys-ops` for information
about uploading a public key to the Fuel Master node.
