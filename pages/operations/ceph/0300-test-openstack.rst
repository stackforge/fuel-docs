
.. _test-ceph-openstack-op:

Test that Ceph works with OpenStack components
----------------------------------------------

Glance
++++++

Upload an image to Glance to see if it is saved in Ceph:

  ::

    source ~/openrc
    glance image-create --name cirros --container-format bare \
    --disk-format qcow2 --is-public yes --location \
    https://launchpad.net/cirros/trunk/0.3.0/+download/cirros-0.3.0-x86_64-disk.img


This should return something similar to the following:

 ::

   +------------------+--------------------------------------+
   | Property         | Value                                |
   +------------------+--------------------------------------+
   | checksum         | None                                 |
   | container_format | bare                                 |
   | created_at       | 2013-08-22T19:54:28                  |
   | deleted          | False                                |
   | deleted_at       | None                                 |
   | disk_format      | qcow2                                |
   | id               | f52fb13e-29cf-4a2f-8ccf-a170954907b8 |
   | is_public        | True                                 |
   | min_disk         | 0                                    |
   | min_ram          | 0                                    |
   | name             | cirros                               |
   | owner            | baa3187b7df94d9ea5a8a14008fa62f5     |
   | protected        | False                                |
   | size             | 0                                    |
   | status           | active                               |
   | updated_at       | 2013-08-22T19:54:30                  |
   +------------------+--------------------------------------+

Then check rbd:

 ::

    rbd ls images
    rados -p images df

Cinder
++++++

Create a small volume and see if it is saved in Cinder:

 ::

    source openrc
    cinder create 1


This will instruct Сinder to create a 1 GB volume. This should return
something similar to the following:

 ::

    +=====================+======================================+
    |       Property      |                Value                 |
    +=====================+======================================+
    |     attachments     |                  []                  |
    +---------------------+--------------------------------------+
    | availability_zone   |                 nova                 |
    +---------------------+--------------------------------------+
    |       bootable      |                 false                |
    +---------------------+--------------------------------------+
    |      created_at     |      2013-08-30T00:01:39.011655      |
    +---------------------+--------------------------------------+
    | display_description |                 None                 |
    +---------------------+--------------------------------------+
    |     display_name    |                 None                 |
    +---------------------+--------------------------------------+
    |          id         | 78bf2750-e99c-4c52-b5ca-09764af367b5 |
    +---------------------+--------------------------------------+
    |        metadata     |                  {}                  |
    +---------------------+--------------------------------------+
    |         size        |                  1                   |
    +---------------------+--------------------------------------+
    |     snapshot_id     |                 None                 |
    +---------------------+--------------------------------------+
    |     source_volid    |                 None                 |
    +---------------------+--------------------------------------+
    |        status       |               creating               |
    +---------------------+--------------------------------------+
    |     volume_type     |                 None                 |
    +---------------------+--------------------------------------+



Check the status of the image using its *id* with the *cinder show <id>* command:

 ::

    cinder show 78bf2750-e99c-4c52-b5ca-09764af367b5

    +==============================+======================================+
    |           Property           |                Value                 |
    +==============================+======================================+
    |         attachments          |                  []                  |
    +------------------------------+--------------------------------------+
    |      availability_zone       |                 nova                 |
    +------------------------------+--------------------------------------+
    |           bootable           |                false                 |
    +------------------------------+--------------------------------------+
    |          created_at          |      2013-08-30T00:01:39.000000      |
    +------------------------------+--------------------------------------+
    |     display_description      |                 None                 |
    +------------------------------+--------------------------------------+
    |         display_name         |                 None                 |
    +------------------------------+--------------------------------------+
    |              id              | 78bf2750-e99c-4c52-b5ca-09764af367b5 |
    +------------------------------+--------------------------------------+
    |           metadata           |                  {}                  |
    +------------------------------+--------------------------------------+
    |    os-vol-host-attr:host     |       controller-19.domain.tld       |
    +------------------------------+--------------------------------------+
    | os-vol-tenant-attr:tenant_id |   b11a96140e8e4522b81b0b58db6874b0   |
    +------------------------------+--------------------------------------+
    |             size             |                  1                   |
    +------------------------------+--------------------------------------+
    |         snapshot_id          |                 None                 |
    +------------------------------+--------------------------------------+
    |         source_volid         |                 None                 |
    +------------------------------+--------------------------------------+
    |            status            |              available               |
    +------------------------------+--------------------------------------+
    |          volume_type         |                 None                 |
    +------------------------------+--------------------------------------+



