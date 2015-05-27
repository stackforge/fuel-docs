
.. _hardware-rn:

Hardware Support Issues
=======================

Known Hardware issues
---------------------

**HP BL120/320 RAID controller line is not supported.**

To get a non-standard kernel ISO, you should :ref:`contact Mirantis
<support-rn>`.

Note that it is impossible to update the kernel if there are no drivers
for this version. This happens because the source code for the hpvsa
module is not open, and HP publishes the hpvsa binaries only for specific
kernel versions. They do not always coincide with those used in Fuel
with Ubuntu.

Currently, no equipment for testing is available, and the testing itself
can not be performed due to the closed HP VSA source code.
ISO may be assembled only for kernel versions specified by HP.

See `LP1359331`_ for the details.

For information about kernel modules that are compiled for specific kernel
versions, see `HP storage`_ and `hpvsa update`_.


.. Links:
.. _`LP1359331`: https://bugs.launchpad.net/fuel/+bug/1359331
.. _`HP storage`: https://launchpad.net/~hp-iss-team/+archive/ubuntu/hp-storage
.. _`hpvsa update`: https://launchpad.net/~hp-iss-team/+archive/ubuntu/hpvsa-update
