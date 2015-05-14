.. index:: Upgrade Prereq

.. _Upg_Prereq:

Upgrade Prerequisites
+++++++++++++++++++++

There are certain prerequisites for upgrading Mirantis OpenStack
environment managed by Fuel installer. You need to make sure that
all the requirements are met before proceeding with the procedure.
This section describes prerequisites and gives a list of commands used
to check if the requirements are met.

Versions of Fuel installer and environment
__________________________________________

First, you need to check the versions of Fuel installer and the
environment you've picked for the upgrade. Version of Fuel must be
equal to 7.0. Version of environment must be equal to 6.1. You
can check versions using the Fuel Web UI or CLI client to Fuel API.

Configuration of environment
____________________________

The configuration of the environment picked for the upgrade must
comply to the architecture constraints for the upgrade procedure.
You can check the applicability of the procedure to your configuration
via Fuel Web UI.

Check Upgrade Prerequisites
___________________________

*Pick environment to upgrade*

Select an environment to upgrade from the list of environments in
Fuel CLI and assign its ID to the ``ORIG_ID`` variable.

::

    fuel env
    <select from list of environments>
    export ORIG_ID=<enter ID of environment here>

*Check installer version in Fuel Web UI*

Open the Fuel Web UI in your browser, log in and check the version
number of Fuel installer in the lower right corner of the page:

.. image:: /_images/upgrade/fuel-version-check.png

*Check installer version in Fuel CLI*

Run the following command on your Fuel Master node to verify the
version of the Fuel installer:

::

    fuel release | grep available | grep -o 2015.1-7.0

You must see the following lines in the output:

::

    2015.1-7.0
    2015.1-7.0

*Check environment version on the Fuel Web UI*

Click on the environment you've picked for the upgrade. Check the
environment version in the status line above the list of nodes:

.. image:: /_images/upgrade/env-version-check.png

*Check environment version in Fuel CLI*

Run the following command on your Fuel Master node to verify the
version of the environment you pick for the upgrade:

::

    fuel env | awk -F\| '$1~/'$ORIG_ID'/{print $5}' | tr -d ' ' \
    | xargs -I@ bash -c "fuel release | awk -F\| '\$1~/@/{print \$5}'" | tr -d ' '

You must see the following line in the output:

::

    2014.2.2-6.1

*Check configuration of environment*

You need to open the Fuel Web UI in your browser. Log in, click on the
environment you'd like to upgrade and select the *Settings* tab. Check
the following fields and verify they contain the values:

* Hypervisor type: **KVM**
* Ceph RBD for volumes: **Enabled**
* Ceph RBD for images: **Enabled**
* Ceph RBD for ephemeral volumes: **Enabled**
* Ceph RadosGW for objects: **Enabled**

Navigate to the *Networks* tab and check the second line after the tab
title. It must state *Neutron with VLAN segmentation*.
