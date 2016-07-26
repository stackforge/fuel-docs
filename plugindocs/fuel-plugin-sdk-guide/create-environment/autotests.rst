.. _autotests:

Automation test cases and test framework
----------------------------------------

Recommendations:

* `Fuel tests <https://github.com/openstack/fuel-qa>`_.
* `Plugin test cases example <https://github.com/openstack/fuel-qa/blob/master/fuelweb_test/tests/plugins/plugin_example/test_fuel_plugin_example.py>`_.
* `Instructions on configuring an environment <https://docs.fuel-infra.org/fuel-dev/devops.html>`_.
* When creating your own test class, you must inherit this test class from the
  ``TestBasic`` class  in ``base_test_case.py``, where the Fuel web client
  initialization is performed.
* Each test class and method must be decorated with ``@test``.
* Each class in the test group has groups to run all test cases together
  and each test case has groups for a separate run.
* Test cases have the ``depends_on`` method or ``test``; this means that this
  test case does not run until the ``depends_on`` method or ``test`` is done.

**Prepare a testing environment**

#. Clone the GIT repository:

   .. code-block:: console

      git clone https://github.com/stackforge/fuel-qa

#. Activate the virtual environment:

   .. code-block:: console

      source ~/venv-nailgun-tests-2.9/bin/activate

#. Export the Fuel ISO:

   .. code-block:: console

      export ISO_PATH=path-to-iso

#. Go to ``fuel-qa``:

   .. code-block:: console

      cd fuel-qa/

#. Start the tests:

   .. code-block:: console

      ./utils/jenkins/system_tests.sh -t test -w\
      $(pwd) -j fuelweb_test -i $ISO_PATH -o --group=setup

For additional information on how tests work, run:

.. code-block:: console

    ./utils/jenkins/system_tests.sh -h

Main files and modules:

* ``system_tests.sh`` - The file where tests start execution. This file processes
  the parameters specified from the command line and invokes ``run_tests.py``.
* ``run_tests.py`` - Used to import your test files inside this file to run your
  test.
* ``settings.py`` - Contains environment variables used for environment
  customization. With this file, you can set such variables as path to ISO,
  nodes quantity, etc.
* ``environment.py`` - Contains methods for environment deploying, virtual machines
  creation and networking, installation of Fuel on the Fuel Master node, etc.
* ``nailgun_client.py`` - Contains functionality for nailgun handlers, methods and
  API that are supported by the nailgun client. The nailgun client uses the
  HTTP client that located in the ``helpers`` folder. The nailgun client is
  used in the Fuel web client.
* ``checkers.py`` - Has methods for the SSH client to verify nodes access.
* ``common.py`` - Has methods for OpenStack API access, instances creation, etc.
* ``decorators.py`` - Has different decorators; the most usable is
  ‘’log_snapshot_on_error’’; it is recommended to use this decorator for all
  tests, if any error diagnostic and environment snapshots will be created.
* ``os_actions.py`` - Has methods to work with OpenStack.

Test execution order:

#. Base test cases are executed: these are the tests that set up environment
   and install the Fuel Master node.
#. After passing these tests, snapshots are created which will be used by
   the tests for creating clusters.
#. Revert to the previously created snapshots.
#. Set up the cluster and deploy it.
#. Run OSTF.

For test execution debugging, use ``dos.py``.

To create a snapshot, run:

.. code-block:: console

   dos.py snapshot <myenv> --snapshot-name=<snapshot_name>

To revert a snapshot, run:

.. code-block:: console

   dos.py revert <myenv> --snapshot-name=<snapshot_name>