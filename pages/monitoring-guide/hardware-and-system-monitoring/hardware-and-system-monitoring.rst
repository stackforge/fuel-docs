.. _mg-hardware-and-system-monitoring:

Hardware and System Monitoring
==============================

An effective monitoring solution for OpenStack should also monitor
the host operating system and the underlying infrastructure on top
of which your cloud is running.

As we stated earlier in this document, we are not going to address
the monitoring of the network and storage equipments, because these
topics are too broad and vendor specific to be addressed here. However,
we recommend that you perform some amount of server monitoring to
anticipate hardware failures using IPMI since it is a relatively
standard interface that is supported by most hardware vendors.

.. include:: /pages/monitoring-guide/hardware-and-system-monitoring/ipmi.rst
.. include:: /pages/monitoring-guide/hardware-and-system-monitoring/disks-monitoring.rst
.. include:: /pages/monitoring-guide/hardware-and-system-monitoring/operating-system-monitoring.rst
