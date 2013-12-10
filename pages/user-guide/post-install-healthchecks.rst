.. raw:: pdf

   PageBreak

.. index:: Fuel UI: Post-Deployment Check

.. _Post-Deployment-Check:

Post-Deployment Check
=====================

.. contents :local:

On occasion, even a successful deployment may result in some OpenStack 
components not working correctly. If this happens, Fuel offers the ability 
to perform post-deployment checks to verify operations. Part of Fuel's goal 
is to provide easily accessible status information about the most commonly 
used components and the most recently performed actions. To perform these 
checks you will use Sanity and Smoke checks, as described below:

**Sanity Checks**
  Reveal whether the overall system is functional. If it fails, you will most 
  likely need to restart some services to operate OpenStack. 

**Smoke Checks**
  Dive in a little deeper and reveal networking, system-requirements, 
  functionality issues.

Sanity Checks will likely be the point on which the success of your 
deployment pivots, but it is critical to pay close attention to all 
information collected from theses tests. Another way to look at these tests 
is by their names. Sanity Checks are intended to assist in maintaining your 
sanity. Smoke Checks tell you where the fires are so you can put them out 
strategically instead of firehosing the entire installation.

Benefits 
--------

* Using post-deployment checks helps you identify potential issues which 
  may impact the health of a deployed system.

* All post-deployment checks provide detailed descriptions about failed 
  operations and tell you which component or components are not working 
  properly.

* Previously, performing these checks manually would have consumed a 
  great deal of time. Now, with these checks the process will take only a 
  few minutes.

* Aside from verifying that everything is working correctly, the process 
  will also determine how quickly your system works.

* Post-deployment checks continue to be useful, for example after 
  sizable changes are made in the system you can use the checks to 
  determine if any new failure points have been introduced.

Running Post-Deployment Checks 
------------------------------

Now, let`s take a closer look on what should be done to execute the tests and 
to understand if something is wrong with your OpenStack environment.

.. image::  /_images/001-health-check-tab.jpg
  :align: center
  :width: 100%

As you can see on the image above, the Fuel UI now contains a ``Health Check``
tab, indicated by the Heart icon.

All of the post-deployment checks are displayed on this tab. If your 
deployment was successful, you will see a list of tests this show a green 
Thumbs Up in the last column. The Thumb indicates the status of the 
component. If you see a detailed message and a Thumbs Down, that 
component has failed in some manner, and the details will indicate where the 
failure was detected. All tests can be run on different environments, which 
you select on main page of Fuel UI. You can run checks in parallel on 
different environments.

Each test contains information on its estimated and actual duration. There is 
information included about test processing time from in-house testing and 
indicate this in each test. Note that average times are listed from the slowest 
to the fastest systems tested, so your results may vary.

Once a test is complete, the results will appear in the Status column. If 
there was an error during the test, the you will see the error message 
below the test name. To assist in troubleshooting, the test 
scenario is displayed under the failure message and the failed step is 
highlighted. You will find more detailed information on these tests later in 
this section.

An actual test run looks like this:

.. image::  /_images/002-health-check-results.jpg
  :align: center
  :width: 100%

What To Do When a Test Fails 
----------------------------

If a test fails, there are several ways to investigate the problem. You may 
prefer to start in Fuel UI, since its feedback is directly related to the 
health of the deployment. To do so, start by checking the following:

* Under the `Health Check` tab
* In the OpenStack Dashboard
* In the test execution logs (in Environment Logs)
* In the individual OpenStack components' logs

Certainly there are many different conditions that can lead to system 
breakdowns, but there are some simple items that can be examined before you 
start digging deeply. The most common issues include:

* Not all OpenStack services are running
* Some defined quota has been exceeded
* Something has broken in the network configuration
* A general lack of resources (memory/disk space)

The first thing to be done is to ensure all OpenStack services are up and 
running. To do this, you can run the sanity test set or execute the following 
command on your Controller node::

  nova-manage service list

If any service is off (has “XXX” status), you can restart it using this command::

  service openstack-<service name> restart

If all services are on, but you`re still experiencing some issues, you can 
gather information from OpenStack Dashboard (exceeded number of instances, 
fixed IPs, etc). You may also read the logs generated by tests which are 
stored in Logs -> Fuel Master -> Health Check and check if any operation is 
in ERROR status. If it looks like the last item, you may have underprovisioned 
our environment and should check your math and your project requirements.

Sanity Tests Description 
------------------------

Sanity checks work by sending a query to all OpenStack components to get a 
response back from them. Many of these tests are simple in that they ask 
each service for a list of its associated objects and then waits for a 
response. The response can be something, nothing, an error, or a timeout, 
so there are several ways to determine if a service is up. The following list 
includes the suite of sanity tests implemented:

* Instance list availability
* Images list availability
* Volume list availability
* Snapshots list availability
* Flavor list availability
* Limits list availability
* Services list availability
* User list availability
* Stack list availability
* Check all the services execute normally
* Check Internet connectivity from a compute
* Check DNS resolution on a compute
* Check Default Key Pair 'murano-lb-key' For Server Farms
* Check Windows Image With Murano Tag
* Murano environment and service creation, listing and deletion
* Networks availability

Smoke Tests Description 
-----------------------

Smoke tests verify how your system handles basic OpenStack operations under 
normal circumstances. The Smoke test series uses timeout tests for 
operations that have a known completion time to determine if there is any 
smoke, and thusly fire. An additional benefit to the Smoke Test series is 
that you can observe how fast your environment is the first time you run it. 

