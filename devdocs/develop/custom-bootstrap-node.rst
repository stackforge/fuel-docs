.. _custom-bootstrap-node:

Bootstrap node
==============

You can build a custom Ubuntu or CentOS bootstrap image that Fuel Master will use
to boot Fuel Slave nodes.

Bootstrap Ubuntu
^^^^^^^^^^^^^^^^

This section describes how to build a bootstrap image for Ubuntu.

Fuel bootstrap builder
~~~~~~~~~~~~~~~~~~~~~~

The bootstrap generator creates bootstrap images for Fuel Master
that Fuel will use to boot Fuel slave nodes. The bootstrap
geneartor uses default configurations, but you
can also make customization.

You can customize a Fuel bootstrap image using one of the following options:

* Set additional packages for the installation.
* Copy custom files into the root bootstrap.
* Run a user script at the bootstrap file system during the image
  creation.


**Command line Fuel bootstrap manager**

.. code-block:: console

    usage: fuel-bootstrap [--version] [-v] [--log-file LOG_FILE] [-q] [-h]
                          [--debug]

Optional arguments:

.. list-table::
   :widths: 5 25
   :header-rows: 0

   * - --version
     - Shows a program's version number and exits.
   * - -v, --verbose
     - Increases a verbosity of output. Can be repeated.
   * - --log-file LOG_FILE
     - Specify a file to log output. Disabled by default.
   * - -q, --quiet
     - Suppress output except for warnings and errors.
   * - -h, --help
     - Shows this help message and exits.
   * - --debug
     - Shows tracebacks on errors.

Commands:

.. list-table::
   :widths: 5 25
   :header-rows: 0

   * - activate
     - Activates specified bootstrap image.
   * - build
     - Builds a new bootstrap image with specified parameters.
   * - delete
     - Deletes specified bootstrap image from the system.
   * - help
     - Print the detailed help for another command.
   * - import
     - Imports the already created bootstrap image to the system.
   * - list
     - Lists all available bootstrap images.


How-to: list available bootstraps and check which are loaded
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Each bootstrap image have a unique ID which identifies it:

   .. code-block:: console

    $ fuel-bootstrap  list
    +--------------------------------------+--------------------------------------+--------+
    | uuid                                 | label                                | status |
    +--------------------------------------+--------------------------------------+--------+
    | 2b7fe334-4ef7-4a9d-8fcb-e0d7cc009d0c | 2b7fe334-4ef7-4a9d-8fcb-e0d7cc009d0c | active |
    | centos                               | deprecated                           |        |
    +--------------------------------------+--------------------------------------+--------+

#. To check, which exactly bootstrap image is currently loaded on a discovered node:

   .. code-block:: console

    # fuel nodes

    id | status   | name             | cluster | ip         | mac               | roles | pending_roles | online | group_id
    ---|----------|------------------|---------|------------|-------------------|-------|---------------|--------|---------
    1  | discover | Untitled (29:bb) | None    | 10.109.0.3 | 64:26:37:0b:29:bb |       |               | True   | None


#. Connect to a node by SSH and check the file:

.. code-block:: console

    ssh 10.109.0.3 cat /etc/nailgun-agent/config.yaml
    {runtime_uuid: 2b7fe334-4ef7-4a9d-8fcb-e0d7cc009d0c}

#. You can use Fuel web UI as well:

   * Go to ``Nodes`` tab of your environment.
   * Locate the node and click on ``gear`` button in front of the node name.
   * Expand the ``System`` tab and find ``UUID`` record.

As you can see, Fuel loaded the discovered node with the bootstrap image marked
as ``Active`` in the bootstrap list.

How-to: switch between bootstraps
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To switch between bootstrap images, follow the instruction:

#. Print the list of available bootstrap images:

 .. code-block:: console

    # fuel-bootstrap list
    +--------------------------------------+--------------------------------------+--------+
    | uuid                                 | label                                | status |
    +--------------------------------------+--------------------------------------+--------+
    | a778efad-88ca-41fe-b592-f02101c11d22 | bs1                                  |        |
    | 244782c1-7343-43f7-9ee3-8989c252eb2e | bs2                                  | active |
    | 2b7fe334-4ef7-4a9d-8fcb-e0d7cc009d0c | 2b7fe334-4ef7-4a9d-8fcb-e0d7cc009d0c |        |
    | centos                               | deprecated                           |        |
    +--------------------------------------+--------------------------------------+--------+

