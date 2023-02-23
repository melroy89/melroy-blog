---
title: "New server: Setup Linux (Part II)"
author: Melroy van den Berg
type: post
date: 2021-01-05T16:49:11+01:00
toc: true
url: /2021/new-server-setup-linux-part-2/
featured_image: /images/2021/01/ubuntu_logo.jpg
categories:
  - GNU/Linux OS
  - Hardware
  - Intermediate
  - Internet/SEO/Websites
  - Networking
  - Server
tags:
  - firmware
  - Linux
  - Linux Kernel
  - mailserver
  - network
  - new-server-series
  - Postfix
  - RAID
  - server
  - snap
  - sysctl
  - update
  - upgrade
---

Happy new year everyone! 😎 Let's install Ubuntu Server 20.04 as part of the blog series. And continue with setting-up the software part of the server. If you missed [Part I](/2020/new-server-buy-assemble-part-1/), read that first.</a>

<!--more-->

Since Ubuntu Server hasn't any desktop environment installed (which is good thing), the full setup will be done via terminal (in my case via SSH: `sudo apt install openssh-server`). Don't be afraid of the terminal! It's very powerful, but a person who is running Linux already knows that.

Let's get started now with the Linux setup, part II! See also table of contents on the right side.

**Important:** This blog article is part of a series of blog articles related to my new server.

## Clean-up software

I checked the Docker service during the Ubuntu Server installation, not knowing the installation is using **snap packages**. I removed docker **snap** package, removed snapd, cloudinit and DM multipathd. All unwanted in my case:

```sh
sudo snap remove docker
sudo apt purge snapd cloudinit multipath-tools
rm -vrf ~/snap
sudo rm -vrf /snap /var/snap /var/lib/snapd /var/cache/snapd /usr/lib/snapd
# Avoid accidentally snap installs in the future
sudo apt-mark hold snapd
```

## Docker & Docker Compose {#docker}

Before we can install `docker-ce` package _instead_ of snap, we will need to import the docker keyring:

```sh
sudo mkdir -m 0755 -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
```

Now, we can add the repository and install `docker-ce`:

```sh
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
# add the user to the pre-created docker group
sudo usermod -aG docker melroy
# Make the user part of the group, without rebooting
newgrp docker
```

_**Important note:** We use the docker compose plugin nowadays, which mean the CLI tool is called: `docker compose`, with a space between "docker" and "compose"._

