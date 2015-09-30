.. _configuring-repos-ops:

Configuring repositories
========================

You may need to configure repositories to:

* :ref:`Download Ubuntu packages<external-ubuntu-ops>`
* :ref:`Apply patches<patching-ops>`

By default, your environments will have the configuration of the
repositories that point to the Mirantis update and security
repository mirrors. There is also an 'Auxiliary' repository configured
on the Fuel Master node which can be used to deliver packages
to the nodes.

.. image:: /_images/patchingRepos.png

To change the list of repositories, you will need to
amend the three fields which contain the required information
for the repositories configuration depending on the
distribution you install.

For Ubuntu
----------

::

  |repo-name|apt-sources-list-string|repo-priority|

  my-repo deb http://my-domain.local/repo trusty main 1200

Repository priorities
---------------------

The process of setting up repositories and repository priorities
is the same one you normally do on your Linux distribution.

For more information, see the documentation to your Linux distribution.