#. Activate a new bootstrap image:

   .. code-block:: console

    # fuel-bootstrap activate a778efad-88ca-41fe-b592-f02101c11d22

#. Reboot the affected node:

   .. code-block:: console

    # fuel nodes
    +-------------------------------------------------------------------------------------------------------------+
    |id | status   | name             | cluster | ip         | mac               | roles | pending_roles | online |
    |---|----------|------------------|---------|------------|-------------------|-------|---------------|--------|
    |1  | discover | Untitled (29:bb) | None    | 10.109.0.3 | 64:26:37:0b:29:bb |       |               | True   |
    +-------------------------------------------------------------------------------------------------------------+


    # ssh 10.109.0.3 reboot


How-to: build a bootstrap image with an additional package
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can install any custom package from the default repository or
the connected external repository through the ``fuel-bootstrap`` builder script.


**Example 1**: Installation of the ``strace`` package from the default repository

.. code-block:: console

    $ fuel-bootstrap build --package 'strace' --label 'bootstrap_with_strace' --output-dir ~/example1/
    ...Building process...
    Building initramfs
    Building squashfs
    ...
    Bootstrap image a778efad-88ca-41fe-b592-f02101c11d22 has been built: /root/example1/a778efad-88ca-41fe-b592-f02101c11d22.tar.gz


#. After the build process is completed, you can import and activate the new bootstrap image:

   .. code-block:: console

      $ fuel-bootstrap import ~/example1/a778efad-88ca-41fe-b592-f02101c11d22.tar.gz --activate

#. To check the activated bootstrap, run the ``list`` command:

   .. code-block:: console

    $ fuel-bootstrap list |grep active
    | a778efad-88ca-41fe-b592-f02101c11d22 | bootstrap_with_strace  | active |

#. Reboot the discovered node

   .. code-block:: console

      $ ssh 10.109.0.3 reboot

#. Verify on the node that if it is loaded with the new bootstrap image:

   .. code-block:: console

    # cat /etc/nailgun-agent/config.yaml
    {runtime_uuid: a778efad-88ca-41fe-b592-f02101c11d22}
    # dpkg -l |grep strace
    ii  strace            4.8-1ubuntu5  amd64 A system call tracer


**Example 2**: Installation of the ``nginx`` package using non-default
repository: http://nginx.org/packages/ubuntu

.. warning::

   As mentioned in the help, the first repository must point to the upstream mirror.

#. Add the new repository into the configuration file to avoid retyping it in command line:

#. Open and edit the configuration file adding the new repository:

  .. code-block:: console

      $ vim /etc/fuel-bootstrap-cli/fuel_bootstrap_cli.yaml

  .. code-block:: yaml

    ...
     repos:
    - name: ubuntu-0
    ...
    - name: ubuntu-1
    ...
    - name: custom_user_repo
      priority: 1001
      section: "nginx"
      suite: trusty
      type: deb
      uri: "http://nginx.org/packages/ubuntu"
    ...


  .. warning::

    Use priorities higher than 1000 to force the installation
    of a previous version of a package, when other repositories
    have newer versions of the same package or a newer version
    of the package is already installed on the system.
    You can use it in case of a regression.
    Find more information about apt-pinning in
    `Debian Manuals <https://www.debian.org/doc/manuals/debian-reference/ch02.en.html#_tweaking_candidate_version>`_.


#. Build the bootstrap image:

   .. code-block:: console

    $ fuel-bootstrap --verbose --debug build --label 'with_nginx_repo_package' --package nginx --activate
    ...
    Bootstrap image e295a410-2605-4ddf-a967-c3d638d901bc has been built:
    ...
    Bootstrap image e295a410-2605-4ddf-a967-c3d638d901bc has been activated.
    ...

#. After the build process is completed, reboot the discovered node and check
   if the new package in place:

   .. code-block:: console

    # dpkg -l |grep nginx
    ii  nginx     1.8.1-1~trusty     amd64   high performance web server
    # apt-cache show nginx
    Package: nginx
    Status: install ok installed
    ...
    Maintainer: Sergey Budnevitch <sb@nginx.com>
    ...
    Homepage: http://nginx.org

    # cat /etc/nailgun-agent/config.yaml
    {runtime_uuid: e295a410-2605-4ddf-a967-c3d638d901bc}


How-to: install the latest kernel
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. warning::

   Using non-standard and not verified with Fuel packages
   or kernels can brake your system.

