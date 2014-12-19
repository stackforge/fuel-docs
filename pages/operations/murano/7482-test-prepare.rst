
.. _murano-test-prepare:

Preparing Murano for Testing
----------------------------

The platform tests are run in the tenant you've specified in
the 'OpenStack Settings' tab during OpenStack installation.
The 'admin' tenant is selected by default.

To prepare Murano for linux-based services deployment testing,
add a Linux based image to Murano:

   1. Download the following image:

      http://murano-files.mirantis.com/ubuntu_14_04-murano-agent_stable_juno.qcow2

      .. note:: This VM image is usable whether the base operating system
               is Ubuntu or CentOS.
               The base operating system of a Murano image
               is not related to the base operating system of the OpenStack environment;
               Ubuntu images can be run in a CentOS-based OpenStack environment
               and vice versa.

      If you would like to build your own Linux image,
      you can use the Murano agent.
      For instructions, see the `Murano documentation (Linux Image Builder)
      <http://murano-api.readthedocs.org/en/latest/image_builders/index.html>`_.

      .. note::  The instructions in the official Murano documentation
                may be outdated;
                following these instructions cannot guarantee success
                with image creation.


   2. Upload the image to the `admin` tenant
      in the OpenStack Image Service (Glance).

   3. Open the 'Murano' tab.

   4. Navigate to the 'Manage' submenu

   5. Click the 'Images' menu.

   6. Click 'Mark Image'. The Image registration window displays.

   7. Select the Linux image with the Murano Agent.

   8. In the 'Title' field, set the title for this image.

   9. Select the 'Generic Linux' type.

   10. Click 'Mark'.

Murano is ready for testing.

