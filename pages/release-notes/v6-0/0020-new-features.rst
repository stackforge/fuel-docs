What's New in Mirantis OpenStack 6.0 Technical Preview
======================================================

Mirantis is pleased to make
the Mirantis OpenStack 6.0 Technical Preview
available to our customers, partners and the community.

You can download the Technical Preview from the
`Juno Technical Preview
<http://software.mirantis.com/>`_ web site.

Your feedback is important to us and we want to hear from you -
please file bug reports, find us on IRC, submit blueprints,
ask questions and let us know how to improve.
See `Fuel/How to Contribute
<https://wiki.openstack.org/wiki/Fuel/How_to_contribute#How_and_where_to_get_help>`.

A number of features
that are planned for the 6.0 release
are still under development at the time of the
Technical Preview release.
We describe these features below,
with links to blueprints and specs for each feature.
You can access information about each feature
including implementation plans
and participate in testing features
that are of particular interest to you.

Do not expect that every feature described here
will be included in the final 6.0 product
exactly as specified here.

This document also includes preliminary information
about Resolved Issues and Known Issues for the 6.0 release.

Technical Preview Limitations
-----------------------------

The following limitations apply to
the Mirantis OpenStack 6.0 Technical Preview:

- Mirantis is providing a technical preview for feedback.
  Do not use it in production.
- No upgrade/update path from earlier releases is provided.
- No upgrade/update path will be provided
  from the technical preview to the GA release.

New Features included in Mirantis OpenStack 6.0 Technical Preview
=================================================================

Support for the latest OpenStack Juno release
---------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages
support the
`OpenStack Juno 2014.2
<https://wiki.openstack.org/wiki/ReleaseNotes/Juno>`_ release.
Fuel 6.0 deploys this version of OpenStack on either CentOS or Ubuntu.

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

Glance can use VMDK as a storage backend
----------------------------------------

Glance can now use the vSphere Datastore (:ref:`VMDK<vmdk-term>`)
as its storage backend
when vCenter is used as the hypervisor.
This greatly reduces the time required to copy images from Glance.
See the `Use vSphere Datastore backend for Glance with vCenter
<https://blueprints.launchpad.net/fuel/+spec/vsphere-glance-backend>`_
blueprint for implementation details.

VLAN Manager is supported for vCenter environments
--------------------------------------------------

VLAN Manager is now available for
the :ref:`Nova-network<nova-network-term>` networking topologies
in :ref:`vCenter<vcenter-term>` environments.

1:1 mapping between Nova Compute service instance and vSphere cluster
---------------------------------------------------------------------

Fuel 6.0 supports 1:1 mapping between
the :ref:`Nova compute<nova-term>` service
and the :ref:`vSphere<vsphere-term>` clusters
that are formed by :ref:`ESXi<esxi-term>` hosts.
Earlier releases used a 1-to-many mapping,
meaning that all vSphere clusters
were managed by a single vCenter server.
This created a single point of failure;
if the service failed for some reason,
the entire cloud lost access to Compute resources.

Fuel 6.0 launches multiple instances of the Nova Compute service
and configures each service to use a single vSphere cluster.
The Nova Compute service runs on OpenStack Controller nodes
as it always did.
See the `1-1 mapping between nova-compute service instance
and vsphere cluster
<https://blueprints.launchpad.net/fuel/+spec/1-1-nova-compute-vsphere-cluster-mapping>`_
blueprint for implementation details.

Collection of Statistics
------------------------

Mirantis OpenStack 6.0 includes the option
to help us to improve your experience
by sending Mirantis information about the settings,
features, and deployment actions when you use Mirantis OpenStack.
The anonymous collection of statistics is on by default;
during installation, you can opt out of statistics collection.

* Anonymous usage statistics include information such as
  settings, button/menu clicks, hardware configuration,
  and version information.

* The usage statistics do not include information
  such as passwords, ip addresses, or node names.

* You may choose to identify your usage reports
  with your contact information
  so that our support team can better assist you.
  This is entirely optional
  and enabled only with your permission.

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

HA stability and scalability improvements
-----------------------------------------

Mirantis OpenStack 6.0 includes a number of internal enhancements
to improve the stability and scalability of the deployed environment:

* The :ref:`Pacemaker<pacemaker-term>` deployment configuration
  has been modified so it can support
  a larger number of OpenStack Controller nodes.

* Corosync 2.0 packages are now used
  to support Fuel Controllers.
  The Puppet :ref:`Corosync<corosync-term>` module
  has been integrated into Fuel.

* Pacemaker and Corosync installation
  is now a discrete stage of deployment.

* Debug handling of OCF scripts is now unified and
  OCF resources have been renamed and no longer include the "__old" string.
  Previously, debugging OCF scripts required
  significant manual intervention by the Cloud operator.

* The service provider has been refactored
  to disable creating the same service under systemd/upstart/sysvinit.

* Diff operations against Corosync CIB
  can now save data to memory rather than a file,
  which significantly reduces the resources required
  to shut down Corosync.

