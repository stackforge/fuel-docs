About Fuel and OpenStack Components
-----------------------------------

You can use Fuel to quickly deploy and manage the OpenStack environment.

Fuel includes the following components:

* **Master Node**
   The Fuel Master Node is the lifecycle management application for
   deployment and managing OpenStack. It sits outside the OpenStack
   environment and services as a control plane for multiple OpenStack
   envionments. 

* **Controller Node**
   A controller node that manages the OpenStack environment including
   deployment of additional controller and compute nodes, configuring
   network settings, and so on. For HA deployments, Mirantis recommends
   to deploy at least 3 controller nodes.

* **Compute Node(s)**
   A compute node is a server where you run virtual machines and 
   applications.
  
* **Storage Node(s)**
   Optional component. You can deploy a separate Swift or Ceph storage
   node. Mirantis recommends to deploy standalone storage nodes for high 
   availability environments. 
