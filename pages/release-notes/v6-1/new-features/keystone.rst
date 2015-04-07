Keystone new features
=====================

Mirantis OpenStack 6.1 contains improvements for the Identity service:

* Keystone now has experimental support for `Keystone-to-Keystone
  federation <http://docs.openstack.org/developer/keystone/configure_federation.html#keystone-as-an-identity-provider-idp>`_, where one instance acts as an Identity
  Provider, and the other as a Service Provider.

* PKIZ is a new token provider available for users of PKI tokens,
  which simply adds a zlib-based compression to traditional PKI tokens.

* The hashing algorithm used for PKI tokens is now configurable
  (the default one is still MD5, but the Keystone team recommends that
  deployments migrate to SHA256).

* Identity-driver-configuration-per-domain now supports Internet domain
  names of arbitrary hierarchical complexity (for example,
  ``customer.cloud.example.com``).

* The LDAP identity back end now supports ``description`` as an attribute
  of users.

* Identity API v3 requests are now validated via JSON Schema.

* In case of multiple identity back ends, Keystone can now map arbitrary
  resource IDs to arbitrary back ends.

* ``keystoneclient.middleware.auth_token`` has been moved into its own
  repository, ``keystonemiddleware.auth_token``.

* Identity API v3 now supports a discrete call to retrieve a service
  catalog, ``GET /v3/auth/catalog``.

* Federated authentication events and local role assignment operations
  now result in CADF (audit) notifications.

* Keystone can now associate a given policy blob with one or more endpoints.

* Keystone now provides JSON Home documents on the root API endpoints
  in response to ``Accept: application/json-home`` headers.

* Hiding endpoints from client's service catalogs is now more easily manageable
  via ``OS-EP-FILTER``.

* The credentials collection API is now filterable per associated user
  (``GET /v3/credentials?user_id={user_id}``).

* New generic API endpoints are available for retrieving
  authentication-related data, such as a service catalog, available project
  scopes, and available domain scopes.

* Keystone now supports mapping the user ``enabled`` attribute to the ``lock``
  attribute in LDAP (and inverting the corresponding boolean value accordingly).

* A CA certificate file is now configurable for LDAPS connections.

* The templated catalog back end now supports generating service catalogs for
  Identity API v3.

* Service names are added to the v3 service catalog.

* You can now filter services by name (``GET /v3/services?name={service_name}``).
