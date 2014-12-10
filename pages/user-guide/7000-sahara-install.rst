
.. _sahara-install:

Installing Sahara
=================

To install Sahara and run Hadoop in your OpenStack environment:

#. Select the "Install Sahara" check box on the Fuel UI screen
   or in the environment settings.

#. Download the appropriate pre-built image for Hadoop and upload it into Glance:

   See the :ref:`sahara-images` page to find a download link.

#. Register the image in the Sahara Image Registry. This can be done in
   Project -> Data processing -> Image Registry. Here click on 'Register Image'
   button. Specify the username appropriate to the image you use. Usernames
   can be found in :ref:`sahara-images`. Select the desired plugin and version
   from the dropdowns to add required tags.

#. Ensure that you have an adequate pool of floating IPs available:

 - If you are running Neutron networking or Nova-Network with
   **auto_assign_floating_ip** parameter set to false,
   you will need to provide a floating IP pool in each Node Group
   Template you define.

 - If you are running Nova-Network with **auto_assign_floating_ip**
   parameter set to true, you do not have to specify floating IP pool in
   Node Group Templates; the floating IPs are automatically assigned
   to each Hadoop cluster member.


- For information about planning your Sahara deployment,
  see :ref:`sahara-plan`.
- For advanced information about running and testing Sahara,
  see :ref:`sahara-deployment-label`.


