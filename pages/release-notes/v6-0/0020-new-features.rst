What's New in Mirantis OpenStack 6.0 Technical Preview
======================================================

Mirantis is pleased to make the Mirantis OpenStack 6.0 Technical Preview
available to our customers, partners and the community.

You can download the Technical Preview from the `Juno Technical Preview
<http://software.mirantis.com/6.0-openstack-juno-tech-preview/>`_ web site.

Your feedback is important to us and we want to hear from you - please file bug
reports, find us on IRC, submit blueprints, ask questions and let us know how
to improve. See the `How to contribute
<https://wiki.openstack.org/wiki/Fuel/How_to_contribute#How_and_where_to_get_help>`_
Wiki page for details on how to get in touch with us.

A number of features that are planned for the 6.0 release are still under
development at the time of the Technical Preview release. We describe these
features below, with links to blueprints and specifications for each feature.
Please do not expect that every feature described here will be included in the
final 6.0 product exactly as described here.

This document also includes preliminary information about
Resolved Issues and Known Issues for the 6.0 release.

Technical Preview Limitations
-----------------------------

The following limitations apply to
the Mirantis OpenStack 6.0 Technical Preview:

- We are providing this technical preview to get feedback.
  Do not use it in production.
- No upgrade/update path from earlier releases is provided.
- No upgrade/update path will be provided
  from the technical preview to the GA release.

New Features included in Mirantis OpenStack 6.0 Technical Preview
=================================================================

Support for the latest OpenStack Juno release
---------------------------------------------

The OpenStack core projects in the Mirantis OpenStack hardened packages support
the `OpenStack Juno 2014.2
<https://wiki.openstack.org/wiki/ReleaseNotes/Juno>`_ release. Fuel 6.0 deploys
this version of OpenStack on either CentOS or Ubuntu.

Fuel uses ML2 plugins rather than Neutron plugins
-------------------------------------------------

Fuel 6.0 extends the support for ML2 plugins that was introduced in Fuel 5.1;
support for Neutron plugins has been removed from Juno. ML2 plugin packages
can be developed without modifying the Fuel core, which simplifies the vendor
development process and allows plugins to be interchanged more easily. See the
`Neutron ML2 plugin support for Fuel
<https://blueprints.launchpad.net/fuel/+spec/ml2-neutron>`_ blueprint for
implementation details.

Glance can use VMDK as a storage backend
----------------------------------------

Glance can now use the vSphere Datastore (:ref:`VMDK<vmdk-term>`) as its
storage backend when vCenter is used as the hypervisor. This greatly reduces
the time required to copy images from Glance. See the `Use vSphere Datastore
backend for Glance with vCenter
<https://blueprints.launchpad.net/fuel/+spec/vsphere-glance-backend>`_
blueprint for implementation details.

VLAN Manager is supported for vCenter environments
--------------------------------------------------

VLAN Manager is now available for the :ref:`Nova-network<nova-network-term>`
networking topologies in :ref:`vCenter<vcenter-term>` environments.
See the `VLAN manager support for vCenter
<https://blueprints.launchpad.net/fuel/+spec/vcenter-vlan-manager>`_
blueprint for implementation details.

1:1 mapping between Nova Compute service instance and vSphere cluster
---------------------------------------------------------------------

Fuel 6.0 supports 1:1 mapping between the :ref:`Nova compute<nova-term>`
service and the :ref:`vSphere<vsphere-term>` clusters that are formed by
:ref:`ESXi<esxi-term>` hosts. Earlier releases used a 1-to-many mapping,
meaning that all vSphere clusters were managed by a single vCenter server. This
created a single point of failure; if the service failed for some reason, the
entire cloud lost access to Compute resources.
Fuel 6.0 launches multiple instances of the Nova Compute service and configures
each service to use a single vSphere cluster. The Nova Compute service runs on
OpenStack Controller nodes as it always did. See the `1-1 mapping between
nova-compute service instance and vsphere cluster
<https://blueprints.launchpad.net/fuel/+spec/1-1-nova-compute-vsphere-cluster-mapping>`_
blueprint for implementation details.

