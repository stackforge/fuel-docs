Functional Tests Description
----------------------------

Functional tests verify how your system handles basic OpenStack operations
under normal circumstances.
The Functional Test series gives you information about the speed of your environment 
and runs timeout tests.

All tests use the basic OpenStack services (Nova, Glance, Keystone, Cinder, etc)
so, if any of these are inactive, the test using it will fail.
You should run all sanity checks before running the functional checks
to verify that all services are alive.
This helps ensure that you do not get false negatives.
The following is a description of each sanity test available:

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

