* With the Neutron DVR feature enabled, there are the following limitations:

  * The rate of VM creation should be less than 3 VMs per minute.
  * If the constant rate of VM creation is 3 VMs per minute,
    the cloud can handle the load for a minimum of 6 hours [1]_.
    Anything above the 6 hours limit is not guaranteed.

  The 3 VMs per minute generation rate is not a regular occurrence across
  the industry and is termed a "cloud storm load". For example, IBM QRadar,
  which is a cloud security system treats the 5 VMs per 30 minutes
  generation rate as a severe offence [2]_.

  .. [1] Data obtained for 200 nodes configuration with VLAN+DVR.
  .. [2] See `IBM QRadar security article <http://www.ibm.com/developerworks/library/se-virtual-cloud-security/>`_.
