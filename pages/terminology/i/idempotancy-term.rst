
.. _idempotancy-term:

Idempotancy
-----------

In terms of RESTful API,
an operation call is idempotent
if clients can make that same call repeatedly while producing the
same result.
In other words, making multiple identical requests has the same effect as making a single request.
Note that while idempotent operations produce the same result on the server (no side effects),
the response itself may not be the same (e.g. a resource's state may change between requests).

You can learn more information about idempotancy in
`REST API Tutorial <http://www.restapitutorial.com/lessons/idempotency.html>`_.




