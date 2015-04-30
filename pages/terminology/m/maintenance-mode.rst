
.. _maintenance-mode-term:

Maintenance Mode
----------------

Maintenance mode (MM) is a mode when the operating system on the node
has only a critical set of working services that the system needs for
basic network and disk operations. The purpose of the maintenance mode
is to do a system repair or run other service operations on the system.
The implementation of maintenance mode in 15B is based on the Ubuntu
recovery mode. The system goes into a reboot and goes through the
regular boot process until the system initialization stage (rc-sysinit).
This is where the system enters the maintenance mode with the network
and filesystem services started. In this moment we have already started
network and filesystem. In MM stage are started sshd, tty2 and main MM
service wait command for boot flow continue.

Here is a Cloud Infrastructure Controller boot flow scheme:

.. image:: /_images/mm_bootflow.png

For more information, see:

- :ref:`mm-ops`.

