
Fuel uses ML2 plugins rather than Neutron plugins
-------------------------------------------------

Fuel 6.0 extends the support for ML2 plugins
that was introduced in Fuel 5.1;
support for Neutron plugins has been removed from Juno.
ML2 plugin packages can be developed
without modifying the Fuel core,
which simplifies the vendor development process
and allows plugins to be interchanged more easily.
The `Neutron ML2 plugin support for Fuel
<https://blueprints.launchpad.net/fuel/+spec/ml2-neutron>`_ blueprint
provides background implementation details.
See :ref:`ml2-create-ops` for instructions.

