.. _external-ubuntu-ops:

Downloading Ubuntu system packages
==================================

In Fuel 6.0 or older there is an option
to select a Ubuntu release in the Fuel UI
and deploy it, since all the Ubuntu packages
are located on the Fuel Master node by default.

Starting with Fuel 6.1, the Fuel Master node
has only those Ubuntu packages that are built by
Mirantis and that have the OpenStack dependencies.

The default Ubuntu system packages are downloaded from
the Ubuntu official mirrors by default, or you can
set the Fuel UI to download them from your company's
local repositories.

.. note:: To be able to download Ubuntu system packages
          from the official Ubuntu mirrors you need to make
          sure your Fuel Master node and Slave nodes have the
          Internet connection.

To change the Ubuntu system package repositories
from the official to your company's local ones,
do the following:

#. In Fuel UI, navigate to *Settings* -> *Repositories*.
#. Change the path under *URI*:

.. image:: /_images/externalUbuntu.png

.. note:: You can also change the repositories
          after a node is deployed, but the new
          repository paths will only be used for
          the new nodes that you are going to add
          to a cluster.