To install the latest ``lts-trusty`` kernel, you do not need
to make any customization. Simply run the bootstrap builder with
default parameters and the latest ``lts-trusty`` kernel
available in the repositories will be fetched.

#. Install the kernel different from ``lts-trusty``

#. Open and edit configuration file adding the new repository:

   .. code-block:: console

      $ vim /etc/fuel-bootstrap-cli/fuel_bootstrap_cli.yaml

   .. code-block:: yaml

    ...
    - name: wily1
      priority: 1001
      section: "main restricted universe multiverse"
      suite: wily
      type: deb
      uri: "http://cz.archive.ubuntu.com/ubuntu/"
    - name: wily2
      priority: 1001
      section: "main restricted universe multiverse"
      suite: wily-updates
      type: deb
      uri: "http://cz.archive.ubuntu.com/ubuntu/"
    ...


   .. code-block:: console

      $ fuel-bootstrap --verbose --debug build --label 'with_wily_kernel' --activate --kernel-flavor linux-image-generic-lts-wily

#. After the build process is completed, reboot the discovered node
   and verify on the node if the new kernel has been applied:

   .. code-block:: console

    # dpkg -l |grep wily
    ii  linux-image-generic-lts-wily       4.2.0.27.21  amd64   Generic Linux kernel image
    # uname  -a
    Linux bootstrap 4.2.0-27-generic #32~14.04.1-Ubuntu SMP Fri Jan 22 15:32:26 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux


How-to: install the oldest kernel
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. warning::

   It's an example only. using non-standart and not tested with fuel
   packages or kernels can brake your system.


Unfortunately, due to ``apt-get upgrade\dist-upgrade`` implementation,
You can not install the oldest kernel in the same easy way like the newest one.
Still you can make do it with a custom script.

**Example**:

#. Check the version of ``lts-trusty`` meta-package:

   .. code-block:: console

    $ apt-cache show linux-image-generic-lts-vivid |grep -i Depends
    Depends: linux-image-3.19.0-47-generic, linux-image-extra-3.19.0-47-generic, linux-firmware

#. To install the oldest linux-image-3.19.0-25-generic kernel,
   prepare a simple bash script to include into the bootstrap building process:

   .. code-block:: console

    $ cat /root/user_script.sh

    #!/bin/bash

    echo "START user-script"
    apt-get remove -y linux-image-generic-lts* linux-image-*
    apt-get purge -y linux-image-generic-lts* linux-image-*

    rm -f /boot/vmlinuz*
    rm -f /boot/initrd*

    apt-get install -y linux-image-3.19.0-25-generic linux-image-extra-3.19.0-25-generic
    echo "END user-script"

#. Build and activate a bootstrap image including the custom script you created before:

   .. code-block:: console

    $ fuel-bootstrap build --verbose --debug --activate --label 'old_kernel' --script /root/user_script.sh
    ...
    Copy user-script /root/user_script.sh into chroot:/tmp/tmplGugKE.fuel-agent-image
    Make user-script /tmp/tmplGugKE.fuel-agent-image/user_script.sh executable
    Trying to execute command: chroot /tmp/tmplGugKE.fuel-agent-image /bin/bash -c /user_script.sh
    ...
    Bootstrap image 244782c1-7343-43f7-9ee3-8989c252eb2e has been built
    ...
    Bootstrap image 244782c1-7343-43f7-9ee3-8989c252eb2e has been activated.

#. Reboot the discovered node and check if the node has the kernel succesfully applied:

   .. code-block:: console

    $ ssh 10.109.0.3

    # uname  -a
    Linux bootstrap 3.19.0-25-generic #26~14.04.1-Ubuntu SMP Fri Jul 24 21:16:20 UTC 2015 x86_64 x86_64 x86_64 GNU/Linux

    # dpkg -l |grep image
    ii  linux-image-3.19.0-25-generic  3.19.0-25.26~14.04.1  amd64  Linux kernel image for version 3.19.0 on 64 bit x86 SMP
    ii  linux-image-extra-3.19.0-25-generic 3.19.0-25.26~14.04.1   amd64  Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP

    # cat /etc/nailgun-agent/config.yaml
    {runtime_uuid: 244782c1-7343-43f7-9ee3-8989c252eb2e}


Issue: automatic Fuel deployment has been failed
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
**Script impact**
**UX impact**

