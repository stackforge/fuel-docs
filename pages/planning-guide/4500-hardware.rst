
.. _hardware-plan:

Calculate hardware requirements
===============================

You can use the
`Fuel Hardware Calculator <http://www.mirantis.com/openstack-services/bom-calculator/>`_
to calculate the hardware required for your
OpenStack environment.

When choosing the hardware
on which you will deploy your OpenStack environment,
you should think about:

* **CPU** --  Consider the number of virtual machines
  that you plan to deploy in your cloud environment
  and the CPU per virtual machine.
  Also consider how the environment will be used:
  environments used for heavy computational work
  may require more powerful CPUs
  than environments used primarily for storage,
  for example.

* **Memory** -- Depends on the amount of RAM
  assigned per virtual machine and the controller node.

* **Storage** -- Depends on the local drive space per virtual machine,
  remote volumes that can be attached to a virtual machine,
  and object storage.

* **Networking** -- Depends on the :ref:`net-topology-plan`,
  the network bandwidth per virtual machine,
  and network storage.

See :ref:`hardware-calculation` for some specific calculations
you can make when choosing your hardware.
