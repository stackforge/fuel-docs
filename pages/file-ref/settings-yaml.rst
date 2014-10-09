
.. raw:: pdf

   PageBreak


.. _settings-yaml-ref:

settings.yaml
-------------

Fuel Master Node:
**/root/settings_x.yaml/**

The *settings.yaml* file contains
the current values for the information
on the :ref:`Settings<settings-ug>` page of the Fuel UI.

Usage
~~~~~

#. Dump provisioning information using this
   :ref:`fuel CLI<fuel-cli-config>` command::

       fuel --env 1 settings default

   where ``--env 1`` that to the specific environment
   (id=1 in this example).


#. Edit file.


#. Upload the modified file:
   ::

     fuel --env-1 settings upload


File Format
~~~~~~~~~~~

.. warning:: You should usually modify these values using the
             :ref:`Settings<settings-ug>` tab of the Fuel UI.

