.. _style-notes-fuel-plugins:

Creating documentation for Fuel Plugins
=======================================

Beginning with Fuel 6.0 release, you can create your own plugin
and certify it.
For certification procedure, you need to provide Mirantis
with the required package of documentation and the plugin itself.

As to the documentation, it consists of Plugin Guide, Test Plan and Test Report.
The section below contains style recommendations for creating Plugin Guide.

Plugin Guide
------------

Plugin Guide is targeted at those who would like to install the plugin, configure
and use it.

Terminology
+++++++++++

#. Explain all complex concepts.
   That means, you should put all terms, acronyms and abbreviations
   into a special table and explain them with giving a link to
   another resource or with deabbreviating them.

#. Use terms related to Fuel and Mirantis OpenStack correctly:

   +===================+=====================+
   | Incorrect usage   | Correct usage       |
   +===================+=====================+
   | Openstack         | OpenStack           |
   +-------------------+---------------------+
   | Mirantis Fuel     | Mirantis OpenStack  |
   |                   | Fuel                |
   +-------------------+---------------------+
   | Fuel UI           | the Fuel web UI     |
   +-------------------+---------------------+
   | plug-in           | plugin              |
   +-------------------+---------------------+
   | wizard            | the Fuel UI wizard  |
   +-------------------+---------------------+
   | the Fuel-node     | the Fuel Master node|
   | the Fuel master   |                     |
   +-------------------+---------------------+

#. Check if your plugin's name has only
   one writing variant along the text and does not change.. For example,
   HA fencing or HA Fencing.

Links
+++++

#. Put links to third-party documentation.
   For example, if the plugin requires backend configuration,
   then please add a reference into Prerequisites section.

#. Not all plugin users are well acquainted with Fuel.
   You should refer to the official Mirantis OpenStack
   documentation when describing standard actions:
   creating an environment, adding nodes, assigning roles to
   the nodes.

Screenshots
+++++++++++

#. All screenshots should meet their initial purpose:
   provide information on how to work with UI elements.
   That means, they must be of high quality and properly cropped.

#. If your plugin works only in a specific Fuel configuration
   (for instance, with Neutron as a Networking Setup), please
   provide a screeenshot with the selected option.

Lists
+++++

#. Use bullet lists for available options
   user can choose from.

#. Use numerated lists for step-by-step instructions when
   the order makes sense.

Describing user's actions
+++++++++++++++++++++++++