Read more: [Docker Docs: Getting Started](https://docs.docker.com/get-started/) and [Docker Compose Docs](https://docs.docker.com/compose/gettingstarted/).

## Ubuntu News

I also disabled the whole Ubuntu "Message Of The Day" / news items, each time I logged-in. Just edit the `/etc/default/motd-news` file. Set `ENABLED=1` to `ENABLED=0`.

## Networking

I want to configure my server with a **static IP** address, like every server. In Ubuntu I'm using [netplan](https://netplan.io/) for that. Although I think the traditional interfaces file worked just fine, but it's Ubuntu.. so..

Adapting the `/etc/netplan/01-netcfg.yaml` should work, I changed it to (`enp45s0` is the name of my network device under Linux):

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp45s0:
      dhcp4: no
      link-local: []
      addresses: [192.168.1.42/24]
      nameservers:
        addresses: [1.1.1.1, 208.67.222.222]
      routes:
        - to: default
          via: 192.168.1.1
```

_**Updated:** Updated using the new `routes` with `to: default` key._

There is at least one benefit of netplan, which is; you can try-out your new configuration and automatically rolls it back in after 120 seconds executing: `sudo netplan try`. Optionally add the `--timeout 60` flag if you want to decrease the value to 60 instead of 120 seconds.

To actually make the changes **persistent** execute:

```sh
sudo netplan apply
```

Validate your changes via: `ip addr`

## Auto updates

Install **important updates automatically**, via (and select "Yes"):

```sh
sudo dpkg-reconfigure -plow unattended-upgrades
```

![unattended-upgrades package reconfigure](/images/2021/01/image-1.png)

## Updating Kernel

Install [kernel v5.8 package](https://packages.ubuntu.com/search?keywords=linux-generic-hwe-20.04-edge) on Ubuntu 20.04:

```sh
sudo apt install linux-generic-hwe-20.04-edge
sudo reboot

uname -sr
Linux 5.8.0-33-generic
```

**Important:** To avoid the [regression issues](https://www.phoronix.com/scan.php?page=article&item=linux511-amd-schedutil&num=1) with the **schedutil** setting on AMD CPUs with newer Linux kernels, be sure to set your frequency scaling to **ondemand** for the best performance. If that was not already the case. See your current scaling setting via: `cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor`

_**Update:** Issue with the default schedutil [seems fixed in kernel 5.11 or higher](https://www.phoronix.com/review/amd-linux511-perfgov)._

## Kernel parameters & Speedtest

I will adapt the Linux **Kernel parameters** via the `/etc/sysctl.conf` file. Especially relevant for machines with a lot of memory and with a 10Gbit/s network card:

```ini
# Disable IPv6
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1

# This control is used to define how aggressive the kernel will swap memory pages.
# We will lower the number to decrease the amount of swap.
vm.swappiness = 10

# This percentage value controls the tendency of the kernel to reclaim the memory which is used for caching of directory and inode objects.
vm.vfs_cache_pressure = 50

# Network tuning
# This value influences the timeout of a locally closed TCP connection.
net.ipv4.tcp_orphan_retries = 1

# The length of time an orphaned (no longer referenced by any application) connection will remain
net.ipv4.tcp_fin_timeout = 20

# Enable memory auto tuning
net.ipv4.tcp_moderate_rcvbuf = 1

# Contains three values that represent the minimum, default and maximum size of the TCP socket receive buffer.
# Increase default and max. values for both read & write buffers for 10 Gigabit adapters.
net.ipv4.tcp_rmem = 4096 25165824 25165824
net.ipv4.tcp_wmem = 4096 65536 25165824

# Minimal size of receive buffer used by UDP sockets in moderation.
net.ipv4.udp_rmem_min = 8192

# Minimal size of send buffer used by UDP sockets in moderation.
net.ipv4.udp_wmem_min = 8192

# Maximum ancillary buffer size allowed per socket.
net.core.optmem_max = 25165824

# recommended default congestion control is htcp
net.ipv4.tcp_congestion_control = htcp

# The default queuing discipline to use for network devices.
net.core.default_qdisc = fq

# The maximum number of packets queued in received state
net.core.netdev_max_backlog = 30000

# Timeout closing of TCP connections after 7 seconds.
net.ipv4.tcp_fin_timeout = 7

# Avoid falling back to slow start after a connection goes idle.
net.ipv4.tcp_slow_start_after_idle = 0

# Enable Forward Acknowledgment, which operates with Selective Acknowledgment (SACK) to reduce congestion.
net.ipv4.tcp_fack = 1

# Support windows larger than 64KB.
net.ipv4.tcp_window_scaling = 1

# Prevent against common 'SYN flood attack'
net.ipv4.tcp_syncookies = 1

# Number of times SYNACKs for a passive TCP connection attempt will be retransmitted.
net.ipv4.tcp_synack_retries = 2

# Maximal number of remembered connection requests, which have not received an acknowledgment from connecting client.
net.ipv4.tcp_max_syn_backlog = 4096
```

![Network monitoring via bmon](/images/2021/01/speedtest.gif "Network monitoring via bmon")

Download `speedtest-cli` to validate the kernel settings made earlier:

```sh
wget -O speedtest-cli https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py
chmod +x speedtest-cli
```

Running a **speedtest** (select the same server in order to better compare the results):

```sh
./speedtest-cli --server 13883
```

## Redundant Array of Independent Disks (RAID)

### RAID Introduction

We will use software RAID using Multiple Device driver also known as "md". Which has a powerful command line application: `mdadm` (run as root).

There are [many RAID levels](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) from which you can choose from. Starting with no redundancy RAID-0, to a simple mirroring setup, called RAID-1, to more advanced RAID-3, RAID-4, RAID-5 and more.

![RAID 1](/images/2021/01/RAID1.jpeg "RAID 1")

**Important:** RAID is never a back-up (also not RAID-1), but only redundancy on the same machine. **Always make remote backups as well!** If something corrupted your data by a software virus of a software bug, you will need a restorable back-up.

### Prepare RAID devices

With my RAID-1 (= mirroring), I want to **create a new partition** on each NVMe (later known as "p1" as suffix of the device name).

Let's start creating the partition:

```shell
# Maybe in your case (example): sudo fdisk /dev/sdb
sudo fdisk /dev/nvme1n1

# Now you are in a new terminal, let's continue:
type: g (will create a new GPT partition table)
type: n (for new partition)
type: 1 (as partition number 1)
type: t (change the partition type)
type: df ('fd' is a hex value, meaning it will create a "Linux raid autodetect" partition)
type: p (just lists the partition table so far, are you happy with the changes?)
type: w (will write the changes to disk! All previous data is now lost)
```

That's it, do the same for the other disks which you want to put in the same RAID. Finally, we get an **overview** of your disks including all the partitions:

```sh
sudo fdisk -l
```

### Create RAID Arrays

I will create a **new software RAID 1 (=mirroring) array**, using `mdadm`:

```sh
sudo mdadm --create /dev/md0 --level=mirror --raid-devices=2 --name=Data /dev/nvme1n1p1 /dev/nvme2n1p1
```

**Did you know?**

> The "crazy" device names used during `mdadm --create` are because I'm using NVMe's drives.
> Traditionally, these would be the your SATA drives (eg. `/dev/sda`).

After which you can print some detailed information, if you want to:

```sh
sudo mdadm -D /dev/md0
```

**Did you know?**

> Instead of creating RAID partitions, you can create a RAID array from the raw devices.
> Which I did for my RAID 0 array (=striped volume), like so:
> `sudo mdadm --create /dev/md1 --level=0 --raid-devices=2 --name=Data_extra /dev/sda /dev/sdb`

After you created a software RAID, we need to format the array, let's use **ext4** as file system:

```sh
sudo mkfs.ext4 /dev/md0
```

What if you already have an existing RAID, but you forgot or want to add a name later? Well, just rename an existing array is possible as well:

```sh
sudo mdadm --remove /dev/md0
sudo mdadm --assemble /dev/md0 /dev/nvme1n1p1 /dev/nvme2n1p1 --name=Data --update=name
```

_Note:_ `--update=name` says you want to update the name in the super-block, the `--name` parameter will be the actual name given to this software raid ("Data" in this case), eventually accessible via `/dev/md/Data`.

After rename, don't forget to update the mdadm configuration file, first run: `sudo mdadm --detail --scan`

The content displayed on the screen should be placed/updated in: `/etc/mdadm/mdadm.conf`

After which you should run: `sudo update-initramfs -u && sudo reboot`

After the reboot your devices are most likely /dev/md126 or /dev/md127, since named devices are assigned to a higher number, to keep space of devices without names.

To see your RAID status, execute: `cat /proc/mdstat`

**Note:** If you suffer from any RAID **re-sync issues** / pending, try to mount the array again with read&write permissions, which should (re)start the sync process: `sudo mdadm --readwrite /dev/md127`

### Using RAID names

It's **_not_** advised to use the device number directly (eg. `/dev/md`1), _instead_ you either use the device UUID, see: `ls -lha /dev/disk/by-uuid`. But I will use the device names, as defined earlier for the md devices.

Let's change the `/etc/fstab` to mount the RAID devices during boot:

```sh
/dev/md/Data /media/Data ext4 defaults 0 0
/dev/md/Data_extra /media/Data_extra ext4 defaults,noatime 0 0
```

To be complete, here is the latest state of the mdstat output (`UU` means two drives and are both "up"):

```sh
cat /proc/mdstat

md126 : active raid0 sda[0] sdb[1]
1953260544 blocks super 1.2 512k chunks

md127 : active raid1 nvme1n1p1[0] nvme2n1p1[1]
976629440 blocks super 1.2 [2/2] [UU]
bitmap: 0/8 pages [0KB], 65536KB chunk
```

## E-mail

![E-mail](/images/2021/01/email.png)

Of course you want to get e-mail notifications and be able to send mails via the server. For that we will use [Postfix](<https://en.wikipedia.org/wiki/Postfix_(software)>): `sudo apt install postfix`

Adapting the configure file `/etc/postfix/main.cf` to use **Gmail** as relay host:

```ini
smtp_tls_CApath=/etc/ssl/certs

# Gmail settings
relayhost = [smtp.gmail.com]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl/sasl_passwd
smtp_sasl_security_options = noanonymous
smtp_tls_security_level = encrypt
smtp_tls_mandatory_ciphers = high
```

The `sasl_passwd` file looks like:

```ini
[smtp.gmail.com]:587 yourname@gmail.com:secret_password
```

The secret password is most likely not your main password, but instead create an [Google App password](https://myaccount.google.com/apppasswords). Of course, this is just an example of how to setup postfix with Gmail, you may need to change the settings to your needs.

In order to generate an encrypted db file for postfix, execute the following command where the sasl_passwd file is located:

```sh
sudo postmap sasl_passwd
sudo systemctl restart postfix
sudo systemctl enable postfix

# Don't forget to test your setup
echo "Test message." | mail -s Test your_mail@domain.com
```

## Final Thoughts

Now we have the basics arranged on the server. Like installed a newer kernel, enabled auto-updates, configure network & e-mail service, completed the RAID setup and Docker installation.

We can continue with installing _additional_ packages and configuring the services on the server we actually want to run! That will be followed-up in part III of this blog series. **Will be continued!**

**Update:** [Part III is out now](/2021/new-server-install-config-services-part-3/)!
