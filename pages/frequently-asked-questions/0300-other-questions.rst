.. raw:: pdf

   PageBreak

Other Questions
===============

.. TODO(mihgen): Provide more clear and reflecting reality answer

1. **[Q]** Why did you decide to provide OpenStack packages through your own
   repository?

   **[A]** We are fully committed to providing our customers with working and
   stable bits and pieces in order to make successful OpenStack deployments.
   Please note that we do not distribute our own version of OpenStack; we rather
   provide a plain vanilla distribution. Put simply, there is no vendor lock-in
   with Fuel. For your convenience, we maintain repositories containing a
   history of OpenStack packages certified to work with our Puppet manifests.

   We also ship patched or upgraded versions of some upstream packages. This is
   necessary to incorporate fixes for known issues and performance improvements.
   Sometimes these updates add features that are needed by OpenStack.

   The advantage of this approach is that you can install any OpenStack version
   you want (with possible custom bug fixes). Even if you are running Essex,
   just use the Puppet manifests which reference OpenStack packages for Essex
   from our repository. With each new release we add new OpenStack packages to
   our repository and create a new branch with Puppet manifests (which, in
   turn, reference these packages) corresponding to each release. With EPEL
   this would not be possible, as that repository only keeps the latest version
   for OpenStack packages.


4. **[Q]** Is Neutron an active/standy HA? I got this understanding from the docs
   and I want to understand why. I was told that Grizzly and Havanna support multiple
   L3 agents but Mirantis OpenStack only supports a single L3 agent.

   **[A]** Neutron partly functions as a network router. If one of the L3 agents fail,
   it loses data about the VM instances for which it manages traffic. This has been
   worked around to some extent, but still operates with a single L3 agent.
