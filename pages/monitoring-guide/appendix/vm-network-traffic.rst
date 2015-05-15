.. _mg-vm-network-traffic:

VM Network Traffic
------------------

The traffic across VMs can be monitored from the virtual
switches by enabling monitoring sampling with `sFlow`_ on
each Open vSwitch server.

The basic principle is to sample network traffic and send
all the samples to the `sFlow collector`_ for analysis.
Open source software supporting sFlow include `pmacct`_,
`Ganglia`_, and `Ntop`_.

NetFlow is a commercial standard embedded in many physical
devices with the main difference that it does not sampling
network traffic, which is more resource-intensive than sFlow
but also more accurate.


.. _`sFlow`: http://www.inmon.com/technology/
.. _`sFlow collector`: http://www.sflow.org/products/collectors.php
.. _`pmacct`: http://www.pmacct.net/
.. _`Ganglia`: http://ganglia.sourceforge.net/
.. _`Ntop`: http://www.ntop.org/
