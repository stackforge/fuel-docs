.. _bootstrap_select:

Select a bootstrap image
------------------------

You can select a bootstrap image from the list of available
bootstraps and activate it. The discovered nodes will be loaded
with a new bootstrap after reboot.

**To switch between bootstrap images:**

#. Print the list of available bootstrap images:

   .. code-block:: console

    # fuel-bootstrap list

   **System response**

   .. code-block:: console

    +--------------------------------------+--------------------------------------+--------+
    | uuid                                 | label                                | status |
    +--------------------------------------+--------------------------------------+--------+
    | a778efad-88ca-41fe-b592-f02101c11d22 | bs1                                  |        |
    | 244782c1-7343-43f7-9ee3-8989c252eb2e | bs2                                  | active |
    | 2b7fe334-4ef7-4a9d-8fcb-e0d7cc009d0c | 2b7fe334-4ef7-4a9d-8fcb-e0d7cc009d0c |        |
    | centos                               | deprecated                           |        |
    +--------------------------------------+--------------------------------------+--------+

#. Activate a new bootstrap image:

   .. code-block:: console

    # fuel-bootstrap activate a778efad-88ca-41fe-b592-f02101c11d22

#. Reboot the affected node:

   .. code-block:: console

    # fuel nodes

   **System response**

   .. code-block:: console

    +-------------------------------------------------------------------------------------------------------------+
    |id | status   | name             | cluster | ip         | mac               | roles | pending_roles | online |
    |---|----------|------------------|---------|------------|-------------------|-------|---------------|--------|
    |1  | discover | Untitled (29:bb) | None    | 10.109.0.3 | 64:26:37:0b:29:bb |       |               | True   |
    +-------------------------------------------------------------------------------------------------------------+

   .. code-block:: console

    # ssh 10.109.0.3 reboot
