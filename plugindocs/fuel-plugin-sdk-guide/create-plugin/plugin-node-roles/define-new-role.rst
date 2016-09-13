
.. _define-new-role:

Define a new role
-----------------

You must define a new role in ``node_roles.yaml``.

The automatically generated plugin contains one example role in the file,
but you can delete the contents of the file and start with a new role:

.. code-block:: ini

   fuel-plugin-example_role:
     name: Example plugin role
     description: Just a test role
     weight: 1000

The only required field besides the ID here is ``name``, but this is always
a good idea to provide some description of the role's purpose. The parameter
``weight`` defines relative placement of the role in the list of roles in the
Fuel web UI. Standard roles have weights from 10 to 100, with the weight 1000
your role will appear at the end of the list. You can look up the exact values
as well as the definitions for the standard roles at
`openstack.yaml on GitHub <https://github.com/openstack/fuel-web/blob/stable/8.0/nailgun/nailgun/fixtures/openstack.yaml#L9>`_ .

Like plugin tasks and unlike plugin settings, role definitions are affected by
the :command:`fuel --sync`` command and can be easily updated.

To verify that your new role is defined and can be assigned to new nodes use
the button :guilabel:`Add nodes` in the :guilabel:`Nodes` UI tab:
url ``http://<fuel ip>:8000/#cluster/<cluster id>/nodes/add``.

.. note:: Keep in mind that a plugin should be enabled for its roles to appear
          in the Fuel web UI.

You must define a new group for the tasks that belong to the new role in
:ref:`deployment_tasks.yaml`:

.. code-block:: ini

   - id: fuel-plugin-example_role
     type: group
     role: [fuel-plugin-example_role]
     tasks: [globals]
     parameters:
      strategy:
       type: parallel

The ID of the group must be the same as the ID of the new role. You define
the list of the core tasks, which run on the new role, in the field ``tasks``.
The parameter ``strategy`` is required and it defines how the deployment
should proceed if there are multiple nodes to be deployed with the role.

The possible values for ``strategy`` are:

* ``one-by-one`` -- all the nodes with the role will be deployed
                    sequentially, one after another

* ``parallel`` -- nodes will be deployed in parallel, at the same time

.. note:: Fuel 8.0 Maintenance Update 1 runs hooks on the target nodes with
          a new role even if you defined no tasks for the role. One of such
          hooks creates the file ``/etc/hosts`` on targets and it will fail
          with the error ``Could not find data item node_name_prefix_for_
          messaging in any Hiera data file and no default supplied at
          /etc/puppet/modules/osnailyfacter/modular/hosts/hosts.pp:6``
          if the task ``globals`` was not run before it. You should always add
          ``globals`` or the one that depends on it in the list of the tasks
          for a new role; the task ``global``, in turn, depends on tasks
          ``hiera``, ``setup_repostories``, and ``fuel_pkgs``, which provide
          some basic configuration of the node: for example, the ``hiera``
          task configures hiera, so all of the settings defined via the Fuel
          web UI are available through hiera.

The next step after determining core tasks that should be run on your role,
will be to define plugin tasks and the process is the same as the one that
described in :ref:`actions-existing-roles`. The only difference is that you
will use the ID of the new role in the task definition:

.. code-block:: ini

   - id: fuel-plugin-example-iotop
     type: puppet
     role: [fuel-plugin-example_role]
     requires: [post_deployment_start]
     required_for: [post_deployment_end]
     parameters:
      puppet_manifest: puppet/manifests/install_iotop.pp
      puppet_modules: puppet/modules:/etc/puppet/modules

The difference between the deployment of the nodes with the new role and the
pre-existing ones is that only the core tasks that you explicitly defined in
the tasks field of the role's group definition will run on the node with the
new role, while there is a predefined list of core tasks to run on the nodes
with pre-existing roles.

.. tip:: For debugging purposes, deploy the environment consisting only of
         the node with the role defined by a plugin. By default, you cannot
         deploy an environment without a controller from the Fuel web UI, so
         here is an example showing how to do this with the help of Fuel CLI:

         .. code-block:: console

            # fuel env create --name test-plugin-role-1 --rel 2
            Environment 'test-plugin-role-1' with id=3 was created!
            # id=`fuel env | grep test-plugin-role-1 | tr -d  ' ' \
              |cut -d\| -f1`
            # fuel --env $id settings download
            # awk -F: 'BEGIN {OFS = FS} $1 ~ "fuel-plugin-example" \
              { f=1 } f && $1 ~ "enabled" { f=0; $2=" true"} \
              { print } ' settings_${id}.yaml > tmp && mv \
              tmp settings_${id}.yaml
            # fuel --env $id settings upload
            # fuel --env $id node set --node 10 --role
              fuel-plugin-example_role
            Nodes [10] with roles ['fuel-plugin-example_role'] were added
            to environment 3
            # fuel --env $id deploy-changes

         This example does the following:

         * Creates a new environment.
         * Downloads the settings.
         * Changes the plugin to be enabled in the settings by changing the
           plugin ``enabled`` parameter from ``false`` to ``true`` through
           AWK.
         * Uploads the settings back to the Nailgun database.
         * Adds a new node with the role ``fuel-plugin-example_role`` to the
           environment.
         * Deploys this new environment consisting only of one node with the
           new role.

         You can create a new environment, enable the plugin in it, and add
         a single node with the new role from the Fuel web UI, using only the
         last command to deploy the environment then.