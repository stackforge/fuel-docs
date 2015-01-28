
.. _operating-system-role-ops:

Configuring an Operating System node
-----------------------------------------

Fuel provisions
the :ref:`Operating System Role<operating-system-role-term>`
with either the CentOS or Ubuntu operating system
that was selected for the environment
but :ref:`Puppet<puppet-term>` does not deploy other packages
on this node.
You can find out more about what Fuel installs
on such nodes in :ref:`operating-system-role-arch`.

You can access an Operating System node using **ssh**,
just as you would access any other node;
see :ref:`shell-ops`.
Some general administrative tasks you may need to perform are:

- Create file systems on partitions you created
  and populate the *fstab* file so they will mount automatically.
- Configure additional :ref:`logical networks<logical-networks-arch>`
  you need; Fuel only configures the Admin/PXE network.
- Set up any monitoring facilites you want to use
  such as **monit** and **atop**;
  configure **syslog** to send error messages to a centralized syslog server.
- Tune kernel resources to optimize performance for the particular applications
  you plan to run here.

You are pretty much free to install and configure
this node any way you like.
By default, all the repositories from the Fuel Master node are configured so
you can install packages from these repositories by running
**apt-get install <package-name>** on Ubuntu
or **yum install <package-name>** on CentOS.
You can also use **scp** to copy other software packages to this node
and then install them using **apt-get** or **yum**.

