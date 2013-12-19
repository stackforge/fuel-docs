.. raw:: pdf

   PageBreak

.. index:: Murano

Murano Deployment Notes
==================================

.. contents :local:

Overview
--------

Fuel can deploy OpenStack and set up Murano, an open source project designed
to enable Windows virtual machines in OpenStack. Some highlights of Murano 
features include:

* Native to OpenStack
* Introduction of abstraction level for Windows Environments
* Support for Availability Zones and Disaster Recovery scenarios
* Use of native Windows features to provide HA solutions


Considerations
--------------

Because Microsoft Windows and other necessary components can only be obtained 
directly from Microsoft, Murano is still to some degree a do-it-yourself
project. Fuel is able to configure Murano's dashboard, API, and conductor 
services, but you will need to read documention on the steps to set up a 
Windows base image. Images can be uploaded via Glance. For information about 
creating a Windows image, see `Build Windows Image
<http://murano-docs.github.io/0.2.11/getting-started/content/ch03s03.html>`_.


.. _Installation_Steps:

Murano is installed in Fuel simply by checking the appropriate check box when
configuring your environment. Murano is supported in CentOS and Ubuntu.


.. _Murano_Components:

Murano Components
-----------------

Dashboard
+++++++++

Murano Dashboard can be reached after Fuel deployment as a link within Horizon 
Dashboard. You may use the same credentials to log into Murano as you use for 
Horizon (via Keystone). From the Murano Dashboard you can deploy configured 
Windows images.

Murano API
++++++++++

The Murano API provides the ability manage Windows Services. For further 
reading, refer to `Murano API Specification 
<http://murano.mirantis.com/content/ch04.html>`_

Conductor
+++++++++

Conductor is the Murano orchestration engine that transformes objects sent by
REST API service (such as Dashboard) into a series of Heat and Murano API
commands.

Metadata Repository
+++++++++++++++++++

This service stores information about deployment scenarios and workflow
making it aviable for other Murano services and to the user.

.. index:: Murano: Troubleshooting

Troubleshooting Murano
----------------------

There are no known issues with deploying Murano at the time of this writing,
but some issues are documented in `Murano Troubleshooting
<http://murano-docs.github.io/0.2.11/getting-started/content/ch05.html>`_.
