
.. _experimental-features-term:

Experimental features
---------------------

Mirantis OpenStack ships with experimental features
that you can enable and try out.
Experimental features provide functionality
that may be useful to some customers
but has not been subjected to the rigorous testing
that is required for environments
that need high levels of stability.

The following features are currently defined as experimental:

- Ability to apply minor updates to OpenStack environments
  within the same OpenStack major release;
  see :ref:`upgrade-patch-top-ug`.
  Mirantis OpenStack 6.0 is the first release based on Juno
  and so no upgrade is possible.

- OVS :ref:`bonding<bonding-term>`.

- Image-based provisioning.

- Ceilometer can use an external MongoDB installation.

Instructions for enabling experimental features
on a running Fuel Master node are provided in
:ref:`experimental-features-op`.