If the image shows *status available*, it was successfully created in Ceph.
You can check this with the *rbd ls volumes command*.

 ::

  rbd ls volumes
  volume-78bf2750-e99c-4c52-b5ca-09764af367b5

Rados GW
++++++++

First confirm that the cluster is *HEALTH_OK* using *ceph -s* or *ceph health detail*.
If the cluster is not healthy most of these tests will not function.

.. note::

   RedHat distros: mod_fastcgi's /etc/httpd/conf.d/fastcgi.conf
   must have FastCgiWrapper Off or rados calls will return 500 errors.


Rados relies on the service *radosgw* (Debian) *ceph-radosgw* (RHEL) to run and create a socket for the webserver's script service to talk to.
If the radosgw service is not running, or not staying running then you need to inspect it closer.

The service script for radosgw might *exit 0* and not start the service.
An easy way to test this is to simply *service ceph-radosgw restart* if
the service script can not stop the service, it was not running in the first place.

You can also check to see if the radosgw service is be running with the *ps axu | grep radosgw* command, but this might also show the webserver script server processes as well.

Most commands from *radosgw-admin* will work regardless of whether the radosgw service is running or not.

Swift
+++++

Create a new user:

 ::

   radosgw-admin user create --uid=test --display-name="username" --email="username@domain.com"
  { "user_id": "test",
    "display_name": "username",
    "email": "username@domain.com",
    "suspended": 0,
    "max_buckets": 1000,
    "auid": 0,
    "subusers": [],
    "keys": [
          { "user": "test",
            "access_key": "CVMC8OX9EMBRE2F5GA8C",
            "secret_key": "P3H4Ilv8Lhx0srz8ALO\/7udwkJd6raIz11s71FIV"}],
    "swift_keys": [],
    "caps": []}

Swift authentication works with subusers. In OpenStack this will be *tenant:user*, so you need to mimic it:

::

  radosgw-admin subuser create --uid=test --subuser=test:swift --access=full

  { "user_id": "test",
    "display_name": "username",
    "email": "username@domain.com",
    "suspended": 0,
    "max_buckets": 1000,
    "auid": 0,
    "subusers": [
          { "id": "test:swift",
            "permissions": "full-control"}],
    "keys": [
          { "user": "test",
            "access_key": "CVMC8OX9EMBRE2F5GA8C",
            "secret_key": "P3H4Ilv8Lhx0srz8ALO\/7udwkJd6raIz11s71FIV"}],
    "swift_keys": [],
    "caps": []}

Generate a secret key.

.. note::

   *--gen-secret* is required in
   Cuttlefish and newer.


::

  radosgw-admin key create --subuser=test:swift --key-type=swift --gen-secret
  { "user_id": "test",
    "display_name": "username",
    "email": "username@domain.com",
    "suspended": 0,
    "max_buckets": 1000,
    "auid": 0,
    "subusers": [
          { "id": "test:swift",
            "permissions": "full-control"}],
    "keys": [
          { "user": "test",
            "access_key": "CVMC8OX9EMBRE2F5GA8C",
            "secret_key": "P3H4Ilv8Lhx0srz8ALO\/7udwkJd6raIz11s71FIV"}],
    "swift_keys": [
          { "user": "test:swift",
            "secret_key": "hLyMvpVNPez7lBqFlLjcefsZnU0qlCezyE2IDRsp"}],
    "caps": []}


Sample test commands should look as follows:

 ::

  swift -A http://localhost:6780/auth/1.0 -U test:swift -K "eRYvzUr6vubg93dMRMk60RWYiGdJGvDk3lnwi4cl" post test
  swift -A http://localhost:6780/auth/1.0 -U test:swift -K "eRYvzUr6vubg93dMRMk60RWYiGdJGvDk3lnwi4cl" upload test myfile
  swift -A http://localhost:6780/auth/1.0 -U test:swift -K "eRYvzUr6vubg93dMRMk60RWYiGdJGvDk3lnwi4cl" list test



