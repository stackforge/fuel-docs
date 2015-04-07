
Horizon-related Features
------------------------

Sahara
++++++

The OpenStack Data Processing project (Sahara) has been formally
included into the integrated release in MOS, and Horizon includes
broad support for managing your data processing. You can specify
and build clusters to utilize several data types with user specified
jobs while tracking the progress of those jobs.

Nova
++++

The new action panel for nova instances provides a list of all
actions taken on all instances in current project, allowing
users to view resulting errors or actions performed by other users.

Administrators now have the ability to evacuate instances from
hypervisors that can aid in system maintenance by providing a
mechanism to migrate all instances to other hosts.

Cinder Features
+++++++++++++++

* State of a snapshot resetting enabled.
* State of a volume resetting enabled.
* Upload-to-image support.
* Volume retype.
* QoS (quality of service) support.

General UX changes
++++++++++++++++++

Horizon is transitioned to utilizing Bootstrap v3. This means some
minor improvements in UI, though it mostly remains consistent with
the previous versions.

The identity panels have been moved from the admin dashboard to
their own Identity dashboard, and accessibility is determined
by policies alone.