If for some reason automatic building bootstrasp image has
been failed or a user skipped it during Fuel Master deployment
with an error message in console or in Fuel web UI.

.. code-block:: console

    "WARNING: Ubuntu bootstrap build has been skipped.
    Please build and activate bootstrap manually with CLI command
    `fuel-bootstrap build --activate`.
    While you don't activate any bootstrap - new nodes cannot be discovered
    and added to cluster.
    For more information please visit
    https://docs.mirantis.com/openstack/fuel/fuel-master/"

or

.. code-block:: console

    WARNING: Failed to build the bootstrap image, see
    /var/log/fuel-bootstrap-image-build.log
    for details. Perhaps your Internet connection is broken. Please fix the
    problem and run `fuel-bootstrap build --activate`.
    While you don't activate any bootstrap - new nodes cannot be discovered
    and added to cluster.
    For more information please visit
    https://docs.mirantis.com/openstack/fuel/fuel-master/"


The problem depends on a user environment, but in most cases
it is related to network inaccessibility of repositories.
To solve it, check and fix networking issues.
In case of an isolated Fuel Master environment, see
the ``fuel-mirror`` utility https://github.com/openstack/fuel-mirror .

In other cases, searching for an error in log files might help:

- /var/log/fuel-bootstrap-image-build.log
- /var/log/puppet/bootstrap_admin_node.log


Issue: a node has an old ``cmdline`` or a wrong bootstrap image
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``fuel-bootstrap`` has a limitation with UX issue.
You can not change a bootstrap image on nodes already added
to an environment (serialized).
This issue relates to the current architecture restriction.
See `LP1529890 <https://bugs.launchpad.net/fuel/+bug/1529890>`_

You can face the problem under the following conditions:

* You have a deprecated Centos bootstrap image in ``active`` state; or
  you power on nodes before the Fuel Master node is completely deployed
  when ``ubuntu-bootstrap`` on the Fuel Master node has not been activated yet.

* You start a node and assign it to an OpenStack environment, or
  you start or reset deployment on an environment, or any other case
  that triggers Fuel to store a node and create a cobbler system.

  .. code-block:: console

    cobbler system report --name default |grep -i Profile
    Profile : bootstrap

* Fuel (cobbler) creates a system with a CentOS bootstrap image

  .. code-block:: console

    $ cobbler system report --name node-1
    ...
     Profile : bootstrap (centos-bootstrap)
    ...

* Then you change the active bootstrap, which makes
  astute change the cobbler default profile to 'ubuntu-bootstrap'

  .. code-block:: console

    cobbler system report --name default |grep -i Profile
    Profile : ubuntu_bootstrap

  But the stored system still use the old bootstrap data.

To solve the problem:

#. Remove the node from db, reboot, and re-discover it

   .. warning::

      All node data will be destroyed!

   .. code-block:: console

      # fuel node --node-id 1 --delete-from-db

#. Manually update the cobbler profile:

   .. code-block:: console

    $ cobbler system edit --name node-1 --profile=ubuntu_bootstrap
    $ cobbler system report --name node-1 |grep Profile
    Profile : ubuntu_bootstrap

#. Reboot the node.


How-to: inject custom SSL certificates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can inject any customization scripts and files inside
a bootstrap through ``fuel-bootstrap``.
For example, you can add custom certificates to access to
an https repository.

**Example**: inject certificate files

#. Add a certificate to the Fuel Master system to provide
   correct work of debootstrap run on the Fuel Master node:

   .. code-block:: console

      $ cp user.crt /etc/pki/ca-trust/source/anchors/
      $ update-ca-trust extract

#. Create a directory with the certificate to inject:

   .. code-block:: console

    $ mkdir -p /root/bootstrap_root/usr/local/share/ca-certificates/
    $ cp cert.crt include/usr/local/share/ca-certificates/

#. Build the bootstrap:

   .. code-block:: console

      $ fuel-bootstrap build  --extra-dir /root/bootstrap_root/


``fuel-bootstrap`` container format
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To simplify bootstrap sharing and delivery, we pack all needed for
a bootstrap files in a ``tar.gz`` archive, which can be also created
manually by a user without the ``fuel-bootstrap`` build script.

The bootstrap archive must contain:

.. code-block:: console

    * metadata.yaml - a description yaml file
    * initrd.img - initramfs
    * vmlinuz - a kernel image

.. warning::

    Currently, the filenames are hard-coded and cannot be changed.

