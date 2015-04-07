
Heat Docker Resource enabled by default
---------------------------------------

Mirantis OpenStack 6.1 enables Docker Resource for
Heat by default. Now it can be used by Murano without additional
deployment workarounds. Installed
at the deployment step, Docker Resource is available for
Heat on its first launch. Use the **heat resource-list**
command to view the list of available resources.

For more details, see the `Enable Heat Docker resource by default
<https://blueprints.launchpad.net/mos/+spec/heat-docker-resource-by-default>`_
blueprint.


Heat configured to use Keystone v3 domains by default
-----------------------------------------------------

Full power of OpenStack Orchestration (Heat) is now available for
non-admin users. Now both admin and non-admin users can use autoscaling,
wait conditions, and software deployment features in their Heat templates.

For more details, see the `Enable Heat to use Keystone v3 domains
<https://blueprints.launchpad.net/mos/+spec/heat-domains>`_ blueprint.
