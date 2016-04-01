
.. _change-hostname-slave-nodes:

Modify the Fuel Slave node host name
------------------------------------

You can modify host names of the Fuel Slave nodes before you deploy an
OpenStack environment. This functionality enables you to assign host names
that match your corporate standards or a naming convention of your choice.
You cannot change a host name of a Fuel Slave node after you deploy an
OpenStack environment.

**To modify the Fuel Slave node host name using Fuel web UI:**

#. Log in to the Fuel web UI.
#. Click the :guilabel:`Nodes` tab.
#. Click the settings icon next to the corresponding node.
#. Click the edit icon:

   .. image:: /_images/deliverables/scr_change_hostname.png
      :width: 60%

#. Type the new host name.
#. Click :guilabel:`Close`.

**To modify the Fuel Slave node host name using Fuel CLI:**

#. Log in to the Fuel Master node CLI.
#. Type:

   .. code-block:: console

      fuel node --node <NODE_ID> --hostname <NODE_HOSTNAME>

   .. list-table::
      :widths: 10 25
      :header-rows: 1

      * - Value
        - Description
      * - <NODE_ID>
        - A specific node indentificator. You can get the information about the
          node ID by typing:

          .. code-block:: console

             fuel nodes

      * - <NODE_HOSTNAME>
        - A new host name for the selected node.
