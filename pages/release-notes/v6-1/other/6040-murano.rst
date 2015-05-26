
.. _murano-rn:

Application Catalog (Murano)
----------------------------

Resolved Murano Issues
++++++++++++++++++++++

* Murano applications based on Heat Docker resource do not put a
  stack to a non-deletable state anymore. That happened previously
  because of the hidden dependencies between neutron resources.
  See `LP1428138`_.

* The :command:`murano package-list` command works properly now:
  the wrong endpoint for Murano specified in Keystone has been corrected.
  See `LP1397273`_.


Known Murano Issues
+++++++++++++++++++

* For each Murano application where host name is requested from
  a user there is a requirement: the host name should be unique across the
  environment. This is not validated during the user-input phase and,
  in case, two applications use the identic instance name, the deployment
  either fails or lead to unpredictable result. To avoid any undesirable
  consequences, please make sure you use unique names for instance names and
  instance name templates.

  Similar rules may be applied to other entities as well. For example,
  application name must be unique as well.
  See `LP1452679`_.

* Murano does not free resources after redeployment. User can remove a component
  from the already deployed environment but the resources associated with that
  component are not released unless the entire environment is deleted.
  See `LP1392351`_.

* User is not able to select Murano when configuring an environment in Fuel
  and to install Murano when VMWare vCenter is selected as a hypervisor.
  This is due to the fact that Murano does not support nova-network, which
  is required when Mirantis OpenStack is installed with VMWare vCenter.
  See `LP1427678`_.

* Murano local variables, such as ``MURANO_REPO_URL``, ``METADATA_CACHE_DIR``
  and ``MAX_FILE_SIZE_MB``, if set in the ``local_settings.py`` file,
  are overriden by the default settings. To change the default values,
  specify them in the ``setting.py`` file.
  See `LP1451604`_.



.. _`LP1428138`: https://bugs.launchpad.net/mos/+bug/1428138
.. _`LP1397273`: https://bugs.launchpad.net/mos/6.1.x/+bug/1397273
.. _`LP1452679`: https://bugs.launchpad.net/mos/+bug/1452679
.. _`LP1392351`: https://bugs.launchpad.net/mos/6.1.x/+bug/1392351
.. _`LP1427678`: https://bugs.launchpad.net/mos/7.0.x/+bug/1427678
.. _`LP1451604`: https://bugs.launchpad.net/fuel/6.1.x/+bug/1451604
