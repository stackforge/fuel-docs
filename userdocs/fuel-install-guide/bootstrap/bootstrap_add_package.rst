.. _bootstrap_add_package:

Build a bootstrap image with an additional package
--------------------------------------------------

You can install any custom package from the default repository or
the connected external repository through the ``fuel-bootstrap`` builder script.

**Example 1: Installation of the ``strace`` package from the default repository**

#. Build the bootstrap:

   .. code-block:: console

    $ fuel-bootstrap build --package 'strace' --label 'bootstrap_with_strace' \
                           --output-dir ~/example1/

   **System response:**

   .. code-block:: console

    ...Building process...
    Building initramfs
    Building squashfs
    ...
    Bootstrap image a778efad-88ca-41fe-b592-f02101c11d22 has been built: /root/example1/a778efad-88ca-41fe-b592-f02101c11d22.tar.gz

   You can also specify a path to a custom configuration file with parameters
   for building a new bootstrap instead of using parameters from the default
   configuration file.

   For example:

   .. code-block:: console

      $ fuel-bootstrap build --config /etc/fuel-bootstrap-cli/my-config-xenial.yaml

#. After the build process is completed, you can import and activate the new bootstrap image:

   .. code-block:: console

      $ fuel-bootstrap import ~/example1/a778efad-88ca-41fe-b592-f02101c11d22.tar.gz --activate

#. Verify that the bootsrtap image has been activated:

   .. code-block:: console

    $ fuel-bootstrap list |grep active

   **System response:**

   .. code-block:: console

    | a778efad-88ca-41fe-b592-f02101c11d22 | bootstrap_with_strace  | active |

#. Reboot the discovered node:

   .. code-block:: console

      $ ssh 10.109.0.3 reboot

#. Verify that the new bootstrap image is loaded on the discovered node:

   #. Verify that the ``runtime_uuid`` value of the activated bootstrap image
      has been updated in the ``nailgun-agent`` configuration file:

      .. code-block:: console

         # cat /etc/nailgun-agent/config.yaml

      **System response:**

      .. code-block:: console

         {runtime_uuid: a778efad-88ca-41fe-b592-f02101c11d22}

   #. Verify that the new package has been installed:

      .. code-block:: console

          # dpkg -l |grep strace

      **System response:**

      .. code-block:: console

          ii  strace            4.8-1ubuntu5  amd64 A system call tracer


**Example 2: Installation of the ``nginx`` package using a custom repository**

#. Add the ``nginx`` repository to the ``fuel_bootstrap_cli.yaml`` file:

   #. Open the fuel_bootstrap_cli.yaml file for editing:

      .. code-block:: console

         $ vim /etc/fuel-bootstrap-cli/fuel_bootstrap_cli.yaml

   #. Add the following text:

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

      The first repository must point to the upstream mirror.

   .. warning::

    Use priorities higher than 1000 to force the installation
    of an old version of a package, when other repositories
    have newer versions of the same package or a newer version
    of the package is already installed on the system.
    You can use the force installation in case of a regression
    caused by the newer version of a package.
    Find more information about apt-pinning in
    `Debian Manuals <https://www.debian.org/doc/manuals/debian-reference/ch02.en.html#_tweaking_candidate_version>`_.

#. Build the bootstrap image:

   .. code-block:: console

    $ fuel-bootstrap --verbose --debug build --label 'with_nginx_repo_package' --package nginx --activate

   **System response:**

   .. code-block:: console

    ...
    Bootstrap image e295a410-2605-4ddf-a967-c3d638d901bc has been built:
    ...
    Bootstrap image e295a410-2605-4ddf-a967-c3d638d901bc has been activated.
    ...

#. After the build process is completed, reboot the discovered node.

#. Verify that the new package has been installed:

   .. code-block:: console

      # dpkg -l |grep nginx

   **System response:**

   .. code-block:: console

      ii  nginx     1.8.1-1~trusty     amd64   high performance web server

#. View the status of the packageL

   .. code-block:: console

    # apt-cache show nginx

   **System response:**

   .. code-block:: console

    Package: nginx
    Status: install ok installed
    ...

#. Verify that the ``runtime_uuid`` value of the activated bootstrap image
   has been updated in the ``nailgun-agent`` configuration file:

   .. code-block:: console

      # cat /etc/nailgun-agent/config.yaml

   **System response:**

   .. code-block:: console

      {runtime_uuid: e295a410-2605-4ddf-a967-c3d638d901bc}
