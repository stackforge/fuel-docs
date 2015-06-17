
HA stability and scalability improvements
-----------------------------------------

Mirantis OpenStack 6.1 includes a number of internal enhancements to improve
the stability and scalability of the deployed environment:

* multi-node mode is deprecated and HA is now the only available option.

* it is possible to deploy a single HA controller, see the
  `Single Controller in HA <https://blueprints.launchpad.net/fuel/+spec/single-controller-ha>`_.

* Pacemaker and Corosync infrastructure is now updated with Corosync 2.x.
  See the related `blueprint <https://blueprints.launchpad.net/fuel/+spec/corosync-2>`_.

* the hardened rebuild of Linux HA-stack from Ubuntu Vivid is now introduced to add or 
  remove nodes dynamically. See `LP <https://bugs.launchpad.net/bugs/1394188>`_.

* the OSTF HA stack is improved: replication and message queue is checked in
  HA AMQP cluster. See `OSTF RabbitMQ replication <https://blueprints.launchpad.net/fuel/+spec/ostf-rabbit-replication-tests>`_ for more details.



