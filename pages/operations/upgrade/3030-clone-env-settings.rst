.. index:: Clone Env

.. _Upg_Clone:

Clone Environment settings
++++++++++++++++++++++++++

During the upgrade, the new Fuel environment of version 7.0
will be created with a copy of Network parameters and Settings
from the upgrade target environment of version 6.1. The generated
configurations, like credentials of the service users, are also copied
from the original environment wherever possible.

Environment clone command
_________________________

Run the following command to create Upgrade Seed environment:

::

    octane upgrade-env ${ORIG_ID}

Store the ID of the Upgrade Seed environment displayed as a result of this
command into variable:

::

    export SEED_ID=<ID>
