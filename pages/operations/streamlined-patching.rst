.. _streamlined-patching-ops:

Applying streamlined patching
=============================

For the detailed description of how streamlined patching is implemented
see :ref:`Mirantis OpenStack streamlined patching<streamlined-patching-ref>`.

If you are registered at the `official Mirantis website <https://www.mirantis.com/>`_
you will receive regular email notifications on the available patches in an aggregate form.

Once you receive the email, you can click on the patching items
listed there. This will lead you to the errata portal <http://errata.mirantis.com/>`_.

At the portal you will see a list of all the available patches.
Each patching item will have detailed instructions on how to
download and apply each of them.

Configuring repositories
========================
By default your environments will have configuration of repositories that
point to default Mirantis mirrors of update and security repositories.
Also there will be an 'Auxiliary' repository configured on the master
node which one could use for to deliver packages to the nodes.

If you would like to alter the list of repositories, you will need to
change this list to the one you prefer. There are 3 fields which
contain requried information for repositories configuration depending
on distribution you are installing.

For Centos
**********
|repo-name|repo-baseurl|repo-priority|

e.g.

my-repo http://my-domain.local/repo 10

For Ubuntu
**********
|repo-name|apt-sources-list-string|repo-priority|

my-repo deb http://my-domain.local/repo trusty main 1200

Here priority of repository means that repository with highest
number overrides ones with lowest numbers for Ubuntu. However,
it is vice-versa for CentOS
For more info on repo configuration please refer to the corresponding
distro's package manager guides. 

