
Documentation Checklist
=======================

Soft Code Freeze
----------------

- Release Number and date implemented and merged
- Release Notes structure in place
- Release Notes front matter and "New Features" implemented and merged
- Known issues from previous release understood and allotted
  to "Resolved Issues", "Known Issues", or (for issues that are not
  expected to be fixed soon), integrated appropriately into the main
  documentation structure.
- "Major Component Versions" in Release Notes updated; xrefs to
  the correct version of component Release Notes.
- Most work on general doc improvements implemented and merged;
  work that is not completed should be reevaluated.

Hard Code Freeze
----------------

- User Guide screens tested and updated as necessary
- Docs about new features mostly complete and merged;
  later refinements are possible but the basics should be in place.
  This may include:

  - "New Features" article in Release Notes
    with links to other docs about the feature
  - Update "User Guide" screen shots and procedures
  - Update "Planning Guide" with appropriate information about
    deciding to use the new feature
  - Update Fuel CLI documentation
  - Add appropriate "Operations" sections
  - Add "Reference Architecture" section to explain how the
    new feature works
  - Add/update "Terminology" articles
  - Add new experimental features to the list in
    the terminology e/experimental-features.rst article
  - Add/update "File Reference" pages
  - Add/update appropriate Developer Guide material
  - Add appropriate information to the Ops Guide sections
    about logs, performance, and troubleshooting
    as well as advanced procedures for using this feature

- New LPs that will not be fixed for this release written up
  and merged into Release Notes.
- Links to external docs tested to ensure that they work
  and that they point to the current version.

Release time
------------

- Fix release date in release-notes file
- Add information about late-breaking bugs to Release Notes
- Review docs about New Features for accuracy and completeness
- Read through unmodified docs to ensure that nothing needs
  to be updated
