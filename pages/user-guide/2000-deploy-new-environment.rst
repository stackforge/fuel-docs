
.. _deploy-environment-ug:

Deploy a New OpenStack Environment
==================================

After Fuel completes the installation,
point your browser to default Fuel UI
URL: `http://10.20.0.2:8000 <http://10.20.0.2:8000>`__.

Alternatively, point your browser
to the IP address and port number that you specified.

In the Fuel UI, create a new OpenStack environment.

#. Configure the network settings using the address plan.

#. Verify the network configuration by clicking **Verify Networks**.

#. In the **Settings** tab, modify additional options:

   * Access

   * OpenStack Components

   * Hypervisor type

   * Scheduler driver

   * Syslog

   * Storage

#. Assign a role for each node server.

#. Optionally, associate NICs with the OpenStack networks:

   #. Select the nodes.
   #. Click **Configure Interfaces**.
   #. Drag and drop the appropriate networks onto the physical interfaces.
   #. Click **Apply**.

#. Click **Deploy Changes**.
    Depending on your environment deployment of Mirantis OpenStack may take
    some time.

After you deployed Mirantis OpenStack, verify the configuration by
running the tests from the **Health Check** tab.

Create a new environment
========================

.. image:: /_images/fuel-wizard.png
   :align: center
   :width: 70%

Network settings page
=====================

.. image:: /_images/fuel-network-settings.png
   :align: center
   :width: 70%

Settings page
=============

.. image:: /_images/fuel-settings.png
   :align: center
   :width: 70%

Add nodes to environment
========================

.. image:: /_images/fuel-nodes.png
   :align: center
   :width: 70%

Select discovered nodes
=======================

.. image:: /_images/fuel-nodes-selected.png
   :align: center
   :width: 70%

Node's network settings
=======================

.. image:: /_images/fuel-node-network.png
   :align: center
   :width: 70%


