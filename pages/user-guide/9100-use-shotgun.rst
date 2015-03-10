
Diagnostic snapshot using shotgun
=========================================

Shotgun is a tool that is used internally to generate diagnostic snapshots
for Fuel. Diagnostic snapshots using just Fuel api is good enough for
regular user, but you can stuck with some problems like timeout exceptions
due to a large logs, or you can run out of space on /var/ partition.

And in such cases it is sane to use shotgun from master node directly,
and fetch default config from fuel client.

The usual flow for user would be:

1. Install shotgun on master

::
    yum install -y shotgun

2. Fetch default configuration

::
    fuel snapshot --conf > dump_conf.yaml

Probably the most interesting option are:

::
    ------
    # this is a place where temporary files will be stored
    target: /var/www/nailgun/dump/fuel-snapshot
    # symlink on last compressed snapshot
    lastdump: /var/www/nailgun/dump/last

Other than that there is standart commands like dir, command, file that
are self explanatory and more can be easily added.

::

    - command: brctl show
      to_file: brctl_show.txt
      type: command
    - path: /etc/sysconfig/network-scripts
      type: dir

Provide config to shotgun and execute it:

::

    shotgun -c dump_conf.yaml
