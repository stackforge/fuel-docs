.. _autotests:

Prepare a testing environment
-----------------------------

You must configure a testing environment to ensure you plugin code quality.

Use the following resources to download test, examples, and instructions on
how to configure a testing environment:

* `Fuel tests <https://github.com/openstack/fuel-qa>`_.
* `Plugin test cases example <https://github.com/openstack/fuel-qa/blob/master/fuelweb_test/tests/plugins/plugin_example/test_fuel_plugin_example.py>`_.
* `Instructions on configuring an environment <https://docs.fuel-infra.org/fuel-dev/devops.html>`_.

Follow these additional guidelines on creating and formating your own tests:

* When creating your own test class, you must inherit this test class from the
  ``TestBasic`` class  in ``base_test_case.py``, where the Fuel web client
  initialization is performed.
* Each test class and method must be decorated with ``@test``.
* Each class in the test group has groups to run all test cases together
  and each test case has groups for a separate run.
* Test cases have the ``depends_on`` method or ``test`` which means that this
  test case does not run until the ``depends_on`` method or ``test`` is done.

**Prepare a testing environment**

#. Clone the ``fuel-qa`` Git repository:

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

      ./utils/jenkins/system_tests.sh -t test -w \
      $(pwd) -j fuelweb_test -i $ISO_PATH -o --group=setup

#. For additional information, type:

   .. code-block:: console

       ./utils/jenkins/system_tests.sh -h

.. toctree::
   :maxdepth: 3
   :hidden:

   autotests/autotests-workflow.rst
   autotests/autotests-files.rst