Collection of Statistics
------------------------

Mirantis OpenStack 6.0 includes the option to help us to improve your
experience by sending Mirantis information about the settings, features, and
deployment actions when you use Mirantis OpenStack. The anonymous collection of
statistics is on by default; during installation, you can opt out of statistics
collection.

* Anonymous usage statistics include information such as settings, actions,
  hardware configuration, and version information.

* The usage statistics do not include information such as passwords, IP
  addresses, or node names.

* You may choose to identify your usage reports with your contact information
  so that our support team can better assist you. This is entirely optional and
  enabled only with your permission.

Mirantis’ `privacy policy <https://www.mirantis.com/company/privacy-policy/>`_
(“Privacy Policy”) describes our practices regarding the information we collect
on the Mirantis web sites and through the use of our products and services, and
how it is used and shared with third parties. See the `Send usage
information <https://blueprints.launchpad.net/fuel/+spec/send-anon-usage>`_
blueprint for more details.

New Features Under Development for Mirantis OpenStack 6.0
=========================================================

The following features are under development for Mirantis OpenStack 6.0 but are
not completed for the Technical Preview.

HA stability and scalability improvements
-----------------------------------------

Mirantis OpenStack 6.0 includes a number of internal enhancements to improve
the stability and scalability of the deployed environment:

* The :ref:`Pacemaker<pacemaker-term>` deployment configuration has been
  improved to support a larger number of OpenStack Controller nodes.

* :ref:`Corosync<corosync-term>` cluster communication framework was updated to
  version 2.0.

* Installation of Pacemaker and Corosync is now a discrete stage of deployment.

* Debug handling of OCF scripts is now unified, OCF resources have been renamed
  and no longer include the "__old" string. Previously, debugging OCF scripts
  required significant manual intervention by the cloud operator.

* The OCF service provider has been refactored to disable creating the same
  service under systemd/upstart/sysvinit.

* Diff operations against Corosync CIB can now save data to memory rather than
  a file, speeding up the shutting down of Corosync services.

* Monit is now used in conjunction with Pacemaker to monitor and automatically
  repair critical services on OpenStack Compute nodes.

* If the public NIC on the primary controller becomes unavailable,
  the public VIP now migrates to another controller.

Pluggable Architecture
----------------------

Fuel 6.0 supports a pluggable architecture that allows new functionality to be
added to Fuel from a self-contained archive. Tools are provided that allow
contributors to package and test Fuel plugins.

This first release of the Pluggable Architecture feature has the following
constraints:

- The plugin cannot change the business logic and should not contain any
  python code for deployment orchestration logic; python can be used for
  deployment, as can bash and Puppet.
- The plugin can provide additional attributes for the environment.
- The plugin must not add a new kernel.
- The plugin must not modify provisioning data.
- The plugin must not modify deployment data other than new data that
  qualifies as "cluster attributes" for :ref:`Nailgun<nailgun-term>`.

To install a plugin, the operator downloads the plugin package to the Fuel
Master node then runs the following command to install it::

  fuel plugins --install some/path/fuel_plugin_name-1.0.0.fp

See the `Plugins for neutron/cinder in fuel
<https://blueprints.launchpad.net/fuel/+spec/cinder-neutron-plugins-in-fuel>`_
blueprint and `Add cli commands to interact with plugins
<https://github.com/stackforge/fuel-web/commit/316b8854afe06fec1afd0b9d61f404825864dcb4>`_
for implementation details.

Image based provisioning
------------------------

As an :ref:`experimental feature<experimental-features-term>`, Fuel can now use
images to install the operating system on the target nodes instead of using
customized versions of the native operating system installation scripts. This
standardizes the installation procedure for CentOS and Ubuntu nodes, makes the
installation process more robust, and significantly reduces the time required
to install the target nodes. Note that the production version still uses
anaconda/preseed installers. See the `Image based OS provisioning
<https://blueprints.launchpad.net/fuel/+spec/image-based-provisioning>`_
blueprint for implementation details.

