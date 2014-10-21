New Features in Mirantis OpenStack 6.0
======================================

Support for the latest OpenStack Juno release
---------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages
support the
`OpenStack Juno 2014.2
<https://wiki.openstack.org/wiki/ReleaseNotes/Juno>`_ release.
Fuel 6.0 deploys this version of OpenStack on either CentOS or Ubuntu.

HA stability and scalability improvements
-----------------------------------------

Mirantis OpenStack 6.0 includes a number of internal enhancements
to improve the stability and scalability of the deployed environment:

* :ref:`Pacemaker<pacemaker-term>` can now deploy an environment
  that includes a large number of OpenStack Controller nodes.


Pluggable Architecture MVP
--------------------------

Fuel 6.0 supports a pluggable architecture
that allows new functionality to be added to
:ref:`Neutron<neutron-term>` and :ref:`Cinder<cinder-term>`
in a self-contained archive.
Tools are provided that allow contributors
to bundle and test the plug-in archive.

This first release of the Pluggable Architecture feature,
has the following constraints:

- The plug-in cannot change the business logic
  and should not contain any python code.
- The plug-in can provide additional attributes
  for the environment.
- The plug-in must not add a new kernel.
- The plug-in must not modify provisioning data.
- The plug-in must not modify deployment data
  other than new data that qualifies as "cluster attributes"
  for :ref:`Nailgun<nailgun-term>`

To install a plug-in,
the operator downloads and unpacks the plug-in
to the */var/www/plugins* directory
then provides the username and password for Nailgun
and runs the installation script that is included
in the plug-in's archive.

See the `Plugins for neutron/cinder in fuel
<https://blueprints.launchpad.net/fuel/+spec/cinder-neutron-plugins-in-fuel>`_
blueprint for implementation details.

Support for 100-node environments
---------------------------------

Fuel 6.0 can successfully deploy
large environments with 100 nodes.
While earlier releases did not limit the size of the deployed environment,
the time required to deploy an environment
as well as the stability of the deployment
were degraded as the number of nodes increased
and performance was degraded on large environments.
See the `100 nodes support
<https://blueprints.launchpad.net/fuel/+spec/100-nodes-support>`_
blueprint for details about the implementation.

Multiple L3 agents are now supported for an environment
-------------------------------------------------------

Fuel 6.0 can deploy an environment
that uses :ref:`vCenter<vcenter-term>` as a hypervisor
and :ref:`NSX<nsx-term>` as a networking option.
See the `Integration of NSX with vCenter
<https://blueprints.launchpad.net/fuel/+spec/vcenter-nsx-support>`_
blueprint for implementation details.

Glance can use VMDK as a storage backend
----------------------------------------

Glance can now use the vSphere Datastore (:ref:`VMDK<vmdk-term>`)
as its storage backend
when vCenter is used as the hypervisor.
This greatly reduces the time required to copy images from Glance.
See the `Use vSphere Datastore backend for Glance with vCenter
<https://blueprints.launchpad.net/fuel/+spec/vsphere-glance-backend>`_
blueprint for implementation details.

Mutiple L2 networks can be supported in one environment
-------------------------------------------------------

Multiple L2 networks can be supported in one environment.
This allows the cloud operator to deploy more complex network topologies
that use the `leaf and spine
<http://www.cisco.com/c/dam/en/us/td/docs/solutions/Enterprise/Data_Center/MSDC/1-0/MSDC_AAG_1.pdf>`_
network architecture.
The previous architecture that uses a single L2 domain
is still fully supported.
See the `Support multiple networks per cluster
<https://blueprints.launchpad.net/fuel/+spec/vsphere-glance-backend>`_
blueprint for implementation details.

Monit for Compute nodes
-----------------------

You can enable Monit to do automatic maintenance and repair
on compute nodes in your Mirantis OpenStack environment.
Monit performs execution monitoring for OpenStack services
that run on the Compute nodes
(nova-compute, nova-network, ovs-vswitched, cinder-volume)
and restart them if they stop.

Ceilometer can collect statistics in vCenter environment
--------------------------------------------------------

Fuel can now install a Ceilometer agent
on the Controller node where the Compute role is installed
when deploying a vCenter environment.
Operators can then configure Ceilometer
to collect metrics for the vCenter environment;
see :ref:`ceilometer-vcenter`.

Sahara can run in vCenter environment
-------------------------------------

Sahara can run in a vCenter environment,
allowing vCenter to be used for running :ref:`Hadoop<hadoop-term>`.
Cluster provisioning, attaching :ref:`Cinder<cinder-term>` volumes,
and :ref:`Swift<swift-object-storage-term>` Hadoop integration
(including the :ref:`Ceph<ceph-term>` Swift interface
that allows Ceph to be used as the storage backend
for HDFS file systems)
have been implemented and tested.

