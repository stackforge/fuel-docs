
.. _murano-test-prepare:

Preparing Murano for Testing
----------------------------

The platform tests are run in the tenant you've specified in
'OpenStack Settings' tab during OpenStack installation.
The 'admin' tenant is selected by default.

To prepare Murano for linux-based services deployment testing add Linux based image to Murano:

   * Download the following image:

     http://murano-files.mirantis.com/ubuntu_14_04-murano-agent_stable_juno.qcow2

     This VM image is usable whether the base operating system
     is Ubuntu or CentOS.

     Alternatively, if you would like to beuid your own Linux image,
     you can use the Murano agent,
     following the instructions in `Murano documentation (Linux Image Builder)
     <http://murano-api.readthedocs.org/en/latest/image_builders/index.html>`_.

     .. note::  the Murano Image Builder documentation referenced here
                cannot guarantee success with image creation and could be outdated.


   * Upload the image to the OpenStack Image Service (Glance) into the 'admin' tenant.

   * In the OpenStack Dashboard, switch to admin tenant if needed.

   * Open 'Murano' tab.

   * Navigate to 'Manage' submenu

   * Click the 'Images' menu.

   * Click 'Mark Image'. The Image registration window displays.

   * Select the Linux image with Murano Agent.

   * In the 'Title' field, set title for this image.

   * Select the 'Generic Linux' type.

   * Click 'Mark'.

Murano is ready for testing.

