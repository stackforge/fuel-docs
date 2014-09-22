What is Mirantis OpenStack?
===========================

Mirantis OpenStack is made up of three components:

* Mirantis OpenStack hardened packages
* Fuel for OpenStack
* Mirantis Support

Mirantis OpenStack hardened packages
------------------------------------

These packages include the core OpenStack projects,
updated with each stable release of OpenStack,
and supporting a broad range of operating systems,
hypervisors, and deployment topologies.
Also included are:

* Packages to ensure High Availability.
* Fixes for defects reported by our customers
  that may not yet have been merged into the community source.
* Mirantis-driven premium OpenStack projects
  such as Sahara (which provides a simple means to provision
  a Hadoop cluster on top of OpenStack)
  and Murano (an application catalog that can be used
  to publish apps and compose reliable environments out of them.)
* Mirantis-certified partner plug-ins, drivers, and integrations.

Fuel for OpenStack
------------------

Fuel is a life cycle management application that deploys multiple
`OpenStack <https://www.openstack.org/>`_ clouds
from a single interface and then enables you
to manage those clouds post deployment.
You can add nodes, remove nodes, or even remove clouds,
restoring those resources to the available resources pool.
Fuel also eases the complexities of network and storage configurations
through a simple-to-use graphical user experience. Baked into Fuel are:

* Mirantis reference architectures that we have tested and certified
  to ensure that your deployed clouds are scalable, reliable,
  and production quality.
* An open and flexible library
  that enables customers to make configuration changes
  that may be more advanced or focused than the default choices within Fuel.
  This library also empowers organizations to fold additional drivers
  or integrations into the deployed environment.

Mirantis OpenStack, by default, enables those features in the Fuel Project
that Mirantis has certified and confirmed as production ready.
However, it also includes some newer features
that are marked as "experimental";
they are less-hardened but are integrated into the product
for customers who can tolerate some risk.
These experimental features can be enabled for Mirantis OpenStack
before you install the Fuel Master Node;
see :ref:`experimental-features-op`.

Mirantis Support
----------------

Mirantis OpenStack offers a subscription to our world-class support
with defined service level agreements based on the severity of your issue.
For example, the premium support guarantees a one-hour response for severity 1 issues.

