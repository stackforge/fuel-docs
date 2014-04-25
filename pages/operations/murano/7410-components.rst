
.. _Murano_Components:

Murano Components
-----------------

Dashboard
+++++++++

The Murano Dashboard is available after Murano is installed.
Use the same credentials to log into Murano
as you use for Horizon (via Keystone).
From the Murano Dashboard, you can manage the application catalog.

Murano API
++++++++++

The Murano API provides the ability to manage applications in the OpenStack clouds.
For further reading, refer to `Murano API Specification <http://murano.mirantis.com/content/ch04.html>`_

Engine
++++++

The Murano orchestration engine transforms objects
into a series of Heat and Murano API commands.
The Murano dashboard sends requests to the Murano API,
which sends these requests to the engine.