Another files can be also added:

.. code-block:: console

    * root.squashfs - a root file system (optional)

Mandatory data fields for ``metadata.yaml``:

.. code-block:: yaml

    extend_kopts : 'key=value net.ifnames=1 debug ignore_loglevel'
    # kernel command line opts will be extended with Fuel default opts.
    # But, its also possible to re-write default params - w\o any
    # guarantee of work.

    uuid: 244782c1-7343-43f7-9ee3-8989c252eb2e
    # Uuid for identify bootstrap.


In the case of a manually built bootstrap you can generate UUID with
the following command:

.. code-block:: console

    python -c "import uuid; print str(uuid.uuid4())"

To connect (discover) and work correctly, ``fuel-bootstrap`` requires
runtime system to have installed and properly configured packages.
The list of packages is specified in the
``/etc/fuel-bootstrap-cli/fuel_bootstrap_cli.yaml`` file.

How-to: injecting a driver (from .deb packages)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you need to install custom hardware drivers from the official
HW-support repository you can inject them into a bootstrap.

**Example**: Install a driver provided as a deb package

Input:

- .deb files provided by HW-support
    Fetched from:
    http://bgate.mellanox.com/openstack/mellanox_fuel_plugin/8.0/repositories/ubuntu/

- files to be injected to the bootstrap
    Fetched from review.

The deb files:

.. code-block:: console

    $ la -lah /root/mlnx_debs/
    -rw-r--r-- 1 root root  13M Jan 21 08:55 cirros-testvm-mellanox-ib_0.3.2-7_amd64.deb
    -rw-r--r-- 1 root root  13M Jan 21 08:55 cirros-testvm-mellanox_0.3.2-ubuntu3_amd64.deb
    -rw-r--r-- 1 root root  27K Jan 21 08:55 eswitchd_0.13-1_amd64.deb
    -rw-r--r-- 1 root root  27K Jan 21 08:55 eswitchd_1.14-3_amd64.deb
    -rw-r--r-- 1 root root  44K Jan 31 16:08 libibverbs1_1.1.8mlnx1-OFED.3.1.1.0.0_amd64.deb
    -rw-r--r-- 1 root root  49K Jan 31 16:08 libmlx4-1_1.0.6mlnx1-OFED.3.1.1.0.0_amd64.deb
    -rw-r--r-- 1 root root 3.7K Jan 21 08:55 mlnx-dnsmasq_2015.1.0-1_all.deb
    -rw-r--r-- 1 root root 100M Jan 21 08:55 mlnx-ofed-fuel_2.3-2.0.8_amd64.deb
    -rw-r--r-- 1 root root 193M Jan 21 08:55 mlnx-ofed-fuel_3.1-1.5.7_amd64.deb
    -rw-r--r-- 1 root root 1.9M Jan 31 16:08 mlnx-ofed-kernel-dkms_3.1-OFED.3.1.1.0.3.1.g9032737_all.deb
    -rw-r--r-- 1 root root  68K Jan 31 16:08 mlnx-ofed-kernel-utils_3.1-OFED.3.1.1.0.3.1.g9032737_amd64.deb
    -rw-r--r-- 1 root root  14K Jan 31 16:08 ofed-scripts_3.1-OFED.3.1.1.0.3_amd64.deb
    -rw-r--r-- 1 root root  18K Jan 21 08:55 python-networking-mlnx_2015.1.2-1_amd64.deb

The files to be injected to the bootstrap:

.. code-block:: console

    $ tree /root/mlnx_files//
    |-- mellanox_customize_init.sh
    `-- mlnx_bootstrap_root
        |-- etc
        |   `-- modprobe.d
        |       `-- ipoib.conf
        `-- usr
            `-- bin
                `-- init_mlnx.sh


.. warning::

   Injected files and folder should have execute permission

.. code-block:: console

    $ find /root/mlnx_files/ -type f -iname *.sh -print | xargs chmod 0755
    $ find /root/mlnx_files/ -type d -print | xargs chmod 755

The custom script:

.. code-block:: console

    $ cat /root/mlnx/mellanox_customize_init.sh
    #!/bin/bash

    echo "MLNX add init_mlnx.sh into bootstrap /etc/rc.local"
    sed -i 's/.*fix-configs.*/$(init_mlnx.sh > \/dev\/null 2>\&1) \& || true\n&/' /etc/rc.local


