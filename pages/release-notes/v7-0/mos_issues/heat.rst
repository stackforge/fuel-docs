
.. _heat_mos:

OpenStack Orchestration (Heat)
------------------------------

Resolved issues
+++++++++++++++

* If evaluation period is shorter than the instance starting
  time and ``repeat_actions`` is set to True, extra instances are
  created even when the cooldown is long enough. The fix prevents
  the creation of undesirable extra instances. See `LP1474332`_.

Known issues
++++++++++++

* The creation of a stack fails if you use a template with
  ``WaitCondition/WaitHandle`` resources that expect more than one signal
  notify. It happens because of concurrent transactions during the signals
  handling. Some signals rewrite the information about the ones that were
  already handled. Therefore, the statistics shows less signals than expected.
  See `LP1497273`_.

  Workaround is to add ``sleep(1)`` commands between each
  ``wc_notify --data-binary ..`` command in the Heat template that is used
  to create a stack.

* If it takes more than one hour to process an action with a big Heat
  stack (for example, create, update, delete), the Keystone token
  expires and the action fails. See `LP1483841`_.

  Workaround is to manually increase the default value for the token
  expiration time:

  #. Open the `keystone.conf` file.
  #. Find a section *[token]* that by default has ``expiration = 3600``.
  #. Change the default value to 7200-14400 seconds depending on the
     operation you perform.
  #. Restart Keystone services. If Keystone runs under Apache, restart
     Apache.

.. _`LP1474332`: https://bugs.launchpad.net/mos/+bug/1474332
.. _`LP1497273`: https://bugs.launchpad.net/mos/+bug/1497273
.. _`LP1483841`: https://bugs.launchpad.net/mos/+bug/1483841