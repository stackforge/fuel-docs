.. _plugin-gluster:

GlusterFS
+++++++++

This plug-in allows to use existing `GlusterFS <http://www.gluster.org/
documentation/About_Gluster>`_ cluster as the Cinder backend.

**Requirements**

This plug-in is compatible with the following GlusterFS version:

::

    Description: Ubuntu 14.04 LTS
    Release: 14.04
    Codename:trusty

    glusterfs 3.4.2 built on Jan 14 2014 18:05:35
    Repository revision: git://git.gluster.com/glusterfs.git

**Installation**

#. Download the plug-in from TODO: <link>.

#. Install GlusterFS plug-in. For instructions, see :ref:`040-install-plugin`.

#. After plug-in is installed, create an environment.

**Configuration**

#. Enable the plug-in on the *Settings* tab of the Fuel web UI.

   .. image:: /_images/plugins/fuel_plugin_glusterfs_configuration.png


#. After GlusterFS plug-in is installed and a volume is created,
   configure each Gluster volume to accept libgfapi connections.
   To do this, configure every Gluster volume to all insecure ports [1, 2]:

   ::

       gluster volume set <volume_name> server.allow-insecure on
       gluster volume stop <volume_name>
       gluster volume start <volume_name>

#. Add to /etc/glusterfs/glusterd.vol the following option:

   ::

      option rpc-auth-allow-insecure on

#. Restart glusterd daemon.

.. SeeAlso:: For more information on GlusterFS, see
             `Configure GlusterFS backend <http://docs.openstack.org/admin-guide-cloud/content/glusterfs_backend.html>`_ in the official OpenStack documentation. 