To push deb packages into the bootstrap, create a new repository on the Fuel Master node
and pull the repository to the builder following the steps below:

#. Prepare a custom repository under ``nailgun`` folder:

.. code-block:: console

    # Create repo dir
    $ mkdir -p /var/www/nailgun/mlnx_repo/ubuntu
    # Copy all *deb files to folder
    $ cp /root/mlnx_debs/*.deb /var/www/nailgun/mlnx_repo/ubuntu
    # run dpkg tool for create  repo-metadata
    $ pushd /var/www/nailgun/mlnx_repo/ubuntu/ ; dpkg-scanpackages ./ /dev/null | gzip -9c > Packages.gz ; popd
    # create simple Release stub file
    $ echo -e "Origin: user_custom\nLabel: custom\nSuite: user_custom\nCodename: user_custom\nArchitectures: amd64\nComponents: main\nDescription: custom"  > /var/www/nailgun/mlnx_repo/ubuntu/Release


#. Include the repository to configure the bootstrap builder:

   .. code-block:: console

      $ vim /etc/fuel-bootstrap-cli/fuel_bootstrap_cli.yaml


   .. code-block:: yaml

    ...
     repos:
    ...
    - name: custom_mlnx_repo
      priority: 1001
      section: ""
      suite: ./
      type: deb
      uri: "http://FUEL_MASTER_IP:8080/mlnx_repo/ubuntu/"

    where ``FUEL_MASTER_IP`` is the IP address of the Fuel Master node .


#. Run builder:

   .. code-block:: console

    $ fuel-bootstrap --verbose --debug build --package mlnx-ofed-kernel-dkms --package mlnx-ofed-kernel-utils --extra-dir /root/mlnx/mlnx_bootstrap_root/ --label mlnx-ofed-kernel --activate --script /root/mlnx/mellanox_customize_init.sh
    # Some logs from build process:
    ...
    Trying to execute command: rsync -rlptDKv /root/mlnx/mlnx_bootstrap_root// /tmp/tmpsJA1Yp.fuel-agent-image/
    ...
    Trying to execute command: chroot /tmp/tmpsJA1Yp.fuel-agent-image /bin/bash -c /mellanox_customize_init.sh
    ....
    stdout:MLNX add init_mlnx.sh into bootstrap /etc/rc.local
    ...
    Setting up mlnx-ofed-kernel-dkms (3.1-OFED.3.1.1.0.3.1.g9032737)
    ...
    Loading new mlnx-ofed-kernel-3.1 DKMS files
    ...
    Rsync files from /root/mlnx/mlnx_bootstrap_root/ to: /tmp/tmpIA5Ro8.fuel-agent-image
    ...
    --- Building bootstrap image END (do_mkbootstrap) ---
    ...
    Bootstrap image 37369fd8-34c0-444d-a4d1-2f266d586442 has been activated


#. Reboot nodes and check:

.. code-block:: console

    $ ssh 10.109.0.3 reboot
    root@bootstrap:~# dpkg -l |grep mlnx
    ii  mlnx-ofed-kernel-dkms 3.1-OFED.3.1.1.0.3.1.g9032737 all DKMS support for mlnxofed kernel modules
    ii  mlnx-ofed-kernel-utils 3.1-OFED.3.1.1.0.3.1.g9032737    amd64 Userspace tools to restart and tune mlnx-ofed kernel modules
    root@bootstrap:~# modinfo mlx4_core
        filename:       /lib/modules/3.13.0-76-generic/updates/dkms/mlx4_core.ko
        version:        3.1-1.0.3
        license:        Dual BSD/GPL
        description:    Mellanox ConnectX HCA low-level driver
        author:         Roland Dreier
      ........
    #Check, that are ran in background:
    root@bootstrap:~#
    ps xauf |grep init_mlnx.sh
    root      3113  0.0  0.0   9600  1492 pts/0    S    13:00   0:00 /bin/bash /usr/bin/init_mlnx.sh


How-to: hard-core debug session
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In this example, you can see how to jump into chroot bootstrap dev environment and
make some manipulation.

.. warning::

   For debug purpose only.

#. Prepare ``sleep`` script

   .. code-block:: console

    $ cat /root/sleep.sh
    #!/bin/bash
    sleep 99h || true

#. Start build-process

   .. code-block:: console

    $ fuel-bootstrap --verbose --debug build --extra-dir /root/mlnx/mlnx_bootstrap_root/ --label debug --activate  --script /root/sleep.sh
    ...
    Copy user-script /root/sleep.sh into chroot:/tmp/tmpdOS3ya.fuel-agent-image
    Trying to execute command: chroot /tmp/tmpdOS3ya.fuel-agent-image /bin/bash -c /sleep.sh

    The process is sleeping and you can jump into chroot

#. Jumping into chrooted system

   .. code-block:: console

    $ chroot /tmp/tmpdOS3ya.fuel-agent-image /bin/bash
    # fix PATH difference between centos and ubuntu env.
    $ export PATH=$PATH:/sbin:/bin

   After this command, you can directly make any manipulation
   with the ``bootstrap-dev`` system.

When you finish all manipulation, you should exit from chroot
and kill ``sleep`` process:

.. code-block:: console

    $ [root@nailgun ~]# ps xauf |grep sleep
    root     23642  0.0  0.0   9524  1128 pts/14   S+   17:54   0:00  |           \_ /bin/bash /sleep.sh
    root     23643  0.0  0.0   4340   360 pts/14   S+   17:54   0:00  |               \_ sleep 99h

    $ kill -s INT 23643

After killing ``sleep`` process, building will continue as usual.


Bootstrap CentOS
^^^^^^^^^^^^^^^^

When you would like to bring changes
into CentOS bootstrap, you should take up either of the
options:

* create an additional
  "piece" of bootstrap (initrd_update)
  that will be injected into the
  original initramfs image on the bootstrap.
  That means, avoid modifying the original initramfs
  image for bootstrap

* modify the original initramfs image manually

* create a custom initramfs image for
  bootstrap to replace the default one.

Let's take a look at every approach in more details.

Creating and injecting the initrd_update into bootstrap
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A typical use case for creating initrd_update looks as follows:
a great number of proprietary drivers for equipment cannot be
shipped with GA Fuel ISO due to legal issues
and should be installed by users themselves.

That means, you can add (or inject) the required issues (drivers,
scripts etc.) during Fuel ISO
installation procedure.

Injection workflow consists of several stages:

#. Prepare the injected initramfs image with the required kernel modules (for CentOS).
#. Modify bootstrap (CentOS)

Prepare injected initramfs image for CentOS
+++++++++++++++++++++++++++++++++++++++++++

The injected initramfs image should contain
the files what are going to be put on (or let's say injected into)
the original initramfs on the bootstrap in addition to
the deployed (original) RAM file system.

The injected initramfs image should have the following structure:

::

    /
    /lib/modules/<kernel-version>/kernel/<path-to-the-driver>/<module.ko>
    /etc/modprobe.d/<module>.conf

Let's put all required files into the folder called *dd-src* and create the image.
For example, we need the 2.6.32-504 (CentOs 6.6) kernel:

#. Create the working folder dd-src:

   ::

       mkdir dd-src

#. Put the kernel modules into:

   ::

      mkdir -p ./dd-src/lib/modules/2.6.32-504.1.3.el6.x86_64/kernel/drivers/scsi
      cp hpvsa.ko ./dd-src/lib/modules/2.6.32-504.1.3.el6.x86_64/kernel/drivers/scsi


#. Put the *<module-name>.conf* file with the modprobe command into
   the *etc/modprobe.d/* folder:

   ::

      mkdir -p ./dd-src/etc/modprobe.d/
      echo modprobe hpvsa > ./dd-src/etc/modprobe.d/hpvsa.conf
      chmod +x ./dd-src/etc/modprobe.d/hpvsa.conf


   There is the second (deprecated) way:
   create the */etc/rc.modules* executable file and list the command to probe with the module name.
   Do not use */etc/rc.local* file for this purpose,
   because it is too late for init hardware:

   ::

      mkdir ./dd-src/etc
      echo modprobe hpvsa > ./dd-src/etc/rc.modules
      chmod +x ./dd-src/etc/rc.modules




