Heat-related Features
---------------------

Heat Docker Resource enabled by default
+++++++++++++++++++++++++++++++++++++++

Mirantis OpenStack 6.1 enables Docker Resource for
Heat by default. Now it can be used by Murano without additional
deployment workarounds. Installed
at the deployment step, Docker Resource is available for
Heat on its first launch. Use the :command:`heat resource-type-list`
command to view the list of available resources.

For more details, see the `Enable Heat Docker resource by default
<https://blueprints.launchpad.net/mos/+spec/heat-docker-resource-by-default>`_
blueprint.


Heat configured to use Keystone v3 domains by default
+++++++++++++++++++++++++++++++++++++++++++++++++++++

Full power of OpenStack Orchestration (Heat) is now available for
non-admin users. Now both admin and non-admin users can use autoscaling,
wait conditions, and software deployment features in their Heat templates.

For more details, see the `Enable Heat to use Keystone v3 domains
<https://blueprints.launchpad.net/mos/+spec/heat-domains>`_ blueprint.


Other
+++++

* Recovery from failures during stack updates.

* API to cancel and roll back an in-progress stack update.

* Implementation of new resource types:

   - OS::Glance::Image.

   - OS::Heat::SwiftSignal.

      - Provides the option to store Wait Condition (and Software Deployment)
        data in Swift.

   - OS::Heat::StructuredDeployments.

      - Groups code for multiple lifecycle events into a single deployment
        resource.

   - OS::Heat::SoftwareDeployments.

      - Provides a way of avoiding circular dependencies when deploying an
        interdependent cluster of servers.

   - OS::Heat::SoftwareComponent.

   - OS::Nova::ServerGroup.

   - OS::Sahara::NodeGroupTemplate.

   - OS::Sahara::ClusterTemplate.

* Remember the previously-supplied parameters when updating a stack.

* Improved scalability.

* Improved visibility into trees of nested stacks.
