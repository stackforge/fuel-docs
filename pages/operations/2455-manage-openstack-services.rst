.. index:: HowTo: Manage OpenStack services

.. _manage-openstack-services-op:

HowTo: Manage OpenStack services
================================

#. Stop or start OpenStack services

   In order to get a full list of OpenStack services from the corresponding
   list of `OpenStack projects <http://git.openstack.org/cgit/openstack/governance/plain/reference/projects.yaml>`_
   and their statuses in SysV or Upstart use the following commands:

   On CentOS:
   ::

       services=$(curl http://git.openstack.org/cgit/open \
       stack/governance/plain/reference/projects.yaml |
         egrep -v 'Security|Documentation|Infrastructure' | \
         perl -n -e'/^(\w+):$/ && print "openstack-",lc $1,".*\$|",lc $1,".*\$|"')

       chkconfig --list | grep -oE $services | grep ':on'

   On Ubuntu, replace the last command to:
   ::

       initctl list | grep -oE $services | grep start


   Now you can start, stop, or restart the OpenStack services, see details about
   recommended order below.

   .. warning:: Fuel configures some services, like Neutron agents, Heat engine,
      Ceilometer agents, to be managed by Pacemaker instead of generic init
      scripts. These services should be managed only with the pcs or crm tools!

   In order to figure out the list of services managed by Pacemaker, you should
   first find disabled or not running services with the command:

   On CentOS:
   ::

       chkconfig --list | grep -oE $services | grep -v ':on'

   On Ubuntu:
   ::

       initctl list | grep -oE $services | grep stop

   Next, you should inspect the output of command ``pcs resource``
   (or ``crm resource list``) and find the corresponding services listed, if any.
   For example, if the 2nd chkconfig command reported on Centos OS:

   ::

       openstack-cinder-backup 0:off   1:off   2:off   3:off   4:off   ...
       openstack-cinder-volume 0:off   1:off   2:off   3:off   4:off   ...
       openstack-glance-scrubber       0:off   1:off   2:off   3:off   ...
       openstack-heat-engine   0:off   1:off   2:off   3:off   4:off   ...
       openstack-nova-console  0:off   1:off   2:off   3:off   4:off   ...
       openstack-nova-metadata-api     0:off   1:off   2:off   3:off   ...
       openstack-nova-xvpvncproxy      0:off   1:off   2:off   3:off   ...

       ...  5:off   6:off
       ...  5:off   6:off
       ...  4:off   5:off   6:off
       ...  0:off   5:off
       ...  0:off   5:off
       ...  4:off   5:off   6:off
       ...  4:off   5:off   6:off



   and the Pacemaker resources list is:
   ::

       vip__public    (ocf::fuel:ns_IPaddr2): Started
       Clone Set: clone_ping_vip__public [ping_vip__public]
           Started: [ node-2.test.domain.local node-3.test.domain.local ]
       vip__management        (ocf::fuel:ns_IPaddr2): Started
       Clone Set: clone_p_haproxy [p_haproxy]
           Started: [ node-2.test.domain.local node-3.test.domain.local ]
       Clone Set: clone_p_mysql [p_mysql]
           Started: [ node-2.test.domain.local node-3.test.domain.local ]
       Master/Slave Set: master_p_rabbitmq-server [p_rabbitmq-server]
           Masters: [ node-3.test.domain.local ]
           Slaves: [ node-2.test.domain.local ]
       Clone Set: clone_p_openstack-heat-engine [p_openstack-heat-engine]
           Started: [ node-3.test.domain.local ]
           Stopped: [ node-2.test.domain.local ]

   You may notice, that there is only a heat-engine service is managed by
   Pacemaker and disabled in OS. At any controller node, use the following
   command to start or stop cluster-wide:
   ::

       pcs resource enable clone_p_openstack-heat-engine
       pcs resource disable clone_p_openstack-heat-engine

   or with crm tool:
   ::

       crm resource start clone_p_openstack-heat-engine
       crm resource stop clone_p_openstack-heat-engine

#. Start, stop, restart order for OpenStack services.

   - Start/stop/restart keystone on every Controller.
   - Start/stop/restart neutron-server and agents on every Controller (if installed).

     .. note :: Use pcs or crm tools for corresponding services,
        when managed by Pacemaker

   - Start/stop/restart the remaining OpenStack services
     on each Controller and Storage node, in any order.

     .. note :: Use pcs or crm tools for corresponding services,
        when managed by Pacemaker

   - Start/stop/restart the OpenStack services on the Compute nodes, in any order.

#. Unmanage, manage services controlled by Pacemaker.

   In order to put a resource in uncontrolled state, use the following commands:
   ::

       pcs resource unmanage <some_resource_name>

   or with crm tool

   ::

       crm resource unmanage <some_resource_name>

   This will not stop the running resources.

   And to bring the resource back to be managed by Pacemaker:
   ::

       pcs resource manage <some_resource_name>

   or with crm tool

   ::

       crm resource manage <some_resource_name>

