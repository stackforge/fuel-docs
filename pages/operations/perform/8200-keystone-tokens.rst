
.. _keystone-tokens-perform:

Keystone Token Cleanup
----------------------

The :ref:`keystone-term` service creates new tokens in the Keystone database
each time an external query is run against OpenStack
but it does not automatically clean up expired tokens
because they may be required for forensics work
such as that required after a security breach.
However, the accumulation of the expired tokens in the database
can seriously degrade the performance of the entire OpenStack.

Beginning with version 5.0,
Mirantis OpenStack includes the
`pt-archiver <http://www.percona.com/doc/percona-toolkit/2.1/pt-archiver.html>`_
command from the
`Percona Toolkit <http://www.percona.com/software/percona-toolkit>`_.
We recommend using pt-archiver to set up a cleanup job
that runs periodically;
the `cleanup-keystone-tokens.sh <https://github.com/openstack/tripleo-image-elements/blob/master/elements/keystone/cleanup-keystone-tokens.sh>`_
script from TripleO is a good example:

::

    pt-archiver --source h=$DB_HOST,u=$DB_USER,p=$DB_PASS,D=$DB_NAME,t=token \
        --charset utf8 \
        --where "expires < UTC_TIMESTAMP()" \
        --purge \
        --txn-size 500 \
        --run-time 59m \
        --statistics \
        --primary-key-only

It is better to use pt-archiver instead of deleting the expired tokens
using standard database manipulation commands
because it prevents the Keystone database
from being blocked for significant time periods
while the rows with expired tokens are deleted.
