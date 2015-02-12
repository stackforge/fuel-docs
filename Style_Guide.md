
Introduction
============

This little guide is a compendium of documentation practices
for Mirantis writers.
It is a living document;
anyone involved in the documentation creation process
is free to submit CRs to modify and augment the content.

Documentation from non-writers
------------------------------


Terminology lists
=================

Writing syntax
==============

Directive
---------
Write short & simple sentences.

**Correct use:** To verify that Neutron HA is working, do the following.
**Incorrect use:** If you'd like to verify that Neutron HA is working, shut down the node hosting the Neutron agent and check if the agents start on the other node with the *crm status* command.

Directive
---------
Write sentences that express only one idea.

**Correct use:** Corosync should start after the network interfaces are activated. *bindnetaddr* should be located in the management network or at least in the same multicast reachable segment.
**Incorrect use:** Corosync should start after the network interfaces are activated, and bindnetaddr should be located in the management network or at least in the same multicast reachable segment.

Directive
---------
Write the same sentence if you want to express the same content. Don’t be afraid to repeat. Avoid synonyms.

**Correct use:** These commands, in order, allow you to start, stop, and restart resources. ...These commands, in order, allow you to start, stop, and restart resources.
**Incorrect use:** These commands, in order, allow you to start, stop, and restart resources. ...The execution of these commands will allow you restart, stop, or start the resources in the same order.

Directive
---------
Write sentences in the active form. Avoid passive voice.

**Correct use:** To enable the feature, execute the following on a running Fuel Master node.
**Incorrect use:** The following should be executed on a running Fuel Master node for the feature to be enabled.

Directive
---------
Write sentences that repeat the noun instead of using a pronoun.

**Correct use:** Fuel is able to configure Murano's dashboard, API, and engine services. Fuel can install Murano on either CentOS or Ubuntu.
**Incorrect use:** Fuel is able to configure Murano's dashboard, API, and engine services. Fuel can install it on either CentOS or Ubuntu.

Directive
---------
Write sentences that use articles to identify nouns.

**Correct use:** Test the installation.
**Incorrect use:** Test installation.

Directive
---------
Write sentences that use only words with correct spelling and capitalization. Avoid mistakes.

**Correct use:** You can manage the VMware cluster using the Horizon dashboard.
**Incorrect use:** You can manage the VMWare cluster using the Horizon dashboard.

Directive
---------
Capitalize all words in a title except for prepositions and articles, regardless of the preposition length.

**Correct use:** Choosing between the Horizon Console or Nova CLI
**Incorrect use:** Choosing Between The Horizon Console or Nova CLI

Directive
---------
Capitalize only the first word in a subtitle.

**Correct use:** Restarting the services
**Incorrect use:** Restarting the Services

Directive
---------
Put the UI elements and commands when used in a sentence in *italics*.

**Correct use:** Check the status with the *crm_mon -1* command.
**Incorrect use:** Check the status with the "crm_mon -1" command.

Directive
---------
Be careful when giving examples in your writing. The words 'For example' should begin a sentence only when a main verb follows.

**Correct use:** For example, a Load Balancing as a Service (LBaaS) plug-in allows you to add network load balancing functionality to your cloud.
**Incorrect use:** You can add network load balancing functionality to your cloud. For example, through a Load Balancing as a Service (LBaaS) plug-in.

Directive
---------
Avoid beginning sentences with certain linking words, for example, 'which', 'while/whilst', 'whereas', 'although', as well as 'and' or 'but'.

**Correct use:** Add Ubuntu or CentOS packages which are required for your plug-in.
**Incorrect use:** Add Ubuntu or CentOS packages. Which is required for your plug-in to run successfully.


Coding and formatting practices
===============================

Git and Gerrit practices
========================

Basic Git and Gerrit workflow
-----------------------------

Submitting a CR to a stable (already-release) branch
----------------------------------------------------

Basing a CR on another CR
-------------------------

Sizing a CR
-----------

Reviewer's Checklist
====================

