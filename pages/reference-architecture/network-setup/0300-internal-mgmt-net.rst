.. index:: Internal Network, Management Network

Internal (Management) Network
-----------------------------

The internal network connects all OpenStack nodes in the environment. All
components of an OpenStack environment communicate with each other using this
network. This network must be isolated from both the private and public
networks for security reasons.

The internal network can also be used for serving iSCSI protocol exchanges
between Compute and Storage nodes.
