.. _plugin-repo:

Plugin repository in OpenStack
------------------------------

When you are ready to move your plugin project to a repository
in the OpenStack namespace, request the repository creation:

#. Ensure you are registered to the following resources:

   * Launchpad. See `the official OpenStack documentation <http://docs.openstack.org/infra/manual/developers.html>`_.
   * `review.openstack.org <https://review.openstack.org>`_. You must be
     a core and a release group member.

#. Go to the `Fuel project in Launchpad <https://launchpad.net/fuel>`_.
#. Click :guilabel:`Report a bug`.
#. In :guilabel:`Summary`, type in ``Create a Fuel Plugin project in
   /Openstack``.
#. In the :guilabel:`Further information` field put the following details:

   * Plugin name.
   * Plugin functionality overview.
   * Developer's contact information (email, skype, etc.). Ensure the core
     group members are registered at review.openstack.org. Otherwise they
     cannot be added as core members.
   * List of core review developers with contact information: name, email on which
     review.openstack.org is registered. These developers will merge changes.
     See `example <https://review.openstack.org/#/admin/groups/691,members>`__.
   * List of release developers with contact information: name, email on which
     review.openstack.org is registered. These developers will create release
     branches and tags in the repository. See `example <https://review.openstack.org/#/admin/groups/692,members>`__.

#. Click :guilabel:`Extra`. Under :guilabel:`Tags`, put ``devops``.
#. When the Launchpad ticket is marked ``Fix Committed`` or ``Fix Released``,
   your repository is created. Fill your repository with the required files:

   * Your plugin code. See :ref:`describe-plugin`.
   * Documentation.