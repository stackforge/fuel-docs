
.. raw:: pdf

   PageBreak


.. _engine-ref:

engine.yaml
-----------

The *engine.yaml* file defines
the basic configuration of the target nodes
that Fuel deploys for the OpenStack environment.
Initially, it contains Fuel defaults;
these are adjusted in response to configuration choices
the user makes through the Fuel UI
and then fed to :ref:`Nailgun<nailgun-term>`.

Path
----

Fuel Master Node:
**/root/provisioning_1**

Usage
-----

#. Dump provisioning information using this
   :ref:`fuel CLI<fuel-cli-config>` command::

       fuel --env 1 provisioning default

   where ``--env 1`` should be set to the specific environment
   (id=1 in this example).


#. Edit file.


#. Upload the modified file:
   ::

     fuel --env-1 provisioning upload


Description
-----------

The *engine.yaml* file defines the provisioning engine
being used (:ref:`cobbler-term` by default)
along with the password and URLs used to access it.
