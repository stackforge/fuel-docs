
.. raw:: pdf

   PageBreak

.. _fuel-plugin-intro:

Plugin Development Guide
========================

What is Pluggable Architecture
------------------------------


Mirantis OpenStack 6.0 supports Pluggable Architecture.
This means, Fuel can be extended in a more flexible manner:
there is no need to apply patches manually after Fuel upgrade and support them.

You can create your own plugin, enable it in the Fuel web UI
and allow others use it.

Fuel plugins are divided into two groups: Core and Experimental.

*Core plugins*, `GlusterFS <http://www.gluster.org/documentation/About_Gluster>`_ and `LBaaS <https://wiki.openstack.org/wiki/Neutron/LBaaS/
PluginDrivers>`_ , are kept in `Stackforge fuel-plugins <https://github.com/stackforge/fuel-plugins>`_ repo.

*Experimental plugins* are created by Mirantis and third-party developers and kept in `Mirantis fuel-plugins <https://github.com/Mirantis/fuel-plugins>`_ repo.


.. include:: /pages/plugin-dev/fuel-plugin-dev.rst
.. include:: /pages/plugin-dev/fuel-plugin-dev-ui.rst