All tests use the basic OpenStack services (Nova, Glance, Keystone, Cinder, 
etc), therefore if any of these are inactive, the test using it will fail. It 
is recommended to run all sanity checks prior to your smoke checks to determine 
that all services are alive. This helps ensure that you don't get any false 
negatives. The following is a description of each sanity test available:

* Create instance flavor
* Create instance volume
* Launch instance, create snapshot, launch instance from snapshot
* Keypair creation
* Security group creation
* Check networks parameters
* Launch instance
* Assign floating IP
* Check that VM is accessible via floating IP address
* Check network connectivity from instance via floating IP
* Check network connectivity from instance without floating IP
* User creation and authentication in Horizon

Additional Checks
-----------------
If you have installed OpenStack as a High Availability (HA) architecture
or have installed related OpenStack projects like Savanna or Murano, 
additional tests will be shown. The following are the tests available
in HA mode:

* Check data replication over mysql
* Check amount of tables in os databases is the same on each node
* Check mysql environment state
* Check galera environment state
* RabbitMQ availability

Platform Tests Description
--------------------------

Platform tests verify basic functionality of Heat, Savanna and Murano
services.
Typically, preparation for Savanna testing is a lengthy process that
involves several manual configuration steps.

Preparing Savanna for Testing
+++++++++++++++++++++++++++++

The platform tests are run in the tenant you've specified in
'OpenStack Settings' tab during OpenStack installation. By default that is
'admin' tenant. Perform in the that tenant the following actions:

1. Configure security groups in the 'admin' tenant. See
   :ref:`savanna-deployment-label` for the details.
2. Get an image with Hadoop for Savanna and register it with Savanna.

   * First download the following image:

http://savanna-files.mirantis.com/savanna-0.2-vanilla-1.1.2-ubuntu-12.10.qcow2
   * Then upload the image into OpenStack Image Service (Glance) into
     'admin' tenant and name it 'savanna'.
   * In OpenStack Dashboard (Horizon) access 'Savanna' tab.
   * Switch to 'admin' tenant if you are not in it already.
   * Go to the ‘Image Registry’ menu. Here push ‘Register Image’ button.
     Image registration window will open up.
   * Select the image you’ve just uploaded.
   * Set username to ‘ubuntu’
   * For tags, pick ‘vanilla’ plugin and ‘1.2.1’ version and press
     ‘Add all’ button.
   * Finally push ‘Done’ button

After the steps above are done, the Savanna is ready to be tested.

Preparing Murano for Testing
+++++++++++++++++++++++++++++

The platform tests are run in the tenant you've specified in
'OpenStack Settings' tab during OpenStack installation.
The 'admin' tenant is selected by default.

To prepare Murano for testing:

1. Configure key pair 'murano-lb-key' in the 'admin' tenant.
2. Create a Windows image with Murano agent. 
   See `Murano documentation (Image Builder) <http://murano-docs.github.io/latest/administrators-guide/content/ch03.html>`_
3. Upload the image to the OpenStack Image Service (Glance) into the 'admin' tenant.
4. Rename the image name to 'ws-2012-std'.
5. In the OpenStack Dashboard, click the 'Project' tab.
6. Switch to admin tenant if needed.
7. Click the 'Environments' menu.
8. Click the 'Marked Images' button.
9. Click 'Mark Image'. The Image registration window displays.
10. Select the image.
11. In the 'Title' field, select 'ws-2012-std'.
12. Select the 'Windows Server 2012' type. 
13. Click 'Mark'.

Murano is ready for testing.

Preparing Heat for Testing
+++++++++++++++++++++++++++

The platform tests are run in the tenant you've specified in
'OpenStack Settings' tab during OpenStack installation. By default that is
'admin' tenant. Perform in that tenant the following actions to prepare Heat
for testing of its autoscaling feature:

1. Download the following image of Linux Fedora with pre-installed
   cloud-init and heat-cfntools packages:

http://fedorapeople.org/groups/heat/prebuilt-jeos-images/F17-x86_64-cfntools.qcow2
2. Then upload the image into OpenStack Image Service (Glance) into
     'admin' tenant and name it 'F17-x86_64-cfntools'.

Now Heat autoscaling is ready for testing.

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
  `Savanna documentation <http://savanna.readthedocs.org/en/0.2.2/>`_ 

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

.. topic:: Murano environment with ASP.NET Servers Farm service deployment

  The test verifies that the Murano service can create and deploy the ASP.NET Servers Farm service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Check that Key Pair 'murano-lb-key' exists.
  3. Send request to create environment.
  4. Send request to create session for environment.
  5. Send request to create service ASPNet farm.
  6. Request to deploy session.
  7. Checking environment status.
  8. Checking deployments status
  9. Send request to delete environment.

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

.. topic:: Murano environment with IIS Servers Farm service deployment

  The test verifies that the Murano service can create and deploy the IIS Servers Farm service.

  Target component: Murano

  Scenario:

  1. Check Windows Server 2012 image in glance.
  2. Check that Key Pair 'murano-lb-key' exists.
  3. Send request to create environment.
  4. Send request to create session for environment.
  5. Send request to create service IIS farm.
  6. Request to deploy session.
  7. Checking environment status.
  8. Checking deployments status
  9. Send request to delete environment.

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
  `Murano documentation <https://wiki.openstack.org/wiki/Murano#Documentation>`_
