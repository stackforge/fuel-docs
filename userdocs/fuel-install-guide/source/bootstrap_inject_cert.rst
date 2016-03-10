.. _bootstrap_inject_cert:

Inject custom SSL certificates
------------------------------

You can inject any customization scripts and files inside
a bootstrap using ``fuel-bootstrap``.
For example, you can add custom certificates to access
an https repository.

** To inject certificate files:**

#. Add a certificate to the Fuel Master system to provide
   correct work of debootstrap run on the Fuel Master node:

   .. code-block:: console

      $ update-ca-trust force-enable
      $ cp cert.crt /etc/pki/ca-trust/source/anchors/
      $ update-ca-trust extract

#. Create a directory with the certificate to inject:

   .. code-block:: console

    $ mkdir -p /root/bootstrap_root/usr/local/share/ca-certificates/
    $ cp cert.crt /root/bootstrap_root/usr/local/share/ca-certificates/

#. Build the bootstrap:

   .. code-block:: console

      $ fuel-bootstrap build --load-cert --extra-dir /root/bootstrap_root/
