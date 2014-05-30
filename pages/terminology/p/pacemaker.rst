
.. _pacemaker-term:

Pacemaker
---------
Master control process for OpenStack High Availability deployments.
Pacemaker is part of the :ref:`corosync-term` services
and is not specific to OpenStack.

See:

*  `What is Pacemaker? <http://clusterlabs.org/doc/en-US/Pacemaker/1.1/html-single/Clusters_from_Scratch/#_what_is_pacemaker>`_
   for a good discussion about Pacemaker and Corosync and how they are related.
*  `The Pacemaker Cluster Stack <http://docs.openstack.org/high-availability-guide/content/ch-pacemaker.html>`_
   discusses how Pacemaker is used with OpenStack.
*  `Pacemaker web page <http://clusterlabs.org/doc/>`_
   contains more in-depth information about Pacemaker.

Fuel uses Pacemaker to implement its :ref:`ha-term` deployment.
See:

- :ref:`pacemaker-corosync` discusses how Mirantis OpenStack
  uses Pacemaker and Corosync to implement :ref:`ha-term`.
- :ref:`crm-term` is the utility used to manage Pacemaker
