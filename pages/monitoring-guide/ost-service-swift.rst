.. _Monitoring-Ost-swift:

Swift
-----

Processes
_________

Proxy
+++++

http on port 8080

process swift-proxy-server

Object
++++++

http on port 6000

processes swift-object-replicator and swift-object-server


Container
+++++++++

http on port 6001

processes swift-container-replicator and swift-container-server


Account
+++++++

http on port 6002

processes **swift-account-replicator** and **swift-account-server**
