.. raw:: pdf

   PageBreak

.. index:: Fuel UI: Post-Deployment Check

.. _intro-health-checks:

Health checks
-------------

Fuel provides capabilities to analyze your OpenStack environment
functionality through health checks. Fuel's health checks provide
status information about the most commonly used
components and the most recently performed actions.

The following table describes the Fuel automated health checks.

.. list-table:: **Fuel automated health checks**
   :widths: 10 30 25
   :header-rows: 1

   * - Category
     - Description
     - Tests
   * - **Sanity tests**
     - Verify overall system operability. If these tests fail, you may
       need to restart some OpenStack services. Sanity tests will likely
       be the point on which the success of your deployment pivots, but it is
       critical to pay close attention to all information collected from
       theses tests.
     - Include multiple tests that requests the lists of various OpenStack
       objects, configurations, and services. If you deploy additional
       OpenStack services, include tests specific to these services.
   * - **Functional tests**
     - Reveal networking, system-requirements, and functionality issues.
       Functional tests verify basic OpenStack operations in normal
       conditions.
     - Include multiple tests that create or launch various OpenStack
       objects and virtual instances.
   * - **High-availability tests**
     - Verify that the high-availability architecture functions correctly.
       These tests include verification of RabbitMQ availability, HAproxy
       back ends status and so on.
     - Include tests that verify that various components, such as RabbitMQ,
       Pacemaker, the Galera cluster, and son on are highly-available and
       operational.
   * - **Platform services functional tests**
     - Verify basic functionality of the Orchestration service (Heat),
       Hadoop service (Sahara), Telemetry service (Ceilometer),
       and Application Catalog service (Murano).
     - Include multiple tests that verify functionality of additional
       OpenStack components. Some services, such as Sahara and Murano,
       require additional preparation before running a test.

       For more information, see:

       * :ref:`sahara-test-prepare`
       * :ref:`sahara-test-details`
       * :ref:`murano-test-prepare`
       * :ref:`murano-test-details`
       * :ref:`heat-test-details`

   * - **Cloud validation tests**
     - Verify that your cloud functions correctly. These tests verify that
       your
       nodes have enough free space, as well as various cloud settings, such
       as log rotation and so on.
     - Cloud validation tests include:

       * Check the disk space outages on the Controller and Compute nodes.
       * Check log rotation configuration on all nodes.

   * - **Configuration tests**
     - Verify Fuel configuration. For example, one of the tests verifies that
       you have changed the default password and suggests to change it if you
       did not.
     - Configuration tests include:

       * Check usage of the default credentials (password) for root user to
         SSH on the Fuel Master node. If the default password has not been
         not changed, the test fails with a recommendation to change it.
       * Check usage of the default credentials for the OpenStack environment.
         If you use the default values for the admin user, the test fails
         with a recommendation to change the password and user name for the
         OpenStack user with the admin role.

