What's New in Mirantis OpenStack 6.0
====================================

Mirantis is pleased to make
the Mirantis OpenStack 6.0 Technical Preview
available to our customers, partners and the community.
Your feedback is important to us and we want to hear from you -
please file bug reports, find us on IRC, submit blueprints,
ask questions and let us know how to improve.

A number of features as well as the documentation
that are planned for the 6.0 release
are still under development at the time of the
Technical Preview release.
These are listed below,
with links to blueprints and specs for each feature.
You can access information about each feature
including implementation plans and dates
and participate in testing features
that are of particular interest to you.

This document also includes information
about Resolved Issues and Known Issues for the 6.0 release.

The following limitations apply to
the Mirantis OpenStack 6.0 Technical Preview (MOS6.0TP):

- Mirantis is providing a technical preview for feedback.
  Do not use it in production.
- No upgrade/update path from earlier releases is provided.
- No upgrade/update path will be provided
  from the technical preview to the GA release.

New Features included in Mirantis OpenStack 5.0 Technical Preview
=================================================================

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

* All OpenStack services are now managed by Pacemaker
  and initialization scripts are structured
  to start services in the proper order.

* Corosync 2.0 packages are now used
  to support Fuel Controllers.
  The Puppet :ref:`Corosync<corosync-term>` module
  has been integrated into Fuel.

* Pacemaker and Corosync installation
  are now a discrete stage of deployment.

* Debug handling of OCF scripts is now unified and
  OCF resources have been renamed and no longer include the "__old" string.
  Previously, debugging OCF scripts required
  significant manual intervention by the Cloud operator.

* The service provider has been refactored
  to disable creating the same service under systemd/upstart/system v.

* Diff operations against Corosync CIB
  can now save data to memory rather than a file,
  which significantly reduces the resources required
  to shut down Corosync.

* The infrastructure is now in place
  to allow Fuel to deploy newer versions of the operating systems
  (such as CentOS 7 or Ubuntu 14.04)
  for the target nodes in future releases.

* Compute nodes are now managed by Monit,
  which provides a viable control plane
  for :ref:`Nova Compute`<nova-term>` services.
  Monit performs execution monitoring
  for OpenStack services that run on the Compute nodes
  automatic maintenance, and repair on the compute nodes
  :ref:`nova-compute<nova-term>`, ref:`nova-network<nova-network-term>,
  :ref:`ovs-vswitched<ovs-term>, :ref:`cinder-volume<cinder-term>`)
  and restarts any of them if they stopped.

Fuel uses ML2 plug-ins rather than Neutron plug-ins
---------------------------------------------------

Fuel 6.0 extends the support for ML2 plug-ins
that was introduced in Fuel 5.1;
support for Neutron plug-ins has been removed from Juno.
ML2 plug-in packages can be developed
without modifying the Fuel core,
which simplifies the vendor development process
and allows plug-ins to be interchanged more easily.
See the `Neutron ML2 plugin support for Fuel
<https://blueprints.launchpad.net/fuel/+spec/ml2-neutron>`_
blueprint for implementation details.
See the `Neutron ML2 plugin support for Fuel
<https://blueprints.launchpad.net/fuel/+spec/ml2-neutron>`_
blueprint for implementation details.

Collection of Anonymous Statistics
----------------------------------

Mirantis OpenStack 6.0 includes the option
to help us to improve your experience
by sending Mirantis information about the settings,
features, and deployment actions when you use Mirantis OpenStack.

Usage statistics include information such as
settings, button/menu clicks, hardware configuration,
and version information.
The usage statistics do not include information
such as passwords, ip addresses, or node names.

Mirantis’ `privacy policy
<https://www.mirantis.com/company/privacy-policy/>`_
(“Privacy Policy”)
describes our practices regarding the information we collect
on the Mirantis web sites and through the use of our products and services,
and how it is used and shared with third parties.
See the `Send anonymous usage information
<https://blueprints.launchpad.net/fuel/+spec/send-anon-usage>`_
blueprint for more details.

New Features Under Development for Mirantis OpenStack 6.0
=========================================================

The following features are under development
for Mirantis OpenStack 6.0
but are not completed for the Technical Preview.

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

.. note:: The Pluggable Architecture feature and its documentation
          are under development for the Technical Preview.

To install a plug-in,
the operator downloads and unpacks the plug-in
to the */var/www/plugins* directory
then provides the username and password for Nailgun
and runs the installation script that is included
in the plug-in's archive.

See the `Plugins for neutron/cinder in fuel
<https://blueprints.launchpad.net/fuel/+spec/cinder-neutron-plugins-in-fuel>`_
blueprint for implementation details.

Target nodes are provisioned to use images rather than native Operating System installation
-------------------------------------------------------------------------------------------

Fuel now uses images to install
the operating system on the target nodes
instead of using customized versions of
the native operating system installation scripts.
This standardizes the installation procedure
for CentOS and Ubuntu nodes,
makes the installation process more robust,
and significantly reduces the time required
to install the target nodes.
See the `Image based OS provisioning
<https://blueprints.launchpad.net/fuel/+spec/image-based-provisioning>`_
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

Support for vCenter with NSX
----------------------------

Fuel 6.0 can deploy an environment
that uses both :ref:`vCenter<vcenter-term>` as a hypervisor
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

