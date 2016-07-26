.. _code-style:

Code style
----------

To keep the code readable, reviewable, and maintainable, adhere to the
standardized style of `Puppet <https://docs.puppet.com/guides/style_guide.html>`_
and `Python <https://www.python.org/dev/peps/pep-0008/>`_.

Integrate the code style checkers to your Continuous Integration (CI) workflow.

**To install a Puppet code style checker:**

.. code-block:: console

   gem install puppet-lint
   puppet-lint  --with-context ./myplugin/deployment_scripts

**To install a Python code style checker:**

.. code-block:: console

   pip install pep8
   pep8 --show-source --show-pep8 ./myplugin/deployment_scripts