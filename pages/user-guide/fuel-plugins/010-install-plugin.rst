
.. _install-plugin:


Install Fuel plugins
====================

Overview
--------

Beginning with Mirantis OpenStack 6.0,
Fuel features the ability to install plugins before you deploy your environment.
Plugins are downloadable software components that extend the functionality of your
environments in a flexible, repeatable and reliable manner.

For example,
`Neutron LBaaS <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/#lbaas>`_
provides Load-Balancing-as-a-Service for Neutron, OpenStack Network Service.

Certification
-------------

The Fuel Plugins Certification is
a set of technical and business
processes that Mirantis uses
to verify Fuel plugins built by vendors,
allowing customer choice of plugins to lead to a predictable outcome.
That means, Mirantis Certification ensures the quality of developed solution.

In terms of Certification, Fuel plugins fall into two categories:

* *Certified* -  thoroughly reviewed, tested and supported by Mirantis.

* *Non-Certified* - reviewed, tested in terms of code and installation procedure,
  but not supported by Mirantis.


See the certification requirements at
`Mirantis website <https://www.mirantis.com/partners/become-mirantis-technology-partner/fuel-plugin-development/fuel-plugin-certification/>`_.

For information on development requirements
and FAQ, see
`Fuel Plugins <https://wiki.openstack.org/wiki/Fuel/Plugins>`_ wiki page.


Installation steps
------------------

Installation procedure is common for all plugins, but their requirements differ.

#. Download a plugin from
   `Fuel Plugins Catalog <https://software.mirantis.com/download-mirantis-openstack-fuel-plug-ins/>`_.

#. Get acquainted with the plugin documentation to learn about
   prerequisites and limitations.

#. Copy the plugin on already installed Fuel Master node.
   If you do not have the Fuel Master node yet, see `Mirantis Quick Start Guide <https://software.mirantis.com/quick-start/>`_.

   ::

         scp <fuel_plugin-file> root@:<the_Fuel_Master_node_IP>:/tmp

#. Log into the Fuel Master node and install the plugin:

   ::

         cd /tmp
         fuel plugins --install <fuel-plugin-file>

#. After your environment is created, open *Settings* tab on the
   Fuel web UI, scroll down the page and select the plugin checkbox.
   Finish environment configuration and click *Deploy* button.

For Fuel plugins CLI reference, see :ref:`the corresponding section <fuel-plugins-cli>`.


Virtual IP reservation via Fuel Plugin's metadata
-------------------------------------------------

Some plugins require additional VIP for a proper configuration. Previously, VIPs reservation was done based on information from ``release`` field in the database. Now, a plugin developer has a better way to create extra VIPs as a puppet resource in the pre-deployment or post-deployment plugin stage. It should be done after creating an environment, but before deployment process.

First, a user should configure networking for an environment and after that create
extra VIPs in a given network (public/private/management). Such reserved addresses can be later used in puppet manifests inside other plugin tasks.

For example, Zabbix can be configured in a way that it expects SNMP traffic on dedicated VIP. In that way, a plugin developer can define extra VIPs in a plugin configuration file and use it in "post deployment plugin job" as a puppet’s resource.

VIP reservation is possible only via plugin metadata. This is done by adding a new file ``network_roles.yaml``.

Netwrok roles configuration file format looks like:

 .. code-block:: yaml

    - id: "name_of_network_role"
      default_mapping: "public"
      properties:
        subnet: true
        gateway: false
        vip:
          - name: "my_vip_a"
            alias: "alias_name"
            namespace: "namespace_id"
            node_roles: "role_name"

 .. note::

    ``alias``, ``namespace``, and ``node_roles`` parameters are optional.

It this example, a new network role is described as that contains 2 VIPs (with names ``testvip_a`` and ``testvip_b``). So, the whole workflow should look like this:

#. A plugin developer adds ``network_roles.yaml`` to the plugin.
#. The plugin is compiled and installed on the Fuel master node.

   .. note::

      The package version 3.0.0 is required.

#. A cluster is created, configured, and deployment begins.
#. After deployment process starts, Nailgun allocates VIPs for each network role and sends VIPs and other metadata to astute.
#. During deployment, VIPs are available in puppet manifests via Hiera.

