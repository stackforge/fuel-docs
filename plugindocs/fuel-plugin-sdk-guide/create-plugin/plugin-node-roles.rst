
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

   plugin-node-roles/define-new-role.rst
   plugin-node-roles/volume-allocation.rst
   plugin-node-roles/hot-pluggable.rst
   plugin-node-roles/modify-ui-wizard.rst
   plugin-node-roles/plugin-repos.rst
