
.. _fuel-rep-mirror:

Fuel Repository Mirroring
=========================

Starting in Mirantis OpenStack 6.1,
the location of repositories now extends
beyond just being local to the Fuel Master.
It is now assumed that a given
user will have Internet access and
can download content from Mirantis and
upstream mirrors. This impacts users with
limited Internet access or unreliable connections.

Internet-based mirrors can be broken
down into three categories:

- Ubuntu
- MOS Ubuntu
- MOS CentOS

There are two command-line utilities,
*fuel-createmirror* and *fuel-package-updates*,
which can replicate the mirrors.

Use *fuel-createmirror* for Ubuntu and
MOS Ubuntu packages.

Use *fuel-package-updates* for MOS CentOS
packages.

*fuel-createmirror* is a utility that
can be used as a backend to replicate
part or all of an APT repository. It can
replicate Ubuntu and MOS Ubuntu
repositories. It uses rsync
as a backend.
See `Downloading Ubuntu system packages<external-ubuntu-ops>`.

*fuel-package-updates* is a utility
written in Python that can pull entire
APT and YUM repositories via
recursive wget or rsync. Additionally, it can
update Fuel environment configurations
to use a given set of configuration.

Issue the following command
to check the *fuel-package-updates* options:

 ::

   fuel-package-updates -h

.. note:: If you change the default password (admin) in Fuel UI,
          you will need to run the utility with the
          *--password* switch, or it will fail.

See also`MOS CentOS mirror structure <https://docs.mirantis.com/fuel-dev/develop/separateMOS.html>`.
