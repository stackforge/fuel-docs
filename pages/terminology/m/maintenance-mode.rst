
.. _maintenance-mode-term:

Maintenance Mode
----------------

Maintenance mode (MM) is a mode when the operating system on the node
has only a critical set of working services that the system needs for
basic network and disk operations. The purpose of MM is to perform a system
repair or run other maintenance operations on the system.

For switching to MM, the system shut downs and then goes through the regular
boot process until the system initialization stage (rc-sysinit).
At that moment the system enters MM, the network and filesystem services
have already started. During the MM stage, the ``sshd`` and ``tty2``
services start, and the main MM service waits for the command to continue the boot flow.

See the :ref:`mm-ops` section of the Operations guide for the details.

Here is a Cloud Infrastructure Controller boot flow scheme:

.. image:: /_images/mm_bootflow.png



