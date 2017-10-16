.. _bootstrap_install_kernel:

Install a custom kernel
-----------------------

You can install a custom kernel in a bootstrap image.
For example, you can install the latest Ubuntu kernel
or an older version of the kernel intended to fix regressions.

.. warning::

   Non-standard kernels, which were not verified with the Fuel packages,
   can break your system.

Install the latest kernel
-------------------------

To install the latest ``lts-trusty`` kernel, you do not need
to make any customization. Simply run the bootstrap builder with
the default parameters and the latest ``lts-trusty`` kernel
available in the repositories will be fetched.

**To install the latest kernel:**

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

#. Build and activate a bootstrap image specifying a kernel flavor:

   .. code-block:: console

      $ fuel-bootstrap --verbose --debug build --label 'with_wily_kernel' --activate --kernel-flavor linux-image-generic-lts-wily

#. Reboot the discovered node:

   .. code-block:: console

      $ ssh 10.109.0.3

#. Verify if the node applied the kernel succesfully:

   #. View infomation about the installed kernel image:

      .. code-block:: console

         # dpkg -l | grep wily

      **System response:**

      .. code-block:: console

         ii  linux-image-generic-lts-wily       4.2.0.27.21  amd64   Generic Linux kernel image

   #. View infomation about the current kernel:

      .. code-block:: console

         # uname  -a

      **System response:**

      .. code-block:: console

         Linux bootstrap 4.2.0-27-generic #32~14.04.1-Ubuntu SMP Fri Jan 22 15:32:26 UTC 2016 x86_64 x86_64 x86_64 GNU/Linux


Install an old kernel
---------------------

For code stability, security, or other reasons, you may not want to install
the latest kernel as described above.

.. note::

   Due to a specific logic of ``apt-get upgrade\dist-upgrade`` system,
   an old kernel cannot be installed as easily as the latest one.

**To install an old version of kernel:**

#. Verify the version of ``lts-vivid`` meta-package:

   .. code-block:: console

      apt-cache show linux-image-generic-lts-vivid | grep -i Depends

   **Example of system response:**

   .. code-block:: console

      Depends: linux-image-3.19.0-47-generic, linux-image-extra-3.19.0-47-generic, linux-firmware

#. Prepare a bash script with the kernel version you want to install.
   For example:

   .. code-block:: console

      $ cat /root/user_script.sh

   **System response:**

   .. code-block:: console

    #!/bin/bash

    echo "START user-script"
    apt-get remove -y linux-image-generic-lts* linux-image-*
    apt-get purge -y linux-image-generic-lts* linux-image-*

    rm -f /boot/vmlinuz*
    rm -f /boot/initrd*

    apt-get install -y linux-image-3.19.0-25-generic linux-image-extra-3.19.0-25-generic
    echo "END user-script"

   This bash script installs the ``linux-image-3.19.0-25-generic`` kernel.

#. Build and activate a bootstrap image including the custom script you created before:

   .. code-block:: console

    $ fuel-bootstrap build --verbose --debug --activate --label 'old_kernel' --script /root/user_script.sh

   **System response:**

   .. code-block:: console

    ...
    Copy user-script /root/user_script.sh into chroot:/tmp/tmplGugKE.fuel-agent-image
    Make user-script /tmp/tmplGugKE.fuel-agent-image/user_script.sh executable
    Trying to execute command: chroot /tmp/tmplGugKE.fuel-agent-image /bin/bash -c /user_script.sh
    ...
    Bootstrap image 244782c1-7343-43f7-9ee3-8989c252eb2e has been built
    ...
    Bootstrap image 244782c1-7343-43f7-9ee3-8989c252eb2e has been activated.

#. Reboot the discovered node:

   .. code-block:: console

      $ ssh 10.109.0.3

#. Verify if the node applied the kernel succesfully:

   #. View infomation about the current kernel:

      .. code-block:: console

         # uname  -a

      **System response:**

      .. code-block:: console

         Linux bootstrap 3.19.0-25-generic #26~14.04.1-Ubuntu SMP Fri Jul 24 21:16:20 UTC 2015 x86_64 x86_64 x86_64 GNU/Linux

   #. View infomation about the installed kernel image:

      .. code-block:: console

         # dpkg -l | grep image

      **System response:**

      .. code-block:: console

         ii  linux-image-3.19.0-25-generic  3.19.0-25.26~14.04.1  amd64  Linux kernel image for version 3.19.0 on 64 bit x86 SMP
         ii  linux-image-extra-3.19.0-25-generic 3.19.0-25.26~14.04.1   amd64  Linux kernel extra modules for version 3.19.0 on 64 bit x86 SMP

   #. Verify that the ``runtime_uuid`` value of the activated bootstrap image
      has been updated in the ``nailgun-agent`` configuration file:

      .. code-block:: console

         # cat /etc/nailgun-agent/config.yaml

      **System response:**

      .. code-block:: console

         {runtime_uuid: 244782c1-7343-43f7-9ee3-8989c252eb2e}
