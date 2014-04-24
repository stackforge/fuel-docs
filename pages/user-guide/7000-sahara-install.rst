
.. _sahara-install:

Installing Sahara
=================

To install Sahara and run Hadoop in your OpenStack environment:

#. Select the "Install Sahara" check box on the Fuel UI screen
   or in the environment settings.

#. Download the appropriate pre-built image for Hadoop and upload it into Glance:

   - `For vanilla Hadoop: <http://sahara-files.mirantis.com/sahara-icehouse-vanilla-1.2.1-ubuntu-13.10 .qcow2>`_
   - `For HortonWorks Data Platform (HDP): <http://public-repo-1.hortonworks.com/sahara/images/centos-6_4-64-hdp-1.3.qcow2>`_

   More images for different distribution versions and operating systems
   can be found on the corresponding plugin page at
   `Sahara documentation <http://sahara.readthedocs.org/en/stable-icehouse/>`_

#. Register the image in the Sahara Image Registry. This can be done in
   Dashboard -> Sahara -> Image Registry. Here click on 'Register Image'
   button. For vanilla Hadoop image given above, specify username 'ubuntu'
   and tags 'vanilla' and '1.2.1'. For HDP image, specify username 'root' and
   tags 'hdp' and '1.3.2'.

#. Ensure that you have an adequate pool of floating IPs available:

 - If you are running Neutron networking or Nova-Network with
   **auto_assign_floating_ip** parameter set to false,
   you will need to provide a floating IP pool in each Node Group
   Template you define.

 - If you are running Nova-Network with **auto_assign_floating_ip**
   parameter set to true, you do not have to specify floating IP pool in
   Node Group Templates; the floating IPs are automatically assigned
   to each Hadoop cluster member.

#. Be sure that the appropriate ports are open for in-bound traffic.
   See :ref:`sahara-ports`.

- For information about planning your Sahara deployment,
  see :ref:`sahara-plan`.
- For advanced information about running and testing Sahara,
  see :ref:`sahara-deployment-label`.


