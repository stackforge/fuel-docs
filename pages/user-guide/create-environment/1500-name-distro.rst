
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

    Juno on Ubuntu 14.04.4 (2014.2.2-6.1)
    Juno on CentOS 6.5 (2014.2-6.0)

This is the operating system that will be installed
on the target nodes in the environment.
See :ref:`linux-distro-plan` for guidelines
about choosing the distribution to use.

.. note:: Building an Ubuntu operating system image on the Fuel Master
          node requires a high-performance disk subsystem. It is
          strongly recommended for KVM users to use the cache='unsafe'
          attribute in the libvirt disks definitions when using
          KVM/QEMU VM for the Fuel Master node. Otherwise, building the
          image could take more than an hour and the deployment may
          fail due to the provision timeout.

          ::

            <disk type='file' device='disk'>
              <driver name='qemu' type='qcow2' cache='unsafe'
               io='native'/>
              <source file='/var/lib/libvirt/images/fuel-master.qcow2'/>
              <target dev='vda' bus='virtio'/>
              <address type='pci' domain='0x0000' bus='0x00' slot='0x09'
               function='0x0'/>
            </disk>

The number in parentheses
is the version number for each environment version;
it is formed by concatenating the Juno Release number
and the Mirantis OpenStack Release number.
In this case, the "2014.2" string corresponds to the Juno release version;
the "6.1" string is the Mirantis OpenStack release number.

Note that the list displayed under the "Releases" tab
at the top of the Fuel home page
lists all the releases that Fuel 6.1 can manage
in your environment.
If you upgraded Fuel
from an earlier Mirantis OpenStack release,
Fuel 6.1 can manage environments that were previously deployed
using those releases.
It cannot, however, deploy a new environment using those releases.


