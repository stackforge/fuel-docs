
.. _sahara-install:

Installing Sahara
=================

To install Sahara and run Hadoop in your OpenStack environment:

#. Select the "Install Sahara" check box on the Fuel UI screen
   or in the environment settings.

#. Download, install, and deploy the appropriate pre-built image for Hadoop:

   - For vanilla Hadoop:  http://savanna-files.mirantis.com/savanna-0.3-vanilla-1.2.1-ubuntu-13.04.qcow2
   - For HortonWorks Data Platform (HDP): 

#. Ensure that you have an adequate pool of floating IPs available:

   - If you are running Neutron networking,
     provide a Floating IP pool in each Node Group Template you define.
   - If you are running Nova-Network,
     check the appropriate box 
     to set the **auto_assign_floating_ip** parameter to true.

#. Be sure that the appropriate ports are open for in-bound traffic.
   See :ref:`sahara-ports`.

- For information about planning your Sahara deployment,
  see :ref:`sahara-plan`.
- For advanced information about running and testing Sahara,
  see :ref:`sahara-deployment-label`.
