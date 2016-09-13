.. _cli-roles:

========================
Role management commands
========================

.. include:: /userdocs/snippets/notes/deprecated-cli-v1.rst

Fuel CLI implements standard CRUD for operations on a node role.
The following table describes the role management commands
available in the Fuel CLI.

.. list-table:: **Role operations commands**
   :widths: 10 10 20
   :header-rows: 1

   * - Description
     - Command
     - Example
   * - List roles.
     - ``fuel role --rel <release_id>``
     -  ::

         fuel role --rel 2

        **System response:**

        ::

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

   * - Create a new role from the ``.yaml`` file.
     - ``fuel role --rel <2> --create --file <file.yaml>``
     - #. Create a role in a ``.yaml`` file.

          The following text is an example of a .yaml file for the Swift
          role:

          ::

           meta:
             description: Installs swift server.
             has_primary: true # we need primary-swift and swift during
             orchestration
             name: Swift
           name: swift
           volumes_roles_mapping:
             - allocate_size: min
               id: os
       #. Assign the role:

          ::

            fuel role --rel <2> --create --file <swift.yaml>

       #. View the role:

          ::

            fuel role --rel <2>

          **System response:**

          ::

              name          | id
             --------
              swift         | 17

   * - Update the role data
     - ``fuel role --rel <release_id> --update --file <file>``
     - ::

          fuel role --rel <2> --update --file <swift.yaml>

   * - Delete the role.
     - ``fuel role --rel <release_id> --delete --role <file>``
     - ::

        fuel role --rel <2> --delete --role <swift>

        line 573
