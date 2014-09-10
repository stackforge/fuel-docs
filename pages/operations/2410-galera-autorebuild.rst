.. _Enable_Disable_Galera_autorebuild:

.. index:: HowTo: Galera Cluster Autorebuild

.. _enable-galera-autorebuild:

HowTo: Enable/Disable Galera Cluster Autorebuild Mechanism
----------------------------------------------------------

By default, Fuel reassembles a Galera cluster automatically
without any user interaction.
The OCF script looks for the existence of the `mysqlprimaryinit` variable
and tries to assemble the cluster in a following way:

  - The script checks for this variable and
    for a temporary config file that is created explicitly during deployment.
    If the first is present and the second is missing,
    then the script enters the autorebuild phase; otherwise it is skipped.

  - The script checks for the status of the current node,
    If it is synchronized with the quorum, the procedure stops;
    otherwise, the latest epoch takes place
    as a Corosync variable parameter for the selected node.

  - The script sleeps for five minutes,
    allowing other nodes to join the Corosync quorum
    and push their epochs too.

  - For every node in the quorum,
    the script compares the epochs and,
    if at least one node has a higher epoch,
    skips the rest and starts a standalone service
    which will join newly formed cluster later;
    if no higher epochs are found,
    the script checks for the temporary `mysqlmaster` flag
    and neither sets it if the flag does not exist
    nor falls back to the standalone mode.

  - The MySQL process launches with an empty `gcomm://` string,
    forming a new quorum,
    and the `mysqlmaster` flag is unset immediately;
    other nodes joins in a very short time.


To prevent the `autorebuild feature` you should do::

  crm_attribute -t crm_config --name mysqlprimaryinit --delete

To re-enable `autorebuild feature` you should do::

  crm_attribute -t crm_config --name mysqlprimaryinit --update done

To try an automated reassemble without reboot if cluster is broken just issue::

  crm resource restart clone_p_mysql

