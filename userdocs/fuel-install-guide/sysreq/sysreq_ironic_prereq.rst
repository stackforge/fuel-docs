.. _sysreq_ironic_prereq:

Prerequisites for the OpenStack bare-metal service
--------------------------------------------------

Before you deploy an OpenStack environment, you must verify that your
environment meets the following network, hardware, and software prerequisites
required to successfully deploy and use the OpenStack Bare Metal service.

**Network prerequisites:**

* Configure a flat network that you will use for the nodes on which you run
  ``ironic``. This network will appear as *baremetal* in the Fuel web UI.

* Prepare the nodes on which you plan to deploy ``ironic`` by configuring the
  following:

  * Prepare the *baremetal* network.

    In fuel, the *baremetal* network consists of a virtual subnet range and
    a solid subnet range. The virtual subnet range is a part of the OpenStack
    Network service and will be mapped to the Fuel private network. Baremetal
    servers get their IP addresses from this virtual subnet range in the same
    manner as virtual instances. The solid subnet range is similar to the Fuel
    management network and is used for communication between Ironic services
    (ironic-api, ironic-conductor, ...) and agent that run on baremetal servers.
    Therefore, configure the *baremetal* network with care and ensure that the
    baremetal servers PXE boot interface are plugged into this network. If you
    need to configure this network interface only on some nodes, such as nodes
    with ``ironic`` and ``controller`` roles, use network templates.

  * Access to the IPMI network

    Since Ironic provides out-of-band management through Intelligent
    Platform Management Interface (IPMI), the nodes on which you deploy
    Ironic must have access to the IPMI network with bare-metal servers that
    you will use for provisioning.

* Verify that the network interfaces of the physical servers that connect to
  the IPMI network have either static IP addresses or, if you use DHCP, the
  DNS service is enabled in the IPMI network and the physical servers have
  stable FQDN host names.

**Hardware prerequisites:**

Follow the general guidelines for hardware prerequisites described in the
*System Prerequisites* section in the *Fuel Installation Guide*.

Fuel includes special drivers for Ironic and the default bootstrap images
that Fuel uploads to Glance when you create an OpenStack environment. If you
plan to use these default configurations, the bootstrap images are based on
the image Fuel uses to provision the OpenStack nodes. However, if you plan to
use different drivers and bootstrap images, you must verify that the bootstrap
image contains drivers that support your hardware.

**Software prerequisites:**

Each Ironic driver has requirements for the images that you will use to
provision instances on physical machines. If you use default Fuel drivers, see
*Image requirements* in the Fuel User Guide.

.. seealso::

   - :ref:`sysreq_ironic_limitations`
   - *Using networking templates* in *Fuel User Guide*
