.. _autotests-workflow:

Automation tests execution order
--------------------------------

#. Base test cases are executed: these are the tests that set up environment
   and install the Fuel Master node.
#. After passing these tests, snapshots are created which will be used by
   the tests for creating clusters.
#. Revert to the previously created snapshots.
#. Set up the cluster and deploy it.
#. Run OSTF.

For test execution debugging, use ``dos.py``.

To create a snapshot, run:

.. code-block:: console

   dos.py snapshot <myenv> --snapshot-name=<snapshot_name>

To revert a snapshot, run:

.. code-block:: console

   dos.py revert <myenv> --snapshot-name=<snapshot_name>