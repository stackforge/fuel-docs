.. _plugin-ci-job-examples:

Job examples
------------

The following text is the example of Jenkins jobs at you can create
for plugins.

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
     # Change this to appropriate fuel-qa 
     # variable for your plugin
     YOUR_PLUGIN_PATH="$(ls ./*rpm)"
     export YOUR_PLUGIN_PATH

     sh -x "${SYSTEM_TESTS}" -w "${WORKSPACE}" -V \
     "${VENV_PATH}" -i "${ISO_PATH}" -t test -o \
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

      virtualenv --system-site-packages \
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

      find . -name '*.erb' -print 0 | xargs -0 -P1 \
      -I '%' erb -P -x -T '-' % | ruby -c
      find . -name '*.pp' -print 0| xargs -0 -P1 \
      puppet parser validate --verbose
      find . -name '*.pp' -print 0| xargs -0 -P1 \
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
          plugin_repo: plugin_repo #Your plugin repo name\
          at stackforge
          email_to: emails_list #List of emails separated\
          by comma
          test_group: test_group #Test group in fuel-qa for\
          deployment tests of your plugin
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
                url: 'https://review.openstack.org/stackforge\
                /fuel-qa'
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
                !include-raw-escape './builders/syntax-\
                build-plugin.sh'
          description: '<a href=https://github.com/\
          stackforge/{plugin_repo}>Build {name} plugin\
          from fuel-plugins project</a>'
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
                url: 'https://review.openstack.org/\
                stackforge/{plugin_repo}'
                choosing-strategy: gerrit
                clean:
                  before: true
          triggers:
            - gerrit:
                trigger-on:
                  - patchset-created-event #Trigger\
                  plugin build for every gerrit patchset
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
                !include-raw-escape './builders/\
                deploy-plugin.sh'
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
                url: 'https://review.openstack.org/\
                stackforge/fuel-qa'
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
