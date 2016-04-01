
.. _add-nodes-ug:

Add a node to an OpenStack environment
--------------------------------------

To deploy an OpenStack environment using the Fuel web UI, you must add at
least one controller node. However, for a fully functional cloud you must
allocate a sufficient number of compute and storage nodes.

An OpenStack node, or a node, is a physical or virtual server that you
provision to run a specific set of OpenStack services.

A role is a functional set of services that Fuel installs as a whole on a
node, usually in its own disk partition. Some roles can be combined in one
node.

The number of discovered unallocated and total nodes is displayed in the upper
right corner in the Fuel web UI.

For more information, see
*System Requirements* in *Fuel Installation Guide*.

**To add a node to an OpenStack environment:**

#. Log in to the Fuel web UI.
#. In the :guilabel:`Dashboard` tab, click :guilabel:`Add nodes`.
#. Assign a role or roles to the node by selecting the corresponding option.
#. In the list of discovered nodes, select a physical or virtual node to
   provision.
#. Optionally, display the node hardware configuration by clicking the
   :guilabel:`Settings` icon next to the discovered node.
#. Click :guilabel:`Apply Changes`.
#. Repeat step 2 - step 6 for all nodes that you want to include into this
   OpenStack environment.

   After you add nodes, Fuel enables you to deploy your OpenStack environment.
   However, you may need to apply additional changes to fully address your
   infrastructure requirements.

.. seealso::

   - *System requirements* in *Fuel Installation Guide*
   - :ref:`add-label-ug`
   - :ref:`change-hostname-slave-nodes`
