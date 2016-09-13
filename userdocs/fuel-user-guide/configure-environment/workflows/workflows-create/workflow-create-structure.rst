.. _workflow-create-structure:

Workflow task structure
-----------------------

You can group the tasks defined in the deployment workflow
file using the following types
The following table describes the workflow task structure:

.. list-table:: **Workflow task structure**
   :widths: 10 10
   :header-rows: 1

   * - Parameter
     - Description
   * - ``id``
     - Name of the deployment task.
   * - ``version``
     - Version of the task graph execution engine.
   * - ``type``
     - Type of the workflow 
   * - ``role``
     - Node roles on which the task is executed.
   * - ``groups``
     - Multi-roles assigned to the task, mutual exclusive to the role]
   * - ``requires``
     - Requirements for a specific task or stage.
   * - ``required_for``
     - Specifies which tasks and stages depend on this task.
   * - ``reexecute_on``
     - Makes the task to re-run after completion.
   * - ``cross-depended-by``
     - Establishes synchronization points across concurrent or asynchronous
       tasks. You can specify the value in a form of a regular expression.
   * - ``cross-depends``
     - Reverse to ``cross-depended-by``. You can specify the value in a form
       of a regular expression.
   * - ``condition``
     - Describes various task limitations, such as conflicting UI settings.
       For more information, see: :ref:`data-driven`.
   * - ``parameters``
     - The task execution parameters like scripts or manifests.