* Compute nodes are now managed by Monit,
  which provides a viable control plane
  for :ref:`Nova Compute<nova-term>` services.
  Monit performs execution monitoring
  for OpenStack services that run on the Compute nodes
  (:ref:`nova-compute<nova-term>`, :ref:`nova-network<nova-network-term>`,
  :ref:`ovs-vswitched<ovs-term>`, :ref:`cinder-volume<cinder-term>`)
  automatic maintenance, and repair on the compute nodes
  and restarts any of them if they stopped.

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
  and should not contain any python code
  for deployment orchestration logic;
  python can be used for deployment,
  as can bash and Puppet.
- The plug-in can provide additional attributes
  for the environment.
- The plug-in must not add a new kernel.
- The plug-in must not modify provisioning data.
- The plug-in must not modify deployment data
  other than new data that qualifies as "cluster attributes"
  for :ref:`Nailgun<nailgun-term>`

To install a plug-in,
the operator downloads and unpacks the plug-in
to the Fuel Master node
then runs the following command to install the plug-in:
::

  fuel plugins --install some/path/fuel_plugin_name-1.0.0.fp

See the `Plugins for neutron/cinder in fuel
<https://blueprints.launchpad.net/fuel/+spec/cinder-neutron-plugins-in-fuel>`_
blueprint
and `Add cli commands to interact with plugins
<https://github.com/stackforge/fuel-web/commit/316b8854afe06fec1afd0b9d61f404825864dcb4>`_
for implementation details.

Target nodes can be provisioned to use images rather than native Operating System installation
----------------------------------------------------------------------------------------------

As an :ref:`experimental feature<experimental-features-term>`,
Fuel can now use images to install
the operating system on the target nodes
instead of using customized versions of
the native operating system installation scripts.
This standardizes the installation procedure
for CentOS and Ubuntu nodes,
makes the installation process more robust,
and significantly reduces the time required
to install the target nodes.
Note that the production image still uses
anaconda/preseed installers.
See the `Image based OS provisioning
<https://blueprints.launchpad.net/fuel/+spec/image-based-provisioning>`_
blueprint for implementation details.

Scalibility Certification for 100-node environments
---------------------------------------------------

Environments deployed with Fuel 6.0
are being certified as stable and scalable
with up to 100 nodes.
We continue to work to eliminate
stability, scalability, and performance issues for large environments.
See the `100 nodes support
<https://blueprints.launchpad.net/fuel/+spec/100-nodes-support>`_
blueprint for details about the implementation.

Mutiple L2 networks can be supported in one environment
-------------------------------------------------------

Multiple L2 networks for certain logical network types
(such as management and storage)
can be supported in one environment.
This allows the cloud operator to deploy more complex network topologies
that use the `leaf and spine
<http://www.cisco.com/c/dam/en/us/td/docs/solutions/Enterprise/Data_Center/MSDC/1-0/MSDC_AAG_1.pdf>`_
network architecture.
The previous architecture that uses a single L2 domain
for each logical network
is still fully supported.
Multiple L2 networks can only be implemented
through the :ref:`fuel CLI<cli_usage>` command,
not through the Fuel UI screens.
See the `Support multiple networks per cluster
<https://blueprints.launchpad.net/fuel/+spec/vsphere-glance-backend>`_
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
See the `Support External DNS and NTP
<https://blueprints.launchpad.net/fuel/+spec/external-dns-ntp-support>`_
blueprint for implementation details.

Ceilometer can use an external MongoDB installation
---------------------------------------------------

As an :ref:`experimental feature<experimental-features-term>`,
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
See `Implement possibility to set external MongoDB connection
<https://blueprints.launchpad.net/fuel/+spec/external-mongodb-support>`_
blueprint for implementation details.

Support for vCenter with NSX
----------------------------

Fuel 6.0 can deploy an environment
that uses both :ref:`vCenter<vcenter-term>` as a hypervisor
and :ref:`NSX<nsx-term>` as a networking option.
See the `Integration of NSX with vCenter
<https://blueprints.launchpad.net/fuel/+spec/vcenter-nsx-support>`_
blueprint for implementation details.

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
See the
`Enable Sahara support in vCenter
<https://bugs.launchpad.net/fuel/+bug/1370708>`_
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

- Users must supply a password during upgrade.


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

Fuel Community Improvements
===========================

Fuel can deploy the latest OpenStack features from upstream repository
----------------------------------------------------------------------

A Fuel ISO can now be built from the stable/juno branch
of the upstream vanilla OpenStack repo
and we are working on the ability to build a Fuel ISO
from the upstream master.
This will provide community developers a way
to deploy recent modifications that have been made
to the OpenStack repo using Fuel,
and to then build OpenStack packages and ISO files
that include these modifications.
See the `Install openstack from upstream source repositories
<https://blueprints.launchpad.net/fuel/+spec/openstack-from-master>`_
blueprint for implementation details.

Public CI environment is available to contributors
--------------------------------------------------

The Fuel team now maintains a public CI process
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

Additional Information
----------------------

For current information about Issues and Blueprints
for Mirantis OpenStack 6.0, see the
`Fuel for OpenStack 6.0 Milestone <https://launchpad.net/fuel/+milestone/6.0>`_
page.

