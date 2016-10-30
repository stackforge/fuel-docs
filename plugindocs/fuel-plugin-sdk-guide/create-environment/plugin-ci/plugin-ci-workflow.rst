.. _plugin-ci-workflow:

CI workflow
-----------

The Fuel developers team recommends that you follow this CI workflow:

#. Prepare labs and start or update the lab:

   * Download the ISO from `Fuel CI <https://ci.fuel-infra.org/>`_.
     Depending on the Fuel version specified in plugin’s requirements,
     Jenkins downloads the released ISO and/or the currently developed
     and passed BVT test on core CI.

   * Deploy the downloaded ISO and prepare the required labs
     for testing using the ``fuel-dev`` and ``fuel-qa`` repositories:

     .. code-block:: console

        $ fuel-main/utils/jenkins/system_tests -t test -j \
        dis_fuelweb_test -i (path to downloaded Fuel-ISO) \
        -o --group=setup -V ${VIRTUAL_ENV} -k

   * Create or restore the required empty VMs from snapshots.

#. A Gerrit review job starts building your plugin.
   See `Gerrit workflow <http://docs.openstack.org/infra/manual/developers.html>`_.

   #. Use a preconfigured `Gerrit Trigger <https://wiki.jenkins-ci.org/display/JENKINS/Gerrit+Trigger>`_
      to start your job after a new Gerrit patch arrives.
   #. Run a code syntax checker and unit tests according to the instructions
      from `Testing <https://wiki.openstack.org/wiki/Testing>`_.
   #. Run a Puppet linter. See `Puppet OpenStack <https://wiki.openstack.org/wiki/Puppet/Development>`_.
   #. Build the plugin.
   #. Trigger the plugin testing.

#. Vote on the Gerrit patch page and add review the result in the comment
   using Gerrit Trigger.
#. Test the plugin:

   #. Install the plugin.
   #. Configure the environment.
   #. Deploy the environment with the inactive plugin.
   #. Run the OSTF tests.

#. Run plugin-specific functional tests to check that the current plugin
   version provides expected functionality.
#. Publish the resulting aggregated logs to the log storage.

   You can do this by archiving logs.
