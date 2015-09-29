=======================================================
Dynamically build Ubuntu-based bootstrap on master node
=======================================================

https://blueprints.launchpad.net/fuel/+spec/dynamically-build-bootstrap

This document describes bootstrap images configuration,
rebuilding, and switching between several bootstrap images
using CLI.

We should support Ubuntu bootstrap images to have one common Operating System
for bootstrapping and deploying nodes. Only ubuntu kernel image customization
should be possible. Other kernels will not be supported.

-------------------
Problem description
-------------------

Now we use Centos as bootstrap image. This leads to old
version of kernel/drivers/packages. We need to move from Centos to Ubuntu
which will delivers fresh components.
Moreover we use Ubuntu as post-provisioning system,
this will give us more consistent environment.

At the moment bootstrap image customization is a complicated process.
Currently the builder script requires editing config files and running scripts
on the master node.
In addition operator needs a way to add custom packages inside bootstrap.

Therefore a proper CLI-tool for configuring, rebuilding
and switching to new bootstrap images is required.

Use cases
=========

#. Dynamically build Ubuntu-based bootstrap image during
   Fuel Master node installation [DONE]
   Goal: Build initial bootstrap image during Fuel master node installation,
   prepare for node discovery via PXE boot

    #. User launches Fuel master node from Fuel ISO
    #. Fuel Menu presents user with (new and always shown) options to:
        * adjust repo location for bootstrap image
          (default should be provided) [DONE]
        * specify proxy server to access the repos [DONE]
    #. User configures the options from previous steps and commits changes
    #. Fuel Menu checks the accessibility of repos for bootstrap
       via networking configuration.

        #. If repo is not accessible - indicate informative + actionable
           error message: "The repo specified for Fuel Bootstrap
           is not accessible via network. Please check network settings
           and repo location, adjust them and try again". [DONE]
        #. If repo is STILL not accessible - user can prompt Fuel Menu to
           proceed with Fuel master bootstrap
           (with the intent to sort out repo later)
        #. If repo is accessible - proceed with normal process of
           Fuel master installation and bootstrap building.

#. Apply customized bootstrap image to MOS nodes
   Goal: Customize bootstrap image to particular deployment requirements

    #. Use Case 1 is finished (Fuel master node is deployed).
    #. User applies documented procedure + tooling to rebuild bootstrap image
       on Fuel master node (including options such as kernel version pinning,
       driver enabling, package installation).
    #. By the end of rebuild process the bootstrap image created in
       --output-dir, and can be applied as "active" for Fuel master.
    #. User has the way to switch "active" bootstrap image.
       User can have several bootstrap images builded, but only one can
       be activated for all environments.

User Experience
===============

* Fuel Menu allows user to specify repo location for bootstrap building
  and proxy setting

* Fuel WebUI and CLI show indication of bootstrap building failure
  if such happened during master node installation

    * Actionable hint is included on how to use tooling to rebuild bootstrap
      on Fuel master node when it's already installed

* Fuel CLI provides utilities to rebuild Ubuntu-based bootstrap
  with customizations

----------------
Proposed changes
----------------

#. Extend script for building image that allows the following actions:
    * Customize list of packages installed in the image.
    * Inject custom files inside the bootstrap image.
    * Configure repositories for bootstrap image creating.
    * Add warning message :
      Every time when you rebuild a bootstrap image please make sure
      that you keep all the options required by all the servers
      managed by Fuel master in place. For example, if you're rebuilding
      bootstrap with new NIC or RAID driver added - make sure
      that previously added drivers remain enabled.
#. Update Web UI "warning-message":
    * Message should be "uncloused" while default image not added.
#. Provide documentation with examples of bootstrap image customization:
     * Generic way to build bootstrap image from custom repositories.
     * Kernel version selection.
     * Adding custom drivers.
     * PXE parameters configuration (e.g. kernel cmdline).
#. Add possibility to skip default bootstrap building process
   to speedup Fuel master deployment(from fuel-menu).


Web UI
======

* UI should provide a "non-skipped " warning, while default bootstrap not added.


Nailgun
=======


Data model
----------


REST API
--------


Orchestration
=============


RPC Protocol
------------


Fuel Library
============

Extend fuel-library import-bootstrap system.
Implement fuel-library skip-bootstrap option.

Fuel Client
===========

Bootstrap generator
===================

Bootstrap generator create bootstrap images for fuel-master.
It use default configurations and allow user to make customization.
There is 3 ways to make customization:

    * set additional packages for installation
    * unpack tarball or copy folder into root bootstrap
    * perform user script at bootstrap file system during image creation

