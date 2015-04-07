Glance new features
-------------------

* A new metadata definitions catalog, where a user can register
  the metadata definitions to be used on various resource types
  including images, volumes, aggregates, and flavors. See the
  `Metadata Definitions Catalog`_ blueprint for details.

* Restrict normal users from downloading images by adding a new
  rule to the :file:`policy.json` file and applying that rule
  to the ``download_image`` policy. See the `Restrict users from
  downloading image based on policy`_ blueprint for details.

* Use an internal library API for asynchronous processing. See the
  `Asynchronous Processing in Glance`_ blueprint for details.

* The glance.store package is pulled out into its own library,
  so now other projects (like Nova) can use glance_store library
  for accessing images directly. See the `Pull Glance's store
  package out of glance`_ blueprint for details.

* Now enhanced Scrubber service allows a single instance to maintain
  multiple glance-api servers cross nodes.

.. _`Metadata Definitions Catalog`: https://blueprints.launchpad.net/glance/+spec/metadata-schema-catalog
.. _`Restrict users from downloading image based on policy`: https://blueprints.launchpad.net/glance/+spec/restrict-downloading-images-protected-properties
.. _`Asynchronous Processing in Glance`: https://blueprints.launchpad.net/glance/+spec/async-glance-workers
.. _`Pull Glance's store package out of glance`: https://blueprints.launchpad.net/glance/+spec/create-store-package
