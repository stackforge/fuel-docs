
.. raw:: pdf

  PageBreak

.. _settings-ug:

Configure the OpenStack environment settings
--------------------------------------------

You can configure security, compute, storage, logging, and other
settings in the :guilabel:`Settings` tab. Most of these settings you have
already configured in the deployment wizard.

Additionally, you can configure some of the advanced OpenStack settings
by editing the corresponding configuration files.

**To configure the OpenStack environment settings:**

#. In the Fuel web UI, click :guilabel:`Settings`.
#. Select a coresponding tab and edit as required:

   .. list-table:: **OpenStack environment settings**
      :widths: 10 25
      :header-rows: 1

      * - Name
        - Description
      * - **General settings**
        - * Access
             Enables you to modify access permissions for Horizon.
             By default, Fuel assigns user name, password, and tenant *admin*.
          * Repositories
             Fuel includes default repositories from which it downloads the
             packages required to install and update Fuel and OpenStack
             components. If you do not have an Internet connection, you can
             set
             up a local repository and provide the URL to the repository on
             this page.
          * Kernel parameters
             Enables you to modify kernel parameters. This field does not set
             kernel
             parameters for the Fuel Master node or for nodes that have
             already been deployed.

      * -
        -    The kernel parameters for OpenStack and Fuel include:

             * ``ttys0=<speed>``
               Enables serial console for videoless servers.
             * ``console=ttyS0,9600``
               Enables serial console.
             * ``nofb``
               Disables Linux framebuffer.
             * ``nomodeset``
               Disables the video card kernel handling. This parameter may be
               required for old integrated server video chips.
             * ``intel_iommu and amd_iommu``
               Enables/disables physical-to-virtual address translation for
               peripheral devices. Some devices, such as Mellanox cards,
               require
               this parameter to be enabled. Other peripheral devices may be
               incompatible with device virtual address space and may only
               work
               with real address space. If you are unable to boot a node or
               the
               node has a kernel panic soon after being booted, setting this
               parameter to "off" may resolve the issue.
             * ``unsupported_hardware``
               Instructs the operating system to boot even if it does not
               recognize some of the configured hardware. Failure to set
               this parameter may result in inability for Linux to boot. This
               typically happens with the latest CPU models. Because most
               hardware
               provides backward compatibility with older versions, setting
               this
               kernel parameter may enable the system to boot. However, if no
               backward compatibility is provided, the system may panic or
               fail in other ways even with this parameter set.
      * - **Security settings**
        - **Public TLS**

          * TLS for OpenStack public endpoints
             Enables TLS termination on HAProxy for OpenStack services.
          * HTTPS for Horizon
             Secures access to Horizon enabling HTTPS instead of HTTP.

          * Select source for certificate
             Enable :guilabel:`TLS for OpenStack public endpoints`
             first to select a certificate.
             You can generate a private key with certificate or
             use the pre-generated ones.

            * Self-signed
               Generates a private key and certificate to be signed by this key.
            * I have my own keypair with certificate
               Uses the pre-generated key and certificate. If selected, you need
               to specify a certificate and private key data concatenated into a single file.

          * DNS hostname for public TLS endpoints
             Enable :guilabel:`TLS for OpenStack public endpoints`
             first to specify a DNS hostname.
             Your DNS entries should point to this name.
             Self-signed certificates also use this hostname.
             The default value is ``public.fuel.local``.

          **SSH security**

          * Restrict SSH service on network
             When enabled, provide at least one working IP address
             (the Fuel Master node IP is already added).
             Add new addresses instead of replacing the provided
             Fuel Master node IP address.
             When disabled (by default), the admin, management, and storage networks
             can connect only to the SSH service.
          * Restrict access to
             The option sets access restriction to the specified range of IP addresses.
          * Brute force protection
             Grants access from all networks (except the provided ones),
             but Fuel checks the networks against the brute force attack.
      * - **Compute settings**
        - * Hypervisor
             Enables you to modify the previously selected option.
          * Nova quotas
             Sets tenant quotas on CPU and memory usage.
          * Resume guests state on host boot
             Controls whether to preserve the state of virtual instances
             across reboots.
      * - **Storage settings**
        - * Use qcow format for images
             If you select this option, ephemeral volumes will be created as a
             copy-on-write layer of the base image. If you do not select this
             option, ephemeral volumes will be full copies of the base image.
             The default setting is to use copy-on-write for ephemeral
             volumes.
             If you select to use Ceph RBD as a storage back end for ephemeral
             volumes, this setting is ignored.
          * Storage Backends
             Modify storage options you have previously selected in the
             deployment wizard. The storage options that you select must match
             the roles you assign to a node. For example, if you select
             Ceph as a storage back end, you must configure the appropriate
             number of nodes with the *Storage - Ceph OSD* role.
          * Ceph object replication factor
             Determines the minimum number of Ceph OSD nodes that Fuel must
             deploy. For a production environment, deploy at least three Ceph
             OSD nodes.
      * - **Logging settings**
        - Configure the Puppet and OpenStack debug logging and syslog
          settings.

          * Common
             Typically, you do not need to enable debug logging. Enable debug
             logging to analyze the problems in your system.
          * Syslog
             Fuel deploys an OpenStack environment with the standard Linux
             syslog message logging tool. Syslog logs activity of all
             OpenStack services. By default, ``rsyslog`` is
             configured to use the Fuel Master node as a remote syslog server
             that contains all logs generated on all nodes in the OpenStack
             environment. If you want to use an external server for
             ``rsyslog``, specify an IP address and port number of the server
             in the :guilabel:`Syslog` field.
      * - **OpenStack services**
        - Select additional OpenStack services to deploy. Some OpenStack
          services may have additional network and storage requirements.
          For more information, see:
          :ref:`configure-additional-components`.

#. Click :guilabel:`Save Settings`.

.. seealso::

   * :ref:`post-deployment-settings`
