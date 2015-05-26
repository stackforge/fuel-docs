
.. _fuel-install.rst:

Fuel Installation and Deployment Issues
=======================================

Resolved installation and deployment issues
-------------------------------------------

* Previously, VirtualBox scripts deleted all the host-only
  networks, regardless of what network parameters were used.
  Now it deletes the ``demo_hostonly`` networks only.
  See `LP1384976`_.


Known installation and deployment issues
----------------------------------------


.. Links
.. _`LP1384976`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1384976
