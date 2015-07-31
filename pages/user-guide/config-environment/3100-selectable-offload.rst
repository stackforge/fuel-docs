
.. raw:: pdf

  PageBreak

.. _selectable-offload:

Select offloading modes
-----------------------

You can select offloading modes for physical interfaces starting with
Fuel 7.0. The number of possible offloading types depends on the
interfaces' hardware.

Fuel automatically detects the offloading modes for any given physical
interface, which you can edit through Fuel Web UI or Fuel CLI.

Editing the offloading modes through Fuel CLI
+++++++++++++++++++++++++++++++++++++++++++++

#. On the Fuel Master node, dump the interfaces information using this
   :ref:`fuel CLI<fuel-cli-config>` command::

       fuel node --node <NODE_ID> --network --download

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

#. Edit the ``/root/node_1/interfaces.yaml`` file to enable, disable,
   or leave the default value next to the ``state`` field:

   * true - value for enabled offloading modes
   * false - value for disabled offloading modes
   * null - value for default offloading modes

#. Upload the modified file:
   ::

     fuel node --node <NODE_ID> --network --upload

   where <NODE_ID> points to a specific node identified by its ID
   (a number) that you can get by issuing the ``fuel nodes`` command.

Editing the offloading modes through Fuel Web UI
++++++++++++++++++++++++++++++++++++++++++++++++

In the Fuel Web UI click the "Nodes" tab, select a node, and click
"Configure Interfaces":

.. image:: /_images/user_screen_shots/ui_select_offloads01.png

On the "Configure interfaces" screen, click "Offloading Modes" Default":

.. image:: /_images/user_screen_shots/ui_select_offloads02.png

Edit the offloading types and click "Apply".
