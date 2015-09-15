* Currently, if you make changes in an already created environment that can
  affect target images created by the image-based provisioning system
  (for example, changes in repositories list) after your environment resets,
  these changes may not be applied during a new deployment.

  To solve the problem, manually remove a target image on Fuel Master node
  after an environment resets and before you redeploy it:

  .. code-block:: bash

     ENV_ID=1 find /var/www/nailgun/targetimages/ -name "env_$ENV_ID_*" -delete

  where ``ENV_ID`` is the ID of an OpenStack environment.

  See `1485997 <https://bugs.launchpad.net/fuel/+bug/1485997>`_.
