.. _horizon-mos:

OpenStack Dashboard (Horizon)
-----------------------------

Resolved issues
+++++++++++++++

* An authenticated user may conduct a persistent XSS attack by
  setting a malicious metadata to a Glance image, a Nova flavor, or a
  Host Aggregate, and tricking an administrator to load the update
  metadata page. Once executed in a legitimate context, this attack
  may result in a privilege escalation. To fix this, the metadata is
  omited and then is interpreted as JSON. See `LP1468744`_.

.. _`LP1468744`: https://bugs.launchpad.net/mos/+bug/1468744