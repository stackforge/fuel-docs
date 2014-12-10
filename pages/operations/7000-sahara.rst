
.. index:: Sahara Deployment


.. _sahara-deployment-label:


Sahara Deployment
=================

Sahara is a service for launching Hadoop clusters on OpenStack.
It is vendor-agnostic and currently supports the following distributions:

- Vanilla Apache Hadoop
- Hortonworks Data Platform (HDP)
- Cloudera Hadoop Distribution (CDH)
- Apache Spark

Sahara can install Hadoop clusters on demand.
The user must populate several parameters
such as the Hadoop version and cluster topology
and Sahara will deploy this cluster in a few minutes.
It can also scale the cluster by adding or removing nodes as needed.

- For Sahara usage guidelines, read the User Guide section of the
  `Sahara documentation <http://sahara.readthedocs.org/en/stable-juno/>`_.

- For more information about the pre-built images
  for Hadoop cluster provisioning, follow the documentation link above
  and look at the page for the appropriate plugin. The images are usually
  provided in a QCOW2 format which works with the default OpenStack
  hypervisors Qemu/KVM. If the cloud is installed with a different hypervisor
  the image should be converted to an appropriate format before being uploaded
  to Glance. The instructions for the Vmware Nova backend are here
  :ref:`sahara-vmware`.

- Planning considerations for running Sahara are in :ref:`sahara-plan`.
- Installation instructions for Sahara are in :ref:`sahara-install`

This section provides additional information
about running Sahara.


.. include:: /pages/operations/sahara/7600-security-groups.rst
.. include:: /pages/operations/sahara/7700-prepare-to-test.rst
.. include:: /pages/operations/sahara/7740-sahara-vmware.rst
.. include:: /pages/operations/sahara/7750-test-details.rst