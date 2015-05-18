.. _amqp-term:

AMQP (Advanced Message Queuing Protocol)
----------------------------------------

AMQP is an international standard for message-oriented middleware.
AMQP is a wire-level protocol,
meaning that it describes the format of the data that is transmitted,
so any tool that is AMQP compliant can generate and interpret messages
for any other AMQP compliant tool.

Mirantis OpenStack and Fuel use :ref:`rabbitmq-term`
as the AMQP compliant messaging interface.

For more information:

- :ref:`tshoot-amqp-ops` how to troubleshoot.

- The RabbitMQ site provides a nice
  `tutorial about AMQP <https://www.rabbitmq.com/tutorials/amqp-concepts.html>`_.

- For an architectural overview,
  see `AMQP and Nova <http://docs.openstack.org/developer/nova/devref/rpc.html>`_.

- `ISO/IEC 19464
  <http://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=64955>`_
  is the official standard.


