.. _murano:

Application catalog (Murano)
----------------------------

Resolved issues
+++++++++++++++

* Now it is possible to deploy Murano when nova-network is selected
  as a networking solution in Fuel. See `LP1462341`_.

* If you delete an environment that contains a package with an
  incorrect ``destroy`` method, Murano leaves some of the components
  and does not switch to the *Deletion FAILURE* status. It happens due
  to incorrect exceptions' handling by Murano API. The patch treats
  the exception results as errors, therefore marking a deletion as
  failed. See `LP1461594`_.

* A new option *Abandon Environment* is added to the Murano API. Therefore,
  now you can stop a deployment in case of an emergency or remove an
  environment that fails to deploy. This option is available on the
  *Environments* page, as well as through the Murano CLI. See `LP1442910`_.

  .. note::
     If you abandon an environment, only artefacts from Murano database are
     deleted. You have to manually clean all the external resources (like Heat
     stack).

Known issues
++++++++++++

* If you add a new application to an environment with a *Deploy FAILURE*
  status, such an application has the same status that the environment
  does (*Deploy FAILURE* instead of *Ready to deploy*, although you
  have not started to deploy this application yet). Once the deployment
  of environment is successful, the application changes its status to
  the correct one (*Ready*). See `LP1441246`_.

* Due to a peculiarity of YAML format, expressions that contain a sequence
  with ": " (colon-space), as well as those that start with "[", "{" or a
  quotation mark (but are not JSON-compatible), cannot be parsed by the YAML
  parser. See `LP1495590`_.

  The workaround for the colon case is to split the expression like shown in
  the example below::

    $msg: 'Error: {0}'
    $log.debug($msg, 'text')

  The workaround for other cases is to surround an expression with
  parenthesis::

    $value: ([1, 2] * 3)

  An alternate workaround that works for all the cases is to use an explicit
  YAML tag::

    !yaql "log.debug('Error: {0}' text)"
    $value: !yaql "[1, 2] * 3"

* An environment deployment fails when a user token expires (one hour after
  login). See `LP1496397`_.

  Workaround:

  #. Open the configuration files of all your Controller nodes.
  #. Find the parameter ``use_trusts = false`` in the [engine] section.
  #. Change the value for this parameter to *true* in the configuration
     files of all your Controller nodes.
  #. Restart Murano API and the engine services.

* Murano does not free resources after redeployment. You can remove a
  component from the already deployed environment, but the resources
  associated with that component are not released unless the entire
  environment is deleted. See `LP1392351`_.

* For each Murano application where host name is requested from
  a user, there is a requirement: the host name should be unique across the
  environment. This is not validated during the user-input phase, and
  if two applications use the identical instance name, the deployment
  either fails or leads to an unpredictable result. To avoid any undesirable
  consequences, please make sure you use unique names for instance names and
  instance name templates.

  Similar rules may be applied to other entities as well. For example,
  application names must be unique. See `LP1452679`_.

.. _`LP1462341`: https://bugs.launchpad.net/mos/7.0.x/+bug/1462341
.. _`LP1461594`: https://bugs.launchpad.net/mos/7.0.x/+bug/1461594
.. _`LP1442910`: https://bugs.launchpad.net/mos/+bug/1442910
.. _`LP1441246`: https://bugs.launchpad.net/mos/7.0.x/+bug/1441246
.. _`LP1495590`: https://bugs.launchpad.net/mos/+bug/1495590
.. _`LP1496397`: https://bugs.launchpad.net/fuel/+bug/1496397
.. _`LP1392351`: https://bugs.launchpad.net/mos/6.1.x/+bug/1392351
.. _`LP1452679`: https://bugs.launchpad.net/mos/+bug/1452679