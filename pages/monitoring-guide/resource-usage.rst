.. _Monitoring-resource-usage:


Cloud Resources usage
=====================

Resources usage monitoring give the picture of the usage made by users and help for capacity planning. Also, the ability to distinguish usage by tenants for resources is a must.

It should typicaly answer questions:

- What is the resource usage of the cloud over the time ?
- Should I provision other computes node to manage increased demands of my cloud ?
- How many instances is running over the time ? Does my last optimisation on hypervisor reduce or increased my density of VM ?
- How many instances can I still provide ?
- Which tenant is consuming the most resources ?
- and so on

These stats can be acquired by several ways: polling services API, executing SQL requests on backends, or aggregate and compute these previous numbers.

Generally speaking, alert must be triggered when an exhaustion of resource is close and ideally, alert should contains all necessary context information or links to to explain and understand the event about to happen.

Virtual machine
---------------

number of VM: sum of VM running on all compute nodes

number of potential VM creation (per flavor): sum of free vcpu and RAM on all compute nodes

Network
-------

IP floating pool usage

Volume
------

number of volumes stored

rate of creation and deletion

space used versus space left on the cluster

Image
-----

number of images public/private

rate of upload and deletion


