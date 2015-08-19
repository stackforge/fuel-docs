.. _tls-ssl-ops:

Switching on SSL and Secure Access
==================================

Starting with Fuel 7.0 there are two secure access options that
you can enable on the :ref:`settings-ug` of Fuel Web UI:

* You can switch on SSL for the Horizon dashboard and the OpenStack
  publicURL endpoints.

* HTTPS access to the Fuel Master node.

Horizon dashboard and the OpenStack publicURL endpoints
-------------------------------------------------------

Secure access is enabled by default:

.. image:: /_images/user_screen_shots/horizon-openstack-ops.png

The "HTTPS for Horizon" checkbox enables SSL access to the Horizon
dashboard.

.. note:: With the HTTPS enabled, you will not be able to access
          the Horizon dashboard through plain HTTP. You will
          automatically be redirected to HTTPS port 443.

The "TLS for OpenStack public endpoints" checkbox enables access
to publicURL enpoints through HTTPS.


.. note:: With the "TLS for OpenStack..." enabled, you will not be
          able to access the public endpoints through plain HTTP.

After enabling one or both of the secure access options, you will
need to generate or upload a certificate and update your DNS entries:

#. Select the certificate source:

   * Self-signed -- The certificate will be generated before
     the environment deployment.

   * I have my own keypair with certificate -- You will need to upload
     a file with the certificate information and a private key that
     can be consumed by HAProxy. For detailed information read
     `HOWTO SSL NATIVE IN HAPROXY <http://blog.haproxy.com/2012/09/04/howto-ssl-native-in-haproxy/>`_.

#. Update your DNS entries -- Set the DNS hostname for public TLS
   endpoints. This hostname will be used in the two following cases:

   * When setting up DNS in the cluster.

   * As a name for OpenStack services when adding them to Identity.
     For example, you will see this name when you issue the
     ``keystone --endpoint-list`` command on one of the Controllers
     in a deployed cluster.

HTTPS access to the Fuel Master node
------------------------------------

You can now access the Fuel Master node through HTTPS.
To do this, you will need to use port 8443: `https://10.20.0.2:8443 <https://10.20.0.2:8443/>`_

Additional information
----------------------

* Changing keypairs for a cluster -- There is currently no automated
  way to do this. You can manually change the keypairs in
  ``/var/lib/astute/haproxy/public_haproxy.pem`` on Controller
  and Compute nodes. Make sure you restart the HAProxy service
  after you edit the file.

* Changing keypairs for the Fuel Master node -- You need to write the
  key to ``/etc/pki/tls/nginx.key`` and the certificate to
  ``/etc/pki/tls/nginx.crt``. Make sure you restart nginx after
  that.

* Making access to the Fuel Master node HTTPS only -- Edit the
  ``/etc/fuel/astute.yaml`` file so that it contains the following::

     SSL:
     force_https: true

  .. note:: Currently Fuel CLI does not support HTTPS.
            You will also need to update ``fuel-nailgun-agent``
            on all nodes deployed with older than 7.0, otherwise
            they will be reported as inactive.
