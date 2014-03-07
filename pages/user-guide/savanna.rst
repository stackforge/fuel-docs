.. raw:: pdf

   PageBreak

.. index:: Savanna

Savanna deployment notes
===========================

.. contents :local:

Overview
--------

The goal of the Savanna project is to enable OpenStack users to easily
deploy Apache Hadoop clusters. Hadoop provides an implementation
of the MapReduce algorithm popular in the BigData community.

Savanna can install Hadoop clusters on demand. The user should only
provide several parameters like Hadoop version and cluster topology
and Savanna will deploy this cluster in a few minutes. It is also
capable of scaling the cluster by adding or removing nodes when needed.

Installation
------------

Savanna can be installed by selecting the Install Savanna check box either
in configuration wizard or in environment settings before deployment.
Savanna can be installed on all operating systems supported by Fuel.

Notes
-----

Savanna requires pre-built Hadoop images
and images for hadoop cluster provisioning
that are not included in Fuel
deployment.
Check the `documentation of the Savanna 0.3 project
<https://savanna.readthedocs.org/en/0.3/>`_ to find out how to
obtain these images, install them, and deploy them in your environment.
