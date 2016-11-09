============
Known issues
============

This section lists known issues in the Newton release:

* Excluded the Glare configuration for Murano from the Ubuntu
  Cloud archive (UCA) deployments of OpenStack, since UCA packages do not
  contain the Glare artifacts plugin. Therefore, in the UCA deployments of
  OpenStack, the Murano packages are located in the Murano database instead
  of the Glare artifacts repository. `LP1586141`_

* A DPDK-based application on a guest VM may stop incorrectly and restart. The
  workaround is to re-mount HugePages on the guest VM to avoid OVS-DPDK
  segmentation fault on the compute node. `LP1615012`_

* Murano OSTF tests fail for deployments with the TLS feature enabled. This
  does not affect Murano functionality but affects OSTF tests because these
  tests use proxy service on OpenStack controller nodes to work with OpenStack
  API. `LP1590633`_

* If you add a hot pluggable Fuel plugin to an existing Mirantis OpenStack
  environment, the following warning displays in :guilabel:`Settings -> Other`
  of the Fuel web UI instead of the plugin configuration fields: *You have
  just activated the XXX plugin. The developer of this plugin has not
  specified it a "hot pluggable", so the cloud environment may stop
  functioning properly if this plugin is applied in post-deployment stage.*
  The workaround is to refresh the Fuel web UI page. `LP1616825`_

* Fuel fails to deploy changes after modifying settings on the
  :guilabel:`VMware` tab. `LP1593277`_

* Fuel fails to change a datastore regex value on the :guilabel:`VMware` tab
  in the Fuel web UI. `LP1616457`_

* OSTF tests may fail with the following error message: *vCenter: Create
  volume and attach it to instance* because after scaling the environment,
  the ``cinder-volume`` service cannot establish connection to the AMQP
  server. The workaround is to restart the ``cinder-volume`` service.
  `LP1628940`_

* Adding numbers and symbols to a new role name causes the *400 Client Error*.
  `LP1625293`_

* File download error occurs when downloading the YAML workflow for
  ``Neutron VMware DVS ML2 plugin`` using the Fuel web UI.
  The workaround is to download `deployment_tasks.yaml`_ directly
  from the plugin's repository. `LP1619341`_

* If you add a new VMware vSphere environment and configure the Nova compute
  instances on controllers of an existing environment with VMware vSphere,
  the new VMware configuration is not applied to the controller nodes after
  the environment redeployment. `LP1598834`_

* The Fuel web UI does not detect the changes made in the :guilabel:`VMware`
  tab. The workaround is to make and deploy the changes using the Fuel CLI.
  `LP1593277`_

.. _`LP1586141`: https://bugs.launchpad.net/fuel/+bug/1586141
.. _`LP1625293`: https://bugs.launchpad.net/fuel/+bug/1625293
.. _`LP1615012`: https://bugs.launchpad.net/fuel/+bug/1615012
.. _`LP1590633`: https://bugs.launchpad.net/fuel/+bug/1590633
.. _`LP1616825`: https://bugs.launchpad.net/fuel/+bug/1616825
.. _`LP1593277`: https://bugs.launchpad.net/fuel/+bug/1593277
.. _`LP1616457`: https://bugs.launchpad.net/fuel/+bug/1616457
.. _`LP1628940`: https://bugs.launchpad.net/fuel/+bug/1628940
.. _`LP1619341`: https://bugs.launchpad.net/fuel/+bug/1619341
.. _`deployment_tasks.yaml`: https://github.com/openstack/fuel-plugin-vmware-dvs/blob/master/deployment_tasks.yaml
.. _`LP1593277`: https://bugs.launchpad.net/fuel/+bug/1593277
.. _`LP1598834`: https://bugs.launchpad.net/fuel/+bug/1598834