VLAN Manager is supported for vCenter environments
--------------------------------------------------

VLAN Manager is now available for
the :ref:`Nova-network<nova-network-term>` networking topologies
in vCenter environments.


The Fuel Master Node can be upgraded from ???
-----------------------------------------------

[OLD TEXT]
If you are running a Mirantis OpenStack 5.0 or 5.0.1 environment,
you can upgrade your Fuel Master Node to Fuel 5.1
but leave your current Mirantis OpenStack environments in place
without requiring a redeployment.
After the upgrade, the Fuel Master Node can deploy
a new Mirantis OpenStack 5.1 environment
and manage environments that were deployed with an earlier Fuel version,
performing operational functions
such as adding and deleting nodes,
viewing logs, and running Health Checks.

Upgrading the Fuel Master Node
does not update the OpenStack environment.
See below for information about updating OpenStack environments.

See :ref:`upgrade-ug` for instructions.

Note that internal enhancements have been implemented
to improve the upgrade experience.
These include:

- The upgrade tarball is smaller than in earlier releases.
  This simplifies the distribution workflow,
  reduces the amount of time required
  to download and unpack the tarball,
  and reduces the amount of free space on the Fuel Master node
  that is required for the upgrade.

- The Fuel Master node authorization feature
  has been enhanced to improve the upgrade process.


Fuel 6.0 can update existing ????? Mirantis OpenStack environments to ????? (Experimental)
------------------------------------------------------------------------------------------

[OLD TEXT]
Starting with version 5.1,
an :ref:`experimental feature<experimental-features-term>`
enables the Fuel Master Node to update
existing 5.0.x environments to 5.0.2.
Once the Fuel Master Node is upgraded,
the UI provides an option to update
an existing 5.0.x environment to 5.0.2.

5.0.2 is a technical release that contains
some of the bug fixes that are included in 5.1
and the 2014.1.1 maintenance release of Icehouse.
Release 5.1 includes some significant architectural modifications
that make it impossible to update a 5.0.x environment to 5.1,
so Mirantis is offering the 5.0.2 release
to provide the fixes that can be applied to the existing architecture.

See :ref:`update-openstack-environ-ug` for instructions.
You can also use Fuel CLI to update the environment;
see :ref:`cli_usage` for details.

.. note::
  If you are running Fuel 4.x or earlier,
  you cannot upgrade but must install Mirantis OpenStack 6.0
  and redeploy your environment to use the new release.

Fuel can deploy the latest OpenStack features from upstream master
------------------------------------------------------------------

Fuel can now deploy the very latest distribution of OpenStack
from the upstream master.
This provides community developers a way
to deploy recent modifications that have been made
to the OpenStack master using Fuel,
and to then build OpenStack packages and ISO files
that include these modifications.

Public CI environment is available to contributors
--------------------------------------------------

Mirantis now maintains a public CI process
that contributors can use to build, test
and publish both rpm and deb packages
for OpenStack and Fuel.
Code is stored using Git+Gerrit with LaunchPad authorization
along with build specifications for the rpm and deb packages.
Any LaunchPad user can create a CR (commit request)
in this system.

Jenkins with the Gerrit-trigger plug-in provides the CI process.
It tracks the CR and runs the unit tests
in a prepared environment,
writing the results to the Gerrit page.
Users can access the Jenkins job logs
for more detailed information about the test results.

After unit testing succeeds,
Jenkins sends the code to the build service for packaging,
which is performed in a clean environment
using the Open Build Service.
Users can view Jenkins job artifacts
to see what information about building was passed to Jenkins.

After a successful build,
Jenkins publishes the package in a public repository
then performs basic functional tests on the package
in a specially prepared OpenStack environment.

Anonymous Collection of Statistics
----------------------------------

Fuel 6.0 includes the option to send anonymous usage statistics
to Mirantis to improve our understanding
of how customers are using Fuel.
This will enable Mirantis to set better priorities
for future development work.
All identifying information
(IP addresses, node names, passwords, and so forth)
is removed or obfuscated
and transmitted in a compressed and encrypted form
so it is not human readable.
See the `Send anonymous usage information
<https://blueprints.launchpad.net/fuel/+spec/send-anon-usage>`_
blue print for more details.

Additional Information
----------------------

For current information about Issues and Blueprints
for Mirantis OpenStack 5.1, see the
`Fuel for OpenStack 6.0 Milestone <https://launchpad.net/fuel/+milestone/6.0>`_
page.