Multiple L3 agents are now supported for an environment
-------------------------------------------------------

Fuel 6.0 can deploy an environment
that uses multiple L3 agents.
This enables you to dedicate each L3 Agent to a specific type of network;
for example, Internet-bound traffic might go through one L3 agent
and all VLAN traffic would go through another.
This builds on new Juno features
to provide permanent and stable connections to instances
even if one or more L3 agents fails.
It also allows the system to distribute routers effectively
between all available agents to improve network performance.
See the `Use multiple Neutron L3 agent mode for HA-network solution
<https://blueprints.launchpad.net/fuel/+spec/fuel-multiple-l3-agents>`_
blueprint for implementation details.

The Fuel UI allows users to set external DNS and NTP servers
------------------------------------------------------------

Fuel 6.0 allows operators
to select DNS and NTP servers
that are outside the Fuel environment.
This data is then written to the *astute.yaml* file,
from which it is transferred to the target nodes.
The */etc/resolve.conf* files on the slave nodes
will point to the controller DNS and NTP,
which will access the external DNS and NTP servers
to resolve domain names and sync all nodes to the current time.

Ceilometer can use an external MongoDB installation
---------------------------------------------------

Fuel 6.0 can deploy :ref:`Ceilometer<ceilometer-term>`
to use an external MongoDB installation
instead of MongoDB nodes that are part of the OpenStack environment.
See the `Implement possibility to set external MongoDB connection
<https://blueprints.launchpad.net/fuel/+spec/external-mongodb-support>`_
blueprint for implementation details.

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

Sahara can run in a :ref:`vCenter<vcenter-term>` environment,
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
in :ref:`vCenter<vcenter-term>` environments.

1:1 mapping between Nova Compute service instance and vSphere cluster
---------------------------------------------------------------------

Fuel 6.0 supports 1:1 mapping between
the :ref:`Nova compute<nova-term>` service
and the :ref:`vSphere<vsphere-term>` cluster
that the :ref:`vCenter<vcenter-term>` server
from :ref:`ESXi<esxi-term>` hosts.
Earlier releases used a 1:many mapping,
meaning that all vSphere clusters
were managed by a single vCenter server.
This created a single point of failure;
if the service fails for some reason,
the entire cloud lost access to Compute resources.

Fuel 6.0 launches multiple instances of the Nova Compute service
and configures each service to use a single vSphere cluster.
The Nova Compute service run on OpenStack Controller nodes
as they always did.
See the `1-1 mapping between nova-compute service instance
and vsphere cluster
<https://blueprints.launchpad.net/fuel/+spec/1-1-nova-compute-vsphere-cluster-mapping>`_
blueprint for implementation details.

The Fuel Master Node can be upgraded from 5.1.x to 6.0GA
--------------------------------------------------------

If you are running a Mirantis OpenStack 5.1 or 5.1.1 environment,
you can upgrade your Fuel Master Node to Fuel 6.0
but leave your current Mirantis OpenStack environments in place
without requiring a redeployment.
After the upgrade, the Fuel Master Node can deploy
a new Mirantis OpenStack 6.0 environment
and manage environments that were deployed with an earlier Fuel version,
performing operational functions
such as adding and deleting nodes,
viewing logs, and running Health Checks.

.. note:: No upgrade functionality is provided in the
          6.0 Technical Preview release.
          You cannot upgrade from an earlier Fuel version
          and you will not be able to upgrade to the 6.0 GA release
          from the 6.0 Technical Preview release.

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


Fuel 6.0 can update existing 5.1.x Mirantis OpenStack environments to 6.0 (Experimental)
------------------------------------------------------------------------------------------

An :ref:`experimental feature<experimental-features-term>`
enables the Fuel Master Node to update
existing 5.1.x environments to 6.0.
Once the Fuel Master Node is upgraded,
the UI provides an option to update
an existing 5.1.x environment to 6.0.

.. note:: No update functionality is provided in the
          6.0 Technical Preview release.
          You cannot update from an earlier Fuel version
          and you will not be able to update to the 6.0 GA release
          from the 6.0 Technical Preview release.


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
See the `OSCI infrastructure to public
<https://blueprints.launchpad.net/fuel/+spec/osci-to-public>`_
blueprint for implementation details.

Ceph is implemented as a plug-in
--------------------------------

:ref:`Ceph<ceph-term>` has been implemented as a plug-in
that :ref:`Nailgun<nailgun-term>` can deploy on the appropriate nodes.
The Ceph API is unchanged from that in Mirantis OpenStack 5.1.
The plug-in is packaged in the same
:ref:`docker<docker-term>` container as Nailgun
and installed on the Fuel Master node.
Because of this, the Ceph role no longer appears
on the :ref:`assign-roles-ug` screen.
Instead, a new tab is provided
from which you can select Ceph as a storage type.
See the `Nailgun Ceph Plugin
<https://blueprints.launchpad.net/fuel/+spec/nailgun-ceph-plugin>`_
blueprint for implementation details.

Additional Information
----------------------

For current information about Issues and Blueprints
for Mirantis OpenStack 6.0, see the
`Fuel for OpenStack 6.0 Milestone <https://launchpad.net/fuel/+milestone/6.0>`_
page.

