.. _mos61mu-1487517:

Status of alarms and queues is silently ignored in RabbitMQ monitoring OCF
==========================================================================

The existing RabbitMQ monitoring OCF script is unreliable and may stop
the running RabbitMQ instance if "heavy" operations cause timeouts.
Also, the script is unable to determine the RabbitMQ deadlocking if there is
no free memory left.

The resulting solution consists of the following changes:

* Avoid deadlocking of RabbitMQ if there are no free memory resources left. See `LP1463433 <https://bugs.launchpad.net/bugs/1463433>`_.

* Make the OCF script ignore a small number of timeouts in rabbitmqctl
  for 'heavy' operations: ``list_channels``, ``get_alarms`` and ``list_queues``.
  See `LP1487517 <https://bugs.launchpad.net/bugs/1487517>`_ and `LP1479815 <https://bugs.launchpad.net/bugs/1479815>`_.

* Fix the error in the calculation of RabbitMQ memory consumption. See `LP1503331 <https://bugs.launchpad.net/bugs/1503331>`_.


As a part of this change, adjust the default timeouts of monitor actions in the deployed environment.

Affected packages
-----------------
* **CentOS/@6.1:** fuel-library6.1=6.1.0-6760.2
* **CentOS/@6.1:** fuel-ha-utils6.1=6.1.0-6760.2
* **Ubuntu/@6.1:** fuel-library6.1=6.1.0-6760.2
* **Ubuntu/@6.1:** fuel-ha-utils6.1=6.1.0-6760.2

Fixed packages
--------------
* **CentOS/@6.1:** fuel-library6.1=6.1.0-6762.2
* **CentOS/@6.1:** fuel-ha-utils6.1=6.1.0-6762.2
* **Ubuntu/@6.1:** fuel-library6.1=6.1.0-6762.2
* **Ubuntu/@6.1:** fuel-ha-utils6.1=6.1.0-6762.2

Patching scenario - Fuel Master node
------------------------------------

Run the following commands on the Fuel Master node::

        yum clean expire-cache
        yum -y update fuel-library

Patching scenario - Ubuntu
--------------------------

Run the following commands on OpenStack Controller nodes::

        apt-get update
        apt-get install --only-upgrade fuel-ha-utils

Patching scenario - CentOS
--------------------------

Run the following commands on OpenStack Controller nodes::

        yum clean expire-cache
        yum update fuel-ha-utils

Patching scenario - further actions
-----------------------------------

#. Run the following command on one of the OpenStack Controller nodes to edit the database of pacemaker::

        crm configure edit p_rabbitmq-server

#. Adjust the timeouts to 180 for the following monitor actions::

        op monitor interval=30 timeout=60
        op monitor interval=27 role=Master timeout=60
        op monitor interval=103 role=Slave timeout=60

   save the changes and quit the editor.

#. Optionally, you may add a parameter to control how many retries there will be
   before the RabbitMQ server will be considered as non-functional and will be
   rebooted::

        crm_resource --resource p_rabbitmq-server --set-parameter \
        max_rabbitmqctl_timeouts --parameter-value N

   where ``N`` is the number of retries, which is ``1`` by default and also is a recommended value.
