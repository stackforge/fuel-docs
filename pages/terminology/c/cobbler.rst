
.. _cobbler-term:

Cobbler
-------

Cobbler is the provisioning service used
by :ref:`fuel-term` in Mirantis OpenStack 5.x and earlier releases.
The :ref:`astute-term` worker processes
populate user-defined configuration information for each OpenStack node.
When each node is rebooted,
Cobbler starts the operating system installer
with the user-configured settings.

For more information about how Cobbler is used in Fuel, see
:ref:`fuel-arch-dev`.
Also see the `Cobbler Web Page <http://www.cobblerd.org/>`_.
