
.. _experimental-features-term:

Experimental features
---------------------

Experimental features provide functionality
that may be useful to some customers
but has not been subjected to the rigorous testing
that is required for environments
that need high levels of stability.
The following technologies are currently defined as experimental:

- Zabbix

Instructions for enabling experimental features
on a running Fuel Master node are provided in
:ref:`experimental-features-ug`.

Alternatively, you can build a custom ISO
with the experimental features enabled:
::

    make FEATURE_GROUPS=experimental iso

