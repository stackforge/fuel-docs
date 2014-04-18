# -*- coding: utf-8 -*-
#
# "Fuel" documentation build configuration file, created by
# sphinx-quickstart on Tue Sep 25 14:02:29 2012.
#
# This file is execfile()d with the current directory set to its containing dir.
#
# Note that not all possible configuration values are present in this
# autogenerated file.
#
# All configuration values have a default; values that are commented out
# serve to show the default.

# -- Default Settings -----------------------------------------------------
execfile('../common_conf.py')

exclude_patterns = ['_*', "pages", 'relnotes', 'contents', 'index', '*-guide', '*.rst']

pdf_documents = [ 
    ('pdf/pdf_user', u'Mirantis-OpenStack-4.1-UserGuide',  u'User Guide',
    u'2014, Mirantis Inc.'),
    ('pdf/pdf_install', u'Mirantis-OpenStack-4.1-InstallGuide', u'Installation Guide', u'2014, Mirantis Inc.'),
    ('pdf/pdf_operations', u'Mirantis-OpenStack-4.1-OperationsGuide', u'Operations Guide', u'2014, Mirantis Inc.'),
    ('pdf/pdf_reference', u'Mirantis-OpenStack-4.1-ReferenceArchitecture', u'Reference Architecture', u'2014, Mirantis Inc.'),
    ('pdf/pdf_preinstall', u'Mirantis-OpenStack-4.1-Pre-InstallationGuide', u'Pre-Installation Guide', u'2014, Mirantis Inc.'),
    ('pdf/pdf_terminology', u'Terminology-Reference', u'Terminology Reference', u'2014, Mirantis Inc.'),
    ('pdf/pdf_patch', u'Mirantis-OpenStack-4.1-OpenStack-Patch-Quick-Ref', u'OpenStack Patching Quick Reference Guide', u'2014, Mirantis Inc.')
#    (master_doc, project, project, copyright),
]
