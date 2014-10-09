
Sahara can run in vCenter environment
-------------------------------------

Sahara can run in a :ref:`vCenter<vcenter-term>` environment, allowing vCenter
to be used for running :ref:`Hadoop<hadoop-term>`. Cluster provisioning,
attaching :ref:`Cinder<cinder-term>` volumes, and
:ref:`Swift<swift-object-storage-term>` Hadoop integration (including the
:ref:`Ceph<ceph-term>` Swift interface that allows Ceph to be used as the
storage backend for HDFS file systems) have been implemented and tested. 
For instructions building and converting images for vCenter, see
`Building Images for Vanilla Plugin <http://sahara.readthedocs.org/en/stable-juno/userdoc/diskimagebuilder.html>`_.
