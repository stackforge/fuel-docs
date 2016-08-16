.. _templates-for-node-role:

templates_for_node_role
-----------------------

**Description**

List of template names for every node role used in the environment.
The order of the template names is significant and must be provided
according to your configuration requirements. For example, first
the Puppet module must create a network bridge and then the
corresponding sub-interface and not vice versa. While templates
can be reused for different node roles, each template is executed
once for every node.
When several roles are mixed on one node, an alphabetical order of
node roles is used to determine the final order of the templates.

**Example**

::

  templates_for_node_role:
  controller:
        - public
        - private
        - storage
        - common
  compute:
        - common
        - private
        - storage
  ceph-osd:
        - common
        - storage
