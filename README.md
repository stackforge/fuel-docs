
Mirantis OpenStack Documentation
=================================

This repository contains the following Mirantis OpenStack documentation:

* Planning Guide
* User Guide
* Operations Guide
* Running Mirantis OpenStack on Virtualbox
* Reference Architectures
* Terminology Reference
* Release Notes

For more details, see the [Mirantis OpenStack
portal](https://www.mirantis.com/openstack-documentation "Mirantis OpenStack portal").

Contributing
============

We welcome all people who are interested in helping our
[Documentation Team](https://launchpad.net/~fuel-docs "Documentation team").
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


To get started, you need to install all necesasary tools.

On Debian/Ubuntu:
    
    sudo apt-get install git python-pip python-dev make imagemagick libjpeg-dev inkscape

On Fedora:

	sudo yum install git python-pip python-devel make ImageMagick libjpeg-turbo-devel inkscape

Among other things that installs
[ImageMagick](http://www.imagemagick.org/ "ImageMagick") and
[Inkscape](http://inkscape.org/ "Inkscape").

And Sphinx necessary extensions:

    sudo pip install -r requirements.txt

In addition to these eggs you will need to install 
[PlantUML](http://plantuml.sourceforge.net/ "PlantUML")

To install PlantUML run this wget process:

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

Reviewer's Checklist
====================

Checks for commit message:

1. The goal and extent of the change should be described in the commit
   message.

2. If the commit is related to a LaunchPad bug, it should have
   "Closes-Bug: nnnnnnn" line in the commit message. Likewise,
   "blueprint name-of-the-blueprint" for a commit related to a
   blueprint. Most non-trivial commits should have such references.

For more information on nice examples of commit messages, see
[GIT Commit Good Practice](https://wiki.openstack.org/wiki/GitCommitMessages "GIT Commit Good Practice").

Checks for content changes:

1. For every block of content that is removed, there should be either a
   block that replaces it, or an explanation in the commit message why
   that block is no longer needed.

2. Confirm that the new content is approved by a technical expert in the
   relevant area.

3. Check that the content is in the right document and the right
   context. Deployment of Fuel itself is described in the Installation
   Guide; deployment of Mirantis OpenStack using Fuel, in User Guide;
   post-deployment operation of Mirantis OpenStack, in Operations Guide;
   and so on.

Checks for structural changes:

1. For any removed file (including original path in a move or rename),
   grep for the file name through all rst files and confirm that no
   stale references to the file are left behind.

2. For any added file (including new path in a move or rename), confirm
   that the new path is referenced in a way that will get it included in
   at least one document.

Testing the change locally:

1. Download the branch:
   git review -d <gerrit-id>

2. Check that it's based on the current tip of the master branch, look
   for "origin/master" next to commit hash in the output of:
   git log --graph --decorate

3. If it's not, check if it can be rebased onto master cleanly:
   git rebase --onto master HEAD^

4. Build HTML and PDF versions as described above. If rebase was
   necessary, build from the rebased version: you want to see what the
   result of the merge into master will look like.

5. Check that the count of warnings reported by 'make html' hasn't
   increased relative to master. Warning messages usually contain
   a line number where error was found.

6. Check that all sections touched by the change show up in the table of
   contents in the right place and at the right nesting level.

Finally, go through all changes line by line and ask yourself: what is
the purpose of this change? Is that related to the description of the
review given in the commit message? Could it be accidental or result of
a merge error during rebase?


