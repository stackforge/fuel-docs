Configuration Tests Description
-------------------------------

Configuration tests verify if default user data(
like username. password wot Openstack cluster) were changed.
The following is a description of each test available:

* Check usage of default credentials(password)
  for root user to ssh on master node.
  In case if default password was not changed,
  test fails with kindly recommendation to change it
* Check usage of default credentials for Openstack cluster
  If default values are using for admin user,
  test fails with kindly recommendation to
  change password/username for Openstack user with admin role.

