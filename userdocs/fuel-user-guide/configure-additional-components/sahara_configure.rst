.. _sahara_configure:

Configure the Hadoop cluster service
------------------------------------

After you deploy your OpenStack environment with
the Hadoop cluster service, upload the
Sahara image to Glance. You must use a
pre-built image for a corresponding Linux distribution. You can build
your own image as described
in the OpenStack Sahara documentation or use one of the pre-built images
available at
`docs.openstack.org/developer/Sahara
<http://docs.openstack.org/developer/sahara/userdoc/vanilla_plugin.html>`_
If you use a pre-built image, use the corresponding user name provided on
the same page.

Sahara supports the following Hadoop platforms:

- Vanilla Apache Hadoop
- Hortonworks Data Platform (HDP)
- Cloudera Hadoop Distribution (CDH)
- Apache Spark
- MapR

Typically, the Sahara images are provided in the ``qcow2`` format that is
compatible with the default OpenStack hypervisor KVM.
If you install your environment with VMware vSphere, you must convert
the image to an appropriate format before you upload the image to Glance.

**To configure the Hadoop cluster service:**

#. Download or build an appropriate image for the Hadoop cluster.
#. Upload the image to Glance.
#. Log in to Horizon.
#. Register the image in the Sahara Image Registry:

   #. Click :menuselection:`Project --> Data processing --> Image Registry`.
   #. Click :guilabel:`Register Image`.
   #. Specify the username appropriate to the image you use.
   #. Specify a correpsonding plugin and version.
   #. Click :guilabel:`Add plugin tags`.
   #. Add appropriate tags.

#. Verify that you have an adequate pool of floating IP addresses available:

   - If you run Neutron networking with
     **auto_assign_floating_ip** parameter set to ``False``, provide a
     floating IP pool in each Node Group Template.
