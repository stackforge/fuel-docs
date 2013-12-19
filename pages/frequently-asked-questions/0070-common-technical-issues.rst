.. raw:: pdf

   PageBreak

.. index:: Common Technical Issues

.. _common-technical-issues:

Common Technical Issues
=======================

**Issue:**
  Puppet fails with::

    err: Could not retrieve catalog from remote server: Error 400 on SERVER: 
    undefined method 'fact_merge' for nil:NilClass"

This is a Puppet bug.  See: http://projects.puppetlabs.com/issues/3234

**Workaround**::

  service puppetmaster restart

**Issue:**
  Puppet client does not resend the certificate to Puppet Master. The client 
  certificate cannot be signed and verified.

This is a Puppet bug.  See: http://projects.puppetlabs.com/issues/4680

**Workaround:**

* On Puppet client
  ::

    rm -f /etc/puppet/ssl/certificate_requests/\*.pem
    rm -f /etc/puppet/ssl/certs/\*.pem

* On Puppet master
  ::

    rm -f /var/lib/puppet/ssl/ca/requests/\*.pem

**Issue:**
  The manifests are up-to-date under ``/etc/puppet/manifests``, but Puppet 
  Master keeps serving the previous version of manifests to the clients. 
  Manifests seem to be cached by the Puppet Master.
  
  More information: https://groups.google.com/forum/?fromgroups=#!topic/puppet-users/OpCBjV1nR2M

**Workaround**::

  service puppetmaster restart

**Issue:**
  Timeout error for fuel-controller-XX when running ``puppet-agent --test`` to 
  install OpenStack in a virtual deployment when using HDD instead of SSD
  ::

    Sep 26 17:56:15 fuel-controller-02 puppet-agent[1493]: Could not retrieve 
    catalog from remote server: execution expired
    Sep 26 17:56:15 fuel-controller-02 puppet-agent[1493]: Not using cache on 
    failed catalog
    Sep 26 17:56:15 fuel-controller-02 puppet-agent[1493]: Could not retrieve 
    catalog; skipping run

**Workaround**::

  vi /etc/puppet/puppet.conf
   
add: ``configtimeout = 1200``

**Issue:**
  On running ``puppet agent --test``, the error messages below occur:
  ::

    err: /File[/var/lib/puppet/lib]: Could not evaluate: Could not retrieve 
    information from environment production source(s) puppet://fuel-pm.localdomain/plugins

**Workaround:**
  Refer to http://projects.reductivelabs.com/issues/2244 for information.
