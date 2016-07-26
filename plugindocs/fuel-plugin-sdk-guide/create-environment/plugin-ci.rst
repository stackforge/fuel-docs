.. _plugin-ci:

Continuous Integration (CI)
---------------------------

Set up a CI for your Fuel plugin.

#. Configure Gerrit integration:

   #. Create and configure a Launchpad user to votie as a third-party
      developer. See `Third Party Testing <http://docs.openstack.org/infra/system-config/third_party.html>`_.
   #. Add the username and public key for the Gerrit plugin configuration
      in Jenkins.
   #. Send an email to the openstack-dev mailing list and nominate your system
      for voting permissions.

#. Prepare the development and testing environments:

   #. Create a repository as described in :ref:`repository-workflow`.
   #. Allocate enough plugin-specific testing labs.
   #. Install and configure plugin-specific hardware resources.
   #. Confiure testing labs. See the `Fuel development documentation <https://docs.fuel-infra.org/fuel-dev/devops.html>`_.

#. Configure CI:

   #. We recommend for all plugin developers to have their own CI server. This
      provides better versioning, collecting test-results, deduplicating the
      same jobs, easier configuration and managing.
   #. We recommend using Jenkins with the `Jenkins Job Builder plugin <http://docs.openstack.org/infra/jenkins-job-builder/>`_,
      which provides easy job management and storage configuration.
   #. We recommend installing the Jenkins Job Builder from Git as described
      below.
   #. We recommend creating a pre-commit-hook to check your code:

      .. code-block:: console

          #!/bin/bash
          # Save this script to <PROJECT>/.git/hooks/pre-review
            and make it executable
          set -e
          set -o pipefail

          find . -name '*.pp' | xargs -P1 -L1 puppet parser\
          validate --verbose
          find . -name '*.pp' | xargs -P1 -L1 puppet-lint \
            --fail-on-warnings \
            --with-context \
            --with-filename \
            --no-80chars-check \
            --no-variable_scope-check \
            --no-nested_classes_or_defines-check \
            --no-autoloader_layout-check \
            --no-class_inherits_from_params_class-check \
            --no-documentation-check \
            --no-arrow_alignment-check\
            --no-case_without_default-check
          find . -name '*.erb' | xargs -P1 -L1 -I '%'\
          erb -P -x -T '-' % | ruby -c
          fpb --check  ./

      Example jobs:

      * deploy-plugin.sh:

        .. code-block:: console

           #!/bin/bash
           set -ex

           export SYSTEM_TESTS="${WORKSPACE}/utils/\
           jenkins/system_tests.sh"
           export LOGS_DIR=${WORKSPACE}/logs/\
           ${BUILD_NUMBER}
           export VENV_PATH='/home/jenkins/\
           venv-nailgun-tests-2.9'
           YOUR_PLUGIN_PATH="$(ls ./*rpm)"\#Change\
           this to appropriate fuel-qa variable for your plugin
           export YOUR_PLUGIN_PATH#

           sh -x "${SYSTEM_TESTS}" -w "${WORKSPACE}" -V\
           "${VENV_PATH}" -i "${ISO_PATH}" -t test -o\
           --group="${TEST_GROUP}"

      * prepare_env.sh:

        .. code-block:: console

            #!/bin/bash
            set -ex

            export VENV_PATH="/home/jenkins/\
            venv-nailgun-tests-2.9"

            rm -rf "${VENV_PATH}"

            REQS_PATH="${WORKSPACE}/fuel-qa/\
            fuelweb_test/requirements.txt"

            virtualenv --system-site-packages\
            "${VENV_PATH}"
            source "${VENV_PATH}/bin/activate"
            pip install -r "${REQS_PATH}" --upgrade
            django-admin.py syncdb --settings=devops.\
            settings --noinput
            django-admin.py migrate devops --settings\
            =devops.settings --noinput
            deactivate

      * syntax-build-plugin.sh:

        .. code-block:: console

            #!/bin/bash
            set -ex

            find . -name '*.erb' -print 0 | xargs -0 -P1\
            -I '%' erb -P -x -T '-' % | ruby -c
            find . -name '*.pp' -print 0| xargs -0 -P1\
            puppet parser validate --verbose
            find . -name '*.pp' -print 0| xargs -0 -P1\
            puppet-lint \
              --fail-on-warnings \
              --with-context \
              --with-filename \
              --no-80chars-check \
              --no-variable_scope-check \
              --no-nested_classes_or_defines-check \
              --no-autoloader_layout-check \
              --no-class_inherits_from_params_class-check \
              --no-documentation-check \
              --no-arrow_alignment-check

            fpb --check  ./
            fpb --build  ./

      * plugins.yaml:

        .. code-block:: ini

           - project:
              name: plugin_name #Your plugin mame
              path_to_fuel_iso: $PWD #Path to FuelISO
              plugin_repo: plugin_repo #Your plugin\
              repo name at stackforge
              email_to: emails_list #List of emails\
              separated by comma
              test_group: test_group #Test group in\
              fuel-qa for deployment tests of your plugin
              jobs:
               - 'prepare_env'
               - '{name}.build'
               - '{name}.{dist}.deploy':
                   dist: 'centos'
               - '{name}.{dist}.deploy':
                   dist: 'ubuntu'

           - job-template:
              name: 'prepare_env'
              builders:
               - shell:
                !include-raw-escape './builders/prepare_env.sh'
              description: 'Prepare environment to testing'
              logrotate:
                numToKeep: 10
              parameters:
               - string:
                 name: 'GERRIT_REFSPEC'
                 default: 'refs/heads/master'
              scm:
                - git:
                   branches:
                    - $GERRIT_BRANCH
                   refspec: $GERRIT_REFSPEC
                   url: 'https://review.openstack.org/stackforge/fuel-qa'
                   choosing-strategy: gerrit
                   clean:
                    before: true
              publishers:
                - email:
                   notify-every-unstable-build: true
                   recipients: '{email_to}'

    				- job-template:
    				    name: '{name}.build'
    				    builders:
    				      - shell:
    				          !include-raw-escape './builders/syntax-build\
    				          -plugin.sh'
    				    description: '<a href=https://github.com/stackforge/\
    				    {plugin_repo}>Build {name} plugin from fuel-plugins project</a>'
    				    logrotate:
    				      numToKeep: 10
    				    parameters:
    				      - string:
    				          name: 'GERRIT_REFSPEC'
    				          default: 'refs/heads/master'
    				    scm:
    				      - git:
    				          branches:
    				            - $GERRIT_BRANCH
    				          name: ''
    				          refspec: $GERRIT_REFSPEC
    				          url: 'https://review.openstack.org/stackforge/\
    				          {plugin_repo}'
    				          choosing-strategy: gerrit
    				          clean:
    				            before: true
    				    triggers:
    				      - gerrit:
    				          trigger-on:
    				            - patchset-created-event #Trigger plugin build\
    				            for every gerrit patchset
    				          projects:
    				            - project-compare-type: 'PLAIN'
    				              project-pattern: '{plugin_repo}'
    				              branches:
    				                - branch-compare-type: 'ANT'
    				                  branch-pattern: '**'
    				          silent: true
    				          server-name: 'review.openstack.org'
    				    publishers:
    				      - archive:
    				          artifacts: '*.rpm'
    				      - email:
    				          notify-every-unstable-build: true
    				          recipients: '{email_to}'

    				- job-template:
    				    name: '{name}.{dist}.deploy'
    				    builders:
    				      - copyartifact:
    				          project: '{name}.build'
    				          which-build: last-successful
    				      - inject:
    				          properties-content: |
    				            OPENSTACK_RELEASE={dist}
    				            TEST_GROUP={test_group}
    				            ISO_PATH={path_to_fuel_iso}
    				      - shell:
    				          !include-raw-escape './builders/deploy-plugin.sh'
    				    description: 'fuel-qa system test for {name}'
    				    logrotate:
    				      numToKeep: 10
    				    parameters:
    				      - string:
    				          name: 'GERRIT_REFSPEC'
    				          default: 'refs/heads/master'
    				    scm:
    				      - git:
    				          branches:
    				            - $GERRIT_BRANCH
    				          refspec: $GERRIT_REFSPEC
    				          url: 'https://review.openstack.org/stackforge/fuel-qa'
    				          choosing-strategy: gerrit
    				          clean:
    				            before: true
    				          wipe-workspace: false
    				    publishers:
    				      - archive:
    				          artifacts: 'logs/$BUILD_NUMBER/*'
    				      - email:
    				          notify-every-unstable-build: true
    				          recipients: '{email_to}'

