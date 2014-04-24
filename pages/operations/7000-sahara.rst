
.. index:: Sahara Deployment


.. _sahara-deployment-label:


Sahara Deployment
=================

Sahara is a service for launching Hadoop clusters on OpenStack.
It is vendor-agnostic and currently supports two distributions:
Vanilla Apache Hadoop and Hortonworks Data Platform (HDP).

Savanna can install Hadoop clusters on demand.
The user must populate several parameters
such as the Hadoop version and cluster topology
and Savanna will deploy this cluster in a few minutes.
It can also scale the cluster by adding or removing nodes as needed.

- For Sahara usage guidelines, read the User Guide section of the
  `Sahara documentation <http://sahara.readthedocs.org/en/stable-icehouse/>`_.

- For more information about the pre-built images
  for Hadoop cluster provisioning,
  follow the documentation link above
  and look at the page for the appropriate plugin (vanilla or HDP).

- Planning considerations for running Sahara are in :ref:`sahara-plan`.
- Installation instructions for Sahara are in :ref:`sahara-install`

This section provides additional information
about running Sahara.


.. include:: /pages/operations/sahara/7600-ports.rst
.. include:: /pages/operations/sahara/7700-prepare-to-test.rst
.. include:: /pages/operations/sahara/7750-test-details.rst

