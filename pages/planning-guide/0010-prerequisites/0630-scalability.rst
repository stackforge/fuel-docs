Scalability and oversubscription
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It is one of the ironies of networking that 1 Gb Ethernet generally scales 
better than 10Gb Ethernet -- at least until 100 Gb switches are more commonly 
available. It's possible to aggregate the 1 Gb links in a 48 port switch, so 
that you have 48 x 1 Gb links down, but 4 x 10 Gb links up. Do the same thing with a 
10 Gb switch, however, and you have 48 x 10 Gb links down and 4 x 100b links up, 
resulting in oversubscription.

Like many other issues in OpenStack, you can avoid this problem to a great 
extent with careful planning. Problems only arise when you are moving between 
racks, so plan to create "pods", each of which includes both storage and 
compute nodes. Generally, a pod is the size of a non-oversubscribed L2 domain.
