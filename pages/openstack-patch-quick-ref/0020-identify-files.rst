.. index:: Identify Files 

.. _IdFile:

Identify files to be patched
============================

Identifying files or components to be patched usually involves investigating
change logs for new OpenStack releases or git commit messages. You can find
change logs using `OpenStack wiki search <https://wiki.openstack.org/wiki/Special:Search/ReleaseNotes>`_.
Git commit messages are available from github.com or, in a more accesible form,
on git.openstack.org. You will need to find the exact commit providing the fix
for your problem.

For example, looking at the Release Notes for the 2013.1.4 OpenStack Grizzly
bugfix update, you can drill into the `List of OpenStack Compute (Nova) bugs fixed in the 2013.1.4 release <https://launchpad.net/nova/grizzly/2013.1.4>`_ and
find that an `Incorrect host stats reported by VMware VCDriver <https://bugs.launchpad.net/bugs/1190515>`_ issue has been resolved.