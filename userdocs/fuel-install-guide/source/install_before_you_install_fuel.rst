.. _install_before_you_install_fuel:

Before you install Fuel
-----------------------

Before you install Fuel, verify that you have completed the following tasks:

#. Read and complete the tasks described in the following sections:

* :ref:`intro_install_overview`
* :ref:`sysreq_intro`

#. If you use bare-metal hardware, set up and connect all hardware.
#. If you use virtual hardware, configure all required virtual machines,
   network, and storage parameters.
#. Select a workflow:

* If you install Fuel on a server with an Internet connection, follow this
  workflow:

.. image:: /_images/deliverables/d_install_w_internet.png
   :width: 70%
   :align: center

* If you install Fuel on a server without an Internet connection, you must
  configure a local repository and modify the default Fuel repositories, so
  that Fuel installs the operating system packages from the local
  repositories. Therefore, follow this workflow:

.. image:: /_images/deliverables/d_install_wo_internet.png
   :width: 70%
   :align: center
