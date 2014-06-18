
.. raw:: pdf

  PageBreak

.. _configure-env-ug:

Configure your Environment
==========================

After you exit from the "Create a New OpenStack Environment" wizard,
Fuel displays a set of configuration tabs
that you use to finish configuring your environment.

+----------------------------+-------------------------------------------+
| Step Description           | Additional Information                    |
+============================+===========================================+
| Assign a role or roles to  | See :ref:`assign-roles-ug`                |
| each node server.          |                                           |
+----------------------------+-------------------------------------------+
| Customize disk partitions  | See :ref:`customize-partitions-ug`        |
+----------------------------+-------------------------------------------+
| In **Network** tab,        | See :ref:`network-settings-ug`            |
| configure the network      |                                           |
| settings from the address  |                                           |
| plan prepared earlier.     |                                           |
+----------------------------+-------------------------------------------+
| Set up NIC bonding         | See :ref:`nic-bonding-ui`                 |
| (optional)                 |                                           |
+----------------------------+-------------------------------------------+
| Map logical networks to    | See :ref:`map-logical-to-physical`        |
| NICs                       |                                           |
+----------------------------+-------------------------------------------+
| Click **Verify Networks**  | See :ref:`verify-networks-ug`             |
| to check and confirm the   |                                           |
| network configuration.     |                                           |
+----------------------------+-------------------------------------------+
| (Optional) In the          | See :ref:`settings-ug`                    |
| **Settings** tab, you can  |                                           |
| configure or modify the    |                                           |
| options for Horizon        |                                           |
| access, scheduler type,    |                                           |
| logging, and other         |                                           |
| OpenStack options.         |                                           |
+----------------------------+-------------------------------------------+
| Click the **Deploy**       | See :ref:`deploy-changes`                 |
| **Changes** button.        |                                           |
+----------------------------+-------------------------------------------+
| (Optional) Set up and test | See :ref:`sahara-install`                 |
| Sahara                     |                                           |
+----------------------------+-------------------------------------------+

Each of these steps is discussed below in more detail.

If necessary, you can :ref:`stop deployment<Stop_Deployment>`
or :ref:`reset the environment<Reset_Environment>`.

.. raw:: pdf

  PageBreak

.. include:: /pages/user-guide/config-environment/1000-assign-roles.rst
.. include:: /pages/user-guide/config-environment/1200-customize-partitions.rst
.. include:: /pages/user-guide/config-environment/1400-network-settings.rst
.. include:: /pages/user-guide/config-environment/3000-nic-bonding-ui.rst
.. include:: /pages/user-guide/config-environment/0220-map-logical-to-physical-nic.rst
.. include:: /pages/user-guide/config-environment/3400-verify-networks.rst
.. include:: /pages/user-guide/config-environment/5000-settings.rst


