.. raw:: pdf

   PageBreak

.. index: How Fuel Works

.. _How-Fuel-Works:

How Fuel Works
==============

Fuel is a ready-to-install collection of the packages and scripts you need 
to create a robust, configurable, vendor-independent OpenStack cloud in your 
own environment. Since Fuel 3.1, Fuel Library and Fuel Web have been merged 
into a single toolbox with options to use the UI or CLI for management. 

A single OpenStack cloud consists of packages from many different open source 
projects, each with its own requirements, installation procedures, and 
configuration management. Fuel brings all of these projects together into a 
single open source distribution, with components that have been tested and are 
guaranteed to work together, and all wrapped up using scripts to help you work 
through a single installation.

Simply put, Fuel is a way for you to easily configure and install an 
OpenStack-based infrastructure in your own environment.

.. image:: /_images/FuelSimpleDiagram.jpg
  :align: center

Fuel works by using a simple approach. Rather than installing each of the 
components that make up OpenStack directly, it instead uses a configuration 
management system (Puppet) to compile a set of instructions that can provide a 
configurable, reproducible, and sharable installation process.

In practice, Fuel works as follows:

1. First, set up Fuel Master node using the ISO. This process only needs to 
   be completed once per installation.

2. Next, discover your virtual or physical nodes and configure your 
   OpenStack environment using the Fuel UI.

3. Finally, deploy your OpenStack environment on discovered nodes. Fuel will 
   perform all deployment steps for you by applying pre-configured and 
   pre-integrated Puppet manifests via Astute orchestration engine.

Fuel is designed to enable you to maintain your environment, while giving you 
the flexibility to adapt it to your own business needs and scale.

.. image:: /_images/how-it-works.*
  :width: 100%
  :align: center

Fuel comes with several pre-defined deployment configurations, plus 
additional options that allow you to adapt your OpenStack deployment to your 
environment.

Fuel UI integrates all of the deployments scripts into a unified, web-based 
interface that walks administrators through the process of installing and 
configuring a fully functional OpenStack environment.
