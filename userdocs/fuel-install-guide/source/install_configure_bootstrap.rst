.. _install_configure_bootstrap:

Configure a bootstrap image
~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can build a custom Ubuntu bootstrap image with
the Fuel bootstrap builder that Fuel Master will use
to boot Fuel Slave nodes.

You can include additional packages, custom drivers, and even
change the default Ubuntu kernel to be deployed on Fuel Slave nodes.

This section includes the following topics:

* :ref:`Overview of the Fuel bootstrap builder <bootstrap_builder>`
* :ref:`The fuel-bootstrap container format <bootstrap_container_format>`
* :ref:`View available bootstraps <bootstrap_view>`
* :ref:`Select a bootstrap <bootstrap_select>`
* :ref:`Build a bootstrap image with an additional package <bootstrap_add_package>`
* :ref:`Install a custom kernel <bootstrap_install_kernel>`
* :ref:`Inject custom SSL certificates <bootstrap_inject_cert>`
* :ref:`Inject a driver (from .deb packages) <bootstrap_inject_driver>`
* :ref:`Enable advanced debugging <bootstrap_debug>`
* :ref:`Troubleshoot custom bootstrap building <bootstrap_troubleshoot>`
