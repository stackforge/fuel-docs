.. _mos61mu-1487517:

Status of alarms and queues is silently ignored in RabbitMQ monitoring OCF
==========================================================================

The resulting solution consists of two changes:

* Avoid deadlocking of RabbitMQ if there are no free memory resources left. See `LP1463433 <https://bugs.launchpad.net/bugs/1463433>`_.

* Make the OCF script ignore a small number of timeouts in rabbitmqctl
  for 'heavy' operations: ``list_channels``, ``get_alarms`` and ``list_queues``.
  See `LP1487517 <https://bugs.launchpad.net/bugs/1487517>`_ and `LP1479815 <https://bugs.launchpad.net/bugs/1479815>`_.

As a part of this change the default timeouts of monitor actions should be
changed in exististing deployments.

Affected packages
-----------------
* **CentOS/@6.1:** fuel-library6.1=6.1.0-6760.2
* **CentOS/@6.1:** fuel-ha-utils6.1=6.1.0-6760.2
* **Ubuntu/@6.1:** fuel-library6.1=6.1.0-6760.2
* **Ubuntu/@6.1:** fuel-ha-utils6.1=6.1.0-6760.2

Fixed packages
--------------
* **CentOS/@6.1:** fuel-library6.1=6.1.0-6761.2
* **CentOS/@6.1:** fuel-ha-utils6.1=6.1.0-6761.2
* **Ubuntu/@6.1:** fuel-library6.1=6.1.0-6761.2
* **Ubuntu/@6.1:** fuel-ha-utils6.1=6.1.0-6761.2

Patching scenario - Fuel Master node
------------------------------------

#. Run the following commands on Fuel Master node::

        yum clean expire-cache
        yum -y update fuel-library

Patching scenario - Ubuntu
--------------------------

#. Run the following commands on OpenStack Controller nodes::

        apt-get update
        apt-get install --only-upgrade fuel-ha-utils
        cibadmin --query > /root/cib.xml

#. Open the `cib.xml` file in the text editor and adjust the timeout to ``180``
   for the following monitor actions::

        p_rabbitmq-server-monitor-30
        p_rabbitmq-server-monitor-27
        p_rabbitmq-server-monitor-103

#. Increase the ``epoch`` option by one in the main section of `cib.xml`

#. Apply new configuration::

        cibadmin --replace --xml-file /root/cib.xml

#. Optionally, you may add a parameter to control how many retries there will be
   before the RabbitMQ server will be considered as non-functional and will be
   rebooted (by default ``N=1``)::

        crm_resource --resource p_rabbitmq-server --set-parameter \
        max_rabbitmqctl_timeouts --parameter-value N

   where ``N`` is the number of retries.

Patching scenario - CentOS
--------------------------

#. Run the following commands on OpenStack Controller nodes::

        yum clean expire-cache
        yum update fuel-ha-utils
        cibadmin --query > /root/cib.xml

#. Open the `cib.xml` file in the text editor and adjust the timeout to ``180``
   of the following monitor actions::

        p_rabbitmq-server-monitor-30
        p_rabbitmq-server-monitor-27
        p_rabbitmq-server-monitor-103

#. Increase the ``epoch`` option by one in the main section of `cib.xml`

#. Apply new configuration::

        cibadmin --replace --xml-file /root/cib.xml

#. Optionally, you may add a parameter to control how many retries there will be
   before the RabbitMQ server will be considered as non-functional and will be
   rebooted (by default ``N=1``)::

        crm_resource --resource p_rabbitmq-server --set-parameter \
        max_rabbitmqctl_timeouts --parameter-value N

   where ``N`` is the number of retries.

