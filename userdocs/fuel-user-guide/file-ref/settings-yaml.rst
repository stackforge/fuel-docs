
.. raw:: pdf

   PageBreak


.. _settings-yaml-ref:

settings.yaml
-------------

Fuel Master Node:
**/root/settings_x.yaml/**

The *settings.yaml* file contains
the current values for the information
on the Settings page of the Fuel UI.

Usage
+++++

#. Dump provisioning information using the following
   Fuel command:

   ::

       fuel --env 1 settings default

   where ``--env 1`` points to the specific environment
   (id=1 in this example).


#. Edit file.


#. Upload the modified file:
   ::

     fuel --env-1 settings upload


File Format
+++++++++++

Modify the Fuel settings using the Fuel web UI.
