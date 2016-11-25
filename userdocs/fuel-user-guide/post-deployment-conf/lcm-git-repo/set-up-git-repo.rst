.. _set-up-git-repo:

Set up a Git repository
=======================

You need to create a Git repository to store and modify the required
configuration files, as well as configure the repository to work with
the Fuel Nailgun configuration service.

.. note::

   Fuel can work with multiple Git repositories.
   However, limit one repository and one branch per an OpenStack environment.

**To set up a Git repository:**

#. Create a Git repository in any Git repository management system
   or web-based service, such as GitHub.

#. Add the public SSH key located in ``.ssh/id_rsa.pub`` to your
   Git repository.

#. Create a repository object within Nailgun and register the
   repository with Nailgun:

   :: 

     fuel2 gitrepo create <env_ID> --name <name-of-nailgun-object> \
     --url <url-to-repo> --ref <branch-to-grab-configs-from> --key \
     <path-to-ssh-key>

   **Example:**

   ::

     fuel2 gitrepo create --env 1 --name oscnf1 --url \
     git@github.com:dukov/oscnf.git --ref master --key .ssh/id_rsa

#. Create a repository structure similar to the one described in
   :ref:`repo-structure` by adding the required
   files in the repository and committing the changes.

#. Optionally, configure the Git repository to track changes in your
   OpenStack environment in a separate branch:

   ::

     fuel2 gitrepo get configs --env <env_ID>

   You must have write permissions to the Git repository.

