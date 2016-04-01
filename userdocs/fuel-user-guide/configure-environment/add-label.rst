
.. _add-label-ug:

Label an OpenStack node
-----------------------

In large deployments, sorting nodes by roles may not be efficient. Therefore,
Fuel provides the capability to add custom labels to OpenStack nodes and later
sort and display the nodes with that label. For example, you can label nodes
located in one rack as *rack #1* and so on. Labels can be added and removed
before or after you deploy an OpenStack environment.

**Label an OpenStack node:**

#. Log in to the Fuel web UI.
#. Click :guilabel:`Nodes`.
#. Select a node or nodes that you want to label.
#. Click the label icon.
#. Click :guilabel:`Add label`.
#. Type a :guilabel:`Name` and :guilabel:`Value`.

   **Example:**

   * **Name:** Row
   * **Value:** 1

   .. note::
      You can have multiple labels with identical names and different
      values. However, you cannot assign labels with identical names
      and different values to one node. For example, you cannot assign
      label *Row 1* and *Row 2* to one node, but you can assign them to
      different nodes.
#. Click :guilabel:`Apply`.
