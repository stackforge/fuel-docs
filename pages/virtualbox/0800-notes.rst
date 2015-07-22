
Additional Notes
================

- Do not run VirtualBox as the root user
  or as any user with superuser permissions.
  You must run it as a normal user
  and add this user name to the *vboxusers* security group,
  which is automatically created as part of the VirtualBox installation.
  The following command adds the "myname" user to the vboxusers group::

   sudo useradd -G vboxusers myname

- If the target server where you run VirtualBox
  is not running X11,
  you must modify the scripts to use the headless option:
  in config.sh use ``headless=1``. The default setting is
  ``headless=0`` starts the VMs with GUI. Using ``headless=1``
  will start the VMs without GUI.

- As part of the improved networking configuration in Mirantis
  OpenStack 6.1, the VirtualBox scripts now use
  Intel e1000 Desktop as a virtual network adapter. This means that
  starting with Mirantis OpenStack 6.1, you can deploy on VirtualBox
  with Intel network cards only.

  Mirantis OpenStack 6.0 and older use AMD PCNet 32 Fast III as
  a virtual network adapter and cannot be deployed on VirtualBox
  with Intel network cards.
