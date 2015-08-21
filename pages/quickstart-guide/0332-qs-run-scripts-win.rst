.. _qs_scripts_run_windows:

Running the Mirantis VirtualBox Scripts on Microsoft Windows
------------------------------------------------------------
If you run the Mirantis VirtualBox scripts in Microsoft Windows, 
use Cygwin.

Install the following Cygwin packages:

* expect
* openssh
* procps

**Procedure:**

#. Go to https://www.cygwin.com.
#. Download Cygwin for Windows 64-bit (setup-x86_64.exe).
#. Launch Cygwin and follow the installation wizard.

   #. When prompted, in the **Select Packages** screen, choose the 
      required packages to install.
   #. Type the package name in the **Search** bar.
   #. Click on the search result.

      #. Click **Skip**.
      #. The **Skip** status changes to the version of the package. 
      #. Repeat **Step 1** – **Step 3** for all packages.
      #. Click **Next**.
         
         Cygwin installs on your computer. 
		
#. Proceed to :ref:`qs_install_scripts`.

.. seealso::

   - :ref:`qs_supported_os`
