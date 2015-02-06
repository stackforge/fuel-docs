.. _ceilometer-vcenter-support:

Ceilometer support for vCenter is improved
------------------------------------------

In 6.1, Ceilometer support for vCenter is implemented according
to 1-1 mapping principle (the one done between :ref:`nova-compute and
vSphere cluster <1-1 mapping>`).
Now Ceilometer compute service is available
for each vSphere cluster: every agent polls resources
about instances from those that only relate to their vSphere cluster.
What is more, monitoring under Pacemaker is introduced
for every Ceilometer compute service to avoid failures.
For more information, see
:ref:`Related projects for vCenter<ceilometer-related-projects>`.