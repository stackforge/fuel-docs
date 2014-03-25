Switch configuration (Juniper EX4200)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Use the following configuration to deploy Mirantis OpenStack using
Juniper EX4200 network switch.

::

  system {
      host-name OpenStack_sw1;
      domain-name domain.ltd;
      authentication-order [ password ];
      root-authentication {
          encrypted-password "xxxxxxxxxxxxxxxxxxx";
      }
  }
  services {
          ssh;
      }
      ntp {
          server [ntp_server1] prefer;
          server [ntp_server2];
      }
  }
 
  interfaces {
      ge-0/0/0 {
          description Fuel Node eth0;
              unit 0 {
                  family ethernet-switching {
                         port-mode access;
                       vlan {
                          members vlan_103;
                           }
                  }
              }
      }
      ge-0/0/1 {
          description Fuel Node eth1 (optional to have direct access to Public
  net);
              unit 0 {
                  family ethernet-switching {
                         port-mode access;
                       vlan {
                          members vlan_100;
                           }
                  }
              }
      }
      ge-0/0/2 {
          description Compute Node 1 eth0;
          unit 0 {
              family ethernet-switching {
                     port-mode access;
                   vlan {
                      members vlan_103;
                       }
              }
          }
      }
      ge-0/0/3 {
          description Compute Node 1 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                   native-vlan-id vlan_100;
                  }
              }
       }
      ge-0/0/4 {
          description Compute Node 2 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode access;
                      vlan {
                          members vlan_103;
                           }
                   }
              }
      }
      ge-0/0/5 {
          description Compute Node 2 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_100;
                  }
              }
      }
      ge-0/0/6 {
          description Controller Node 1 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode access;
                      vlan {
                          members vlan_103;
                           }
                  }
              }
      }
      ge-0/0/7 {
          description controller Node 1 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_100;
                  }
              }
      }
      ge-0/0/8 {
          description Controller Node 2 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode access;
                      vlan {
                          members vlan_103;
                           }
                  }
              }
       }
      ge-0/0/9 {
          description Controller Node 2 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_100;
                  }
              }
      }
      ge-0/0/10 {
          description Controller Node 3 eth0;
                 unit 0 {
                  family ethernet-switching {
                  port-mode access;
                  vlan {
                      members vlan_103;
                           }
                  }
              }
      }
      ge-0/0/11 {
          description Controller Node 3 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_100;
                  }
              }
      }
      ge-0/0/12 {
          description Cinder Node 1 eth0;
              unit 0 {
                  family ethernet-switching {
                      port-mode access;
                      vlan {
                          members vlan_103;
                           }
                  }
              }
      }
      ge-0/0/13 {
          description Cinder Node 1 eth1;
              unit 0 {
                  family ethernet-switching {
                      port-mode trunk;
                      vlan {
                          members vlan_101, vlan_102;
                           }
                      native-vlan-id vlan_100;
                  }
              }
      }
      ge-0/0/23 {
          description Connection to default gateway;
          unit 0 {
              family ethernet-switching {
                     port-mode access;
                   vlan {
                      members vlan_100;
                       }
              }
          }
       }
       vlan {
          unit 100 {
              family inet {
                  address 172.16.1.254/24;
                  address 172.16.0.254/24;
              }
          }
       }
 
  }
  routing-options {
      static {
          route 0.0.0.0/0 next-hop 172.16.1.1;
      }
  }
  protocols {
      dcbx {
          interface all;
      }
      rstp {
          bridge-priority 32k;
          interface ge-0/0/0.0 {
          edge;
          }
          interface ge-0/0/1.0 {
          edge;
          }
          interface ge-0/0/2.0 {
          edge;
          }
          interface ge-0/0/4.0 {
          edge;
          }
          interface ge-0/0/6.0 {
          edge;
          }
          interface ge-0/0/8.0 {
          edge;
          }
          interface ge-0/0/10.0 {
          edge;
          }
          interface ge-0/0/12.0 {
          edge;
          }
          interface ge-0/0/23.0 {
          edge;
          }
          bpdu-block-on-edge;
      }
      lldp {
          interface all;
      }
  }
  vlans {
      vlan_1;
      vlan_100 {
          description Public;
          vlan-id 100;
          l3-interface vlan.100;
      }
      vlan_101 {
          description Management;
          vlan-id 101;
      }
      vlan_102 {
          description Storage;
          vlan-id 102;
      }
      vlan_103 {
          description Admin;
          vlan-id 103;
      }
  }
