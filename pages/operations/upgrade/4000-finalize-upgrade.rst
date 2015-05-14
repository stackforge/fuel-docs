.. index:: Finalize Upgrade

.. _Upg_Final:

Finalize Upgrade
----------------

This chapter contains actions required to finalize upgrade procedure on an
environment and on Fuel installer in general. Essentially, finalization means
restoration of source code of components of installer by reverting patches that
implement modifications to installer's behavior, deleting original enviroment
and upgrading the last node in the environment. See below for the detailed
description of how to do that and list of commands.

Cleanup Upgraded Environment
----------------------------

After DB migration, there are several service entries left from original cloud
in OpenStack state databases. Those services are identified as running on nodes
that are not actually part of 6.0 environment (i.e. 5.1 CICs and Compute nodes).
Some of OpenStack components provide API to delete those services, e.g. Nova. We
use these API to clean up database by deleting all services that run on nodes
that don't belong to the 6.0 environment. See below for the exact command to do
that.

Clean up Nova services
++++++++++++++++++++++

You need to SSH to any controller in 6.0 environment, use ``openrc`` script to
authenticate as 'admin' user to OpenStack cloud and list services that don't
belong to this cloud. Run the following command to delete all services that are
not associated with nodes in the upgraded environment:

::

    nova service-list | grep nova \
        | grep -Ev "('$(list_nodes $SEED_ID "(controller|compute|ceph-osd)" \
        | sed ':a;N;$!ba;s/\n/|/g')')"' \
        | awk -F \| '{print($2)}' | tr -d ' ' \
        | xargs -I{} ssh root@$(list_nodes $1 controller \
        | head -1) ". /root/openrc; nova service-delete {}"

Revert Patches
--------------

The final goal of the upgrade procedure is to get the upgraded environment as
close as possible to the environment installed with the new release version and
retain ability to manage it in the new version of Fuel installer. To restore
original behavior of Fuel installer, you need to revert all changes made to it's
source code and configurations. You also need to restore configuration of
enviornment to the state installed by Fuel.

This section describes how to restore the Fuel installer and upgraded
environment to their original state.

Revert patches to Fuel components
+++++++++++++++++++++++++++++++++

Run following commands to restore Puppet modules to the original state as of
release 6.0 of Fuel installer.

::

    sed -ie "s%skip_existing = true%skip_existing = false%" \
        /etc/puppet/2014.2-6.0/modules/l23network/manifests/l2/bridge.pp
    sed -ie "s%defaultto(true)%defaultto(false)%" \
        /etc/puppet/2014.2-6.0/modules/l23network/lib/puppet/type/l2_ovs_bridge.rb
    patch -Rp1 $modulespath/openstack/manifests/controller.pp
        /root/octane/bin/patches/controller.pp.patch

Run following commands to restore Astute to it's original state as of release
6.0 of Fuel installer.

::

    dockerctl shell astute sed -i "94s%^#%%" \
        /usr/lib64/ruby/gems/2.1.0/gems/astute-6.0.0/lib/astute/deploy_actions.rb
    dockerctl shell astute supervisorctl restart astute

Revert Ceph configuration changes
+++++++++++++++++++++++++++++++++

You need to restore Ceph configuration to default settings with the following
command:

::

    pssh -i -h /tmp/env-6.0-cic.hosts "sed -i '/osd_crush_update_on_start = false/d' /etc/ceph/ceph.conf"
