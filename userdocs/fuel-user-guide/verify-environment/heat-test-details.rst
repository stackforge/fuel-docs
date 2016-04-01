
.. _heat-test-details:

Overview of the OpenStack Orchestration service platform tests
--------------------------------------------------------------

If you have installed the OpenStack Orchestration service (Heat) in
your OpenStack environment, Fuel provides the automatic tests to
verify its functionality.

The following table describes the details of the Heat tests.

.. list-table:: **Heat platform tests**
   :widths: 10 10 20
   :header-rows: 1

   * - Name
     - Description
     - Scenario
   * - **Test basic stack operations.**
     - The test verifies that the Heat service can create, update, and
       delete a stack, as well as shows details of the stack and
       its resources, events, and template.
     - #. Create a stack.
       #. Wait for the stack status to change to ``CREATE_COMPLETE``.
       #. Get details of the created stack by its name.
       #. Get the list of resources for the created stack.
       #. Get details of the stack resources.
       #. Get the list of events for the created stack.
       #. Get the details of the stack event.
       #. Update the stack.
       #. Wait for the stack to update.
       #. Get the stack template details.
       #. Get the list of resources for the updated stack.
       #. Delete the stack.
       #. Wait for the stack to delete.
   * - **Test the stack autoscaling.**
     - The test verifies that the Heat service can scale the stack capacity
       up and down automatically according to the changes in the
       configuration.
       Image with cfntools package should be imported.
     - #. Create a flavor.
       #. Create a keypair.
       #. Save the generated private key to a file on the controller node.
       #. Create a security group.
       #. Create a stack.
       #. Wait for the stack status to change to 'CREATE_COMPLETE'.
       #. Create a floating IP.
       #. Assign the floating IP to the instance of the stack.
       #. Wait for the ``cloud_init`` procedure to complete on the instance.
       #. Load CPU of the instance to initiate the stack scaling up.
       #. Wait for the second instance to launch.
       #. Release CPU of the instance to initiate the stack scaling down.
       #. Wait for the second instance to be terminated.
       #. Delete the file with the private key on the controller node.
       #. Delete the stack.
       #. Wait for the stack to delete.
   * - **Test the stack rollback functionality.**
     - The test verifies that the Heat service can rollback the stack
       if its creation failed.
     - #. Start stack creation with rollback enabled.
       #. Verify that the stack appears with status ``CREATE_IN_PROGRESS``.
       #. Wait for the stack to be deleted as a result of the rollback after
          the expiration of the timeout defined in the ``WaitHandle`` resource
          of the stack.
       #. Verify that the instance of the stack has been deleted.
   * - **Test advanced stack operations.**
     - The test verifies that the Heat service can suspend and resume the
       stack.
     - #. Create a stack.
       #. Wait until the stack status changes to ``CREATE_COMPLETE``.
       #. Call the stack suspend action.
       #. Wait until the stack status changes to ``SUSPEND_COMPLETE``.
       #. Call the stack resume action.
       #. Wait until the stack status changes to ``RESUME_COMPLETE``.
       #. Call the stack check action.
       #. Wail until the stack status changes to ``CHECK_COMPLETE``.
       #. Delete the stack.
       #. Wait for the stack to be deleted.


