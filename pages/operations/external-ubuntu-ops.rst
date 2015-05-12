
.. _external-ubuntu-ops:

Downloading Ubuntu system packages
==================================

In Fuel 6.0 or older there is an option
to select a Ubuntu release in Fuel
and deploy it, since all the Ubuntu packages
are located on the Fuel Master node by default.

Starting with Fuel 6.1, the Fuel Master node
has only those Ubuntu packages that are built by
Mirantis and that have the OpenStack dependencies.

The default Ubuntu system packages are downloaded from
the Ubuntu official mirrors by default, or you can
set Fuel to download them from your company's
local repositories.

Updates to the Mirantis packages are fetched
from the Mirantis mirrors by default.

.. note:: To be able to download Ubuntu system packages
          from the official Ubuntu mirrors and Mirantis
          packages from the Mirantis mirrors you need to make
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

There is also a *fuel-createmirror* script on the
Fuel Master node that you can use to synchronize Ubuntu
packages to the Fuel Master node.

fuel-createmirror usage
-----------------------

The *fuel-createmirror* script creates and
updates local mirrors of Mirantis OpenStack
and/or Ubuntu packages.

Issue the following command to get the *fuel-createmirror* help:

 ::

   fuel-createmirror -h

To create or update a local Mirantis OpenStack mirror only,
issue:

 ::

  fuel-createmirror mos

To create or update a local Ubuntu mirror only,
issue:

 ::

  fuel-createmirror ubuntu

If no parameters are specified, the script will create/update
both Mirantis OpenStack and Ubuntu mirrors.

The following configuration directives can be used to modify the
script behavior:

 ::

   /opt/fuel-createmirror-6.1/conf/common.cfg:

        FUEL_VERSION - set the current Fuel version here. If running on
                       a Fuel node, the script will automatically
                       detect the Fuel version. Otherwise you
                       need to set the version manually.

 ::

   /opt/fuel-createmirror-6.1/conf/ubuntu.cfg:

        UPSTREAM - hostname of a Ubuntu mirror. Only rsync mirrors are
                   supported.

        PARTIAL_UPSTREAM:
                0 - the script will mirror all packages from specified distibutions
                    and components. The upstream mirror structure will be preserved.
                1 - (default) the script will download only packages required for
                    Mirantis OpenStack. The script will create a partial
                    repository with the "main" component only. The original
                    mirror structure will not be preserved.
