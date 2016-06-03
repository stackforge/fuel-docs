
.. _plugin-node-roles:

Plugin node roles
-----------------

Defining a new role allows you to explicitly define all the tasks that run on
it.

Defining a new role is convenient if you need to run some services on
separate nodes:

* If you deploy a service with some specific hardware or security
  requirements.

* If your software conflicts with some of the packages installed on
  the existing roles

* If the tasks that you execute conflict with the existing tasks.

.. toctree::
   :maxdepth: 3

   create-plugin/plugin-node-roles/define-new-role.rst
   create-plugin/plugin-node-roles/volume-allocation.rst
   create-plugin/plugin-node-roles/hot-pluggable.rst
   create-plugin/plugin-node-roles/modify-ui.rst
   create-plugin/plugin-node-roles/plugin-repos.rst