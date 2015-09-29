* There is a known issue with Mirantis OpenStack 7.0 performance
  at scale with the DVR feature is enabled. The DVR functionality
  increases load on the MQ layer which may lead to a temporary
  Control Plane API malfunctioning.
  The issue appears when the number of VMs is close to (N) and
  number of routers close to (M).
