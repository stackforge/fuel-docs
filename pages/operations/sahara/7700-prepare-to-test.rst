
.. _sahara_test_prepare:

Preparing Sahara for Testing
----------------------------

The Platform Tests are run as part of the Health Tests
that test Sahara if it is configured in the Environment.
Before runing the test,
you must manually perform the actions listed below.

Note that the tests are run in the tenant
that you specified in the `OpenStack Settings` tab
during the OpenStack installation,
so that is where you need to perform these actions.
By default, the `admin` tenant is used for the tests.

You must have at least 4096 MB of available RAM
in the tenant you are using for the Sahara Platform Tests
or some tests may fail.

#. Get an image with Hadoop for Sahara and register it with Sahara.

   * Download the following image:

     http://sahara-files.mirantis.com/mos61/sahara-juno-vanilla-2.4.1-ubuntu-14.04.qcow2

   * Upload the image into Glance into the `admin` tenant and name
     it `sahara`.

   * In Horizon access the `Data Processing` panel under the `Project` menu.

   * Switch to the `admin` tenant if you are not in it already.

   * Go to the `Image Registry` menu. Here, push the `Register Image` button.
     The `Image registration` dialog will open up.

   * Select the image you’ve just uploaded.

   * Set username to ``ubuntu``.

   * For tags, pick ``vanilla`` plugin and ``2.4.1`` version and press
     the ``Add plugin tags`` button.

   * Finally click the ``Done`` button

After the steps above are taken, Sahara is ready to be tested.

