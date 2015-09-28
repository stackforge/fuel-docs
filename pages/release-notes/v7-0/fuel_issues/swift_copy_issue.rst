* Deleting Controller nodes while Swift is copying data
  from them to the new ones results in a non-operational environment.

  Sample scenario:

  #. You deploy an environment with Controller nodes.
  #. You add new Controller nodes to the environment.
  #. Swift starts copying data from the original Controllers
     to the new ones.
  #. You immediately delete the original Controllers.
  #. As a result, you have:

    * The initially deployed Controller nodes are deleted.
    * The new Controller nodes are incomplete, because Swift
      did not finish copying the data from the original Controllers.

    The environment is not operational.

  Do not delete the original Controllers before Swift finishes
  copying the data successfully.

  See `LP1498368 <https://bugs.launchpad.net/fuel/+bug/1498368>`_.
