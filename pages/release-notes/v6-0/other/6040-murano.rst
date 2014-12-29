
.. _murano-rn:

Application Catalog System (Murano)
-----------------------------------

New Features and Resolved Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

* Murano no longer changes deployment status to "successful" when Heat stack failed.
  See `LP1353589 <https://bugs.launchpad.net/bugs/1353589>`_.

* Deployment no longer hangs in the **Agent task**
  execution stage.
  See `LP1383360 <https://bugs.launchpad.net/bugs/1383360>`_.

* Murano is now present in Keystone service list.
  See `LP1362037 <https://bugs.launchpad.net/bugs/1362037>`_.

* RabbitMQ now handles Murano users correnctly
  and so no longer loses Murano users
  when the Primary Controller in an HA cluster is shut down.
  See `LP1372483 <https://bugs.launchpad.net/fuel/+bug/1372483>`_.

Known Issues in Mirantis OpenStack 6.0
++++++++++++++++++++++++++++++++++++++

* Murano requires the Neutron network type.
  If you choose nova-network as the network type during deployment,
  the option to install the Murano project is greyed out.
  This is a design decision made by the OpenStack community;
  it allows us to focus our efforts on Neutron,
  and we see little demand for Murano support on Nova-network.

Murano CLI client specifies the wrong endpoint in Keystone
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Murano CLI client does not work
because the wrong endpoint is specified for Murano
in Keystone.
The OpenStack Dashboard (Horizon) works
because the dashboard settings specify the correct URLs.
To change the Murano endpoint in Keystone:

#. Log into one of the Controller nodes
   and execute the **source openrc** command
   to import credentials and access OpenStack servces from the CLI.

#. Get the service-id for the Murano service:

   .. code-block :: sh

      keystone service-list | grep application_catalog \
      | cut -d '|' -f 2 | sed 's/ //'

#. Get the  current endpoint details for the Murano service:

   .. code-block :: sh

      keystone endpoint-list | grep <service-id>

   The output lists the id, region, publicurl,
   internalurl, adminurl, and  service_id.
   Copy these values down;
   you will need them when you create the new endpoint.

#. Remove the old endpoint:

   .. code-block :: sh

      keystone endpoint-delete <endpoint-id>

#. Create the new endpoint,
   using the endpoint details information
   that you saved from the **endpoint-list** output.
   Specify the URLs without the API version and tenant-id;
   in other words, `http://172.16.0.2:8082/v1/d0cc29e90b9847d28a05e37beeed6303`
   is expressed as `http://172.16.0.2:8082`:

   .. code-block :: sh

      keystone endpoint-create --service <service-id> --publicurl <endpoint-url> \
       --internalurl <endpoint-url> --adminurl <endpoint-url>


   See `LP1397273 <https://bugs.launchpad.net/mos/+bug/1397273>`_.

Murano does not free resources after redeployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

User can remove a component from an already deployed environment
but the resources associated with that component
are not released unless the entire environment is deleted.
See `LP1392351 <https://bugs.launchpad.net/mos/+bug/1392351>`_.
