Introduction to Mirantis OpenStack Express 2014.1
=================================================

Mirantis OpenStack Express is a private Data Center
that you deploy in the Cloud
without investing in hardware or a full staff of cloud-savvy IT professionals.
You choose the size and characteristics of the servers you need
and pay only for what you use and the time you use them.
After the initial deployment,
you can add additional servers from your own Data Center Details dashboard.
Mirantis OpenStack Express deploys the stable Mirantis OpenStack distribution
of the open source technology with Fuel as the powerful cloud management tool.
In the first release, you can deploy a cloud using the following features and services:


* A multi-node environment.
  One server is the Fuel Master Node that is dedicated
  to running the Fuel management tool
  and at least one server is the Controller Node that runs the services
  that manage your cloud environment.
  The remaining nodes are typically deployed as Compute Nodes,
  which house your users VMs, or you may choose to create multiple environments,
  each with at least one Controller Node and one Compute Node;
  all these environments can be managed from one Fuel Master Node.

* Nova-network to connect the nodes.

* Horizon Dashboard for managing the OpenStack services.

* Keystone, the OpenStack Identity Service.
  Mirantis OpenStack Express configures
  the self-signed SSL certificates that are required;
  users can manually configure the SSL certificates after deployment.

In addition, you get the following:

* Your personal Data Center Details dashboard
  that displays information about usage and costs to date for your cloud
  and allows you to order additional servers as required.

* Mirantis manages your hardware; if a hardware device fails,
  Mirantis swaps in a new server for you.

* Full access to knowledgeable Mirantis support staff
  to help you realize the power of OpenStack.

The following Mirantis OpenStack features
are not supported in Mirantis OpenStack Express 2014.1:

* High-availability environment
* Neutron networking
* Remote and Object Storage Nodes using Cinder, Swift, and Ceph
  (which provides unified object, block, and file storage)
* Murano, Sahara, and Ceilometer services

