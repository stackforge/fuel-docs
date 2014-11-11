
.. raw:: pdf

  PageBreak

.. _mode-ha-ug:

High-availability (HA) or non-HA mode
-------------------------------------


.. image:: /_images/user_screen_shots/choose_deploy_mode.png
   :width: 50%

Choose between these two modes,
which are described on the screen
when they are selected:

- **Multi-node with HA** -- Deploys an OpenStack environment
  that is ready for :ref:`ha-term`.
  Three Controller nodes must be configured
  for the environment to be considered HA
  but you can deploy a single-controller node in this mode
  and :ref:`add controllers<add-controller-ops>`
  at a later time
  to implement High Availability.

- **Multi-node** -- Deploys an OpenStack environment that
  is managed by different services than an HA environment
  and must be redeployed to implement High Availability.

All new deployments should use the "Multi-node with HA" mode.
The "Multi-node" mode is retained for
backward compatibility
but is expected to be deprecated in an upcoming release.

