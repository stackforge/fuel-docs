
.. _operating-system-role-ops:

How to configure an Operating System node
-----------------------------------------

Fuel provisions
the :ref:`Operating System Role<operating-system-role-term>`
with either the CentOS or Ubuntu operating system
that was selected for the environment
but :ref:`Puppet<puppet-term>` does not deploy other packages
on this node.
:ref:`operating-system-role-arch` gives details
about what Fuel installs on these nodes.

You can access an Operating System node using **ssh**,
just as you would access any other node;
see :ref:`shell-ops`.
Some general administrative tasks you may need to perform are:

- Create file systems on partitions you created
  and populate the *fstab* file so they will mount automatically.
- Set up any monitoring facilites you want to use
  such as **monit** and **atop**;
  configure **syslog** to send error messages to a centralized syslog server.
- Tune kernel resources to optimize performance for the particular applications
  you plan to run here.

You are pretty much free to install and configure
this node any way you like;
use **scp** to copy packages from another system to this node
and then install them using standard command-line tools
such as **app-get**.

