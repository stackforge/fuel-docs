.. _qs_install_scripts:

Installing Mirantis OpenStack Using Scripts
-------------------------------------------

The Mirantis VirtualBox scripts significantly simplify deployment of 
the OpenStack environment. The scripts install the Fuel Master node 
and Fuel Slaves nodes, which create a platform for the OpenStack 
components. You can install Mirantis OpenStack using the automated 
scripts on Microsoft Windows, MacOS, or Linux. 

If you are installing Mirantis OpenStack on Microsoft Windows, 
verify the following:

* Virtualization is enabled in BIOS
* You completed the steps described in :ref:`qs_scripts_run_windows`. 

**Procedure:**

1. On your computer, extract the Mirantis VirtualBox scripts in a 
   directory. 
2. Copy the Mirantis OpenStack ISO image to the iso folder.
3. Run the launch.sh, launch_8GB, or launch_16GB script.

   * If you use Microsoft Windows:
	
     1. Run Cygwin.
     2. In the Cygwin prompt, navigate to the directory where you 
        extracted the ``launch.sh`` file.
		
        **Example:**
		
        ::

          cd /cygdrive/c/Users/{name}/Desktop/virtualbox
		
     3.	Run the ``launch.sh``, ``launch_8GB``, or ``launch_16GB`` 
        script in Cygwin.
	
        **Example:**
		
        ::
		
          sh launch.sh
		
        The script installs the Fuel Master node on VirtualBox. 
        The installation may take up to 30 minutes. Do not turn 
        off your computer or interrupt the installation. When the 
        installation completes, in the Fuel Master node console, log 
        in using the built-in credentials.
     4. Proceed to :ref:`start-create-env-ug`.
	
.. seealso::

   - :ref:`qs_issues_linux`

