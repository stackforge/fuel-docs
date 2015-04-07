
Sahara-related Features
-----------------------

* Sahara panel in OpenStack Dashboard is moved to
  :menuselection:`Project -> Data Processing`.

* Support for CDH 5.2 is added.

* Support for Apache Spark 1.0.0 is added. Elastic
  data processing (EDP) engine is refactored a lot
  to support non-Oozie workflow engines.

* Support for Apache Hadoop 2.4.1 is added, and support
  for 2.3.0 is removed. So, altogether, MOS 6.1 supports
  Apache Hadoop 1.2.1 and 2.4.1.

* Support for HDP 1.3.2 is removed. Overall, MOS 6.1
  supports HDP 2.0.6 only.

* `Ceilometer integration`_ is added. Now Sahara notifies
  Ceilometer about all cluster state changes.
  See the `Integration with Ceilometer`_ blueprint for
  details.

* Cluster provisioning error handling is improved.
  If something goes wrong during scaling, cluster rolls back
  to its original state.

* An ability to `specify security groups for a node group`_
  is added. Also, Sahara can automatically create a security
  group with only the required ports open.
  See the `Cluster security groups`_ blueprint for details.



.. _`Ceilometer integration`: https://sahara.readthedocs.org/en/stable-juno/userdoc/configuration.guide.html#sahara-notifications-configuration
.. _`Integration with Ceilometer`: https://blueprints.launchpad.net/sahara/+spec/ceilometer-integration
.. _`specify security groups for a node group`: https://sahara.readthedocs.org/en/stable-juno/userdoc/features.html#security-group-management
.. _`Cluster security groups`: https://blueprints.launchpad.net/sahara/+spec/cluster-secgroups
