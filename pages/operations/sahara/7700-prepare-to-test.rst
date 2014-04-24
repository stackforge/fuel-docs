
.. _sahara_test_prepare:

Preparing Sahara for Testing
----------------------------

The Platform Tests that are run as part of the Health Tests
that test Sahara if it is configured in the Environment.
Before runing the test,
you must manually perform the actions listed below.

Note that the tests are run in the tenant
that you specified in the 'OpenStack Settings' tab
during OpenStack installation,
so that is where you need to perform these actions.
By default, the `admin` tenant is used for the tests.

#. Configure security groups in the 'admin' tenant for post-deployment checks.
   See :ref:`sahara-ports` for the details.

#. Get an image with Hadoop for Sahara and register it with Sahara.

   * Download the following image:

     http://sahara-files.mirantis.com/sahara-icehouse-vanilla-1.2.1-ubuntu-13.10.qcow2

   * Then upload the image into OpenStack Image Service (Glance) into
     the 'admin' tenant and name it 'sahara'.

   * In OpenStack Dashboard (Horizon) access 'Sahara' tab.

   * Switch to 'admin' tenant if you are not in it already.

   * Go to the ‘Image Registry’ menu. Here, push the ‘Register Image’ button.
     The Image registration window will open up.

   * Select the image you’ve just uploaded.

   * Set username to ‘ubuntu’

   * For tags, pick ‘vanilla’ plugin and ‘1.2.1’ version and press
     the ‘Add all’ button.

   * Finally push the ‘Done’ button

After the steps above are done, Sahara is ready to be tested.

