.. _streamlined-patching-ops:

Applying streamlined patching
=============================

.. note::
   The primary user of the the streamlined patching feature is
   the Linux system administrator. If you are not confident enough,
   you may want to skip this.

For the detailed description of how streamlined patching is implemented
see :ref:`Mirantis OpenStack streamlined patching<streamlined-patching-ref>`.

With the streamlined patching feature in Mirantis OpenStack 6.1 you can
now keep your environment up-to-date in a customized fashion without
the need to upgrade to the latest version.

.. note::
   The streamlined patching feature is introduced in
   Mirantis OpenStack 6.1 and will not work in older releases.

There are two types of officially supported updates:

1. Bugfix updates -- These are released in an aggregated form and
   consist of bug fixes and security updates. The bugfix updates
   are run through our internal testing to ensure that they work
   without breaking each other.
2. Security updates -- These are released as soon as they are available.

Streamlined patching prerequisites
----------------------------------

* Make sure you are registered at at the `official Mirantis website <https://software.mirantis.com/openstack-download-form/>`_.
  Once you are registered, you will receive regular email notifications
  on the available patches in an aggregate form. Once you receive the email,
  you can click on the patching items listed there. This will lead you to
  the `errata portal <http://errata.mirantis.com/>`_.

* At the portal you will see a list of all the available patches.
  Each patching item will have detailed instructions on how to
  download and apply each of them.

* Make sure you have the repositories configured correctly as
  described below.

Configuring repositories
------------------------

By default, your environments will have the configuration of the
repositories that point to the Mirantis update and security
repository mirrors. There is also an 'Auxiliary' repository configured
on the Fuel Master node which can be used to deliver packages
to the nodes.

To change the list of repositories, you will need to
amend the three fields which contain the required information
for the repositories configuration depending on the
distribution you install.

For CentOS
++++++++++

::

  |repo-name|repo-baseurl|repo-priority|

e.g

::

  my-repo http://my-domain.local/repo 10

For Ubuntu
++++++++++

::

  |repo-name|apt-sources-list-string|repo-priority|

my-repo deb http://my-domain.local/repo trusty main 1200

Additional information
++++++++++++++++++++++

For additional information read the following:

* Ubuntu: `PinningHowto <https://help.ubuntu.com/community/PinningHowto>`_
* CentOS: `yum-plugin-priorities <http://wiki.centos.org/PackageManagement/Yum/Priorities>`_
