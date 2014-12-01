
.. raw:: pdf

   PageBreak

.. _010-fuel-plugin-intro:

What Is Pluggable Architecture
==============================

Mirantis OpenStack 6.0 supports Pluggable Architecture.
This means, Fuel can be extended in a more flexible manner:
there is no need to apply patches manually after Fuel upgrade and support them.

You can create your own plugin, enable it in the Fuel web UI
and allow others use it.

Fuel plugins are divided into two groups: Verified and External.

Verified plug-ins are signed by Fuel-Core validation certificate and can be
regarded as Trusted.

External plug-ins can be tested or not. If tested, they are
signed by third party and Fuel-Core validation certificate and
can be regarded as Verified.

External plug-ins can be kept in their own repos.
For example, VPNaaS plug-in is located in  `Mirantis fuel-plugins <https://github.com/Mirantis/fuel-plugins>`_ repo.

For more information about Fuel plug-ins certification and proposed
workflow, see :ref:`plugin-cert`.

.. raw:: pdf

   PageBreak

.. include:: /pages/plugin-dev/020-fuel-plugin-dev.rst
.. include:: /pages/plugin-dev/030-fuel-plugin-dev-ui.rst


