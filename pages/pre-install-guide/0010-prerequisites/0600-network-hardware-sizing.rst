Calculating Network
--------------------

Perhaps the most complex part of designing an OpenStack environment is the 
networking. 

An OpenStack environment can involve multiple networks even beyond the Public, 
Private, and Internal networks.  Your environment may involve tenant networks, 
storage networks, multiple tenant private networks, and so on. Many of these 
will be VLANs, and all of them will need to be planned out in advance to avoid 
configuration issues.

In terms of the example network, consider these assumptions:

* 100 Mbits/second per VM
* HA architecture
* Network Storage is not latency sensitive

In order to achieve this, you can use two 1 Gb links per server (2 x 1000 
Mbits/second / 17 VMs = 118 Mbits/second). 

Using two links also helps with HA. You can also increase throughput and 
decrease latency by using two 10 Gb links, bringing the bandwidth per VM to 
1 Gb/second, but if you're going to do that, you've got one more factor to 
consider.
