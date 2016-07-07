
.. _deployment-stages:

Pre- and post-deployment stages
-------------------------------

Fuel can execute tasks in the pre- or post-deployment stages.

For information on how to put tasks in a post-deployment stage, see
:ref:`actions-existing-roles`.

**To put a task in a pre-deployment stage**

Change the snippet:

.. code-block:: ini

   requires: [post_deployment_start]
   required_for: [post_deployment_end]

to

.. code-block:: ini

   requires: [pre_deployment_start]
   required_for: [pre_deployment_end]

.. note:: Fuel defines a number of tasks organised in a graph. Fuel traverses
          this graph during deployment; each task from the graph executes in
          its turn. See the in-depth description of the process in the
          *Modular Architecture* section of *Developer Guide*.

          We will call the tasks that are already defined by Fuel *core tasks*,
          as opposed to *plugin tasks*.

          The core tasks execute Puppet manifests from the directory
          ``/etc/puppet/modules/osnailyfacter/modular/`` on the target nodes.
          The entire ``/etc/puppet`` tree in turn syncs from the Fuel Master
          node to target nodes before the deployment.

          If you need to put plugin tasks in a specific position of the graph,
          examine the graph and determine the right place for your task. To get
          the graph, use the command :command:`fuel graph`. You can get the
          plain text representation of the graph in the
          `DOT <https://en.wikipedia.org/wiki/DOT_(graph_description_language)>`_
          format using the command
          :command:`fuel graph --env 1 --download > graph.gv`. After that you
          can generate the picture in the PNG format from it, using the
          command :command:`fuel graph --render graph.gv --tred`, ensure you
          install additional packages to the Fuel Master node with the
          following commands:

          .. code-block:: console

             yum install graphviz
             rpm -i https://www.dropbox.com/s/1fyv9p55kslbxkg/\
             python-pygraphviz-1.3-3.rc2.el7-mos1.x86_64.rpm

          The key ``--tred`` is optional, but it forces the graph to be
          `transitionally reducted <https://en.wikipedia.org/wiki/Transitive_reduction>`_,
          in other words -- much simpler.

          See a `sample graph generated for Fuel 8.0 Maintenance Update 1
          environment <https://www.dropbox.com/s/xbq9w018pvmbgbb/graph.gv.tred.png>`_.

**To put a task in a main deployment stage**

#. Change the keyword ``role`` to ``groups`` -- ensure the singular ``role``
   and the plural ``groups``. The keyword ``groups`` supports the list of
   roles on which the task runs as the value, but does not support the
   wildcard '*', so it is necessary to specify each role explicitly.

#. Specify a timeout in the parameters of the task, otherwise it will not run.

#. The start and the end of the main deployment stage are ``deploy_start``
   and ``deploy_end``. Do not confuse these with ``deployment_start`` and
   ``deployment_end``, which are the counterparts for other stages, not the
   main stage.

A working example for the main deployment stage:

.. code-block:: ini
   
   - id: fuel-plugin-example-iotop
     type: puppet
     groups: [primary-controller, controller, compute]
     requires: [deploy_start]
     required_for: [deploy_end]
     parameters:
       puppet_manifest: puppet/manifests/install_iotop.pp
       puppet_modules:  puppet/modules:/etc/puppet/modules
       timeout: 720

.. note:: For testing purposes, you can run not one task, but a range
          of them. To do this, use the following form of the command
          :command:`fuel node`:

          .. code-block:: console

             fuel node --node <node-id>--start <name of the first task>\ 
             --end <name of the last task> [ --skip <list of the
             tasks that should be skipped> ]

             For example, to make the task run between the main stage's tasks
             ``firewall`` and ``hosts``:

          .. code-block:: ini

             - id: fuel-plugin-example-iotop
               type: puppet
               groups: [compute]
               requires: [firewall]
               required_for: [hosts]
               parameters:
                 puppet_manifest: puppet/manifests/install_iotop.pp
                 puppet_modules:  puppet/modules:/etc/puppet/modules
                 timeout: 720

          To run a range of tasks from ``firewall`` to ``hosts``, skipping
          the tasks related to SSL, use the following command:

          .. code-block:: console

             fuel node --node 2 --start firewall --end hosts --skip \
             ssl-add-trust-chain ssl-keys-saving ssl-dns-setup
             Started tasks [u'firewall', u'fuel-plugin-example-iotop',
             u'hosts'] for nodes nodes [7].