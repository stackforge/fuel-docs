
.. _name-distro-ug:

Name Environment and Choose Distribution
----------------------------------------

When you click on the "New OpenStack Environment" icon
on the Fuel UI, the following screen is displayed:

.. image:: /_images/user_screen_shots/name_environ.png
   :width: 50%

Give the environment a name
and select the Linux distribution from the drop-down list:

::

    Juno on Ubuntu 12.04.4 (2014.2-6.0)
    Juno on CentOS 6.5 (2014.2-6.0)

This is the operating system that will be installed
on the target nodes in the environment.
See :ref:`linux-distro-plan` for guidelines
about choosing the distribution to use.

The number in parentheses
is the version number for each environment version;
it is formed by concatenating the Juno Release number
and the Mirantis OpenStack Release number.
In this case, the "2014.2" string corresponds to the Juno release version;
the "6.0" string is the Mirantis OpenStack release number.

Note that the list displayed under the "Releases" tab
at the top of the Fuel home page
lists all the releases that Fuel 6.0 can manage
in your environment.
If you upgraded Fuel
from an earlier Mirantis OpenStack release,
Fuel 6.0 can manage environments that were previously deployed
using those releases.
It cannot, however, deploy a new environment using those releases.


