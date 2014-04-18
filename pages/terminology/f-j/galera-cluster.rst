.. _galera-cluster-term:

Galera Cluster for MySQL
------------------------
Galera is a synchronous multi-master cluster
for the MySQL database.
Mirantis OpenStack uses MySQL/Galera for HA deployments;
see the `FAQ <http://docs.mirantis.com/fuel/fuel-4.1/frequently-asked-questions.html#other-questions>`_
for more information.

By default, Fuel reassembles the Galera MySQL cluster automatically
without the need for any manual user intervention.

To disable the Galera `autorebuild feature`, run the following command::

  crm_attribute -t crm_config --name mysqlprimaryinit --delete

To re-enable the Galera `autorebuild feature`, run the following command::

  crm_attribute -t crm_config --name mysqlprimaryinit --update done

