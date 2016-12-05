.. _cli-manage-gitrepo:

============================================
Fuel IaC: Git repository management commands
============================================

.. include:: /userdocs/snippets/notes/deprecated-cli-v1.rst

The following table describes the usage of the :command:`fuel2 gitrepo`
command available in the Fuel CLI. This command is available after you
install the Fuel Infrastructure-as-Code extension. For more information, see:
:ref:`lcm-git-repo`.

.. list-table:: **Repository management commands**
   :widths: 7 10
   :header-rows: 1

   * - Description
     - Command
   * - Associate an OpenStack environment with a Git repository.
     - ``fuel gitrepo create [-h] --env <ENV_ID> --name <name> --url
       --ref <ref> [--key <key>]``

       **Example:**

       ::

         fuel2 gitrepo create --env 1 --name test --url \
         git@github.com:user/test.git --ref master --key .ssh/id_rsa


       * ``--env`` - an OpenStack environment ID.
       * ``--name`` - the name of the Git repository. It will be used
         as a directory name for the repository.
       * ``--url`` - URL to the Git repository. For example,
         ``git@github.com:user/repo.git``.
       * ``ref`` - a Git reference, such as a branch or Gerrit refspec.
       * ``key`` - a path to the private SSH key.

   * - Download configuration files from an OpenStack environment and upload
       them to the configured Git repository.
     - ``fuel2 gitrepo get configs [-h] [--env <ENV_ID>] [--key_path <path>]
       [--repo_dir REPO_DIR]``

       * ``--env`` - an OpenStack  environment ID.
       * ``--key_path`` - a path to the private SSH key file on the selected
         node.
       * ``--repo_dir`` - a directory in the Git repo to upload the files.
