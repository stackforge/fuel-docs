* With the Neutron DVR feature enabled, there are the following limitations:

  * The rate of VM creation should be less than 3 VMs per minute.
  * If the constant rate of VM creation is 3 VMs per minute,
    the cloud can handle the load for a minimum of 6 hours [1]_.
    If the constant load persists over 6 hours, the cloud will
    experience intermittent issues which will affect the
    Control Plane API availability and operations.

  The 3 VMs per minute generation rate is not a regular occurrence across
  the industry and is termed a "cloud storm load". For example, IBM QRadar,
  which is a cloud security system, treats the 5 VMs per 30 minutes
  generation rate as a severe offence [2]_.

  The actual rate numbers depend on the number of active users, number of
  tenants, and the type of activity patterns. In case of self-service usage of
  the cloud, when users initiate VM provision manually, the rate of VM
  creation is considerably low and does not last long. If cloud API is
  used by automation for VM creation, the load on the cloud infrastructure
  should be carefully evaluated and throttled on the automation level.

  .. [1] Data obtained for 200 nodes configuration with VLAN+DVR.
  .. [2] See `IBM QRadar security article <http://www.ibm.com/developerworks/library/se-virtual-cloud-security/>`_.
