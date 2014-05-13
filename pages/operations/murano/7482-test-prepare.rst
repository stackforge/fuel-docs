
.. _murano-test-prepare:

Preparing Murano for Testing
----------------------------

The platform tests are run in the tenant you've specified in
'OpenStack Settings' tab during OpenStack installation.
The 'admin' tenant is selected by default.

To prepare Murano for linux-based services deployment testing add Linux based image to Murano:

   * Create a Linux image with Murano agent.
     See `Murano documentation (Linux Image Builder) <http://murano-api.readthedocs.org/en/latest>`_

     (Please note, the Murano Image Builder documentation referenced here cannot guarantee success with image creation and could be outdated)

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

