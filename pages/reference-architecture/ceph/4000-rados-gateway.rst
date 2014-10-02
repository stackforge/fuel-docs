
.. _ceph-rados-arch:

Deploy Ceph Object Gateway
--------------------------

Fuel deploys the optional Ceph Object Gateway component
(:ref:`radosgw<radosgw-term>`)
(which provides the S3 and Swift API frontend to Ceph)
behind HAProxy on controller nodes.

Each radosgw object is represented
as a sequence of fixed size stripes,
with each stripe stored in a separate RADOS object.
