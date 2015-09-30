
.. _enable_ubuntu_bootstrap:

Enable Ubuntu bootstrap (EXPERIMENTAL)
======================================

The default bootstrap operating system in Fuel 7.0 is CentOS 6.6. Ubuntu 14.04
bootstrap is only available as an experimental feature. See
:ref:`Release notes <ubuntu_bootstrap>` for details about known issues with
this feature.

To enable Ubuntu 14.04 bootstrap:

#. Enable :ref:`experimental features <experimental-features-op>`.
#. Verify that you are logged as root into your Fuel Master node console and
   that your Master node has an access to the Internet.
#. Run the :command:`fuel-bootstrap-image-set ubuntu` command.
#. Run the :command:`ls -l /var/www/nailgun/bootstrap/ubuntu/root.squashfs`
   command to verify that the Ubuntu image is built successfully. The build
   log is available in `/var/log/fuel-bootstrap-image-build.log`.