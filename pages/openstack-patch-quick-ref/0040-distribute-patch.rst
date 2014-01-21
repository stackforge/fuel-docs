.. index:: Distribute Patch

.. _DistPatch:

Distribute a patch
==================

Regardless of the method used to obtain the patch, after you download
the patch, transfer the patch to every node in the OpenStack environment
where you want to apply the fix. The simplest way to do this is to use ssh.
For example::

  $ scp file01.patch node1:/tmp