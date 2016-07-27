.. _repository-workflow:

Repository workflow
-------------------

As a plugin developer, your repository workflow must be the following:

#. Start your plugin development in your own repository open to public.
   The repository can be any public Git hosting; for example, GitHub.

#. When you are ready to put your developed plugin project to the official
   repository in the OpenStack namespace, you need to do the following:

   * Have your code reviewed by the `Fuel team <https://bugs.launchpad.net/fuel/>`_.
     You can also request a review in the #fuel-dev channel in IRC.
   * Plan to set up a CI for the plugin. See :ref:`plugin-ci`.
   * Confirm that you are going to support the plugin for more than one
     version of Fuel.
   * Confirm that you are releasing your plugin code under the Apache 2.0
     license.
   * Confirm your plugin code has no binary files.
   * Request repository creation in the OpenStack namespace.
     See :ref:`plugin-repo`.