#. Create the dd-src.tar.gz file for coping to the Fuel Master node:

   ::

      tar -czvf dd-src.tar.gz ./dd-src

   The *dd-src.tar.gz* file can now be copied to the Fuel Master node.


Adding initrd_update image to the bootstrap
+++++++++++++++++++++++++++++++++++++++++++

.. note:: Currently, the bootstrap is based on CentOS (kernel and modules).


Let's assume that the Fuel Master node has been deployed:

#. Connect to the Fuel Master node:

   ::

       ssh root@<your-Fuel-Master-node-IP>

#. Prepare initramfs update image:

   ::

      tar -xzvf dd-src.tar.gz
      find dd-src/ | cpio --quiet -o -H newc | gzip -9 > /tmp/initrd_update.img

#. Copy into the TFTP (PXE) bootstrap folder:

   ::

       cp /tmp/initrd_update.img /var/www/nailgun/bootstrap/
       chmod 755 /var/www/nailgun/bootstrap/initrd_update.img

#. Copy inside the cobbler container to the folder:

   ::

       dockerctl copy initrd_update.img cobbler:/var/lib/tftpboot/initrd_update.img

#. Modify the bootstrap menu initrd parameter.

   * Log into the cobbler container:

     ::

         dockerctl shell cobbler

   * Get the variable kopts variable value:

      ::

          cobbler profile dumpvars --name=bootstrap | grep kernel_options
          kernel_options : ksdevice=bootif locale=en_US text mco_user=mcollective initrd=initrd_update.img biosdevname=0 lang url=http://10.20.0.2:8000/api priority=critical mco_pass=HfQqE2Td kssendmac

   * Add *initrd=initrd_update.img* at the beginning of the string
     and re-sync the container. It turns into the kernel
     parameter passing to the kernel on boot
     'initrd=initramfs.img,initrd_update.img':

     ::

         cobbler profile edit --name bootstrap --kopts='initrd=initrd_update.img ksdevice=bootif lang=  locale=en_US text mco_user=mcollective priority=critical url=http://10.20.0.2:8000/api biosdevname=0 mco_pass=HfQqE2Td kssendmac'
         cobbler sync


