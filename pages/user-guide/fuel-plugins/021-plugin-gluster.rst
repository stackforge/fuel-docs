.. _plugin-gluster:

GlusterFS
+++++++++

This plug-in allows to use existing `GlusterFS <http://www.gluster.org/
documentation/About_Gluster>`_ cluster as the Cinder backend.

**Requirements**

This plug-in is compatible with the following GlusterFS version:

::

    Description:	Ubuntu 14.04 LTS
    Release:	14.04
    Codename:	trusty

    glusterfs 3.4.2 built on Jan 14 2014 18:05:35
    Repository revision: git://git.gluster.com/glusterfs.git

**Installation**


#. Download the plug-in from TODO: <link>.

#. Install GlusterFS plug-in. For instructions, see :ref:`install-plugin`.

#. After plug-in is installed, create an environment.

**Configuration**

#. Enable the plug-in on the *Settings* tab of the Fuel web UI.

.. image:: /_images/fuel_plugin_glusterfs_configuration.png

#. For futher steps, see  `Configure GlusterFS backend <http://docs.openstack.org/admin-guide-cloud/content/glusterfs_backend.html>`_ in the official OpenStack documentation.
