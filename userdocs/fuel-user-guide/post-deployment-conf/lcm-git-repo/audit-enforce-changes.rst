.. _audit-enforce-changes:

Verify and enforce the changes
==============================

You can check whether a file has been modified or not using
the ``fuel2 audit`` command and then enforce application of
the changed configuration if needed.

Similarly to running a Fuel deployment workflows with the ``noop`` flag,
the ``fuel2 audit`` command performs a dry-run of the applied
changes and records Puppet resources that will be modified after
applying the changes.

**To verify and enforce the changes:**

#. Verify the changes by performing a dry-run of the applied changes:

   ::

     fuel2 audit noop --env <ENV_ID> || --repo <REPO_ID>

#. List the changes to Puppet resources:

   ::

     fuel2 audit list outofsync --task <NOOP_TASK_ID> || --repo <REPO_ID>

#. Redeploy (enforce) the environment with the new changes:

   ::

     fuel2 env redeploy <ENV_ID>

#. Alternatively, you can perform a dry-run and redeployment
   in one go:

   ::

     fuel2 audit enforce --env <ENV_ID> || --repo <REPO_ID>
