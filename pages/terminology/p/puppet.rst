
.. _puppet-term:

Puppet
------
Puppet modules bring scalable and reliable IT automation
to OpenStack cloud deployments.
See the `Puppet web page <http://puppetlabs.com/solutions/cloud-automation/compute/openstack>`_ for more details.

Fuel uses Puppet as the configuration management system
that compiles a set of instructions
for a configurable, reproducible, and sharable installation process.
In Fuel 4.1 and later, the Puppet modules and manifests are synchronized
between the master nodes and the managed nodes, then applied locally.
This solves the security signing, scalability, and performance issues
encountered on earlier releases
where the Puppet Master Node ran on the Fuel Node Master.

Passing custom attributes can be helpful
when you have some Puppet manifests that should be run
but are not supported by Fuel itself.  See
:ref:`yaml-config-ops`.
