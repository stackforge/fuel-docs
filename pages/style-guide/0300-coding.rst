
.. _coding-style:

Coding and formatting practices
===============================

Mirantis OpenStack documentation uses reStructuredText (RST) markup syntax
with the Sphinx extensions. This section provides general guidelines on the
coding and formatting rules to follow while contributing.

Besides, we provide the real-life examples of what you type in a source .rst
file and what you get when you build it. These include references
and cross-links, code-blocks, tables, and other frequently used content elements
and inline markups throughout the Mirantis OpenStack documentation.


Titles
------

To mark a section heading, underline or underline-and-overline
the heading text using non-alphanumeric characters.

The generic rules you must always be aware of are:

* underline and overline must not be shorter than the title text itself;
* the order of the adornment style used for each header level is essential.

Use the following conventions for headings formatting:

::

  Heading 1
  =========

  Heading 2
  ---------

  Heading 3
  +++++++++

Do not go beyond the Heading 3 level. Use the bold markup in case you want to
emphasize the line, for example, :code:`**Heading 4**`

.. note::

   In case you are using the `include
   <http://docutils.sourceforge.net/docs/ref/rst/directives.html#include>`_
   directive, keep in mind that the file you include is deemed to conform
   the headings level order of its parent file.

In addition, precede each Heading 1 with the label that can be used for
cross-referencing:

::

  .. _syntax-style:

  Writing syntax
  ==============


Code blocks
-----------

Use the code-block element to format commands usage and their output samples,
lines of code, and configuration files extracts.

Format each program source or code snippet as a standalone block.

To start a code block, use one of the following directives:

* :code:`::` starts the standard reST literal block;

* :code:`.. code-block::` allows the code snippet for a specific
  programming language optimization. The highlighting is handled with
  `Pygments <http://pygments.org/>`_.

It is preferable to use the ``code-block`` directive where possible as the
documentation contains snippets in different programming languages.
For better readability, use the following options with the ``code-block``
directive:

* ``linenos`` for automatic code-lines enumeration;

* ``emphasize-lines`` for particular lines emphasizing.


Examples
++++++++

The ``bash`` pygments lexer usage.

**Source:**

::

 .. code-block:: bash
    cat /proc/cpuinfo  | grep --color "vmx\|svm"

**Build:**

.. code-block:: bash

   cat /proc/cpuinfo  | grep --color "vmx\|svm"

-----

The ``python`` pygments lexer usage. It also shows how to highlight definite
lines and apply line enumeration.

**Source:**

::

  .. code-block:: python
     :emphasize-lines: 3
     :linenos:

      @property
      def total_active_instances(self):
          return sum(1 for s in self.server_usages if s['ended_at'] is None)

**Build:**

.. code-block:: python
   :emphasize-lines: 3
   :linenos:

    @property
    def total_active_instances(self):
        return sum(1 for s in self.server_usages if s['ended_at'] is None)

----

The ``ruby`` pygments lexer usage.

**Source:**

::

 .. code-block:: ruby

    # See what type of server this is
    >> server.flavor.name
    => "256 server"
    >> server.image.name
    => "Ubuntu 8.04.2 LTS (hardy)"

**Build:**

.. code-block:: ruby

   # See what type of server this is
   >> server.flavor.name
   => "256 server"
   >> server.image.name
   => "Ubuntu 8.04.2 LTS (hardy)"

-----

.. seealso::

   * Sphinx: `Showing code examples <http://sphinx-doc.org/markup/code.html#code-examples>`_

   * Pygments: `Available lexers <http://pygments.org/docs/lexers/#lexers-for-misc-console-output>`_


Notes, warnings, and see also
-----------------------------

Use notes, warnings, and see also blocks to emphasize special information.

Notes
+++++

Notes include tips, shortcuts, alternative approaches, or any additional
information on the subject.

**Source:**

::

  .. note::

     The note text.

**Build:**

.. note::

   The note text.


Warnings
++++++++

Warnings contain the details that can be easily missed, but should not be
ignored. The information included in a warning block is valuable for the user
before proceeding.

**Source:**

::

  .. warning::

     The warning text.

**Build:**

.. warning::

   The warning text.


See also
++++++++

See also blocks contain links to external documentation relevant to a subject.

**Source:**

::

  .. seealso::

     The see also block text.


**Build:**

.. seealso::

   The see also block text


Tables
------

Images
------

Bulleted and enumerated lists
-----------------------------

Definition lists
----------------

Inline markups
--------------
