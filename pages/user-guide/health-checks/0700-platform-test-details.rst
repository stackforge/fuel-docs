Platform Tests Details
++++++++++++++++++++++

.. topic:: Hadoop cluster operations

  Test checks that Savanna can launch a Hadoop cluster
  using the Vanilla plugin.

  Target component: Savanna

  Scenario:

  1. Create a flavor for Savanna VMs.
  2. Create a node group template for JobTracker and NameNode.
  3. Create a cluster template using the node group template.
  4. List current node group templates.
  5. List current cluster templates.
  6. Launch a Hadoop cluster with the created cluster template.
  7. Check the launched Hadoop cluster is up by accessing web interfaces of
     the appropriate components (JobTracker, NameNode, TaskTracker, DataNode).
  8. Terminate the launched cluster.
  9. Delete the created cluster template.
  10. Delete the created node group templates.
  11. Delete the created flavor.

  For more information, see:
  `Savanna documentation <http://savanna.readthedocs.org/en/0.3/>`_

.. topic:: Typical stack actions: create, update, delete, show details, etc

  The test verifies that the Heat service can create, update and delete a stack
  and show details of the stack and its resources, events and template.

  Target component: Heat

  Scenario:

  1. Create a stack.
  2. Wait for the stack status to change to 'CREATE_COMPLETE'.
  3. Get the details of the created stack by its name.
  4. Get the resources list of the created stack.
  5. Get the details of the stack resource.
  6. Get the events list of the created stack.
  7. Get the details of the stack event.
  8. Update the stack.
  9. Wait for the stack to update.
  10. Get the stack template details.
  11. Get the resources list of the updated stack.
  12. Delete the stack.
  13. Wait for the stack to be deleted.

.. topic:: Check stack autoscaling

  The test verifies that the Heat service can scale the stack capacity
  up and down automatically according to the current conditions.

  Target component: Heat

  Scenario:

  1. Image with cfntools package should be imported.
  2. Create a flavor.
  3. Create a keypair.
  4. Save generated private key to file on Controller node.
  5. Create a security group.
  6. Create a stack.
  7. Wait for the stack status to change to 'CREATE_COMPLETE'.
  8. Create a floating ip.
  9. Assign the floating ip to the instance of the stack.
  10. Wait for cloud_init procedure to be completed on the instance.
  11. Load the instance CPU to initiate the stack scaling up.
  12. Wait for the 2nd instance to be launched.
  13. Release the instance CPU to initiate the stack scaling down.
  14. Wait for the 2nd instance to be terminated.
  15. Delete the file with private key.
  16. Delete the stack.
  17. Wait for the stack to be deleted.

.. topic:: Check stack rollback

  The test verifies that the Heat service can rollback the stack
  if its creation failed.

  Target component: Heat

  Scenario:

  1. Start stack creation with rollback enabled.
  2. Verify the stack appears with status 'CREATE_IN_PROGRESS'.
  3. Wait for the stack to be deleted in result of rollback after
     expiration of timeout defined in WaitHandle resource
     of the stack.
  4. Verify the instance of the stack has been deleted.

.. topic:: Murano environment with AD service deployment

  The test verifies that the Murano service can create and deploy the Active Directory service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service AD.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

.. topic:: Murano environment with ASP.NET application service deployment

  The test verifies that the Murano service can create and deploy the ASP.NET service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service ASPNet.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

.. topic:: Murano environment with IIS service deployment

  The test verifies that the Murano service can create and deploy the IIS service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service IIS.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

.. topic:: Murano environment with SQL service deployment

  The test verifies that the Murano service can create and deploy the SQL service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service SQL.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_

.. topic:: Murano environment with SQL Cluster service deployment

  The test verifies that the Murano service can create and deploy the SQL Cluster service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service AD.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status.
  8. Send request to create session for environment.
  9. Send request to create service SQL cluster.
  10. Request to deploy session..
  11. Checking environment status.
  12. Checking deployments status.
  13. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`

.. topic:: Murano environment with Demo service deployment

  The test verifies that the Murano service can create and deploy the Demo service.

  Target component: Murano

  Scenario:

  1. Check image for Demo service in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service Demo.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status.
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`

.. topic:: Murano environment with Linux Telnet service deployment

  The test verifies that the Murano service can create and deploy the Linux Telnet service.

  Target component: Murano

  Scenario:

  1. Check image for Linux Telnet service in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service Linux Telnet.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status.
  8. Send request to delete environment.

  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`

.. topic:: Murano environment with Linux Apache service deployment

  The test verifies that the Murano service can create and deploy the Linux Apache service.

  Target component: Murano

  Scenario:

  1. Check image for Linux Apache service in glance.
  2. Send request to create environment.
  3. Send request to create session for environment.
  4. Send request to create service Linux Apache.
  5. Request to deploy session.
  6. Checking environment status.
  7. Checking deployments status.
  8. Send request to delete environment.


  For more infromation, see:
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_
