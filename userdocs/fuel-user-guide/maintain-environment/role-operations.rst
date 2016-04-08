
Role object
------------

Beginning with Fuel 6.1,
you can create, update or delete roles
using Nailgun
REST API and Fuel Client.

For Fuel CLI command reference, see :ref:`cli-roles`.

This section provides the Controller
role example:

::

    id: 9
    meta:
      conflicts:
      - compute
      description: The controller initiates orchestration activities and provides an external
        API.  Other components like Glance (image storage), Keystone (identity management),
        Horizon (OpenStack dashboard) and Nova-Scheduler are installed on the controller
        as well.
      has_primary: true
      limits:
        min: 1
        overrides:
        - condition: cluster:mode == 'multinode'
          max: 1
          message: Multi-node environment can not have more than one controller node.
        - condition: cluster:mode == 'ha_compact'
          message: At least 3 controller nodes are recommended for HA deployment.
          recommended: 3
      name: Controller
      update_required:
      - compute
      - cinder
    name: controller
    volumes_roles_mapping:
        - allocate_size: min
          id: os
        - allocate_size: all
          id: image

The following fields are mandatory:

::

  name: controller
  meta:
    name: Controller
    description: Description goes here

  # at least one volume is required
  volumes_roles_mapping:
    - allocate_size: min
      id: os

Primary behaviour for node can be enabled with ``has_primary: true`` option.
If this option is set to ``during orchestration``, you will be able to assign separate
tasks for primary-controller and controller.
