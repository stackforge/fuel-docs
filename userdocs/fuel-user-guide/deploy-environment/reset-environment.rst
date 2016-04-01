.. index:: Reset an environment after deployment

.. contents :local:

.. _reset_environment:

Reset an OpenStack environment after deployment
-----------------------------------------------

You may want to reset an OpenStack environment after it was
successfully deployed, failed to deploy with an error, or
you have interrupted the deployment to modify the settings.
After you reset an OpenStack environment, Fuel reboots all
Fuel Slave nodes and returns them to the *Unallocated* state.

**To reset an OpenStack environment:**

#. In the Fuel web UI, click the :guilabel:`Dashboard` tab.
#. Click :guilabel:`Reset`.
#. Wait while Fuel reboots the nodes. The nodes must have the
   status :guilabel:`Online`.
#. Configure and deploy a new environment.
