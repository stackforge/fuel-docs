.. _0070-change-task:

Swapping a task with custom task
---------------------------------

It is just a matter of changing path to executable file.

.. code-block:: yaml

     - id: netconfig
       type: puppet
       groups: [primary-controller, controller, cinder, compute, ceph-osd, zabbix-server, primary-mongo, mongo]
       required_for: [deploy_end]
       requires: [logging]
       parameters:

           # puppet_manifest: /etc/puppet/modules/osnailyfacter/netconfig.pp

           /etc/puppet/modules/osnailyfacter/custom_netwrok_configuration.pp
           puppet_modules: /etc/puppet/modules
           timeout: 3600