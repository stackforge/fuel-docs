Fuel Architecture
=================

Good overview of Fuel architecture is represented on
`OpenStack wiki <https://wiki.openstack.org/wiki/Fuel#Fuel_architecture>`_.
You can find a detailed breakdown of how this works in the
:doc:`Sequence Diagrams </devdocs/develop/sequence>`.

Master node is the main part of the Fuel project. It contains all the
services needed for network provisioning of other managed nodes,
installing an operating system, and then deploying OpenStack services to
create a cloud environment. *Nailgun* is the most important service.
It is a RESTful application written in Python that contains all the
business logic of the system. A user can interact with it either using
the *Fuel Web* interface or with the help of *CLI utility*. He can create
a new environment, edit its settings, assign roles to the discovered
nodes, and start the deployment process of the new OpenStack cluster.

Nailgun stores all of its data in a *PostgreSQL* database. It contains
the hardware configuration of all discovered managed nodes, the roles,
environment settings, current deployment status and progress of
running deployments.

.. image:: _images/uml/nailgun-agent.png
   :width: 100%

Managed nodes are discovered over PXE using a special bootstrap image
and the PXE boot server located on the master node. The bootstrap image
runs a special script called Nailgun agent. The agent **nailgun-agent.rb**
collects the server's hardware information and submits it to Nailgun
through the REST API.

The deployment process is started by the user after a new environment
has been configured. The Nailgun service creates a JSON data structure
with the environment settings, its nodes and their roles and puts this
file into the *RabbitMQ* queue. This message should be received by one
of the worker processes which will actually deploy the environment. These
processes are called *Astute*.

.. image:: _images/uml/astute.png
   :width: 100%

The Astute workers are listening to the RabbitMQ queue and receive
messages. They use the *Astute* library which implements all deployment
actions. First, it starts the provisioning of the environment's nodes.
Astute uses XML-RPC to set these nodes' configuration in Cobbler and
then reboots the nodes using *MCollective agent* to let Cobbler install
the base operating system. *Cobbler* is a deployment system that can
control DHCP and TFTP services and use them to network boot the managed
node and start the OS installer with the user-configured settings.

Astute puts a special message into the RabbitMQ queue that contains
the action that should be executed on the managed node. MCollective
servers are started on all bootstrapped nodes and they constantly listen
for these messages, when they receive a message, they run the required
agent action with the given parameters. MCollective agents are just Ruby
scripts with a set of procedures. These procedures are actions that the
MCollective server can run when asked to.

When the managed node's OS is installed, Astute can start the deployment
of OpenStack services. First, it uploads the node's configuration
to the **/etc/astute.yaml** file on the node using the **uploadfile** agent.
This file contains all the variables and settings that will be needed
for the deployment.

Next, Astute uses the **puppetsync** agent to synchronize Puppet
modules and manifests. This agent runs an rsync process that connects
to the rsyncd server on the Master node and downloads the latest version
of Puppet modules and manifests.

.. image:: _images/uml/puppetsync.png
   :width: 100%

When the modules are synchronized, Astute can run the actual deployment
by applying the main Puppet manifest **site.pp**. MCollective agent runs
the Puppet process in the background using the **daemonize** tool.
The command looks like this:
::

  daemonize puppet apply /etc/puppet/manifests/site.pp

Astute periodically polls the agent to check if the deployment has
finished and reports the progress to Nailgun through its RabbitMQ queue.

When started, Puppet reads the **astute.yaml** file content as a fact
and then parses it into the **$fuel_settings** structure used to get all
deployment settings.

When the Puppet process exits either successfully or with an error,
Astute gets the summary file from the node and reports the results to
Nailgun. The user can always monitor both the progress and the
results using Fuel Web interface or the CLI tool.

Fuel installs the **puppet-pull** script. Developers can use it if
they need to manually synchronize manifests from the Master node and
run the Puppet process on node again.

Astute also does some additional actions, depending on environment
configuration, either before the deployment of after successful one:

* Generates and uploads SSH keys that will be needed during deployment.
* During network verification phase **net_verify.py** script.
* Uploads CirrOS guest image into Glance after the deployment.
* Updates **/etc/hosts** file on all nodes when new nodes are deployed.
* Updates RadosGW map when Ceph nodes are deployed.

Astute also uses MCollective agents when a node or the entire
environment is being removed. It erases all boot sectors on the node
and reboots it. The node will be network booted with the bootstrap
image again, and will be ready to be used in a new environment.
