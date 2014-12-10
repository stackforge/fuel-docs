

.. _sahara-security-groups:

Ports Used by Sahara
--------------------

Sahara requires a list of TCP ports to be open for communication on private
network. Sahara can perform the necessary configurations using security-groups
mechanism. Make sure that the "Auto security group" check-box is enabled for
all node groups in a the cluster.

The post deployment checks will automatically update the default security group
before they start.
