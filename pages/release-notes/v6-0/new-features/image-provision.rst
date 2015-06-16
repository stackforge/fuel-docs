
Image based provisioning
------------------------

Fuel can now use images to install the operating system
on the target nodes instead of using customized versions
of the native operating system installation scripts.
This standardizes the installation procedure
for CentOS and Ubuntu nodes,
makes the installation process more robust,
and significantly reduces the time required
to install the target nodes.
Note that the production version still uses
anaconda/preseed installers.

See the `Image based OS provisioning
<https://blueprints.launchpad.net/fuel/+spec/image-based-provisioning>`_
blueprint for implementation details.

Image-based provisioning is implemented by the
:ref:`Fuel Agent<fuel-agent-term>`.
See:

- :ref:`provision-method-ug` gives instructions
  for implementing provisioning with the Fuel Agent
  when configuring your environment.

- :ref:`fuel-agent-arch` gives details about how
  the Fuel Agent provisions the OpenStack environment.
