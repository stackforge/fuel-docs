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
  with ": " (colon and space), as well as those that start with "[", "{" or a
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

.. _`LP1462341`: https://bugs.launchpad.net/mos/7.0.x/+bug/1462341
.. _`LP1461594`: https://bugs.launchpad.net/mos/7.0.x/+bug/1461594
.. _`LP1442910`: https://bugs.launchpad.net/mos/+bug/1442910
.. _`LP1441246`: https://bugs.launchpad.net/mos/7.0.x/+bug/1441246
.. _`LP1495590`: https://bugs.launchpad.net/mos/+bug/1495590