Scalability Certification for 100-node environments
---------------------------------------------------

Environments deployed with Fuel 6.0 are being certified as stable and scalable
at up to 100 nodes. We continue to work to eliminate stability, scalability,
and performance issues for large environments. See the `100 nodes support
<https://blueprints.launchpad.net/fuel/+spec/100-nodes-support>`_ blueprint for
details about the implementation.

Mutiple L2 networks can be supported in one logical network
-----------------------------------------------------------

Multiple L2 network domains can be supported in one environment. This allows
cloud operators to use the `leaf and spine
<http://searchdatacenter.techtarget.com/feature/Data-center-network-design-moves-from-tree-to-leaf>`_
network topology in OpenStack deployments. The previous architecture that uses
a single L2 domain for each logical network is still fully supported.
Configuration of multiple L2 networks requires use of :ref:`Fuel
CLI<cli_usage>` commands, and is not fully covered in Fuel UI screens. See the
`Support multiple networks per cluster
<https://blueprints.launchpad.net/fuel/+spec/multiple-cluster-networks>`_
blueprint for implementation details.

The Fuel UI allows users to set external DNS and NTP servers
------------------------------------------------------------

Fuel 6.0 allows operators to specify DNS and NTP servers that are outside the
Fuel environment. The */etc/resolve.conf* files on the target nodes are pointed
to the controller DNS and NTP services, which forward local queries to the Fuel
master node and forward external queries to the specified external DNS and NTP
servers. See the `Support External DNS and NTP
<https://blueprints.launchpad.net/fuel/+spec/external-dns-ntp-support>`_
blueprint for implementation details.

Ceilometer can use an external MongoDB installation
---------------------------------------------------

As an :ref:`experimental feature<experimental-features-term>`, Fuel 6.0 can
configure :ref:`Ceilometer<ceilometer-term>` to use an external MongoDB cluster
instead of MongoDB nodes that are deployed by Fuel as part of the OpenStack
environment. See the `Implement possibility to set external MongoDB connection
<https://blueprints.launchpad.net/fuel/+spec/external-mongodb-support>`_
blueprint for implementation details.

Ceilometer can collect statistics in vCenter environment
--------------------------------------------------------

Fuel can now install a Ceilometer agent on the Controller node where the
Compute role is installed when deploying a vCenter environment. Operators can
then configure Ceilometer to collect metrics for the vCenter environment; see
:ref:`ceilometer-vcenter`. See the
`Implement possibility to setup ceilometer compute agent on controller
<https://blueprints.launchpad.net/fuel/+spec/ceilometer-support-for-vcenter>`_
blueprint for implementation details.

Support for vCenter with NSX
----------------------------

Fuel 6.0 can deploy an environment that uses both :ref:`vCenter<vcenter-term>`
as a hypervisor and :ref:`NSX<nsx-term>` as a networking option. See the
`Integration of NSX with vCenter
<https://blueprints.launchpad.net/fuel/+spec/vcenter-nsx-support>`_ blueprint
for implementation details.

Sahara can run in vCenter environment
-------------------------------------

Sahara can run in a :ref:`vCenter<vcenter-term>` environment, allowing vCenter
to be used for running :ref:`Hadoop<hadoop-term>`. Cluster provisioning,
attaching :ref:`Cinder<cinder-term>` volumes, and
:ref:`Swift<swift-object-storage-term>` Hadoop integration (including the
:ref:`Ceph<ceph-term>` Swift interface that allows Ceph to be used as the
storage backend for HDFS file systems) have been implemented and tested. See
the `Enable Sahara support in vCenter
<https://bugs.launchpad.net/fuel/+bug/1370708>`_ blueprint for implementation
details.

The Fuel Master Node can be upgraded from 5.1.x to 6.0 GA
---------------------------------------------------------

