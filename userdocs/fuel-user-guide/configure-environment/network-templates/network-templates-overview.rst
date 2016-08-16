.. _network-templates-overview:

Overview of network templates
-----------------------------

A network template is a ``.yaml`` file that contains network configuration
for an OpenStack environment that Fuel automatically discovers and applies
to the OpenStack environment configuration. You must create and configure
the template according to your environment requirements. For your convenience,
use the following :ref:` Network template examples`.

The name of the network template
must follow this convention: ``network_template_<ENV_ID>.yaml``. Verify the
ID of your OpenStack environment by running the ``fuel environment`` command.

For example, if the ID of an OpenStack environment is 1, the name of the
template is ``network_template_1.yaml``.
