Preparing Murano for Testing
+++++++++++++++++++++++++++++

The platform tests are run in the tenant you've specified in
'OpenStack Settings' tab during OpenStack installation.
The 'admin' tenant is selected by default.

To prepare Murano for Windows-based services deployment testing:

1. Add Windows based image to Murano:

   * Create a Windows image with Murano agent.
     See `Murano documentation (Windows Image Builder) <http://murano-docs.github.io/latest/administrators-guide/content/ch03.html>`_

     (Please note, the Murano Image Builder documentation referenced here cannot guarantee success with image creation and could be outdated)

   * Upload the image to the OpenStack Image Service (Glance) into the 'admin' tenant.

   * In the OpenStack Dashboard, click the 'Project' tab.

   * Switch to admin tenant if needed.

   * Open 'Murano' tab.

   * Click the 'Images' menu.

   * Click 'Mark Image'. The Image registration window displays.

   * Select the Windows image with Murano agent.

   * In the 'Title' field, set title for this image.

   * Select the 'Windows Server 2012' type.

   * Click 'Mark'.

2. Add Linux based image to Murano:

   * Create a Linux image with Murano agent.
     See `Murano documentation (Linux Image Builder) <http://murano-docs.github.io/latest/administrators-guide/content/ch04.html>`_

     (Please note, the Murano Image Builder documentation referenced here cannot guarantee success with image creation and could be outdated)

   * Upload the image to the OpenStack Image Service (Glance) into the 'admin' tenant.

   * In the OpenStack Dashboard, click the 'Project' tab.

   * Switch to admin tenant if needed.

   * Open 'Murano' tab.

   * Click the 'Images' menu.

   * Click 'Mark Image'. The Image registration window displays.

   * Select the Linux image with Murano Agent.

   * In the 'Title' field, set title for this image.

   * Select the 'Generic Linux' type.

   * Click 'Mark'.

Murano is ready for testing.
