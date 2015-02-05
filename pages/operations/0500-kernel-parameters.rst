
.. _kernel-parameters-ops:

How To: Modify Kernel Parameters
================================

Kernel parameters are options that are passed to the kernel
when a Linux system is booted.
Kernel parameters can be set in any of the following ways:

- Use the Fuel Welcome screen to define kernel parameters
  that will be set for the Fuel Master node when it is installed.

- Use the :ref:`Initial parameters<kernel-parameters-ug>` field
  on the Settings tab to define kernel parameters
  that Fuel will set on the target nodes.
  This only affects target nodes that will be deployed in the future,
  not those that have already been deployed.

- Use the Cobbler web UI (*http://<the_Fuel-Master-node-ip>/cobbler_web*)
  to change kernel parameters
  for all nodes using or for specific nodes.
  The nodes appear in Cobbler only after they are deployed;
  to change parameters before deployment,
  stop the deployment, change the parameters, then proceed.

- Issue the **dockerctl** command on each node
  where you want to set kernel parameters;
  see :ref:`kernel-cmd-line-ops`.

Any kernel parameter supported by the Linux distribution being used
(either Ubuntu or CentOS)
can be set for the target nodes and the Fuel Master node.
Some parameters that are frequently set for Fuel and OpenStack are:

**ttys0=<speed>**
  serial console for videoless servers

**nofb**
  disable Linux framebuffer

**nomodeset**
  disable kernel handling of the video card;
  required for some older integrated server video chips

**intel_iommu and amd_iommu**
  enable/disable physical-to-virtual address translation for peripheral devices.
  Some devices (such as Mellanox cards) require this to be on;
  other peripheral devices may be incompatible
  with device virtual address space
  and may work only with real address space.
  If you are unable to boot a node or the node has a kernel panic
  soon after being booted,
  setting this parameter to "off" may fix the problem.

**unsupported_hardware**
  instructs the operating system to boot
  even if it does not recognize some configured hardware.
  If this parameter is not set,
  Linux does not boot when it detects critical hardware required at boot time
  (usually a new CPU model).
  Because most hardware provides backward compatibility
  with older versions,
  setting this kernel parameter may enable the system to boot.
  Note that, if no backward compatibility is provided,
  the system may panic or fail in other ways
  even with this parameter set.

.. _kernel-cobbler-ops:

Using the Cobbler web UI to set kernel parameters
-------------------------------------------------

You can use the Cobbler web UI to set kernel parameters:

- Use the https://<ip-addr>/cobbler_web URL
  to access the Cobbler web UI;
  replace <ip-addr> with the IP address for your Fuel Master Node.

- Log in, using the user name and password
  defined in the `cobbler` section of the */etc/fuel/astute.yaml* file.

- Select `Systems` from the menu on the right.
  This lists the nodes that are deployed in your environment.
  Select the node(s) for which you want to set new parameters
  and click "Edit".
  The following screen is displayed:

.. image:: /_images/user_screen_shots/cobbler-edit-system.png
   :width: 80%

- Add the kernel parameters and values to the
  `Kernel Options (Post-install) field
  then click the `Save` button.

.. _kernel-cmd-line-ops:

Using the dockerctl command to set kernel parameters
----------------------------------------------------

Use the **dockerctl** console command on the Fuel Master node
to add a kernel parameter definition.
For example, the following command sets the **intel_iommu=off** parameter:
::

    `dockerctl shell cobbler cobbler profile edit --name bootstrap --kopts="intel_iommu=off" --in-place`

