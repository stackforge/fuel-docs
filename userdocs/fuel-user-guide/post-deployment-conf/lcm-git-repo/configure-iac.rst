.. _configure-iac:

Configure the Fuel IaC extenstion
=================================

To be able to deploy changes from a Git repository, you need
to clone the Fuel Infrastructure-as-Code (IaC) extension and configure it
on the Fuel Master node.

**To configure the IaC extension:**

#. Install ``git`` and ``python-pip``:

   ::

     yum install git python-pip

#. Clone the IaC Fuel extension repository:

   ::

     git clone https://github.com/openstack/fuel-nailgun-extension-iac

#. Change the current directory to ``fuel-nailgun-extension-iac``.

   ::

     cd fuel-nailgun-extension-iac

#. Install the required packages:

   ::

     pip install -r requirements.txt

#. Install the ``setup.py`` package:

   ::

     python setup.py install

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
