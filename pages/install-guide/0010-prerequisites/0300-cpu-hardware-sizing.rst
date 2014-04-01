Calculating CPU
----------------

Use the following formula to calculate the number of CPU cores per virtual machine::

  max GHz /(number of GHz per core x 1.3 for hyper-threading)

Example::
 
  16 GHz / (2.4 x 1.3) = 5.12

Therefore, you must assign at least 5 CPU cores per virtual machine.

Use the following formula to calculate the total number of CPU cores::

  (number of VMs x number of GHz per VM) / number of GHz per core

Example::

  (100 VMs * 2 GHz per VM) / 2.4 GHz per core = 84

Therefore, the total number of CPU cores for 100 virtual machines is 84.

Depending on the selected CPU you can calculate the required number of sockets.
Use the following formula::

  total number of CPU cores / number of cores per socket

For example, you use Intel E5 2650-70 8 core CPU:: 

  84 / 8 = 11

Therefore, you need 11 sockets.
To calculate the number of servers required for your deployment,
use the following formula::
 
  total number of sockets / number of sockets per server

Round the number of sockets to an even number to get 12 sockets.
Use the following formula::

  12 / 2 = 6

Therefore, you need 6 dual socket servers.
You can calculate the number of virtual machines per server using the following formula::

  number of virtual machines / number of servers

Example::

  100 / 6 = 16.6

Therefore, you can deploy 17 virtual machines per server.

Using this calculation, you can add additional servers accounting for 17 virtual machines per server.

The calculation presumes the following conditions:

* No CPU oversubscribing

* If you use hyper-threading, count each core as 1.3, not 2.

* CPU supports the technologies required for your deployment

