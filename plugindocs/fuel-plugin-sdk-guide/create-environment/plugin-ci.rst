.. _plugin-ci:

Configure a continuous integration environment
----------------------------------------------

Plugin integration requires a Continuous Integration (CI) for testing
and deploying new changes.

**To configure a continuous integration environment:**

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

   #. Have your own CI server. This
      provides better versioning, collecting test-results, deduplicating the
      same jobs, easier configuration and managing.
   #. Use Jenkins with the `Jenkins Job Builder plugin <http://docs.openstack.org/infra/jenkins-job-builder/>`_,
      which provides easy job management and storage configuration.
   #. Install the Jenkins Job Builder from Git as described
      below.
   #. Create a pre-commit-hook to check your code:

      .. code-block:: console

          #!/bin/bash
          # Save this script to <PROJECT>/.git/hooks/pre-review
            and make it executable
          set -e
          set -o pipefail

          find . -name '*.pp' | xargs -P1 -L1 puppet parser validate --verbose
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
            --no-arrow_alignment-check \
            --no-case_without_default-check
          find . -name '*.erb' | xargs -P1 -L1 -I '%' erb -P -x -T '-' % | ruby -c
          fpb --check  ./

.. seealso::

   - :ref:`plugin-ci-job-examples`

.. toctree::
   :hidden:

   plugin-ci/plugin-ci-workflow.rst
   plugin-ci/plugin-ci-job-examples.rst
