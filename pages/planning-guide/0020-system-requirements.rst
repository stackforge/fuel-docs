.. contents:: :local:
  :depth: 3

.. index:: System Requirements

.. _hardware-reqs-plan:

System Requirements
===================

Fuel and Mirantis OpenStack run well on
high-quality commodity hardware.
The following sections give some basic information
about minimal hardware requirements;
choosing the right hardware requires an understanding
of how your cloud environment will be used.

Some general remarks:

- For optimal performance in production environments,
  configure enough servers and network adapters
  to minimize contention for resources in the environment.

- Understand the nature of the software that will run on your environment
  and configure the hardware appropriately.
  For example, an environment that mostly provides
  remote storage has different hardware requirements
  than an environment that is mostly used
  for extensive calculations.

- One Fuel Master node can manage multiple environments.
  If you need to support applications with very different hardware needs,
  consider deploying separate environments
  that are targeted to these needs;
  for example, deploy one environment that is optimized for data storage
  and another environment that is optimized for compute power.

- Select peripheral hardware that is supported
  by the operating system distribution
  that you are using for the environment nodes
  (see :ref:`linux-distro-plan`)
  and for the VM instances that will be deployed.


.. include:: /pages/planning-guide/0020-system-requirements/0022-master-hdwr.rst
.. include:: /pages/planning-guide/0020-system-requirements/0023-node-server-hardware-recommendations.rst
