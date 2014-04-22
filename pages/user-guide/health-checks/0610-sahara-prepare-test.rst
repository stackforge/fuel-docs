Preparing Sahara for Testing
+++++++++++++++++++++++++++++
The platform tests are run in the tenant you've specified in
'OpenStack Settings' tab during OpenStack installation. By default that is
'admin' tenant. Perform in the that tenant the following actions:

1. Configure security groups in the 'admin' tenant for post-deployment checks.
   See :ref:`sahara-deployment-label` for the details.
2. Get an image with Hadoop for Sahara and register it with Sahara.

   * First download the following image:

     http://sahara-files.mirantis.com/sahara-0.3-vanilla-1.2.1-ubuntu-13.04.qcow2

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

After the steps above are done, the Sahara is ready to be tested.

