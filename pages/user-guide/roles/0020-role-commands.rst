
Role commands
--------------

CLI basically implements standard CRUD for operating on a role.

Roles can listed with

::

    fuel role --rel 2

    name          | id
    --------------|---
    controller    | 9
    compute       | 10
    cinder        | 11
    cinder-vmware | 12
    ceph-osd      | 13
    mongo         | 14
    zabbix-server | 15
    base-os       | 16


Lets say we want to create swift role in *swift.yaml*

::

    meta:
      description: Installs swift server.
      has_primary: true # we need primary-swift and swift during orchestration
      name: Swift
    name: swift
    volumes_roles_mapping:
    - allocate_size: min
      id: os

Then create it, and use it for your own tasks

::

    fuel role --rel 2 --create --file swift.yaml

    fuel role --rel 2

    name          | id
    --------
    swift         | 17

Role data can be updated with

::

    fuel role --rel 2 --update --file swift.yaml

And delete

::
    fuel role --rel 2 --delete --role swift
