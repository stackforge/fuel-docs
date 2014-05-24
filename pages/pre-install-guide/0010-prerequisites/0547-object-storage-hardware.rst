Object storage
++++++++++++++

When it comes to object storage, you will find that you need more space than 
you think.  For example, this example specifies 50 TB of object storage.  

Object storage uses a default of 3 times the required space for replication, 
which means you will need 150 TB. However, to accommodate two hands-off zones, 
you will need 5 times the required space, which actually means 250 TB. 
The calculations don't end there. You don't ever want to run out of space, so 
"full" should really be more like 75% of capacity, which means you will need a 
total of 333 TB, or a multiplication factor of 6.66.

Of course, that might be a bit much to start with; you might want to start 
with a happy medium of a multiplier of 4, then acquire more hardware as your 
drives begin to fill up. That calculates to 200 TB in our example. So how do 
you put that together? If you were to use 3 TB 3.5" drives, you could use a 12 
drive storage frame, with 6 servers hosting 36 TB each (for a total of 216 TB). 
You could also use a 36 drive storage frame, with just 2 servers hosting 108 TB 
each, but its not recommended due to the high cost of failure to replication 
and capacity issues.
