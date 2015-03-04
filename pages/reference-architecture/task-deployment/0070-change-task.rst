.. _0070-change-task:

Swapping a task with a custom task
----------------------------------

To swap a task with a custom one,
you should change the path to the executable file:

.. code-block:: yaml

     - id: netconfig
       type: puppet
       groups: [primary-controller, controller, cinder, compute, ceph-osd, zabbix-server, primary-mongo, mongo]
       required_for: [deploy_end]
       requires: [logging]
       parameters:
           # old puppet manifest 
           # puppet_manifest: /etc/puppet/modules/osnailyfacter/netconfig.pp

           puppet manifest: /etc/puppet/modules/osnailyfacter/custom_netwrok_configuration.pp
           puppet_modules: /etc/puppet/modules
           timeout: 3600
