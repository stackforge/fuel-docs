.. _plugin-gluster:

How to install GlusterFS plugin
===============================

This plugin allows to use existing `GlusterFS <http://www.gluster.org/
documentation/About_Gluster>`_ cluster as the Cinder backend.

Requirements
------------

This plugin is compatible with the following GlusterFS version:

::

    Description:	Ubuntu 14.04 LTS
    Release:	14.04
    Codename:	trusty

    glusterfs 3.4.2 built on Jan 14 2014 18:05:35
    Repository revision: git://git.gluster.com/glusterfs.git

Installation
------------

1. Download the plugin from TODO: <link>.

2. Install GlusterFS plugin. For instructions, see :ref:`install-plugin`.

3. After plugin is installed, create an environment.

Configuration
-------------

Enable the plugin on the **Settings** tab of the Fuel web UI.

.. image:: /_images/fuel_plugin_glusterfs_configuration.png

For futher steps, see  `Configure GlusterFS backend <http://docs.openstack.org/admin-guide-cloud/content/glusterfs_backend.html>`_ in the official OpenStack documentation.
