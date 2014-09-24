

.. _target-hdwr-reqs-plan:

Target Node Server Hardware Recommendations
-------------------------------------------

Determining the appropriate hardware
for the target nodes requires a good understanding
of the software that will be run on those nodes.
The OpenStack community documentation
provides basic guidelines:

- `Compute and Image System Requirements
  <http://docs.openstack.org/grizzly/openstack-compute/install/yum/content/compute-system-requirements.html>`_

- `System requirements for Object Storage
  <http://docs.openstack.org/trunk/install-guide/install/yum/content/object-storage-system-requirements.html>`_

The `OpenStack Operations Guide
<http://docs.openstack.org/openstack-ops/content/>`_
includes advice about
capacity planning and scaling
and should be read in conjunction with
this *Planning Guide*.

Other information is available
elsewhere in this documentation set:

- For information about assigning roles to nodes,
  see :ref:`nodes-roles-plan`.

- For information about storage requirements
  and other hardware issues
  for the :ref:`MongoDB<mongodb-term>` database
  that is used with :ref:`Ceilometer<ceilometer-term>`,
  see :ref:`ceilometer-mongodb-plan`.

- For general information about calculating hardware requirements,
  see :ref:`hardware-plan`.

To help determine the correct sizing for OpenStack Node servers,
use the `Mirantis Hardware Bill of Materials
calculator <https://www.mirantis.com/openstack-services/bom-calculator/>`__.

For more information on the logic used in the utility and basic directions,
see: “\ `How do you calculate how much hardware you need for
your OpenStack
cloud? <http://www.mirantis.com/blog/openstack-hardware-bom-calculator/>`__\ ”.
