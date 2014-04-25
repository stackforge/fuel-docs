
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
making it available for other Murano services and to the user.

