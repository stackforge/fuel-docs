
.. raw:: pdf

   PageBreak


.. _create-env-ug:

Create a new OpenStack environment
==================================

After you complete the steps in
:ref:`download-install-ug`,
the Fuel UI screen shows all your Slave nodes as "Unallocated nodes").
You can now create, configure, and deploy
your first OpenStack environment.
One Fuel Master can deploy and manage multiple OpenStack environments
but you must create each environment separately.

+----------------------------+-------------------------------------------+
| Step Description           | Additional Information                    |
+============================+===========================================+
| Click on the "New"         | See :ref:`start-create-env-ug`            |
| OpenStack environment"     |                                           |
| icon to create a new       |                                           |
| environment.               |                                           |
+----------------------------+-------------------------------------------+
| Modify the Fuel password   | See :ref:`change-fuel-passwd-ug`          |
| (optional)                 |                                           |
+----------------------------+-------------------------------------------+
| Approve collection of      | See :ref:`statistics-ug`                  |
| anonymous statistics       |                                           |
+----------------------------+-------------------------------------------+
| Choose the name for your   | See :ref:`name-distro-ug`                 |
| environment and choose the |                                           |
| Operating System (distro)  |                                           |
+----------------------------+-------------------------------------------+
| Choose your Deployment     | See :ref:`mode-ha-ug`                     |
| Mode (Multi-node HA or non |                                           |
| HA).                       |                                           |
+----------------------------+-------------------------------------------+
| Choose your                | See :ref:`hypervisor-ug`                  |
| :ref:`hypervisor-term`     |                                           |
+----------------------------+-------------------------------------------+
| Select your network        | See :ref:`choose-network-ug`.             |
| service (Nova-network,     | If you choose Nova-network, you can       |
| Neutron with GRE           | choose FlatDHCP or VLAN Manager later in  |
| segmentation or Neutron    | the **Network** settings tab.             |
| with VLAN segmentation.    |                                           |
+----------------------------+-------------------------------------------+
| Select your storage        | See :ref:`cinder-glance-backend-ug`       |
| backends for Cinder and    |                                           |
| Glance.                    |                                           |
+----------------------------+-------------------------------------------+
| Choose additional related  | See :ref:`platform-services-ug`           |
| projects.                  |                                           |
+----------------------------+-------------------------------------------+
| Select Create and click on | See :ref:`deploy-ug`                      |
| the icon with your named   |                                           |
| environment.               |                                           |
+----------------------------+-------------------------------------------+

.. include:: /pages/user-guide/create-environment/1000-start-create-env.rst
.. include:: /pages/user-guide/create-environment/1050-change-password.rst
.. include:: /pages/user-guide/create-environment/1100-statistics.rst
.. include:: /pages/user-guide/create-environment/1500-name-distro.rst
.. include:: /pages/user-guide/create-environment/2000-mode-ha.rst
.. include:: /pages/user-guide/create-environment/2500-hypervisor.rst
.. include:: /pages/user-guide/create-environment/3000-choose-network.rst
.. include:: /pages/user-guide/create-environment/3500-cinder-glance-backend.rst
.. include:: /pages/user-guide/create-environment/4000-platform-services.rst
.. include:: /pages/user-guide/create-environment/5000-deploy.rst

