
.. _Murano_Components:

Murano Components
-----------------

Dashboard
+++++++++

Murano Dashboard can be reached as a link within the Horizon Dashboard
after the environment is deployed.
You may use the same credentials to log into Murano
as you use for Horizon (via Keystone).
From the Murano Dashboard, you can deploy configured Windows images.

Murano API
++++++++++

The Murano API provides the ability to manage applications in the OpenStack cloudsapplications in the OpenStack clouds.
For further reading, refer to `Murano API Specification <http://murano.mirantis.com/content/ch04.html>`_

Engine
++++++

The Murano orchestration engine transforms objects
sent by a REST API service (such as Dashboard)
into a series of Heat and Murano API commands.

