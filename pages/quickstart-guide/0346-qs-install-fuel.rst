.. _qs_install_fuel:

Installing Fuel
---------------
After you complete the steps described in Configuring Virtual Machines,
install Fuel.

**Procedure:**

#. Power on the Fuel Master node VM to start the installation.
#. When prompted, select **DVD Fuel Install**.

   Fuel installs on the virtual machine. It may take some time.
   The network configuration screen displays:

   .. image:: /_images/qsg/src_network_setup.png
      :width: 60%

#. Press F8.

   **System response:**

   ::

      Loading docker images. (This may take a while)

   When Fuel completes the installation, the following message displays:

   ::

      Welcome to the Fuel server
      ...
      fuel login:

#. After the Fuel Master node installs, power on the Fuel Slave nodes.
   When the Fuel Slave nodes boot, the Fuel Master node automatically discovers them.
#. Log in to the Fuel Master Node CLI using the default credentials.
#. Verify the eth1 configuration:

   1. Type:

      ::

         vi /etc/sysconfig/network-scripts/ifcfg-eth1

   2. Verify that the lines listed below have the following values:

      ::

          DEVICE=eth1
          TYPE=Ethernet
          ONBOOT=yes
          NM_CONTROLLED=no
          BOOTPROTO=static
          IPADDR=172.16.0.1
          NETMASK=255.255.255.0

   3. Modify if needed.
   4. Save changes and quit:

      ::

          :qw!

7. Configure the IP tables rerouting:

   ::

          iptables -t nat -A POSTROUTING -s 172.16.0.0/24 \! -d 172.16.0.0/24 -j MASQUERADE

8. Log in to the Fuel UI by pointing your browser to the URL specified in the command prompt.

   Use the default login and password.
9. Proceed to :ref:`start-create-env-ug`.
