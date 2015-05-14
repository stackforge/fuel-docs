.. index:: Clone Env

.. _Upg_Clone:

Clone Environment settings
--------------------------

During upgrade, new Fuel environment of version 6.0 will be created with a copy
of Network parameters and Settings from the upgrade target environment of
version 5.1. Environment metadata is managed via Fuel API.

Service users and database credentials in a new configuration must be the same
as credentials in the original environment. To synchronize system credentials
between environments, you will need to copy generated data (including passwords)
from upgrade target environment to the new environment directly in the Nailgun
database. Follow the instructions in the section below to proceed.

Environment clone commands
++++++++++++++++++++++++++

Clone editable settings via Fuel API
____________________________________

Change to the working directory on the Fuel Master node:

::

    cd /root/octane/bin/

Use script ``octane/bin/clone-env`` provided with these instructions (see
section :ref:`Prepare Fuel Master<upg_prep>`) to clone Fuel settings from 5.1
environment to new 6.0 environment.

This script accepts a name of the original environment as an argument. Determine
the name using the following command:

::

    fuel env --env $ORIG_ID

Variable ``ENV_NAME`` contains actual name of 5.1.1 environment. Use flag
``--upgrade`` to update 5.1.1 parameters to 6.0 ones:

::

    export SEED_ID=$(./clone-env --upgrade $ENV_NAME)

This command will return ID of Seed environment created by script ``clone-env``.

Clone generated settings in Nailgun DB
______________________________________

Access credentials for every environment in Fuel are generated upon creation and
are unique. Use script ``octane/helpers/join-jsons.py`` and PostgreSQL client to
clone generated settings directly in Nailgun Database. To access Nailgun DB, you
will need to retrieve a password from Nailgun configuration file. Run the
following command to get the information:

::

    export NAILGUN_PASS=$(dockerctl shell nailgun \
        python -c "import yaml; \
        print(yaml.load(open('/etc/nailgun/settings.yaml'))['DATABASE']['passwd'])")

First command will create file ``generated.json`` with configuration for 6.0
environment. Second command updates the parameters of Seed environment in
Nailgun DB.

::

    pushd /root/octane/helpers/
    echo "select generated from attributes where cluster_id = $SEED_ID;
        select generated from attributes where cluster_id = $ORIG_ID;" | \
        psql -t postgresql://nailgun:$NAILGUN_PASS@localhost/nailgun | \
        grep -v ^$ | python ./join-jsons.py > /tmp/generated.json
    GENERATED=$(cat /tmp/generated.json)
    echo "update attributes set generated = '$GENERATED'
    where cluster_id = $SEED_ID;" | \
        psql -t postgresql://nailgun:$NAILGUN_PASS@localhost/nailgun

Now change back to ``/root/octane/bin`` directory:

::

    popd
