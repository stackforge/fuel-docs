* The OSTF test "Create user and authenticate with it to Horizon"
  could fail trying to authenticate to HTTPS Horizon. The issue is
  fixed by temporarily disabling the last step (10) from the test when
  using SSL for Horizon. See `LP1486056`_.
  
.. Links
.. _`1486056`: https://bugs.launchpad.net/fuel/7.0.x/+bug/1486056