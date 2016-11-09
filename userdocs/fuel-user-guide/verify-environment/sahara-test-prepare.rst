
.. _sahara-test-prepare:

Preparing the Hadoop cluster service for testing
------------------------------------------------

You can run the platform tests to verify that the Hadoop cluster (Sahara)
functions correctly.
To run the tests, Sahara must be deployed and configured.

You run the tests in the tenant you specified in the `OpenStack Settings` tab
during the OpenStack installation. By default, the `admin` tenant is used for
the tests.

You must have at least 4096 MB RAM available in the tenant
for Sahara platform tests. Otherwise, some tests may fail.

.. note::
   Sahara uses auto-security groups for opening required ports for each
   plugin. For more information, see the corresponding plugin documentation.

**To prepare Hadoop cluster for testing**

#. Download the `image with Hadoop for Sahara
   <http://sahara-files.mirantis.com/mos61/sahara-juno-vanilla-2.4.1-ubuntu-14.04.qcow2>`_

#. If you use VMware vSphere as a hypervisor for your OpenStack environment,
   convert the `qcow2` image format to `vmdk`:

   .. code-block:: console

      qemu-img convert -O vmdk <original_image>.qcow2 <converted_image>.vmdk

#. Register the image with Sahara:

   #. Upload the image into Glance into the `admin` tenant.

   #. Name the image `sahara`.

   #. In Horizon, navigate to :menuselection:`Projects --> Data Processing`.

   #. Switch to the `admin` tenant.

   #. Select :guilabel:`Image Registry`.

   #. Click :guilabel:`Register Image`.

      The `Image registration` dialog appears.

   #. Select the image you have just uploaded.

   #. Set username to ``ubuntu``.

   #. Select the tags: ``plugin=vanilla`` and ``version=<version>``.

   #. Click :guilabel:`Add plugin tags`.

   #. Click :guilabel:`Done`.

#. Proceed with testing the Hadoop cluster.

