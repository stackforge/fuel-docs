Remote storage
++++++++++++++

IOPS will also be a factor in determining how you plan to handle persistent 
storage. For example, consider these options for laying out your 50 TB of remote 
volume space:

* 12 drive storage frame using 3 TB 3.5" drives mirrored

  * 36 TB raw, or 18 TB usable space per 2U frame
  * 3 frames (50 TB / 18 TB per server)
  * 12 slots x 100 IOPS per drive = 1200 Read IOPS, 600 Write IOPS per frame
  * 3 frames x 1200 IOPS per frame / 100 VMs = 36 Read IOPS, 18 Write IOPS per VM

* 24 drive storage frame using 1TB 7200 RPM 2.5" drives

  * 24 TB raw, or 12 TB usable space per 2U frame
  * 5 frames (50 TB / 12 TB per server)
  * 24 slots x 100 IOPS per drive = 2400 Read IOPS, 1200 Write IOPS per frame
  * 5 frames x 2400 IOPS per frame / 100 VMs = 120 Read IOPS, 60 Write IOPS per frame

You can accomplish the same thing with a single 36 drive frame using 3 TB 
drives, but this becomes a single point of failure in your environment.
