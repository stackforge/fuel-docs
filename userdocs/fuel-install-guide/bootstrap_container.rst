.. _bootstrap_container_format:

The ``fuel-bootstrap`` container format
---------------------------------------

To simplify bootstrap sharing and delivery, pack all files required
for the bootstrap image in a ``tar.gz`` archive. You can also create and
archive manually without using the ``fuel-bootstrap`` script.

The bootstrap archive must include:

* ``metadata.yaml`` - a ``.yaml`` file that describes the configuration
* ``initrd.img`` - an initial RAM file system
* ``vmlinuz`` - a kernel image

.. warning::

   You cannot modify file names. This limitation is planned to be removed in future releases.

Optionally, you can add extra files:

* root.squashfs - a root file system

Mandatory data fields for ``metadata.yaml`` are:

.. code-block:: yaml

    extend_kopts : 'key=value net.ifnames=1 debug ignore_loglevel'
    # kernel command line opts will be extended with Fuel default opts.
    # But, its also possible to re-write default params - w\o any
    # guarantee of work.

    uuid: 244782c1-7343-43f7-9ee3-8989c252eb2e
    # Uuid for identify bootstrap.

**Generate UUID**

In the case of the manually built bootstrap you can generate UUID with
the following command:

.. code-block:: console

    python -c "import uuid; print str(uuid.uuid4())"

To connect (discover) and work correctly, ``fuel-bootstrap`` requires
runtime system to have installed and properly configured packages.
The list of packages is specified in the
``/etc/fuel-bootstrap-cli/fuel_bootstrap_cli.yaml`` file.
