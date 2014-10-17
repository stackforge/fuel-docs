This directory contains reference pages for files that
Fuel uses to deploy an environment.

To add a page, copy the appropriate template file and
modify the content:

- docker-template:    template for files that are accessed
                      using dockerctl

- fuel-env-template:  template for files that are accessed
                      using fuel --env

Then add an include line for the file at the bottom of the
0000-intro.rst file.
