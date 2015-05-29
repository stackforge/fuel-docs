.. _mg-haproxy:

HAProxy
-------

HAproxy is the HTTP load balancer in front of all OpenStack services
endpoints and a TCP load balancer for MySQL.

**Process checks**

.. list-table::
   :header-rows: 1
   :widths: 30 30 30 40
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connections
     - Role 
     - HA mode

   * - haproxy
     - All API requests through HTTP port and MySQL requests through TCP
       port
     - active controller
     - active/passive

Performing checks against the HAProxy process and VIP requires to
know what is the active (master) controller node in the
Corosync/Pacemaker cluster. This is detailed below in the
``Corosync/Pacemaker HA cluster`` section.

The active controller handles all the OpenStack services requests
through the HAProxy which in turn, distributes the load across the
API endpoints of the controller cluster.

**Collected Metrics**

It is critical to monitor the status of the *backend* from the point
of view of the HAProxy. A *backend* is in ``down`` state when all the
API endpoints behind the load-balancer are failed, and, therefore,
should be reported immediately to the operator in an alert.

.. list-table::
   :header-rows: 1
   :widths: 20 20 40
   :stub-columns: 0
   :class: borderless

   * - Metrics
     - Source
     - Purpose

   * - backend connections errors
     - haproxy socket
     - Alert: When a sudden spike of errors is detected.

   * - number of current sessions
     - haproxy socket
     - diag

   * - number of denied requests
     - haproxy socket
     - diag

       Can be useful for security audit

   * - number of denied responses
     - haproxy socket
     - diag 

       Can be useful for security audit

   * - bytes in/out
     - haproxy socket
     - diag

   * - max queued requests
     - haproxy socket
     - diag

   * - number of queued requests
     - haproxy socket
     - Alert: Beyond a certain threshold, the number of queued requests
       can be a symptom of a performance bottleneck in the workflow

   * - queue limit
     - haproxy socket
     - diag

   * - request errors
     - haproxy socket
     - Alert: When a sudden spike of errors is detected

The HAProxy provides a CLI to collect statistics for its *frontends*
and *backends*. `Several statistics`_ are available.

For example, you can use the command below to detect that the
*backend* is in ``down`` state. Here, the nova-api stopped
responding::

   echo "show stat" | socat /var/lib/haproxy/stats stdio | grep BACKEND /
   | awk -F , '{print 
   $1, $2, $18} | grep DOWN'
   nova-api node-10 DOWN

As another example, you can use the command below to get a list of
the API endpoints with their respective status::

   echo "show stat" | socat /var/lib/haproxy/stats stdio | grep BACKEND /
   | awk -F , '{print 
   $1, $2, $18} | grep UP'

   Stats BACKEND UP
   horizon BACKEND UP
   keystone-1 BACKEND UP
   keystone-2 BACKEND UP
   nova-api-1 BACKEND UP
   nova-api-2 BACKEND UP
   nova-metadata-api BACKEND UP
   cinder-api BACKEND UP
   glance-api BACKEND UP
   neutron BACKEND UP
   glance-registry BACKEND UP
   mysql BACKEND UP
   swift BACKEND UP
   heat-api BACKEND UP
   heat-api-cfn BACKEND UP
   heat-api-cloudwatch BACKEND UP
   nova-novncproxy BACKEND UP

With the command below, you can see that the **glance-api** endpoint
on node-7 and node-10 are ``down`` while the *backend* is still
``up``. However, the HA status of the Glance service as a whole is no
longer ensured and therefore should be reported immediately to the
operator in an alert.
 
.. code::

   echo "show stat" | socat /var/lib/haproxy/stats stdio | awk -F , '{print 
   $1, $2, $18}' | grep glance-api

   glance-api FRONTEND OPEN
   glance-api node-6 UP
   glance-api node-7 DOWN
   glance-api node-10 DOWN
   glance-api BACKEND UP

Finally, the command below can be used to collect all the HAProxy
statistics::

   echo "show stat" | socat /var/lib/haproxy/stats stdio



.. Links
.. _`Several statistics`: http://cbonte.github.io/haproxy-dconv/configuration-1.5.html#9




