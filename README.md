
Mirantis OpenStack Documentation
=================================

This repository contains the Mirantis OpenStack user and administrator 
guides. For more details, see the [Mirantis OpenStack 
portal](http://software.mirantis.com "Mirantis OpenStack portal").

Contributing
============

We welcome all people who are interested in helping our Documentation team 
to improve our documentation. There are no formal membership requirements, 
so feel free to hop in. The best way to contibute is to fork our repository, 
do your changes and send us a Pull Request. You are invited to contribute 
any type of contribution like new ideas, testing, and even deployment scripts.

We also have an IRC channel at ``#fuel`` & ``#fuel-dev``  on ``irc.freenode.net`` 
where you can ask questions and give feedback. 

Prerequisites
=============

[Sphinx Documentation Generator](http://sphinx-doc.org/ "Sphinx 
Documentation Generator") must be installed to build the documentation. 
Please note that easy_install is a component of Python's Setup Tools 
package, which is commonly an optional install on most distributions.


To get started, you need to install all necesasary tools:
    
    sudo apt-get install git python-pip python-dev make imagemagick libjpeg-dev

And Sphinx necessary extensions:

    sudo pip install -r requirements.txt

In addition to these eggs you will need to install 
[PlantUML](http://plantuml.sourceforge.net/ "PlantUML"), 
[ImageMagick](http://www.imagemagick.org/ "ImageMagick"), and
[Inkscape](http://inkscape.org/ "Inkscape").

To install PlantUML you run this wget process:

    sudo wget \
    http://sourceforge.net/projects/plantuml/files/plantuml.jar/download \
    -O /sbin/plantuml.jar

PlantumUML requires java:
    sudo apt-get install openjdk-7-jre

We use [Inkscape](http://inkscape.org/ "Inkscape") to edit SVG images
and convert them to PDF but you may use any other SVG-capable tool you
like. We're not picky.

Building
========

To build a guide in HTML format, go to its directory and then run the 
``make`` command in that directory, like so:

    make html

To generate the PDF file run this:

    make pdf

You will find generated HTML documentation at:

    _build/html
    
You will find generated PDF documentation at:

	_build/pdf


To generate the Release Rotes PDF file run this:

    make rnpdf

You will find generated Release Notes PDF at:

    _build/pdf
