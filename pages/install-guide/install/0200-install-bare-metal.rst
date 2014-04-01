.. _Install_Bare-Metal:

Bare-Metal Environment
----------------------

To install Fuel on bare-metal hardware, you need to burn the provided ISO to 
a writeable DVD or create a bootable USB stick. You would then begin the 
installation process by booting from that media, very much like any other OS
install process.

Burning an ISO to optical media is a commonly supported function on all OSes. 
On Linux, there are several programs available, such as `Brasero` or `Xfburn`, 
two commonly pre-installed desktop applications. There is also
a number for Windows such as `ImgBurn <http://www.imgburn.com/>`_ and the 
open source `InfraRecorder <http://infrarecorder.org/>`_.

Burning an ISO in Mac OS X is quite simple. Open `Disk Utility` from 
`Applications > Utilities`, drag the ISO into the disk list on the left side 
of the window and select it, insert blank DVD, and click `Burn`. If you prefer 
a different utility, check out the open source `Burn 
<http://burn-osx.sourceforge.net/Pages/English/home.html>`_.

Installing the ISO to a bootable USB stick, however, is an entirely different 
matter. Canonical suggests `PenDriveLinux` which is a GUI tool for Windows.

On Windows, you can write the installation image with a number of different 
utilities. The following list links to some of the more popular ones and they 
are all available at no cost:

- `Win32 Disk Imager <http://sourceforge.net/projects/win32diskimager/>`_.
- `ISOtoUSB <http://www.isotousb.com/>`_.

After the installation is complete, you will need to make your bare-metal nodes
available for your OpenStack environment. Attach them to the same L2 network
(broadcast domain) as the Master node, and configure them to automatically
boot via network. The UI will discover them and make them available for 
installing OpenStack.
