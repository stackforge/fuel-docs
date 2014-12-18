.. index:: HowTo: Troubleshoot Corosync/Pacemaker

.. _tshoot-corosync-ops:

How To Troubleshoot Corosync/Pacemaker
--------------------------------------

Pacemaker and Corosync come with several CLI utilities that can help you
troubleshoot and understand what is going on.

.. note::  In Mirantis OpenStack 6.0 and later,
           multiple :ref:`L3 agents<l3-agent-term>` are configured as clones,
           one on on each Controller.
           When troubleshooting Corosync and Pacemaker,
           the **clone_p_neutron-l3-agent** resource
           (new in 6.0) is used to act on all L3 agent clones in the environment.
           The **p_neutron-l3-agent** resource is still provided,
           to act on a specific resource on a specific Controller node;

.. include:: /pages/operations/troubleshoot/9105-crm-resources.rst

