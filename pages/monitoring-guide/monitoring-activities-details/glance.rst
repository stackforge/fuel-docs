.. _mg-glance:

Glance
------

Glance is the OpenStack service allowing users to upload and discover
data assets that are meant to be used with other services. This
currently includes images and metadata definitions used by the nova
service.

**Process checks**

.. list-table::
   :header-rows: 1
   :widths: 20 20 15 20 20
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - Dependencies
     - HA mode

   * - glance-api
     - 9292
     - controller
     - db, amqp
     - active/active

   * - glance-registry
     - 9191
     - controller
     - db, amqp, :ref:`storage <storage>`
     - active/active

.. _storage:

Glance can use different storage backends: Swift or Ceph that are
used by default in HA deployments.

|

**API checks**

Check the proper functioning of the API with a read operation.
Example:

* list images

  * GET /v1/images

A more intrusive test checks the complete creation of an image:

* create an image by uploading a small image (a few megabytes in size)

  * POST /v1/images

* get image details

  * GET /v1/images/{image_id}

* delete an image

  * DELETE /v1/images/{image_id}

|

**Collected Metrics**

.. list-table::
   :header-rows: 1
   :widths: 25 45 30
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - Number of active images public/private
     - poll API

       GET /v2/images
     - diag

       and/or alert:

       Too few active images could be the symptom of a deeper problem.

   * - Number of images per status (active, queued, saving)
     - poll API

       GET /v2/images
     - diag

   * - Total size of active images
     - poll API

       GET /v2/images?visibility=public&status=active
     - diag

   * - API errors
     - Logs

       All entries with HTTP 500 error code.

       Examples of a log entry containing a failed image upload error:

       2015-03-02 12:44:12.438 1212 INFO glance.wsgi.server
       [{request-id} {user-id} {tenant-id} - - -] 192.168.0.1
       - - [04/ Mar/2015 12:38:55] "POST /v1/images HTTP/1.1"
       **500** 877 49.117649
     - Alert:

       When a sudden spike of errors is detected.
