.. _configure-iac:

Configure the Fuel IaC extenstion
=================================

To be able to deploy changes from a Git repository, you need
to configure the Fuel Infrastructure-as-Code (IaC) extension
on the Fuel Master node. The Fuel Master node must have either
an access to the Internet, or an access to a local repository
mirror with the required ``.rpm`` package.

**To configure the IaC extension:**

#. Install the Fuel IaC extension using the ``yum`` command:

   ::

     yum install fuel-nailgun-extension-iac

#. Synchronize the Nailgun database:

   ::

     nailgun_syncdb

#. Restart the Nailgun service:

   ::

     systemctl restart nailgun.service

#. Verify the extension is installed correctly by viewing
   the list of installed extensions:

   ::

     fuel2 extension list

   **Example of system response:**

   ::

    +-------------------+---------+-------------------+---------------------+
    | name              | version | description       | provides            |
    +-------------------+---------+-------------------+---------------------+
    | fuel_external_git | 1.0.0   | Nailgun extension | []                  |
    |                   |         | which uses git    |                     |
    |                   |         | repo for config   |                     |
    |                   |         | files.            |                     |
    +-------------------+---------+-------------------+---------------------+

#. Enable the extension for the required environment:

   ::

     fuel2 env extension enable <env_id> -E fuel_external_git
