.. _autotests-files:

Automation test files
---------------------

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