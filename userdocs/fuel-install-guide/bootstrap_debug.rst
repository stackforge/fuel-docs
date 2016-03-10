.. _bootstrap_debug:

Enable advanced debugging
-------------------------

If creating a new bootstrap image results in errors,
you can analyze your system by enabling the chroot bootstrap
development environment.

This section provides an example of running bootstrap building
in the chroot environment.

**To enable advanced debugging:**

.. warning::

   Use for debug purpose only.

#. Prepare the ``sleep`` script:

   .. code-block:: console

    $ cat /root/sleep.sh
    #!/bin/bash
    sleep 99h || true

#. Start the build process with the ``sleep.sh`` script:

   .. code-block:: console

    $ fuel-bootstrap --verbose --debug build --extra-dir /root/mlnx/mlnx_bootstrap_root/ \
                     --label debug --activate  --script /root/sleep.sh

   **System response:**

   .. code-block:: console

    ...
    Copy user-script /root/sleep.sh into chroot:/tmp/tmpdOS3ya.fuel-agent-image
    Trying to execute command: chroot /tmp/tmpdOS3ya.fuel-agent-image /bin/bash -c /sleep.sh

    The process is sleeping and you can jump into chroot

   The ``sleep.sh`` script delays the start of the building process.
   Therefore, you can enable the chroot environment.

#. Enable the chroot environment:

   .. code-block:: console

    $ chroot /tmp/tmpdOS3ya.fuel-agent-image /bin/bash

#. Fix ``PATH`` difference between CentOS and Ubuntu environmnets:

   .. code-block:: console

      $ export PATH=$PATH:/sbin:/bin

#. You can now make any changes to the ``bootstrap-dev`` system.

#. After you apply the required changes, exit the chroot environment.

#. Terminate the ``sleep`` process:

   .. code-block:: console

    $ [root@nailgun ~]# ps xauf |grep sleep

   **System response:**

   .. code-block:: console

    root     23642  0.0  0.0   9524  1128 pts/14   S+   17:54   0:00  |           \_ /bin/bash /sleep.sh
    root     23643  0.0  0.0   4340   360 pts/14   S+   17:54   0:00  |               \_ sleep 99h

   .. code-block:: console

      $ kill -s INT 23643

After that, the building process will continue as usual.
