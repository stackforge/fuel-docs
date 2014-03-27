Additional Checks
-----------------
If you have installed OpenStack to use a High Availability (HA) architecture
or have installed related OpenStack projects like Savanna or Murano,
additional tests will be shown. The following are the tests available
in HA mode:

* Check data replication over mysql
* Check amount of tables in os databases is the same on each node
* Check mysql environment state
* Check galera environment state
* RabbitMQ availability

Savanna and Murano tests are included in Platform Tests and are
described in the next section.
