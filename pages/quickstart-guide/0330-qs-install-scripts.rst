.. _qs_install_vbox_scripts:

Installing Mirantis OpenStack Using the Mirantis VirtualBox Scripts
===================================================================

To simplify the installation of Mirantis OpenStack and Fuel, Mirantis
provides a set of automated scripts. You can run the scripts in Linux,
in Mac OS, or in Windows using Cygwin.

Before running the installation script, execute the following actions
to the files and folders as needed:

* **iso**

  Place the Fuel ISO image into this directory. If the directory
  contains more than one ISO file, the installation script uses the
  most recent one.

* **config.sh**

  Use this configuration file to specify parameters that automate the
  Fuel installation. For example, you can select how many virtual nodes
  to create, as well as how much memory, storage, and CPU to allocate
  to each machine.

* Depending on the amount of memory on your computer, run one of the
  following deployment scripts:

  * launch.sh
    Use this script if you have at least 8GB of RAM on your computer.
    The script deploys the following configuration:

    - 1 Fuel Master node
    - 3 Fuel Slave nodes: 1 node - 2048Mb RAM, 2 nodes - 1024 Mb RAM

  * launch_8GB.sh
    Use this script if you have at least 8GB RAM on your computer.
    This script deploys the following configuration:

    - 1 Fuel Master node
    - 3 Slave nodes: 1536 MB RAM

  * launch_16GB.sh
    Use this script if you have at least 16GB RAM on your computer.
    This script deploys the following configuration:

    - 1 Fuel Master node
    - 5 Slave nodes: 2048 MB RAM

.. seealso::

   - :ref:`qs_prereq`
