.. _nailgun-supertask:

.. index:: nailgun, supertask, transaction, Fuel, MOS, MOM, MCP

Nailgun supertask
-----------------

An entity of operations with the cluster. The operations can contain several
other transactions, such as provisioning, deployment, network verification.

Each cluster operation represents a nailgun transaction.
Each transaction may consist of several instances of a deployment pipeline
invocation: data conversion and graph execution.

.. note:: The transactions cannot be completely rolled back.
          The transactions are not true transactions in terms of ACID.