If you are running a Mirantis OpenStack 5.1 or 5.1.1 environment, you can
upgrade your Fuel Master Node to Fuel 6.0 and keep your current Mirantis
OpenStack environments in place without requiring a redeployment. After the
upgrade, the Fuel Master Node can deploy a new Mirantis OpenStack 6.0
environment and manage environments that were deployed with an earlier Fuel
version, performing operational functions such as adding and deleting nodes,
viewing logs, and running Health Checks.

Internal enhancements have been implemented to improve the upgrade experience.
These include:

- The upgrade tarball is smaller than in earlier releases. This simplifies the
  distribution workflow, reduces the amount of time required to download and
  unpack the tarball, and reduces the amount of free space on the Fuel Master
  node that is required for the upgrade.

- Users must supply a password during upgrade.

Upgrading the Fuel Master Node does not update the OpenStack environment. See
below for information about updating OpenStack environments.

See :ref:`upgrade-ug` for instructions.

.. note::
  No upgrade functionality is provided in the 6.0 Technical Preview release.
  You cannot upgrade from an earlier Fuel version and you will not be able to
  upgrade to the 6.0 GA release from the 6.0 Technical Preview release.

Fuel 6.0 can update existing 5.x Mirantis OpenStack environments (Experimental)
-------------------------------------------------------------------------------

An :ref:`experimental feature<experimental-features-term>` enables the Fuel
Master Node to update existing 5.x environments to more recent maintenance
releases of Mirantis OpenStack releases within the same release series (e.g.
5.0.2 to 5.0.3, or 5.1 to 5.1.1). Once the Fuel Master Node is upgraded, the UI
provides an option to update an existing environment.

See :ref:`update-openstack-environ-ug` for instructions. You can also use Fuel
CLI to update the environment; see :ref:`cli_usage` for details.

.. note::
  No update functionality is provided in the 6.0 Technical Preview release. You
  cannot update from an earlier Fuel version and you will not be able to update
  to the 6.0 GA release from the 6.0 Technical Preview release.

.. note::
  If you are running Fuel 4.x or earlier, you cannot upgrade but must install
  Mirantis OpenStack 6.0 and redeploy your environment to use the new release.

Improvements for Fuel Contributors
==================================

Fuel can build ISO with upstream vanilla OpenStack code
-------------------------------------------------------

A Fuel ISO can now be built from the stable/juno branch of the upstream
OpenStack repositories and we are working on the ability to build a Fuel ISO
from the upstream master branch. This will provide community developers a way
to deploy recent modifications that have been made to OpenStack using Fuel, and
to build OpenStack packages and Fuel ISO images that include these
modifications. See the `Install openstack from upstream source repositories
<https://blueprints.launchpad.net/fuel/+spec/openstack-from-master>`_ blueprint
for implementation details.

Public CI environment is available to contributors
--------------------------------------------------

The Fuel team now maintains a public CI infrastructure that contributors can
use to build, test and publish rpm and deb packages for Fuel dependencies,
which are not part of stackforge (for instance, MCollective).
Code and package build scripts (rpm specs and deb rules) are stored in
Git+Gerrit with Launchpad authorization. Any Launchpad user can propose a
commit for review in this system.

CI process is provided by Jenkins with the Gerrit-trigger plugin. It tracks the
code reviews and runs the unit tests in a prepared environment, reporting the
results back to the Gerrit review. Users can access the Jenkins job logs for
more detailed information about the test results.

When unit tests pass, Jenkins sends the code to the build service for
packaging, which is performed in a clean environment using the Open Build
Service. Users can view Jenkins job artifacts to see what information about
building was passed to Jenkins.

After a successful build, Jenkins uploads the package to a public repository,
and then performs basic functional tests on the package in a specially prepared
OpenStack environment. See the `OSCI infrastructure to public
<https://blueprints.launchpad.net/fuel/+spec/osci-to-public>`_ blueprint for
implementation details.

Additional Information
----------------------

For current information about Issues and Blueprints for Mirantis OpenStack 6.0,
see the `Fuel for OpenStack 6.0 Milestone
<https://launchpad.net/fuel/+milestone/6.0>`_ page.

