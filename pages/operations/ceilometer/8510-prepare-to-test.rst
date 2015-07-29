
.. _ceilometer_test_prepare:

Preparing Ceilometer for Testing
--------------------------------

The Platform Tests that are run as a part of the Health Tests
test Ceilometer if the Environment is configured accordingly.
Before running the test,
please read the requirements below.

Note that the tests are run in the tenant
that you specify in the 'OpenStack Settings' tab
during the OpenStack installation.
By default, the `admin` tenant is used for the tests.

To run Ceilometer Platform Tests, you must have at least 6 GB
of RAM on controller nodes.

To run a test "Ceilometer test to check notifications
from Sahara", you must have at least 4096 MB of available RAM
in the tenant you are using for the Ceilometer Platform Tests,
or this test may fail. Also you must get an image with Hadoop
for Sahara and register it with Sahara. For instructions,
see the `Sahara deployment (Preparing Sahara for Testing)
<https://docs.mirantis.com/openstack/fuel/fuel-6.1/operations.html#preparing-sahara-for-testing>`_.

To run a test "Ceilometer test to check notifications
from Nova", you must have at least 100 MB of available RAM
in the tenant you are using for the Ceilometer Platform Tests,
or this test may fail.

If the requirements above are satisfied, Ceilometer is ready
to be tested.