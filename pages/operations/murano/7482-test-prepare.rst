
.. _murano-test-prepare:

Preparing Murano for Testing
----------------------------

The platform tests are run in the tenant you've specified in
the 'OpenStack Settings' tab during OpenStack installation.
The 'admin' tenant is selected by default.

To prepare Murano for linux-based services deployment testing,
add a Linux based image to Murano:

   #. Download the following image:

      http://murano-files.mirantis.com/ubuntu_14_04-murano-agent_stable_juno.qcow2

      If you would like to build your own Linux image,
      you can use the Murano agent.
      For instructions, see the `Murano documentation (Linux Image Builder)
      <http://murano.readthedocs.org/en/latest/image_builders/index.html>`_.

      .. note::  The instructions in the official Murano documentation
                may be outdated;
                following these instructions cannot guarantee success
                with image creation.


   #. Upload the image to the `admin` tenant
      in the OpenStack Image Service (Glance).

   #. Open the 'Murano' tab.

   #. Navigate to the 'Manage' submenu

   #. Click the 'Images' menu.

   #. Click 'Mark Image'. The Image registration window displays.

   #. Select the Linux image with the Murano Agent.

   #. In the 'Title' field, set the title for this image.

   #. Select the 'Generic Linux' type.

   #. Click 'Mark'.

Murano is ready for testing.

