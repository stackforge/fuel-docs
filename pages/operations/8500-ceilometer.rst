
.. _ceilometer-ops:

Running Ceilometer
==================

Fuel can configure :ref:`Ceilometer<ceilometer-term>`
to run in your OpenStack environment.
See :ref:`ceilometer-mongodb-plan` for information
about the resources required to run Ceilometer.

QUESTION:

- How does Fuel deploy Ceilometer?  Does it provide some default
  metering and configuration choices that are a reasonable starting point
  or is it a blank canvas that the user must configure in order to get
  any data out of it?
- Is there a configuration file that shows what data Ceilometer
  is collecting?

For complete information about configuring and running Ceilometer,
see `Ceilometer Developer Documentation <http://docs.openstack.org/developer/ceilometer/>`_.

.. _ceilometer-config-ops:

Configuring Ceilometer
----------------------

Three types of measurement are defined:

- Cumulative -- increasing over time (instance hours)
- Gauge -- Discrete items (floating IPs, image uploads)
  and fluctuating values (disk I/O)
- Delta -- Changing over time (bandwidth)

For a complete list of meter types by component
that are currently implemented, see

- `<http://ceilometer.readthedocs.org/en/latest/measurements.html>`_
- `<http://docs.openstack.org/developer/ceilometer/measurements.html>`_

For a complete list of Configuration Options, see

- `<http://ceilometer.readthedocs.org/en/latest/configuration.html>`_
- `<http://docs.openstack.org/developer/ceilometer/configuration.html>`_

.. ceilometer-run-ops:

Running Ceilometer
------------------

.. ceilometer-api-ops:


