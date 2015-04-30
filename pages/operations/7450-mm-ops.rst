
.. _mm-ops:

Maintenance Mode
=================

Overview
--------

Maintenance mode (MM) is the state of operating system when it has only
critical set of working services which are needed for basic network and
disk operations. Also node in MM is reachable with ssh from network.

You can put your system in :ref:`maintenance-mode-term` for system
repair or other service operations.


The maintenance mode is enforced by using the ``recovery`` kernel
parameter in one of the following ways:

* using "Ubuntu, with Linux X.X.X-XX-generic (recovery mode)" from GRUB
  menu; or in CentOS by selecting the kernel version from GRUB menu; 

* by forcing the reboot into maintenance mode from shell with the ``umm on``
  command;

* automatically, by reaching an number of unclean-reboots specified in
  REBOOT_COUNT parameters.

"Unclean reboot" means that system reboots unexpectedly without a
direct call from the user.

You can also disable the maintenance mode functionality
with the ``umm disable`` command.

You can operate in maintenance mode through ssh or tty2.

A return back into normal mode is issued with the *umm off* command.

.. Note ::

  If you manually start a service in the maintenance mode, it will not
  be automatically restarted when you put the system back in the normal
  mode with the *umm off* command.



Using the ``umm`` command
-------------------------

There are several parameters to use with the *umm* command:

- ``umm on [cmd]`` - enter the maintenance mode, and execute cmd when MM is reached;

- ``umm status`` - check the mode status. There are three statuses:

  - ``runlevel`` - the system is in the normal mode;

  - ``reboot`` - the system is starting to enter the maintenance mode;

  - ``umm`` - the system is in the maintenance mode.

- ``umm off [reboot]`` - resume boot or reboot into normal mode.

- ``umm enable`` - enable the maintenance mode functionality

- ``umm disable`` - disable the maintenance mode functionality


Configuring the ``UMM.conf`` file
-------------------------------

You can automate the maintenance mode start by editing the */etc/umm.conf* file.

The configuration options are:

* UMM=yes
* REBOOT_COUNT=2
* COUNTER_RESET_TIME=10


where:

 UMM
   will tell the system to go into the maintenance mode based on
   the REBOOT_COUNT and COUNTER_RESET_TIME values. If the value is
   anything other than ``yes`` (or if the ``UMM.conf`` file is missing), the
   system will go into the native Ubuntu recovery mode.

 REBOOT_COUNT
   determines the number of unclean reboots that will
   trigger the system to go into the maintenance mode;

 COUNTER_RESET_TIME
   this is a time value in minutes after the system reboot when
   "Unclean reboot" counter will be resetted.



Example of using MM on one node
-------------------------------

- Switching node into MM:

  ::

    root@node-1:~#umm on
    umm-gr start/running, process 6657

    Broadcast message from root@node-1
    (/dev/pts/0) at 14:29 ...

    The system is going down for reboot NOW!
    root@node-1:~# umm status
    rebooting
    root@node-1:~# Connection to node-1 closed by remote host.
    Connection node-1:~# closed.
    root@fuel:~#:~$

    root@node-1:~#ssh

    root@node-1:~# umm status
    umm
    root@node-1:~#ps -Af


  We can see only small set of working process.

- Start the service:

  ::

    root@node-1:~# /etc/init.d/apache2 start
    root@node-1:~# /etc/init.d/apache2 status
    Apache2 is running (pid 1907).


- Switch back to the working mode:

  ::

    root@node-1:~#umm off

- Continue booting into working mode:

  ::

    root@node-1:~#umm status
    runlevel N 2
    root@node-1:~#/etc/init.d/apache2 status
    Apache2 is running (pid 1907).


  We can see that service was not restarted during switching from MM to
  working mode.

- Check the state of the OpenStack services:

  ::

    root@node-1:~#crm status

- If you want to reach working mode by reboot, you should use the following
  command:

  ::

    root@node-1:~# umm off reboot umm-gr start/running, process 2825

    Broadcast message from root@node-1
    (/dev/pts/0) at 11:23 ...

    The system is going down for reboot NOW!
    root@node-1:~# Connection to node-1 closed by remote host.
    Connection to node-1 closed.
    [root@fuel ~]#


Example of putting all nodes into the maintenance mode at the same time
-----------------------------------------------------------------------

