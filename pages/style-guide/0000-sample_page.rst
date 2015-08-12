
.. highlight:: ruby
   :linenothreshold: 5

.. _sample_page:

Sample page
===========

References and cross-links
--------------------------

Code-blocks
-----------

**.. code-block:: bash**

.. code-block:: bash

   cat /proc/cpuinfo  | grep --color "vmx\|svm"

**.. code-block:: python** with `:emphasize-lines:` and `:linenos:` options

.. code-block:: python
   :emphasize-lines: 3,5,12
   :linenos:

    @property
    def total_active_instances(self):
        return sum(1 for s in self.server_usages if s['ended_at'] is None)

    @property
    def vcpus(self):
        return sum(s['vcpus'] for s in self.server_usages
        	if s['ended_at'] is None)

    @property
    def vcpu_hours(self):
        return getattr(self, "total_vcpus_usage", 0)


**.. code-block:: bash**

.. code-block:: bash
   :linenos:
   :emphasize-lines: 7,22

    glance image-create --name "trusty-server-cloudimg-amd64-w" \
    --is-public true --disk-format qcow2 --container-format bare \
    --file trusty-server-cloudimg-amd64-disk1.img
    +------------------+--------------------------------------+
    | Property         | Value                                |
    +------------------+--------------------------------------+
    | checksum         | 4a992ed9b91ddea133201cd45f127156     |
    | container_format | bare                                 |
    | created_at       | 2014-12-16T10:37:35                  |
    | deleted          | False                                |
    | deleted_at       | None                                 |
    | disk_format      | qcow2                                |
    | id               | c4b4c830-e9ec-4b19-9eb7-36b1198d4e0b |
    | is_public        | True                                 |
    | min_disk         | 0                                    |
    | min_ram          | 0                                    |
    | name             | trusty-server-cloudimg-amd64-w       |
    | owner            | 0c09f0048d9b4a21a98ca2f9015be284     |
    | protected        | False                                |
    | size             | 256115200                            |
    | status           | active                               |
    | updated_at       | 2014-12-16T10:43:17                  |
    | virtual_size     | None                                 |
    +------------------+--------------------------------------+


https://review.fuel-infra.org/#/c/9710/



Tables
------



Notes, warnings, and seealsos
-----------------------------

**.. note::**

.. note:: This is an example of a note


**.. warning::**

.. warning:: This is an example of a warning


**.. seealso::**

.. seealso:: This is an example of a see also

Images
------

Bulleted and enumerated lists
-----------------------------

Definition lists
----------------

Inline markups
--------------

