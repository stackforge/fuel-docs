.. _amqp-term:

AMQP (Advanced Message Queuing Protocol)
----------------------------------------

AMQP is an international standard for message-oriented middleware.
See the `ISO/IEC 19494 <http://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=64955>`_
standard for details.
AMQP is a wire-level protocol,
meaning that it describes the format of the data that is transmitted,
so any tool that is AMQP compliant can generate and interpret messages
for any other AMQP compliant tool.

Mirantis OpenStack and Fuel use :ref:`rabbitmq-term`
as the AMQP compliant messaging interface.
Other OpenStack implemenations use other AMQP options
such as ZeroMQ and Qpid.
