.. _mg-cinder:

Cinder
------

Cinder is the OpenStack service for block storage. It allows users
to manage block storage resources that could be attached to the
instances.

| **Process checks**

.. list-table::
   :header-rows: 1
   :widths: 20 20 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - Dependencies
     - HA mode

   * - cinder-api
     - 8776
     - controller
     - db, amqp
     - active/active

   * - cinder-scheduler
     - RPC
     - controller
     - amqp
     - active/active

   * - cinder-volume
     - RPC
     - storage-cinder
     - db, amqp, :ref:`storage <storage>`
     - active/active (Ceph backend)

       n/a (LVM backend)

.. _storage:

Cinder can use different block storage backends like LVM or Ceph.

| **API checks**

Check the proper functioning of the API with a read operation.
For example:

* list volume

  * GET /v2/{tenant_id}/volumes

A more intrusive test may want to check the complete creation of a volume:

* create a volume

  * POST /v2/{tenant_id}/volumes

* get volume details

  * GET /v2/{tenant_id}/volumes/{volume_id}​

* delete an volume

  * DELETE /v2/{tenant_id}/volumes/{volume_id}​

| **Collected Metrics**

.. list-table::
   :header-rows: 1
   :widths: 20 20 20
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - number of volumes in error state
     - poll SQL:

       select count(*) from volumes where status=’error’
     - Alert:

       When the value of error state ratio is beyond a certain
       threshold.

   * - number of volumes deleting
     - poll SQL:

       select count(*) from volumes where status='deleting'
     - diag

   * - number of snapshots in progress
     - poll SQL:

       select count(*) from snapshots where progress NOT LIKE '100%'
     - diag

   * - number of snapshots deleting
     - poll SQL:

       select count(*) from snapshots where status='deleting'
     - diag

   * - total number of volumes
     - poll SQL:

       select count(*) from volumes where deleted != 1;
     - diag

   * - total size of active volumes
     - poll SQL:

       select sum(size) from volumes where deleted != 1 and
       status = 'available';
     - diag

   * - API errors
     - Logs

       all entries with HTTP 500 error code
     - alert:

       When a sudden spike of errors is detected.
