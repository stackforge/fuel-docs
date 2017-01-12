.. _intro_install_overview:

Overview of the installation process
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Deployment of an OpenStack environment requires extensive planning.
To ensure a successful deployment, review and understand the following
requirements and sequence of tasks that you must complete.

#. Plan your OpenStack environment according to the official OpenStack
   guidelines and :ref:`Planning your environment <intro_planning>`.

#. Verify that your environment meets the recommendations in
   :ref:`System requirements <sysreq_intro>`.

#. Verify your hardware using the 
   :ref:`Hardware checklist <preinstall_chklist_hardware_checklist>`.

#. Determine whether the server on which you plan to install the Fuel
   Master node is connected to the Internet.

   * If the server does not have an Internet
     connection, then you must configure a local repository. For more
     information, see: :ref:`Set up a local repository <local-repo>`.

#. If you plan to install Fuel on VMware vSphere, verify that your environment
   meets the :ref:`VMware vSphere prerequisites <vsphere_intro>`

#. Download and install Fuel as described in :ref:`Install Fuel <install_intro>`
   or if you are installing on VMware vSphere in
   :ref:`Install Fuel on VMware vSphere <vsphere_intro>`.

#. Install the Fuel plug-ins, if needed. See: :ref:`Plug-ins <fuel-plugins>`.


