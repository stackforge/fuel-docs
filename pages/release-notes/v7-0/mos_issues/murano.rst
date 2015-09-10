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
  to an incorrect exceptions' handling by Murano API. The patch treats
  the exception results as errors, therefore marking a deletion as
  failed. See `LP1461594`_.

Known issues
++++++++++++

* An application can be added to an environment with a *Deploy FAILURE*
  status. Though, such an application cannot be deployed. See
  `LP1441246`_.

.. _`LP1462341`: https://bugs.launchpad.net/mos/7.0.x/+bug/1462341
.. _`LP1461594`: https://bugs.launchpad.net/mos/7.0.x/+bug/1461594
.. _`LP1441246`: https://bugs.launchpad.net/mos/7.0.x/+bug/1441246

