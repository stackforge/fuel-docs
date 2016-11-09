.. _enable-usb-discovery:

Enable USB devices discovery
----------------------------

When Fuel discovers Fuel Slave nodes, it does not automatically detect USB
devices. However, for testing or other purposes you may need to enable
USB devices discovery.

**To enable USB devices discovery:**

#. Log in to Fuel Master node CLI.
#. Open the ``/etc/fuel-bootstrap-cli/fuel_bootstrap_cli.yaml`` file
   for editing.
#. Add ``report_usb_block_devices`` to the ``extend_kopts`` string.

   **Example:**

   .. code-block:: console

      extend_kopts: "biosdevname=0 net.ifnames=1 debug ignore_loglevel
      log_buf_len=10M print_fatal_signals=1 LOGLEVEL=8 report_usb_block_devices"

#. Rebuild the bootstrap image:

   ::

     fuel-bootstrap build --activate

#. Reboot all discovered Fuel Slave nodes.

   The nodes boot the new bootstrap image.
