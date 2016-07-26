.. _repository-branching-create:

Create a branch
---------------

There are two ways to create a branch, using CLI or using the web UI.

**To create a branch using CLI:**

.. code-block:: console

   git push <remote> <localref>:<remotebranch>

Where:

* ``<remote>`` is the name of your Gerrit remote or the full remote URL.
* ``<localref>`` is the refname; this can be a branch or something else.
* ``<remotebranch>`` is the name of the branch you want created.

**To create a branch using the web UI:**

#. Ensure you are a core reviewer.
#. Go to `review.openstack.org <https://review.openstack.org/>`_.
#. In the :guilabel:`Project` menu, click :guilabel:`Branches`.
#. Enter a new branch name and click the :guilabel:`Create branch` button.
   You can leave the :guilabel:`Initial revision` field blank.

.. seealso::

  - :ref:`repository-branching-delete`