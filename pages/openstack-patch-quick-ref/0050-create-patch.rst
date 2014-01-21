.. index:: Create Patch 

.. _CreatePatch:

Create a patch
==============

To apply the fix, first change the directory to the one that
corresponds to your operating system. The OpenStack source code
(.py) files are stored in different locations depending on the
operating system:

* Centos: /usr/lib/python2.6/site-packages/[component] (/usr/lib/python2.6/site-packages/nova)

* Ubuntu: /usr/share/pyshared/[component] (/usr/share/pyshared/nova)

To be able to roll back the patch process in the case of a problem,
you can use the -b flag to create a backup file (.orig) in the
destination directory, back up the entire OpenStack environment
using other means like enterprise backup systems, or simply create
a local copy using your operating system commands.

Once you create a backup (or use the ``-b`` option), run the patch utility.
The patch utility will ask which file to patch. In the following example,
we’re patching nova.::

  # patch -b < /tmp/001-nova-contex.py.patch
  can't find file to patch at input line 3
  Perhaps you should have used the -p or --strip option?
  The text leading up to this was:
  --------------------------
  |+++ contex.py   2014-01-07 12:26:14.793787101 +0000
  |--- /usr/share/pyshared/nova/context.py	2013-10-17 14:15:04.000000000 +0000
  --------------------------
  File to patch: /usr/share/pyshared/nova/context.py
  patching file /usr/share/pyshared/nova/context.py
  can't find file to patch at input line 13
  Perhaps you should have used the -p or --strip option?
  The text leading up to this was:
  --------------------------
  |+++ baserpc.py  2014-01-07 12:29:57.513881636 +0000
  |--- /usr/share/pyshared/nova/baserpc.py	2013-10-17 14:15:04.000000000 +0000
  --------------------------
  File to patch: /usr/share/pyshared/nova/baserpc.py
  patching file /usr/share/pyshared/nova/baserpc.py

Ignore the message “can’t find file to patch at input line XX”. The reason
it occurs is that the patch is not aware of the filesystem layout.