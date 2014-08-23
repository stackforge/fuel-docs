
.. _name-distro-ug:

Name Environment and Choose Distribution
----------------------------------------

When you click on the "New OpenStack Environment" icon
on the Fuel UI, the following screen is displayed:

.. image:: /_images/user_screen_shots/name_environ.png
   :width: 50%

Give the environment a name
and select the Linux distribution from the drop-down list;
this is the operating system that will be installed
on the Controller, Compute, and Storage nodes in the environment.
See :ref:`linux-distro-plan` for guidelines
about choosing the distribution to use.

If you have upgraded Fuel from an earlier release,
the drop-down list contains options for the older Fuel releases
as well as the current releases.
Each option is identified by the IceHouse Release number
and the Fuel Release number
For example,
if you upgraded from Mirantis OpenStack 5.0 to 5.0.1,
you will have the following options:

::

    Icehouse on Ubuntu 12.04.4 (2014.1)
    Icehouse on CentOS 6.5 (2014.1)
    Icehouse on Ubuntu 12.04.4 (2014.1.1-5.0.1)
    Icehouse on CentOS 6.5 (2014.1.1-5.0.1)
    Icehouse on Ubuntu 12.04.4 (2014.1.1-5.1)
    Icehouse on CentOS 6.5 (2014.1.1-5.1)

The "2014.1.1" string in the third and fourth options
match the Icehouse release provided for Fuel 5.0.1.
The "2014.1" string in the first and second options
match the Icehouse release that was provided for Fuel 5.0.

If you did a fresh install of Mirantis OpenStack 5.0.1
rather than upgrading from 5.0,
you will only see the options for 5.0.1.
