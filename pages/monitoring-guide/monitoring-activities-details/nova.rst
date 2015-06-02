.. _mg-nova:

Nova
----

Nova is the OpenStack service for Compute, a cloud computing fabric
controller, the main part of a cloud system. Nova is composed of
several processes, each assuring a particular function. The Nova
processes are distributed on the controller node(s) and compute
nodes.

**Process checks**

.. list-table::
   :header-rows: 1
   :widths: 25 20 10 20 25
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role
     - Dependencies
     - HA mode

   * - nova-api
     - HTTP 8774 (Nova API), 8773 (Nova EC2 API)
     - controller
     - amqp
     - active/active

   * - nova-scheduler
     - RPC
     - controller
     - amqp
     - active/active

   * - nova-conductor
     - RPC
     - controller
     - db, amqp
     - active/active

   * - nova-consoleauth
     - RPC
     - controller
     - amqp
     - active/active

   * - nova-console
     - RPC
     - controller
     - amqp
     - active/active

   * - nova-novncproxy
     - RPC
     - controller
     - amqp
     - active/active

   * - nova-cert
     - RPC
     - controller
     - amqp
     - active/active

   * - nova-compute
     - RPC
     - controller
     - libvirt
     - not available

**API checks**

Check the proper functioning of the API with a read operation.
Example:

* list of flavors

  * GET /v2/<tenant-id>/flavors


A more intrusive operation checks if it’s possible to create and
delete a keypair:

* create and delete a keypair

  * POST /v2/<tenant-id>os-keypairs '{"keypair": {"name": "test-mon"}}'
  * DELETE /v2/<tenant-id>os-keypairs/test-mon


|
| **Collected Metrics**

.. list-table::
   :header-rows: 1
   :widths: 25 45 30
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - Total number of instances in error state
     - poll SQL:

       select count(*) from instances where vm_state='error' and
       deleted=0

       or poll API:

       /v2/{tenant_id}/servers/detail/?all_tenant=1
     - diag

       That should probably not trigger an alert, since those errors
       may be due to the user mistakes.

   * - Total number of instances in running state
     - poll SQL:

       select count(*) from instances where deleted=0 and
       vm_state='active'

       poll API:
       /v2/{tenant_id}/servers/detail/?all_tenant=1
     - Alert:

       Too few running instances could a symptom of a deeper problem.

   * - Total number of instances per state, where state can be:
       ``deleted``, ``paused``, ``resumed``, ``rescued``, ``resized``,
       ``shelved_offloaded``, or ``suspended``.

     - poll SQL:

       select instances.vm_state, count(instances.id) from instances
       where deleted=0 group by vm_state

       or poll API:

       GET /v2/{tenant_id}/servers/detail/?all_tenant=1
     - diag

   * - Number of compute nodes in operational state
     - poll API
       GET /v2/{tenant_id}/os-services

       or SQL:

       select count(services.id) from services where disabled=0 and
       deleted=0 and services.binary = ‘nova-compute’ and
       timestampdiff(SECOND,updated_at,utc_timestamp())<60;
     - Alert:

       Too few running instances could a symptom of a deeper problem.

   * - Number of compute nodes in not operational state
     - poll API:
       GET /v2/{tenant_id}/os-services

       or SQL:

       select count(services.id) from services where disabled=0 and
       deleted=0 and services.binary = ‘nova-compute’ and
       timestampdiff(SECOND,updated_at,utc_timestamp())>60;
     - diag

   * - Number of services offline
     - poll API:
       GET /v2/{tenant_id}/os-services

       or poll SQL:
       select count(*) from services where disabled=1 and deleted=0
       and timestampdiff(SECOND,updated_at,utc_timestamp())>60
     - diag

   * - Number of services available per function: conductor,
       scheduler
     - poll API:
       GET /v2/{tenant_id}/os-services

       poll SQL:
       select services.binary, count(services.id) from services where
       disabled=0 and deleted=0 and timestampdiff
       (SECOND,updated_at,utc_timestamp())>60 group by
       services.binary;
     - diag

   * - Number of running instances per compute node
     - API:
       GET /v2/{tenant-id}/os-hypervisors/detail
     - diag

   * - Total number of VCPUs
     - poll SQL:

       select ifnull(sum(vcpus), 0) from compute_nodes where
       deleted=0

       poll API:
       /v2/​{tenant_id}​/os-hypervisors/statistics
     - diag

   * - Total number of VCPUs used
     - poll SQL:

       select ifnull(sum(vcpus), 0) from instances where
       deleted=0 and vm_state='active'

       poll API:
       /v2/​{tenant_id}​/os-hypervisors/statistics
     - diag

   * - Total number of free VCPUs
     - calculated from previous metrics

       poll API:
       /v2/​{tenant_id}​/os-hypervisors/statistics
     - Alert:

       Too few running instances could a symptom of a deeper problem.

   * - Total memory available
     - poll SQL:

       select ifnull(sum(memory_mb), 0) from compute_nodes where
       deleted=0

       poll API:
       /v2/​{tenant_id}​/os-hypervisors/statistics
     - diag

   * - Total memory used by instances
     - poll SQL:

       select ifnull(sum(memory_mb), 0) from instances where
       deleted=0 and vm_state='active'

       poll API:
       /v2/​{tenant_id}​/os-hypervisors/statistics
     - diag

   * - Total free memory
     - calculated from previous metrics

       or poll API:
       /v2/​{tenant_id}​/os-hypervisors/statistics
     - diag

   * - API response time
     - Logs:

       see :ref:`examples <examples_log_entries>` below

     - Alert:

       When the value is beyond standard deviation or top percentiles
       threshold depending on the data-points distribution.

   * - API errors
     - Logs:

       all entries with HTTP 500 error code

       Example:
       POST /v2/{tenant-id}/os-volumes_boot HTTP/1.1"
       status: 500 len: 354 time: 32.3032150
       #where status: 500 indicates error
     - Alert:

       When a sudden spike of errors is detected.

.. note::
   The main advantage of using SQL queries versus using API checks is
   execution speed and lower overhead. The disadvantage of using SQL
   queries is that your checks won’t work anymore when the SQL schema
   changes.

.. _examples_log_entries:

**Examples of log entries containing response times:**

Synchronous operations response time is logged in nova-api.log.
Example of *nova key pair* creation log entry:

  2015-03-02 12:33:59.898 6819 INFO nova.osapi_compute.wsgi.server
  [req-c0391ca2-e0e2-41bf-af64-0df222654620 None] 192.168.0.5
  "POST /v2/{tenant-id}/os-keypairs HTTP/1.1" status: 200
  len: 2473 time: **1.4112680**

HTTP response code is logged in nova-api.log. Example of an instance creation log entry:

  2015-03-02 12:43:59.898 6819 INFO nova.osapi_compute.wsgi.server
  [req-c0391ca2-e0e2-41bf-af64-0df222654620 None] 192.168.0.5
  "POST /v2/{tenant-id}/servers HTTP/1.1" status: **202**
  len: 780 time: 2.4308009

  # **202** (ACCEPTED) return code indicates the request has been
  accepted for processing.