Modifying initramfs image manually for bootstrap node
-----------------------------------------------------

To edit the initramfs (initrd) image,
you should unpack it, modify and pack back.
Initramfs image is a gzip-ed cpio archive.

To change initramfs image, follow these steps:

#. Create a folder for modifying initramfs image and copy the initramfs image into it:

   ::

     mkdir /tmp/initrd-orig
     dockerctl copy cobbler:/var/lib/tftpboot/images/bootstrap/initramfs.img /tmp/initrd-orig/

#. Unpack initramfs image. First of all, unzip it:

   ::

      cd /tmp/initrd-orig/
      mv initramfs.img initramfs.img.gz
      gunzip initramfs.img.gz

#. Unpack the cpio archive to the initramfs folder:

   ::

      mkdir initramfs
      cd initramfs
      cpio -i < ../initramfs.img

#. Now you have the file system what you have in the RAM on the bootstrap:

   ::

     ls -l /tmp/initrd-orig/initramfs

#. Modify it as you need. For example, copy files or modify the scripts:

   ::

      cp hpvsa.ko lib/modules/2.6.32-504.1.3.el6.x86_64/kernel/drivers/scsi/
      echo "modprobe hpvsa" > etc/modprobe.d/hpvsa.conf


    To get more information on how to pass options to
    the module, start dependent modules or black-list modules please,
    consult see the *modprobe.d* man page.

    ::

        vi etc/modprobe.d/blacklist.conf

#. Pack the intiramfs back to **initfamfs.img.new** image:

   ::

      find /tmp/initrd-orig/initramfs | cpio --quiet -o -H newc | gzip -9 > /tmp/initramfs.img.new

#. Clean up. Remove */tmp/initrd-orig* temporary folder:

   ::

      rm -Rf /tmp/initrd-orig/


Creating a custom bootstrap node
--------------------------------

This option requires further investigation
and will be introduced in the near future.


Replacing default bootstrap node with the custom one
++++++++++++++++++++++++++++++++++++++++++++++++++++

Let's suppose that you have created or modified
the initramfs image. It is placed in the */tmp* folder under **initramfs.img.new** name.

To replace the default boostrap with the custom,
follow these steps:

#. Save the previous initramfs image:

   ::

       mv /var/www/nailgun/bootstrap/initramfs.img /var/www/nailgun/bootstrap/initramfs.img.old


#. Copy the new initramfs image into the bootstrap folder:

   ::

      cd /tmp
      cp initramfs.img.new /var/www/nailgun/bootstrap/initramfs.img
      dockerctl copy /var/www/nailgun/bootstrap/initramfs.img cobbler:/var/lib/tftpboot/images/bootstrap/initramfs.img

#. Make the Cobbler update the files:

   ::

      cobbler sync



