.. _plug-in-term:

Plug-in
-------

Beginning with Mirantis OpenStack 6.0, our cloud deployment manager, Fuel, features the ability to install plug-ins when you deploy your environment. Plug-ins are downloadable software components that extend the functionality of your environments in a flexible, repeatable and reliable manner.
There is no need to install drivers and patches manually after Fuel deploys your cloud - plug-ins do this for you.

Plug-ins allow you to install and configure additional functionality for your cloud, such as additional storage types and networking functionality.   For example, a Load Balancing as a Service (LBaaS) plug-in allows you to add network load balancing functionality to your cloud so that incoming traffic can be spread across multiple nodes.  Or you might want to use a GlusterFS plug-in so that you can use a Gluster file system as backend storage for blocks (Cinder).

Plug-ins come in the following flavors:

* Compute - extend Nova

* Network - extend Neutron

* Storage - extend Cinder and Glance

* Operations - extend monitoring and logging

Plug-ins are also divided into two categories:

* *Certified*: certified plug-ins are thoroughly reviewed, tested and supported by Mirantis.

* *Non-Certified*: non-certified plug-ins are reviewed by Mirantis, but not supported or guaranteed.

All plug-ins, both certified and non-certified are digitally signed and hosted by Mirantis.

For more information about Fuel plug-ins, visit `<https://software.mirantis.com/fuel-plugins>`_.