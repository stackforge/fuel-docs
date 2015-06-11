.. index:: Upgrade Prereq

.. _Upg_Prereq:

Upgrade Prerequisites
---------------------

There are certain prerequisites for upgrading MOS environment managed by Fuel
installer. You need to make sure that all the requirements are met before proceeding
with the procedure. This section describes prerequisites and gives a list of
commands used to check if the requirements are met.

Versions of Fuel installer and environment
++++++++++++++++++++++++++++++++++++++++++

First, you need to check the versions of Fuel installer and the environment you've
picked for upgrade. Version of Fuel must be equal to 6.0. Version of environment
must be equal to 5.1.1. You can check versions using the Fuel Web UI or CLI client
to Fuel API.

Configuration of environment
++++++++++++++++++++++++++++

Configuration of the environment picked for the upgrade must comply to the architecture
constraints for the upgrade procedure. You can check applicability of the
procedure to your configuration via the Fuel Web UI.

Hardware for 6.0 Seed environment
+++++++++++++++++++++++++++++++++

You need to verify that you have additional hardware required to install 6.0
Seed environment. You can check for availability of additional hardware via Fuel
CLI client. Verify that the servers for deployment of CICs in Seed environment are
added to the system and discovered by Fuel.

Check Upgrade Prerequisites
+++++++++++++++++++++++++++

Pick environment to upgrade
___________________________

Select an environment to upgrade from the list of environments in Fuel CLI and
assign its ID to ``ORIG_ID`` variable.

::

    fuel env
    <select from list of environments>
    export ORIG_ID=<enter ID of environment here>

Check installer version on the Fuel Web UI
__________________________________________

Open the Fuel Web UI in your browser, log in and check the version number of Fuel
installer in the lower right corner of the page. See the screenshot for details.

.. image:: /_images/upgrade/fuel-version-check.png

Check installer version in Fuel CLI
___________________________________

Run the following command on your Fuel Master node to verify the version of the Fuel
installer:

::

    fuel release | grep available | grep -o 2014.2-6.0

You must see the following lines in the output:

::

    2014.2-6.0
    2014.2-6.0

Check environment version on the Fuel Web UI
____________________________________________

Click on the environment you've picked for the upgrade. Check the environment
version in the status line above the list of nodes.

.. image:: /_images/upgrade/env-version-check.png

Check environment version in Fuel CLI
_____________________________________

Run the following command on your Fuel Master node to verify the version of the
environment you pick for the upgrade:

::

    fuel env | awk -F\| '$1~/'$ORIG_ID'/{print $5}' | tr -d ' ' \
    | xargs -I@ bash -c "fuel release | awk -F\| '\$1~/@/{print \$5}'" | tr -d ' '

You must see the following line in the output:

::

    2014.1.3-5.1.1

Check configuration of environment
__________________________________

You need to open the Fuel Web UI in your browser. Log in, click on the environment
you'd like to upgrade and select the *Settings* tab. Check the following fields and
verify they contain certain values:

* Hypervisor type: **KVM**
* Ceph RBD for volumes: **Enabled**
* Ceph RBD for images: **Enabled**
* Ceph RBD for ephemeral volumes: **Enabled**
* Ceph RadosGW for objects: **Enabled**

Navigate to the *Networks* tab and check the second line after the tab title. It must
state *Neutron with VLAN segmentation*.

Check additional hardware for Seed environment
______________________________________________

Run the following command to find all the servers discovered by Fuel and prepared for the
deployment:

::

    fuel node | awk -F\| '$2~/discover/{print $0}'
