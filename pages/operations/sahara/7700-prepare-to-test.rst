
.. _sahara_test_prepare:

Preparing Sahara for Testing
----------------------------

The Platform Tests that are run as part of the Health Tests
test Sahara if it is enabled in the Environment. Before running the test
you need to manually perform the actions listed below.

Note that the tests are run in the tenant you've
specified in 'OpenStack Settings' tab during OpenStack installation, so
that is where you need to perform the actions.
By default, 'admin' tenant is used for the tests.
Perform

#. Configure security groups for the tests.
   See :ref:`sahara-ports` for the details.

#. Get an image with Hadoop for Sahara and register it with Sahara.

   * Download the following image:

     http://sahara-files.mirantis.com/sahara-icehouse-vanilla-1.2.1-ubuntu-13.10.qcow2

   * Then upload the image into OpenStack Image Service (Glance) into
     'admin' tenant and name it 'sahara'.

   * In OpenStack Dashboard (Horizon) access 'Sahara' tab.

   * Switch to 'admin' tenant if you are not in it already.

   * Go to the ‘Image Registry’ menu. Here push ‘Register Image’ button.
     Image registration window will open up.

   * Select the image you’ve just uploaded.

   * Set username to ‘ubuntu’

   * For tags, pick ‘vanilla’ plugin and ‘1.2.1’ version and press
     ‘Add all’ button.

   * Finally push ‘Done’ button

After the steps above are done, Sahara is ready to be tested.
