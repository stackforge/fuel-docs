.. _plugin-cert:

===========================
Fuel plug-ins certification
===========================

What is plugin
==============

Plugin is easy way to add required functions into Fuel. It can be
implemented by any contributor and pushed into Mirantis. Plugins
can be verified and experimental. Verified plugin status means that
plugin is satisfied all `requirements for plugins verification`_,
`requirements for experimental plugins`_ easier to be satisfied.

Howto make plugin
=================

.. _build plugins instruction: TODO(ipovolotskaya)_add_link_to_doc
.. _nfs plugin tutorial: TODO(akislitsky)_add_link_to_doc

Plugin building instruction can be found at: `build plugins instruction`_.
As tutorial you can use: `nfs plugin tutorial`_

Howto get plugin
================

.. _plugins installation instruction: TODO(ipovolotskaya)_add_link_to_plugin_installation_instruction
.. _plugins storage: TODO(akislitsky)_add_link_to_plugins_storage_ui

Plugins are stored at `plugins storage`_. It is file storage.
You can download plugins and install as described in `plugins installation instruction`_.
Every plugin has user guide as requirement and it is available in the
`plugins storage`_. Plugins are separated by types in
different directories.

Plugin storage should have web UI. For the first version
it would be index of storage directories content.

Plugins types
=============

We have two plugins types: `experimental`_ and `verified`_

Experimental
------------

.. _experimental:

Experimental plugin is plugin satisfied to `requirements for experimental plugins`_.

.. _requirements for experimental plugins:

Experimental plugin should pass checklist:

* Built plugin is provided
* User guide in pdf format is provided. User guide should contain:

    - Plugin description and function
    - API usage examples (if required)
    - UI configuration (if required)

* Plugin should pass `automated tests`_.

Verified
--------

.. _verified:

Plugins verification means passed `experimental`_ phase and adds
additional requirements.

.. _requirements for plugins verification:

Verified plugin should pass experimental plugins checklist and:

 * Developer guide in pdf format is provided. Developer guide
   should contain:

   - Instruction for testing plugin. Our QA team should be able
     to reproduce it in our test lab
   - Hardware requirements (if required)
   - Access to the contributor test lab (if it impossible
     to test plugin in our test environment)

 * Should be created individual plugin automated tests (if required)
 * Manual tests should be added into test plan (if required)

As result of plugin verification plugin will be moved into
appropriate directory on the `plugin storage`_ and signed by
Mirantis GPG key.

Automated tests
===============

.. _automated tests:

TODO(aurlapova + akislitsky). We should define minimal automated test sets
for plugins. For example we install plugin, enable it and run system tests
to make sure plugin is not crush basic functions.

Howto push plugin to the Mirantis
=================================

We aren't worry about place where plugin code is hosted. Contributor
should build plugin as described in `build plugins instruction`_ and
send to special email, for example to plugins@mirantis.com.

The email should contain below information:

 * Type of plugin
 * Appropriate set of documents, described in
   `requirements for experimental plugins`_ or in
   `requirements for plugins verification`_

After email is received Partner Integration team should enable
`plugin accepting workflow`_.

Plugin accepting workflow
==========================

.. _plugin accepting workflow:

Experimental plugin accepting workflow
--------------------------------------

.. _experimental plugin accepting workflow:

Plugin should satisfy `requirements for experimental plugins`_.
After `automated tests`_ are passed and QA team confirms it
responsible person from Partner Integration team should add or
replace plugin with user guide in the appropriate directory
of the `plugins storage`_.

Verification plugin workflow
----------------------------

.. _verification plugin workflow:

Plugin should pass `experimental plugin accepting workflow`_.




Internal Mirantis plugins locations
===================================

.. _stackforge plugins repository: https://github.com/stackforge/fuel-plugins
.. _github plugins repository: https://github.com/mirantis/fuel-plugins

For plugins developed by core team `stackforge plugins repository`_ is used.
For plugins developed by Partners Integration and MOS teams `github plugins repository`_
is used.