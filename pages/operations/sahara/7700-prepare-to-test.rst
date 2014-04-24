
.. _sahara_test_prepare:

Preparing Sahara for Testing
----------------------------

The Platform Tests that are run as part of the Health Tests
test Sahara if it is configured in the Environment.
These tests are run in the tenant
that you specified in the 'OpenStack Settings' tab
during OpenStack installation.
By default that is the 'admin' tenant.
You must do the following in that tenant before
you can run the Platform Tests that test Sahara:

Note that the checks are run in the tenant you've
specified in 'OpenStack Settings' tab during OpenStack installation, so
that is where you need to configure the default Security Group.
By default, 'admin' tenant is used for post-deployment checks.


#. Configure security groups in the 'admin' tenant for post-deployment checks.
   See :ref:`sahara-deployment-label` for the details.

#. Get an image with Hadoop for Sahara and register it with Sahara.

   * Download the following image:

     http://savanna-files.mirantis.com/savanna-0.3-vanilla-1.2.1-ubuntu-13.04.qcow2
     [need URL for HDP image]

   * Then upload the image into OpenStack Image Service (Glance) into
     'admin' tenant and name it 'savanna'.

   * In OpenStack Dashboard (Horizon) access 'Sahara' tab.

   * Switch to 'admin' tenant if you are not in it already.

   * Go to the ‘Image Registry’ menu. Here push ‘Register Image’ button.
     Image registration window will open up.

   * Select the image you’ve just uploaded.

   * Set username to ‘ubuntu’

   * For tags, pick ‘vanilla’ plugin and ‘1.2.1’ version and press
     ‘Add all’ button.

   * Finally push ‘Done’ button

#. Open the ports listed under "Required for Sahara post-deployment checks"
   in :ref:`sahara-ports` above.

After the steps above are done, Sahara is ready to be tested.