::

    mkbootstrap file-name [ options ]

--ubuntu-repo REPOSITORY        Add ubuntu-mirror repo
--repository REPOSITORY         Add additional repository(mos\custom)
--package PKGNAME               Install package from the repository.
--package-file FILE_PATH        Install package from DEB file.
--package-list-file FILE_PATH   Install list of packages. Package names listed
                                in the given file.
--inject-files-from DIR_OR_ARCHIVE   Directory or archive that will be injected
                                     to the image root filesystem.
Example:
# tree /tmp/cool_stuff_directory/
/tmp/cool_stuff_directory/
└── root
    └── dir1
        └── dir2
            └── dir3

--inject-files-from /tmp/cool_stuff_directory/ will be injected like:
{image}/root/dir1/dir2/dir3

--chroot-pause                  Don't finish build process, and  pause.
                                This option enable user possibility
                                to land in chroot system and made any
                                custom changes

--script FILE_PATH              Script to be executed at the end of
                                image creation process, inside image system.
--kernel-params PARAMS          Custom kernel parameters(opt)
--kernel-flavor                 Defines kernel version
                                (default=-generic-lts-trusty)
--suite                         Defines the Ubuntu release (default=trusty)

Examples:


.. code-block:: bash

   $ mkbootstrap new_bootstrap --ubuntu-repo 'http://archive.ubuntu.com/ubuntu trysty main' --repository 'http://mirror.fuel-infra.org/mos-repos/ubuntu/8.0 mos8.0 main,priority=1101' --repository 'http://me.example.com/my-openstack kilo main,priority=1104' --package screen --package-file '~/my_cool_deb/awesome.deb'

Plugins
=======

------------
Alternatives
------------

Support only the latest version of a bootstrap for fuel.
In that case if operator installs new version of the bootstrap for all nodes.
Otherwise he will loose a possibility to manage bootstrap-per-node function.

   Cons:
      - All nodes have the same version of the bootstrap.
        Operator doesn't have possibility to use different
        versions of bootstrap for node.
   Pros:
      - Some part of this spec can be abandoned.

--------------
Upgrade impact
--------------

None

---------------
Security impact
---------------

None

--------------------
Notifications impact
--------------------

None

---------------
End user impact
---------------

------------------
Performance impact
------------------

None

-----------------
Deployment impact
-----------------

to be filled

----------------
Developer impact
----------------

None

--------------------------------
Infrastructure/operations impact
--------------------------------

Fuel master operator will be available to build customized bootstrap images.

--------------------
Documentation impact
--------------------

We need to prepare documentation which will describe this design change.

--------------------
Expected OSCI impact
--------------------


--------------
Implementation
--------------


Assignee(s)
===========

Primary assignee:
    # TODO: Add primary assignee

Mandatory design review:
    * Aleksey Kasatkin <akasatkin@mirantis.com>

QA engineers:
    * Dmitry Kalashnik <dkalashnik@mirantis.com>


Work Items
==========

* Modify builder script to provide required bootstrap image customization.
* Extend Web UI to show blocker warning.
* Extend fuel-library import-bootstrap system.
* Create example for changing linux kernel version.
* Create example for drivers customization.

Dependencies
============


-----------
Testing, QA
-----------

* Manual testing should be run according to the UI use cases steps
* Manual testing should be run according to the CLI use cases steps
* System tests should be created for the new bootstrap image building feature
* System tests should be created for the new bootstrap customization feature


Acceptance criteria
===================

* Use Cases 1 and 2 from Problem description pass
* The workaround for bug with interface naming by Ubuntu
  (https://bugs.launchpad.net/mos/+bug/1487044) is applied for bootstrap
  context (hardcoded NIC names in bootstrap)
* User must have a documented way to adjust settings described above and
  rebuild bootstrap image later, when Fuel master node is installed.
* User must have a documented way to inject additional
  driver/configuration into bootstrap image

    - This has to be available for with tools at a later stage
      (after Fuel master is deployed)
    - The example of Mellanox Connect-X and some RAID storage
      driver should be taken

* User must have a documented way to pin kernel version
  to be used: mirantis default (relevant for the moment of GA release),
  ubuntu latest, user specified
* Fuel Menu network check must ensure that the specified bootstrap
  repositories can be accessed from the Fuel Master
* If an error occurs during bootstrap image build:

    - Fuel master must gracefully complete provisioning of itself
    - User must receive an indication about bootstrap image being not available
      on Web UI and CLI, with pointer to a log for troubleshooting.

* Should be possibility to override  all default repositories links.

----------
References
----------
