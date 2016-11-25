.. _filter-results:

Exclude tasks from an audit
===========================

When you verify changes with the ``fuel2 audit`` command, Fuel checks
all Puppet tasks disregarding whether they do not change their states
(idempotent) or they do change their states (non-idempotent). Each audit
report includes both types of tasks. However, the result of the
non-idempotent task run typically does not provide important information
about the state of the system, and, therefore, can be ignored.

You can exclude the non-idempotent Puppet tasks from the audit by creating a
whitelist.
A whitelist includes a set of rules in a form of a pair of strings. The first
string is a Fuel Puppet task. The second string is the rule.

**Example:**

::

  - fuel_task: netconfig
    rule: L23_stored_configs
  - fuel_task: top-role-compute
    rule: Service[nova-compute]/ensure

To apply a rule to all tasks, specify an empty task.

Fuel provides a default white list for your reference.

**To exclude tasks from an audit:**

#. Log in to the Fuel Master node.

#. Create a new white list or upload the existing one.

   * If you want upload the default white list:

     ::

       fuel2 audit whitelist load fromfile <ENV_ID>
       /usr/lib/python2.7/site-packages/fuel_external_git/default_whitelist.yaml

   * If you need to create a new white list:

     #. In the ``/usr/lib/python2.7/site-packages/fuel_external_git/``
        directory, create a ``.yaml`` file with the required rules.

     #. Alternatively, specify rules using the following command:

        ::

         fuel2 audit whitelist add <ENV_ID> --task <FUEL_TASK> --rule <RULE>

        or by providing a path to the corresponding ``.yaml`` file:

        ::

         fuel2 audit whitelist load fromfile <ENV_ID> <PATH_TO_YAML>

#. Verify that you created a white list for the selected environment:

   ::

     fuel2 audit whitelist show <ENV_ID>

#. If you need to delete a rule, run:

   ::

     fuel2 audit whitelist delete <RULE_ID>
