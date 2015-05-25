.. _mg-swift:

Swift
-----

Swift is the OpenStack project, which provides highly available, distributed
and eventually consistent storage services for objects. It is used as a
storage backend to store Glance images.

Process Checks
++++++++++++++

.. list-table::
   :header-rows: 1
   :widths: 25 25 25 25 
   :stub-columns: 0
   :class: borderless

   * - Process name
     - Incoming connection
     - Role
     - HA mode

   * - swift-proxy-server
     - HTTP 8080
     - controller
     - active/active

   * - swift-object-replicator
     - RPC
     - controller
     - active/active

   * - swift-object-server
     - RPC 
     - controller
     - active/active

   * - swift-container-server
     - HTTP 6001
     - controller
     - active/active

   * - swift-container-replicator
     - RPC
     - controller
     - active/active

   * - swift-account-server
     - HTTP 6002
     - controller
     - active/active

   * - swift-account-replicator
     -  RPC
     - controller
     - active/active


API Checks
++++++++++

Check the availability of the service through synthetic HTTP transactions
against the Swift API endpoint:

* create a container
* upload a small object
* delete the container and object


Collected Metrics
+++++++++++++++++
The Swift project is made to collect metrics natively. Indeed, it is the only
OpenStack project that is natively instrumented to send metrics to `statsd`_ or
any statsd enabled data acquisition service like `Heka`_. It provides real-time
operational data about the object storage cluster activity and errors across
all components. Please check the documentation for further information about
how to enable statsd metrics in the `Swift developer documentation`_.




.. _`statsd`: https://github.com/etsy/statsd/
.. _`Heka`: https://github.com/mozilla-services/heka
.. _`Swift developer documentation`: http://docs.openstack.org/developer/swift/admin_guide.html#reporting-metrics-to-statsd


