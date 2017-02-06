.. _bootstrap_inject_driver:

Inject a driver from .deb packages
----------------------------------

When you need to install custom hardware drivers from the official
repository, you can inject them into a bootstrap.

**To install a driver provided as a deb package:**

Input:

* ``.deb`` files provided by HW-support
    Fetched from:
    http://bgate.mellanox.com/openstack/mellanox_fuel_plugin/8.0/repositories/ubuntu/

* files to be injected to the bootstrap
    Fetched from review.

The ``.deb`` files:

.. code-block:: console

    $ la -lah /root/mlnx_debs/

**System response:**

.. code-block:: console

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

The files to be injected to the bootstrap image:

.. code-block:: console

    $ tree /root/mlnx_files//

**System response:**

.. code-block:: console

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

**System response:**

.. code-block:: console

    #!/bin/bash

    echo "MLNX add init_mlnx.sh into bootstrap /etc/rc.local"
    sed -i 's/.*fix-configs.*/$(init_mlnx.sh > \/dev\/null 2>\&1) \& || true\n&/' /etc/rc.local


To push deb packages into the bootstrap, create a new repository on the Fuel Master node
and pull the repository to the builder following the steps below:

#. Prepare a custom repository under ``nailgun`` folder:

   #. Create a fodler for the repository:

      .. code-block:: console

         $ mkdir -p /var/www/nailgun/mlnx_repo/ubuntu

   #. Copy all ``*.deb`` files to the folder:

      .. code-block:: console

         $ cp /root/mlnx_debs/*.deb /var/www/nailgun/mlnx_repo/ubuntu

   #. Run ``dpkg`` tool to create repo-metadata:

      .. code-block:: console

         $ pushd /var/www/nailgun/mlnx_repo/ubuntu/
         $ dpkg-scanpackages ./ /dev/null | gzip -9c > Packages.gz
         $ popd

   #. Create a simple ``Release`` stub file:

      .. code-block:: console

         $ echo -e "Origin: user_custom\nLabel: custom\nSuite: user_custom\nCodename: \
                user_custom\nArchitectures: amd64\nComponents: main\nDescription: custom" \
                > /var/www/nailgun/mlnx_repo/ubuntu/Release


#. Include the repository to configure the bootstrap builder:

   .. code-block:: console

      $ vim /etc/fuel-bootstrap-cli/fuel_bootstrap_cli.yaml

   **System response:**

   .. code-block:: yaml

    ...
     repos:
    ...
    - name: custom_mlnx_repo
      priority: 1001
      section: ""
      suite: ./
      type: deb
      uri: "http://<FUEL_MASTER_IP>:8080/mlnx_repo/ubuntu/"

   where ``FUEL_MASTER_IP`` is an IP address of the Fuel Master node.


#. Run the bootstrap builder:

   .. code-block:: console

      $ fuel-bootstrap --verbose --debug build --package mlnx-ofed-kernel-dkms \
                       --package mlnx-ofed-kernel-utils --extra-dir \
                       /root/mlnx/mlnx_bootstrap_root/ --label mlnx-ofed-kernel \
                       --activate --script /root/mlnx/mellanox_customize_init.sh

   **System response:**

   .. code-block:: console

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


#. Reboot the affected nodes:

   .. code-block:: console

      $ ssh 10.109.0.3 reboot

#. Check that the driver has been installed successfully:

   #. View the information about the installed packages:

      .. code-block:: console

         # dpkg -l |grep mlnx

      **System response:**

      .. code-block:: console

         ii  mlnx-ofed-kernel-dkms 3.1-OFED.3.1.1.0.3.1.g9032737 all DKMS support for mlnxofed kernel modules
         ii  mlnx-ofed-kernel-utils 3.1-OFED.3.1.1.0.3.1.g9032737    amd64 Userspace tools to restart and tune mlnx-ofed kernel modules

   #. View the information about the installed kernel module:

      .. code-block:: console

         # modinfo mlx4_core

      **System response:**

      .. code-block:: console

        filename:       /lib/modules/3.13.0-76-generic/updates/dkms/mlx4_core.ko
        version:        3.1-1.0.3
        license:        Dual BSD/GPL
        description:    Mellanox ConnectX HCA low-level driver
        author:         Roland Dreier
        ...

   #. View the running process:

      .. code-block:: console

         # ps xauf |grep init_mlnx.sh

      **System response:**

      .. code-block:: console

         root      3113  0.0  0.0   9600  1492 pts/0    S    13:00   0:00 /bin/bash /usr/bin/init_mlnx.sh
