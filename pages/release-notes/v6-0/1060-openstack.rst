
.. _fuel-general.rst:

OpenStack Deployment Issues
===========================


New Features and Resolved Issues in Mirantis OpenStack 6.0
----------------------------------------------------------

*_Instances with file injection can now be safely launched after the OpenStack environment is launched.
See `LP1335697 <https://bugs.launchpad.net/bugs/1335697>`_.

*_Rsyslogd restart no longer causes services to hang.
See `LP1363102 <https://bugs.launchpad.net/bugs/1363102>`_.
 
*_Applying iptables rules during large scale deployments now does not take an inappropriately long time.
See `LP1399168 <https://bugs.launchpad.net/bugs/1399168>`_.

Known Issues in 6.0
-------------------

Deploying new controllers causes services downtime
++++++++++++++++++++++++++++++++++++++++++++++++++

When :ref:`adding controllers<add-controller-ops>`
to an existing environment,
nova-api is unavailable for a few minutes,
which causes services to be unavailable.
See `LP1370067 <https://bugs.launchpad.net/fuel/+bug/1370067>`_.

Enabled Murano prevents the controller from redeployment
++++++++++++++++++++++++++++++++++++++++++++++++++++++++

When Murano is deployed at CentOS, redeployment of the controller might fail.
To work around this issue around, follow these steps:
#. Deploy the Fuel Master node.
#. Log into the Fuel Master node as root.
#. Install patch package:
   ::

      yum install patch -y

#. Download the patch from `LP1401503 <https://bugs.launchpad.net/bugs/1401503>`_.
   and apply it:

   ::
      patch --verbose -p0 < apps-upload-check.patch

