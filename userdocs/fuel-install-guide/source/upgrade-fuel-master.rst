.. _upgrade_fuel_master:

Upgrade the Fuel Master node
----------------------------

The following procedure upgrades the Fuel software
that runs on the Fuel Master node.

**To upgrade the Fuel Master node:**

#. Verify there are no installations in progress in the environment.

#. Download the upgrade tarball by going to
   https://www.fuel-infra.org/#fuelget. Click :guilabel:`UPG.TORRENT`.

#. Put the downloaded file to a location on the Fuel Master Node
   that has at least 2 GB of free space for the archive,
   and additional 6 GB on the partition where it will be unpacked.

#. Extract the tarball contents::

     cd /var/tmp  # Use the directory where the tarball is located
     lrzuntar filename.tar.lrz

#. Run the upgrade script from that same directory.

#. Provide the Fuel administrator (*admin* user) password::

     ./upgrade.sh --password <password>

   The upgrade process can take 30-60 minutes.

#. Proceed to :ref:`upgrade_prepare_master`.

.. see::

     - :ref:`upgrade_prerequisites`
