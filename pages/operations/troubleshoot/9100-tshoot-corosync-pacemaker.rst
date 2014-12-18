.. index:: HowTo: Troubleshoot Corosync/Pacemaker

How To Troubleshoot Corosync/Pacemaker
--------------------------------------

Pacemaker and Corosync come with several CLI utilities that can help you
troubleshoot and understand what is going on.

.. note::  In Mirantis OpenStack 6.0 and later,
           the **clone_p_neutron-l3-agent** resource is used
           instead of the **p_neutron-l3-agent**.
           This is in support of the Multiple L3 Agents feature
           that runs as many L3 agents as there are Controller nodes.
           L3 agents run in `clone` mode in the cluster,
           one instance per controller.
           This helps avoid the performance bottlenecks
           that could occur with only one L3 agent running in the environment.
           Rescheduling of networks is moved to Neutron server code,
           Neutron server code reschedules networks
           by automatically reassigning routers to L3 agents
           when it detects that a particular L3 agent is dead.

.. include:: /pages/operations/troubleshoot/9105-crm-resources.rst