The recommended CI workflow:

#. Prepare labs and start or update the lab:

   * Download the ISO from the `Fuel CI <https://ci.fuel-infra.org/>`_.
     Depending on the Fuel version specified in plugin’s requirements,
     Jenkins downloads the released ISO and/or the currently developed
     and passed BVT test on core CI.

   * Deploy the downloaded ISO and prepare the required amount of labs
     for testing using the fuel-dev and fuel-qa repositories and running
     it in console:

     .. code-block:: console

        $ fuel-main/utils/jenkins/system_tests -t test -j\
        dis_fuelweb_test -i (path to downloaded Fuel-ISO)\
        -o --group=setup -V ${VIRTUAL_ENV} -k

   * Create or restore the required quantity of empty VMs from snapshots.

#. A Gerrit review job starts building your plugin.
   See `Gerrit workflow <http://docs.openstack.org/infra/manual/developers.html>`_.

   * Use a preconfigured `Gerrit Trigger <https://wiki.jenkins-ci.org/display/JENKINS/Gerrit+Trigger>`_
     to start your job after a new Gerrit patch arrives.
   * Run a code syntax checker and unit tests according to the instructions
     from `Testing <https://wiki.openstack.org/wiki/Testing>`_.
   * Run a Puppet linter. See `Puppet OpenStack <https://wiki.openstack.org/wiki/Puppet/Development>`_.
   * Build the plugin.
   * Trigger the plugin testing.

#. Vote on the Gerrit patch’s page and add review the result in the comment
    using Gerrit Trigger.
#. Test the plugin:

   * Install the plugin.
   * Configure the environment.
   * Deploy the environment with the inactive plugin.
   * Run OSTF tests.

#. Run plugin-specific functional tests to check that the current plugin
   version provides expected functionality.
#. Publish the resulting aggregated logs to the log storage. You can do yhis
   by archiving logs.