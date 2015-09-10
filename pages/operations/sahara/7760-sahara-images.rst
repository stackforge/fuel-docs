
.. _sahara-images-ops:

Sahara Images
-------------

Prepared images can be downloaded from the following locations:

* `Ubuntu 14.04 for Vanilla Hadoop 2.6.0 <http://sahara-files.mirantis.com/mos70/sahara-kilo-vanilla-2.6.0-ubuntu-14.04.qcow2>`_
* `CentOS 6.6 for Vanilla Hadoop 2.6.0 <http://sahara-files.mirantis.com/mos70/sahara-kilo-vanilla-2.6.0-centos-6.6.qcow2>`_
* `CentOS 6.6 for HDP 2.2 <http://sahara-files.mirantis.com/mos70/sahara-kilo-ambari-2.2-centos-6.6.qcow2>`_
* `CentOS 6.6 for HDP 2.3 <http://sahara-files.mirantis.com/mos70/sahara-kilo-ambari-2.2-centos-6.6.qcow2>`_
* `Ubuntu 12.04 for CDH 5.4.0 <http://sahara-files.mirantis.com/mos70/sahara-kilo-cdh-5.4.0-ubuntu-12.04.qcow2>`_
* `CentOS 6.6 for CDH 5.4.0 <http://sahara-files.mirantis.com/mos70/sahara-kilo-cdh-5.4.0-centos-6.6.qcow2>`_
* `Ubuntu 14.04 for Spark 1.3.1 <http://sahara-files.mirantis.com/mos70/sahara-kilo-spark-1.3.1-ubuntu-14.04.qcow2>`_
* `Ubuntu 14.04 for MapR 4.0.2 <http://sahara-files.mirantis.com/mos70/sahara-kilo-mapr-4.0.2-ubuntu-14.04.qcow2>`_
* `CentOS 6.6 for MapR 4.0.2 <http://sahara-files.mirantis.com/mos70/sahara-kilo-mapr-4.0.2-centos-6.6.qcow2>`_

Note, HDP 2.2 and HDP 2.3 have the same image.

The default username for these images depends on the distribution:

+------------------+-----------+
| Operating System | Username  |
+==================+===========+
| Ubuntu 12.04     | ubuntu    |
+------------------+-----------+
| Ubuntu 14.04     | ubuntu    |
+------------------+-----------+
| CentOS 6.6       | cloud-user|
+------------------+-----------+

You can find MD5 checksum of an image by adding the ``.md5`` suffix
to the image url, for example
http://sahara-files.mirantis.com/mos70/sahara-kilo-vanilla-2.6.0-ubuntu-14.04.qcow2.md5.

To check an ``.iso`` file with an MD5 hash, run:

.. code-block:: console

    $ md5sum -c sahara-kilo-vanilla-2.6.0-ubuntu-14.04.qcow2.md5
    ..
