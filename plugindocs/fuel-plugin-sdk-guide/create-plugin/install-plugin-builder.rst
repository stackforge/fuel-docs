
.. _install-plugin-builder:

Install Fuel Plugin Builder
---------------------------

You must install the Fuel Plugin Builder on the Fuel Master node.
You must use the Fuel Master node as the build environment.

**To install the Fuel Plugin Builder**

#. Log into the Fuel Master node.
#. Install the required packages:

  .. code-block:: console

     yum install -y git python-mako createrepo dpkg-devel dpkg-dev rpm rpm-build

#. Clone the Fuel Plugin Builder repository:

  .. code-block:: console

     git clone https://github.com/openstack/fuel-plugins

#. Change to the ``fuel-plugins`` directory:

  .. code-block:: console

     cd fuel-plugins

#. Check out a specific commit from the Fuel Plugin Builder repository
   compatible with Fuel 8.0:

  .. code-block:: console

     git checkout a22bc32

  Without this commit you should always have the deprecated ``tasks.yaml``
  in the plugin, even if it is empty or the plugin will not build.

  .. note:: If the plugin metadata does not specify the same version of
            OpenStack as the one supported by the Fuel Master node,
            on which the plugin is installed, you will not see any
            plugin fields in the Fuel web UI. To be compatible with Fuel 8.0,
            the ``metadata.yaml`` file of the plugin must contain the
            following lines:

            .. code-block:: ini

               releases:
                 - os: ubuntu
                   version: liberty-8.0
                   mode: ['ha']

#. Build and install the Fuel Plugin Builder:

  .. code-block:: console

     python setup.py install

#. Verify the installed version of the Fuel Plugin Builder:

  .. code-block:: console

     python -c 'from fuel_plugin_builder.version_mapping import *; print latest_version'
  
  This should display ``4.0.0``.