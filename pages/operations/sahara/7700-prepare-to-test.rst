
.. _sahara_test_prepare:

Preparing Sahara for Testing
----------------------------

You can run Platform Tests to verify whether Sahara is functioning correctly.
To run the tests, Sahara must be deployed and configured.

You run the tests in the tenant you specified in the `OpenStack Settings` tab
during the OpenStack installation. By default, the `admin` tenant is used for
the tests.

You must have at least 4096 MB of available RAM in the tenant you are using
for Sahara Platform Tests otherwise some tests may fail.

To prepare Sahara for testing, you should get an image and register it
with Sahara image registry:

#. Download the `image with Hadoop for Sahara
   <http://sahara-files.mirantis.com/mos61/sahara-juno-vanilla-2.4.1-ubuntu-14.04.qcow2>`_

#. Register it with Sahara:

   a. Upload the image into Glance into the `admin` tenant. Name it `sahara`.

   b. In Horizon, access the `Data Processing` panel under the `Project` menu.

   c. Switch to the `admin` tenant.

   d. Go to the `Image Registry` menu.

   e. Click the `Register Image` button. The `Image registration` dialog
      appears.

   f. Select the image you have just uploaded.

   g. Set username to ``ubuntu``.

   h. Select the tags: ``plugin=vanilla`` and ``version=2.4.1``.

   i. Click ``Add plugin tags``.

   j. Click ``Done``.

Now you can test Sahara.

