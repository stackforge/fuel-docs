.. _streamlined-patching-ops:

Applying streamlined patches
============================

.. note::
   The primary user of the the streamlined patching feature is
   the Linux system administrator. If you are not confident enough,
   you may want to skip this.

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

Patching prerequisites
----------------------

* Make sure you are registered at at the `official Mirantis website <https://software.mirantis.com/openstack-download-form/>`_.
  Once you are registered, you will receive regular email notifications
  on the available patches in an aggregate form. Once you receive the email,
  you can click on the patching items listed there. This will lead you to
  the `errata portal <http://errata.mirantis.com/>`_.

* Make sure you have the repositories configured correctly as
  described in :ref:`Configuring repositories<configuring-repos-ops>`.

* At the portal you will see a list of all the available patches.
  Each patching item will have detailed instructions on how to
  download and apply each of them.

Applying the patches
--------------------

Each patch item listed at the the `errata portal <http://errata.mirantis.com/>`_
will have the exact commands you need to run to download and apply
the patch -- usually ``yum`` or ``apt-get``, followed by restarting
the associated service. The listed commands need to be executed on
every node that you need to patch.

In addition to the patch itself, Mirantis will also provide steps to verify that the patch was applied successfully.

See below for an example.

.. image:: /_images/errataPatching.png
