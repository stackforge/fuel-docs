
.. _heat-test-details:

Details of Heat Platform Tests
------------------------------

.. topic:: Typical stack actions: create, delete, show details, etc

  The test verifies that the Heat service can create, delete a stack
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
  8. Get the stack template details.
  9. Delete the stack and wait for the stack to be deleted.

.. topic:: Advanced stack actions: suspend, resume and check

  The test verifies that the Heat service can suspend, resume a stack
  and check it.

  Target component: Heat

  Scenario:

  1. Create a stack.
  2. Wait until the stack status will change to 'CREATE_COMPLETE'.
  3. Call stack suspend action.
  4. Wait until the stack status will change to 'SUSPEND_COMPLETE'.
  5. Call stack resume action.
  6. Wail until the stack status will change to 'RESUME_COMPLETE'.
  7. Call stack check action.
  8. Wail until the stack status will change to 'CHECK_COMPLETE'.
  9. Delete the stack and wait for the stack to be deleted.

.. topic:: Update stack actions: inplace, replace and update whole template

  The test verifies that the Heat service can update stack in different ways.

  Target component: Heat

  Scenario:

  1. Create a stack.
  2. Wait for the stack status to change to 'CREATE_COMPLETE'.
  3. Change instance name, execute update stack in-place.
  4. Wait for the stack status to change to 'UPDATE_COMPLETE'.
  5. Check that instance name was changed.
  6. Create one more test flavor.
  7. Change instance flavor to just created and update stack
     (update replace).
  8. Wait for the stack status to change to 'UPDATE_COMPLETE'.
  9. Check that instance flavor was changed.
  10. Change stack template and update it.
  11. Wait for the stack status to change to 'UPDATE_COMPLETE'.
  12. Check that there are only two newly created stack instances.
  13. Delete the stack.
  14. Wait for the stack to be deleted.

.. topic:: Check stack autoscaling

  The test verifies that the Heat service can scale the stack capacity
  up and down automatically according to the current conditions.

  Target component: Heat

  Scenario:

  1. Create a keypair.
  2. Save generated private key to file on Controller node.
  3. Create a security group.
  4. Create a stack.
  5. Wait for the stack status to change to 'CREATE_COMPLETE'.
  6. Create a floating IP.
  7. Assign the floating IP to the instance of the stack.
  8. Wait for instance is ready for load.
  9. Load the instance CPU to initiate the stack scaling up.
  10. Wait for the 2nd instance to be launched.
  11. Release the instance CPU to initiate the stack scaling down.
  12. Wait for the 2nd instance to be terminated.
  13. Delete the file with private key.
  14. Delete the stack.
  15. Wait for the stack to be deleted.

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

