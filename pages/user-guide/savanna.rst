.. raw:: pdf

   PageBreak

.. index:: Sahara

Sahara deployment notes
===========================

.. contents :local:

Overview
--------

The goal of the Sahara project is to enable OpenStack users to easily
deploy Apache Hadoop clusters. Hadoop provides an implementation
of the MapReduce algorithm popular in the BigData community.

Sahara can install Hadoop clusters on demand. The user should only
provide several parameters like Hadoop version and cluster topology
and Sahara will deploy this cluster in a few minutes. It is also
capable of scaling the cluster by adding or removing nodes when needed.

Installation
------------

Sahara can be installed by selecting the Install Sahara check box either
in configuration wizard or in environment settings before deployment.
Sahara can be installed on all operating systems supported by Fuel.

Notes
-----

Sahara requires pre-built images for Hadoop cluster provisioning
that are not included in the Fuel deployment.
Check the `documentation for the 0.3 version of the Sahara project
<https://sahara.readthedocs.org/en/0.3/>`_ to find out how to
obtain these images, install them, and deploy them in your environment.
