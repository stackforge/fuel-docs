Setting up Environment
======================

For information on how to get source code see :ref:`getting-source`.

.. _nailgun_dependencies:

Preparing Development Environment
---------------------------------

.. warning:: Nailgun requires Python 2.7. Please check
    installed Python version using ``python --version``.

#. Get the source code::

    git clone https://github.com/openstack/fuel-web.git

#. Install and configure PostgreSQL database. Please note that
   Ubuntu 12.04 requires postgresql-server-dev-9.1 while
   Ubuntu 14.04 requires postgresql-server-dev-9.3::

    sudo apt-get install --yes postgresql postgresql-server-dev-all

    sudo sed -ir 's/peer/trust/' /etc/postgresql/9.*/main/pg_hba.conf
    sudo service postgresql restart

    sudo -u postgres psql -c "CREATE ROLE nailgun WITH LOGIN PASSWORD 'nailgun' CREATEDB"
    sudo -u postgres createdb nailgun

#. tox (see below) configuration requires openstack_citest db & user::

    sudo -u postgres psql -c "CREATE ROLE openstack_citest WITH LOGIN PASSWORD 'openstack_citest' CREATEDB"
    sudo -u postgres createdb openstack_citest

   If required, you can specify Unix-domain
   socket in 'host' settings to connect to PostgreSQL database:

   .. code-block:: yaml

       DATABASE:
            engine: "postgresql"
            name: "nailgun"
            host: "/var/run/postgresql"
            port: ""
            user: "nailgun"
            passwd: "nailgun"

#. Install pip and development tools::

    sudo apt-get install --yes python-dev python-pip libjpeg-dev


Setup for Nailgun Unit Tests
----------------------------

#. Nailgun unit tests use `Tox <http://testrun.org/tox/latest/>`_ for generating test
   environments. This means that you don't need to install all Python packages required
   for the project to run them, because Tox does this by itself.

#. Install the Tox package::

    pip install tox

#. Running tests is easy::

    tox -epy27
    tox -epep8

#. Tox reuses the previously created environment. After making some changes with package
   dependencies, tox should be run with **-r** option to recreate existing virtualenvs::

    tox -r -epy27

#. You can use `pytest <http://pytest.org/latest/usage.html>`_ directly in order to run particular test. --pdb option allows one to drop into the PDB prompt on every failure::

    .tox/py27/bin/py.test --pdb -vv nailgun/nailgun/test/integration/test_task_managers.py::TestTaskManagers::test_deletion_empty_cluster_task_manager

.. _running-parallel-tests-py:

#. Now tests can be run over several processes in a distributed manner; each test is executed within an isolated database::

    .tox/py27/bin/py.test -n 4 nailgun/nailgun/test


Running Nailgun Performance Tests
+++++++++++++++++++++++++++++++++

Now you can run performance tests using -x option::

   ./run_tests.sh -x


.. _running-nailgun-in-fake-mode:

Running Nailgun in Fake Mode
----------------------------

#. Create required folder for log files::

    sudo mkdir /var/log/nailgun
    sudo chown -R `whoami`.`whoami` /var/log/nailgun
    sudo chmod -R a+w /var/log/nailgun

#. Populate the database from fixtures::

    cd .tox/py27/bin/  # or you can use your own virtualenv
    ./manage.py syncdb
    ./manage.py loaddefault  # It loads all basic fixtures listed in settings.yaml
    ./manage.py loaddata ../../../nailgun/nailgun/fixtures/sample_environment.json  # Loads fake nodes

#. Download and run `UI server <https://github.com/openstack/fuel-ui.git>`_::

    git clone https://github.com/openstack/fuel-ui.git
    # follow README file in order to run Fuel UI

#. Start Nailgun in "fake" mode, when no real calls to task executor (Astute)
   are performed::

    ./manage.py run -p 8000 --fake-tasks | egrep --line-buffered -v '^$|HTTP' >> /var/log/nailgun.log 2>&1 &

#. (optional) You can also use --fake-tasks-amqp option if you want to
   make fake environment use real RabbitMQ instead of fake one::

    ./manage.py run -p 8000 --fake-tasks-amqp | egrep --line-buffered -v '^$|HTTP' >> /var/log/nailgun.log 2>&1 &

Nailgun in fake mode is usually used for Fuel UI development and Fuel UI
functional tests. For more information, please check out README file in
the fuel-ui repo.

Note: Diagnostic Snapshot is not available in a Fake mode.

Running the Fuel System Tests
-----------------------------

For fuel-devops configuration info please refer to
:doc:`Devops Guide </devdocs/devops>` article.

#. Run the integration test::

    cd fuel-main
    make test-integration

#. To save time, you can execute individual test cases from the
   integration test suite like this (nice thing about TestAdminNode
   is that it takes you from nothing to a Fuel master with 9 blank nodes
   connected to 3 virtual networks)::

    cd fuel-main
    export PYTHONPATH=$(pwd)
    export ENV_NAME=fuelweb
    export PUBLIC_FORWARD=nat
    export ISO_PATH=`pwd`/build/iso/fuelweb-centos-6.5-x86_64.iso
    ./fuelweb_tests/run_tests.py --group=test_cobbler_alive

#. The test harness creates a snapshot of all nodes called 'empty'
   before starting the tests, and creates a new snapshot if a test
   fails. You can revert to a specific snapshot with this command::

    dos.py revert --snapshot-name <snapshot_name> <env_name>

#. To fully reset your test environment, tell the Devops toolkit to erase it::

    dos.py list
    dos.py erase <env_name>


Flushing database before/after running tests
--------------------------------------------

The database should be cleaned after running tests;
before parallel tests were enabled,
you could only run dropdb with *./run_tests.sh* script.

Now you need to run dropdb for each slave node:
the *py.test --cleandb <path to the tests>* command is introduced for this
purpose.
