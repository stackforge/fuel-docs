.. _Enable_Disable_Galera_autorebuild:

.. index:: HowTo: Galera Cluster Autorebuild

HowTo: Enable/Disable Galera Cluster Autorebuild Mechanism
----------------------------------------------------------

By default Fuel reassembles Galera cluster automatically without need for any
user interaction. The OCF script looks for existense of `mysqlprimaryinit`
variable and tries to assemble the cluster in a following way:

  - script checks for variable above and for temporary config file created
    explicitly on deployment stage - if first is present and second missing,
    then script enters autorebuild phase, otherwise it is skipped;

  - script checks for the status of the current node - if it is syncronized
    with quorum, procedure stops, otherwise latest epoch takes place as a
    corosync variable parameter for selected node;

  - sleep for five minutes come in place allowing other nodes to join
    corosync quorum and push their epochs too;

  - for every node in quorum script does comparison of epochs and if there is
    at least one node with higher epoch, skips the rest and starts standalone
    service which will join newly formed cluster later; if there is no higher
    epochs script checks for temporary `mysqlmaster` flag and neither sets it if
    flag does not exists nor falls back to the standalong mode;

  - mysql process launches with empty `gcomm://` string forming a new quorum
    and `mysqlmaster` deletes immediately, other nodes joins in a very short time.


To prevent `autorebuild feature` you should do::

  crm_attribute -t crm_config --name mysqlprimaryinit --delete

To re-enable `autorebuild feature` you should do::

  crm_attribute -t crm_config --name mysqlprimaryinit --update done

To try an automated reassemble without reboot if cluster is broken just issue::

  crm resource restart clone_p_mysql