The following maintenance mode sequence is called "Last input First out".
This guarantees that there is going to be the most recent data on
the Cloud Infrastructure Controller (CIC) that comes back first.


- Determine what nodes have Controller (CIC) role:

  ::

    [root@fuel ~]# fuel nodes
    id | status | name             | cluster| ip        | mac               | roles      | pending_roles| online
    ---|--------|------------------|--------|-----------|-------------------|------------|--------------|-------
    2  | ready  | Untitled (c0:02) | 1      | 10.20.0.4 | e6:6a:42:96:a4:45 | controller |              | True
    4  | ready  | Untitled (c0:04) | 1      | 10.20.0.6 | 66:10:2e:0c:12:4a | compute    |              | True
    1  | ready  | Untitled (c0:01) | 1      | 10.20.0.3 | fa:a1:39:94:7f:4c | controller |              | True
    3  | ready  | Untitled (c0:03) | 1      | 10.20.0.5 | 82:cb:bb:50:40:47 | controller |              | True

- Copy id_rsa to the CICs for passwordless ssh authentification:

  ::

    [root@fuel ~]# scp .ssh/id_rsa node-1:.ssh/id_rsa
    Warning: Permanently added 'node-1' (RSA) to the list of known hosts.
    id_rsa                                    100% 1675   1.6KB/s   00:00
    [root@fuel ~]# scp .ssh/id_rsa node-2:.ssh/id_rsa
    Warning: Permanently added 'node-2' (RSA) to the list of known hosts.
    id_rsa                                    100% 1675   1.6KB/s   00:00
    [root@fuel ~]# scp .ssh/id_rsa node-3:.ssh/id_rsa
    Warning: Permanently added 'node-3' (RSA) to the list of known hosts.
    id_rsa                                    100% 1675   1.6KB/s   00:00

- Enforce switching into MM mode on all nodes:

  ::

    [root@fuel ~]# ssh node-1 umm on ssh node-2 umm on ssh node-3 umm on
    Warning: Permanently added 'node-1' (RSA) to the list of known hosts.
    umm-gr start/running, process 24318
    Connection to node-1 closed by remote host.
    Connection to node-1 closed.
    [root@fuel ~]#
    [root@fuel ~]# ssh -tt node-1 ssh -tt node-2 ssh -tt node-3 sleep 1
    Warning: Permanently added 'node-1' (RSA) to the list of known hosts.
    ECDSA key fingerprint is 84:17:0d:ea:27:1f:4e:08:f7:54:b2:8c:fe:8a:13:1a.
    Are you sure you want to continue connecting (yes/no)? yes
    Warning: Permanently added 'node-2,10.20.0.4' (ECDSA)
    to the list of known hosts. established.
    ECDSA key fingerprint is
    c3:c6:ca:7d:11:d3:53:01:15:64:20:f7:c7:44:fb:d1.
    Are you sure you want to continue connecting (yes/no)? yes
    Warning: Permanently added 'node-3,192.168.0.6' (ECDSA)
    to the list of known hosts.
    Connection to node-3 closed.
    Connection to node-2 closed.
    Connection to node-1 closed. [root@fuel ~]#

- Wait until the last node reboots:

  ::

    [root@fuel ~]# ssh node-3
    Warning: Permanently added 'node-3' (RSA) to the list of known hosts.
    Welcome to Ubuntu 12.04.4 LTS (GNU/Linux 3.13.0-32-generic x86_64)
     * Documentation:  https://help.ubuntu.com/
    Last login: Tue Dec 23 05:55:47 2014 from 10.20.0.2
    root@node-3:~#
    Broadcast message from root@node-3
    (unknown) at 6:00 ...
    The system is going down for reboot NOW!
    Connection to node-3 closed by remote host.
    Connection to node-3 closed.
    [root@fuel ~]#

- Perform all the steps, planned for MM.


- Enforce a return back into normal mode in reverse state:

  ::

    [root@fuel ~]# ssh node-3 umm off
    Warning: Permanently added 'node-3' (RSA) to the list of known hosts.
    [root@fuel ~]# ssh node-2 umm off
    Warning: Permanently added 'node-2' (RSA) to the list of known hosts.
    [root@fuel ~]# ssh node-1 umm off
    Warning: Permanently added 'node-1' (RSA) to the list of known hosts.





