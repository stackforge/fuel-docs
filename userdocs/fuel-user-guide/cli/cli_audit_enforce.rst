.. _cli-audit-enforce:

========================
Fuel IaC: Audit commands
========================

.. include:: /userdocs/snippets/notes/deprecated-cli-v1.rst

The following table describes the usage of the :command:`fuel2 audit`
command available in the Fuel CLI. This command is available after you install
the Fuel Infrastructure-as-Code extension. For more information, see:
:ref:`lcm-git-repo`.

.. list-table:: **Audit commands**
   :widths: 7 10
   :header-rows: 1

   * - Description
     - Command
   * - Run an audit in an OpenStack environment.
     - ``fuel2 audit noop --env <ENV_ID> || --repo <REPO_ID>``
   * - List changes in an OpenStack environment.
     - ``fuel2 audit list outofsync --task <NOOP_TASK_ID> || --env <ENV_ID>``
   * - Perform an audit, verify changes, and enforce new configuration.
     - ``fuel2 audit enforce --env <ENV_ID> || --repo <REPO_ID>``
   * - Display the white list for an OpenStack environment.
     - ``fuel2 audit whitelist show <ENV_ID>``
   * - Add a rule to the white list of a specific OpenStack environment.
     - ``fuel2 audit whitelist add <ENV_ID> --task <FUEL_TASK> --rule <RULE>``
   * - Delete a rule or a set of rules from a white list.
     - ``fuel2 audit whitelist delete <RULE_ID> [<RULE_ID> ... ]``
   * - Add rules to a white list from a specific ``.yaml`` file.
     - ``fuel2 audit whitelist load fromfile <ENV_ID> <PATH_TO_YAML>``
