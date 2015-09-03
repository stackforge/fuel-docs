.. _ubuntu_bootstrap:

Deployment with Ubuntu 14.04 bootstrap
++++++++++++++++++++++++++++++++++++++

A deployment using Ubuntu 14.04 bootstrap with asynchronous device
initialization is now available as an :ref:`experimental feature
<experimental-features-term>`. Use it with caution. We do not
recommend applying Ubuntu 14.04 bootstrap if you use bare-metal nodes
on big OpenStack environments and/or if your deployment automation
relies on a persistent naming of network devices during the deployment
process.

Because Ubuntu 14.04 bootstrap uses asynchronous device
initialization, the naming of devices (in particular, network
interfaces) is not guaranteed to be persistent. If you re-install
Ubuntu 14.04 bootstrap on the same node, devices may randomly
switch names, depending on what device boots first. Only bare-metal
nodes are affected, as NICs on virtual nodes have constant
initialization time. See `LP1487044`_.

If you deploy an environment that uses bare-metal nodes with Ubuntu
14.04 bootstrap, check each node and manually reassign the networks
to the correct interfaces.

.. Links

.. _`LP1487044`: https://bugs.launchpad.net/mos/+bug/1487044
