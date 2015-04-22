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

exclude_patterns = ['_*', 'pages', 'contents', 'index', '*-guide', '*.rst']

pdf_documents = [ 
#   (master_doc, project, project, copyright),
<<<<<<< HEAD
    ('pdf/pdf_planning-guide', u'Mirantis-OpenStack-6.0-PlanningGuide', u'Planning Guide', u'2014, Mirantis Inc.'),
    ('pdf/pdf_user', u'Mirantis-OpenStack-6.0-UserGuide',  u'User Guide', u'2014, Mirantis Inc.'),
    ('pdf/pdf_operations', u'Mirantis-OpenStack-6.0-OperationsGuide', u'Operations Guide', u'2014, Mirantis Inc.'),
    ('pdf/pdf_virtualbox', u'Mirantis-OpenStack-6.0-Running-Mirantis-OpenStack-on-VirtualBox', u'Running Mirantis OpenStack on VirtualBox', u'2014, Mirantis Inc.'),
    ('pdf/pdf_reference', u'Mirantis-OpenStack-6.0-ReferenceArchitecture', u'Reference Architecture', u'2014, Mirantis Inc.'),
    ('pdf/pdf_plugin-dev', u'Mirantis-OpenStack-6.0-FuelPluginGuide', u'Fuel Plugin Guide', u'2014, Mirantis Inc.'),    
    ('pdf/pdf_terminology', u'Mirantis-OpenStack-6.0-Terminology-Reference', u'Terminology Reference', u'2014, Mirantis Inc.'),
    ('pdf/pdf_file-ref', u'Mirantis-OpenStack-6.0-File-Format-Reference', u'File Format Reference', u'2014, Mirantis Inc.'),
    ('pdf/pdf_relnotes', u'Mirantis-OpenStack-6.0-RelNotes', u'Release Notes', u'2014, Mirantis Inc.', {'pdf_use_toc': False}),
=======
    ('pdf/pdf_planning-guide', u'Mirantis-OpenStack-6.1-PlanningGuide', u'Planning Guide', u'2015, Mirantis Inc.'),
    ('pdf/pdf_user', u'Mirantis-OpenStack-6.1-UserGuide',  u'User Guide', u'2015, Mirantis Inc.'),
    ('pdf/pdf_operations', u'Mirantis-OpenStack-6.1-OperationsGuide', u'Operations Guide', u'2015, Mirantis Inc.'),
    ('pdf/pdf_virtualbox', u'Mirantis-OpenStack-6.1-Running-Mirantis-OpenStack-on-VirtualBox', u'Running Mirantis OpenStack on VirtualBox', u'2015, Mirantis Inc.'),
    ('pdf/pdf_reference', u'Mirantis-OpenStack-6.1-ReferenceArchitecture', u'Reference Architecture', u'2015, Mirantis Inc.'),
    ('pdf/pdf_terminology', u'Mirantis-OpenStack-6.1-Terminology-Reference', u'Terminology Reference', u'2015, Mirantis Inc.'),
    ('pdf/pdf_file-ref', u'Mirantis-OpenStack-6.1-File-Format-Reference', u'File Format Reference', u'2015, Mirantis Inc.'),
    ('pdf/pdf_plugin-dev', u'Mirantis-OpenStack-6.1-Fuel-Plugin-Guide', u'Fuel Plugin Guide', u'2015, Mirantis Inc.'),
    ('pdf/pdf_relnotes', u'Mirantis-OpenStack-6.1-RelNotes', u'Release Notes', u'2015, Mirantis Inc.', {'pdf_use_toc': False}),
>>>>>>> f6e60a8... add back to top
]
