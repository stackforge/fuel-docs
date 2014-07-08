
.. _upgrade-ug:

Upgrade from an Earlier Version
===============================

Fuel 5.0.1 provides the first phase of the in-place upgrades
for Mirantis OpenStack.
If you have a functional Fuel 5.0 cloud environment,
you can install the 5.0.1 onto the Fuel Master Node.
After you do this, your new Fuel 5.0.1 Fuel console
can manage your existing 5.0 OpenStack environment(s)
as well as any new OpenStack environments
you might be using.

Note that this is the first phase of
the planned three-phase roll-out of in-place upgrade functionality.
The following functionality is not available for Fuel 5.0.1
but is planned for upcoming releases:

- Ability to upgrade OpenStack components on the Controlller,
  Compute, and Storage nodes.

- Ability to upgrade an OpenStack cloud environment
  that was deployed by Fuel
  to the current version of OpenStack.

To upgrade the Fuel Master Node
that manages an existing Mirantis OpenStack 5.0 cloud environment:

#. SHOULD WE ADVISE A BACKUP?
   DO THEY NEED TO SHUT DOWN THE CLOUD ENVIRONMENT?

#. Download the upgrade tarball from
   `<http://software.mirantis.com>`.

#. Copy the tarball [need file name] to a location on the
   Fuel Master Node disk that has adequate space, such as */var/tmp*:

    ::

       NEED COMMAND

#. Extract tarball contents to the same directory:

    ::

       cd /var/tmp
       tar -xf xxx.tar

#. Run upgrade script from that same directory:

    ::

       ./upgrade.sh

The upgrade process can take 30-60 minutes.
When it is complete,
the following message will appear on the Fuel UI:

   New release available: Icehouse on CentOS 6.5 (2014.1.1-5.0.1)
   [WILL THERE BE AN UBUNTU MESSAGE?  FUEL MASTER ONLY RUNS CentOS...]
