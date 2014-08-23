.. index:: Patching, OpenStack

.. _apply-patch-ops:

Applying a Patch
================

A patch file is a representation of the difference in the code between
two points in time, many times resulting from a discovered defect or
negative issue. Once you obtain and generate a patch, you can apply it
onto the previously deployed nodes within an OpenStack environment.
Currently, patching OpenStack nodes is a manual process, and this
document describes the basic steps required to patch one or more
OpenStack components. The high level sections in this guide are:

#. Identify files to be patched

#. Obtain a patch

#. Distribute a patch

#. Apply a patch

#. Restart the services

#. Roll back a patch (optional)
