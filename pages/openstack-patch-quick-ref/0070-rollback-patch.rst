.. index:: Rollback Patch 

.. _RollbackPatch:

Roll back a patch
=================

You can roll back a patch by simply reinstalling your files from the backup
or, if you chose the ``-b`` option, by using the patch commands’ ``-R`` flag. Again,
please ignore the missing file errors.::

  # patch -R < /tmp/001-nova-contex.py.patch
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