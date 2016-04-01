
.. _murano-test-details:

Murano platform test details
----------------------------

If you have installed the OpenStack Application Catalog (Murano) in your
OpenStack environment, you can test that Murano functions correctly by
running the Fuel platform tests.

The following table describes the details of the OpenStack Application
Catalog tests.

.. list-table:: **Murano platform tests**
   :widths: 10 10 20
   :header-rows: 1

   * - Name
     - Description
     - Scenario
   * - **Murano environment with the WordPress application deployment**
     - The test verifies that the user can deploy the WordPress application
       in the Murano environment.
     - #. Send a request to create an OpenStack environment.
       #. Send a request to create a session for the OpenStack environment.
       #. Send a request to create MySQL.
       #. Send a request to create the Linux-based Apache service.
       #. Send a request to create WordPress.
       #. Request to deploy a session.
       #. Check the environment status.
       #. Check the deployment status.
       #. Check ports availability.
       #. Check the WordPress path.
       #. Send a request to delete the OpenStack environment.
   * - **Murano environment with the Linux Apache service deployment**
     - The test verifies that the Murano service can create and deploy the
       Linux Apache service.
     - #. Verify the Linux image with Murano agent is installed in Glance.
       #. Send a request to create an OpenStack environment.
       #. Send a request to create a session for the OpenStack environment.
       #. Send a request to create the Linux-based Apache service.
       #. Request to deploy the session.
       #. Check the environment status.
       #. Check the deployment status.
       #. Send a request to delete the OpenStack environment.
