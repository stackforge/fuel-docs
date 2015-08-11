
.. _rollback-ug:


Rollback
========

Starting with Fuel 7.0, you can take advantage of the Rollback feature.
Rollback should be used when a node needs to be returned to its
original state. This could be the case with a failed upgrade or any
other node malfunction.

The rollback is done in two major steps:

#. Partition preservation -- prevent the node redeployment process
   from deleting data on the partition. This way you will not have to
   manually back up and restore the data to perform the rollback.

#. Node reinstallation -- restore the node to its original state.

Partition preservation
----------------------

With partition preservation you can keep the following types of data:

* Ceph data
* Swift data
* Nova instances cache
* Database, logs, custom partition types

.. note:: There is no way to keep the data set during node provisioing
          and deployment, like an installed operating system.

#. On the Fuel Master node, dump the disks information using this
   :ref:`fuel CLI<fuel-cli-config>` command::

        fuel node --node-id 1 --disk --download

   where ``--node-id 1`` points to the specific node
   (id=1 in this example).

#. Edit the ``root/node_1/disks.yaml`` file to enable partition
   preservation by using the ``keep_data: true`` flag. Also note that
   all partitions with the same name need to have tha same flag value.

#. Upload the modified file::

     fuel node --node-id 1 --disk --upload

Node reinstallation
-------------------

#. On the Fuel Master node, issue the following command to reprovision
   the node::

     fuel node --node-id 1 --provision

   where ``--node-id 1`` points to the specific node
   (id=1 in this example).

#. Then issue the following command to redeploy the node::

     fuel node --node-id 1 --deploy
