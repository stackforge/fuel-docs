
.. _hardware-rn:

Hardware Support Issues
=======================

Known Hardware issues
---------------------

There are several known issues with the hardware support in Mirantis
OpenStack 6.1.

* HP BL120/320 RAID controller line is not supported.

  To get a nonstandard ISO, please :ref:`contact Mirantis <support-rn>`.

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

* Intel X710 CNA is not supported. See `LP1445562`_.

* Dell PER RAID H330/730/730P/830 controllers on bootstrap (kernel 3.10.55)
  are not supported. The custom ISO for the issue can be downloaded
  from `here`_. See `LP1420330`_.


.. Links:
.. _`LP1359331`: https://bugs.launchpad.net/fuel/+bug/1359331
.. _`HP storage`: https://launchpad.net/~hp-iss-team/+archive/ubuntu/hp-storage
.. _`hpvsa update`: https://launchpad.net/~hp-iss-team/+archive/ubuntu/hpvsa-update
.. _`LP1445562`: https://bugs.launchpad.net/fuel/+bug/1445562
.. _`LP1420330`: https://bugs.launchpad.net/fuel/+bug/1420330
.. _`here`: http://jenkins-product.srt.mirantis.net:8080/view/custom_iso/job/custom_6.0_iso/75/
