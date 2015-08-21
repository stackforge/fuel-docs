.. _qs_intro:

Introduction
============

Fuel is a deployment tool that simplifies instillation of Mirantis OpenStack (MOS). 
For testing, install Fuel on VirtualBox and use it to deploy the Mirantis OpenStack environment. 
You have the following options to deploy Fuel and the Mirantis OpenStack: 

* **Automated installation using the Mirantis VirtualBox scripts**
  When you install Mirantis OpenStack using the Mirantis VirtualBox 
  scripts, you do not need to configure the virtual machine network
  and hardware settings. The script provisions the virtual machines 
  with all required settings automatically. However, you may want to 
  configure the number of Fuel Slave Nodes using the config.sh 
  script, as well as copy the Mirantis OpenStack ISO image to the 
  iso directory.

  `Figure 1. Automated Installation Workflow`

.. image:: /_images/qsg/d_workflow1.png
   :scale: 70%
   :align: center

* **Manual Installation**
  When installing manually, you need to configure the virtual machine 
  settings according to the hardware and network prerequisites. 
  Mirantis recommends manual installation for evaluation only. 
  Use manual installation only if you cannot run the Mirantis 
  VirtualBox scripts for some technical or business reasons.  

  `Figure 2: Manual Installation Workflow`

.. image:: /_images/qsg/d_workflow2.png
   :scale: 75%
   :align: center

.. seealso::

     - :ref:`Prerequisites<qs_prereq>`
