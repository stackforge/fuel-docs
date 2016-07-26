.. _repository-branching:

Repository branching
--------------------

To track the release cycle efficiently, branch your project or use tags.

Difference between a branch and a tag:

* A tag represents a version of a particular branch at a moment in time.
* A branch represents a separate thread of development that may run
  concurrently with other development efforts on the same code base.
  Changes to a branch may eventually be merged back into another branch
  to unify them.

Examples:

* For a tagging example, see the `VPNaaS plugin <https://github.com/openstack/fuel-plugin-neutron-vpnaas>`_ repository.
* For a branching example, see the `LMA plugin <https://github.com/openstack/fuel-plugin-lma-collector>`_ repository.

**To create a branch**

There are two ways to create a branch, using CLI or using the web UI.

To create a branch using CLI:

.. code-block:: console

   git push <remote> <localref>:<remotebranch>

Where:

* ``<remote>`` is the name of your Gerrit remote or the full remote URL.
* ``<localref>`` is the refname; this can be a branch or something else.
* ``<remotebranch>`` is the name of the branch you want created.

To create a branch using the web UI:

#. Ensure you are a core reviewer.
#. Go to `review.openstack.org <https://review.openstack.org/>`_.
#. In the :guilabel:`Project` menu, click :guilabel:`Branches`.
#. Enter a new branch name and click the :guilabel:`Create branch` button.
   You can leave the :guilabel:`Initial revision` field blank.

**To delete a branch**

There are three ways to delete a branch:

* Contact the openstack-infra core team via mailing list. See `example request <http://lists.openstack.org/pipermail/openstack-infra/2015-July/002921.html>`_.
* Report a bug in the `Fuel project <https://launchpad.net/fuel>`_ and assign
  it to Fuel DevOps team.
* Request in #openstack-infra IRC channel on freenode.net. You can contact
  the following core members there: fungi, clarkb, jeblair, pleia2.