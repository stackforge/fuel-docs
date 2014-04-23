
Additional Notes
================

- Do not run VirtualBox as the root user
  or as any user with superuser permissions.
  You must run it as a normal user
  and add this user name to the *vboxusers* security group,
  which is automatically created as part of the VirtualBox installation.
  The following command adds the "myname" user to the vboxusers group:

     sudo useradd -G vboxusers myname

- If the target server where you run VirtualBox
  is not running X11,
  you must modify the scripts to use the headless option:
  "VBoxManage startvm ... --type headless"
