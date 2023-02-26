---
title: Get the most out of your network
author: Melroy van den Berg
type: post
date: 2018-10-30T15:04:23+01:00
url: /2018/get-the-most-out-of-your-network/
featured_image: /images/2018/10/speed-test-header.jpg
images:
  - /images/2018/10/speed-test-header.jpg
categories:
  - GNU/Linux OS
  - Hardware
  - Intermediate
  - Internet/SEO/Websites
  - Networking
tags:
  - 10GBe
  - 1GBASE-T
  - benchmark
  - CAT6
  - CAT6A
  - ethernet
  - ethtool
  - gigabit
  - ip
  - iperf3
  - ipv4
  - lan
  - LSA
  - network
  - nfs
  - nfsstat
  - route
  - router
  - samba
  - speed
  - switch
---

Lately I moved to my new home. My idea was to setup a good stable and **high performance LAN network** within my home. This project sounds pretty easy at first, but it was harder than I initially suspected it to be.

In this article I talk about my goals for this project. The list of materials to get you started and creating your own network. I will talk about some useful unix tools for network analysis. How-to setup your own NFS (Network File System) server. Last but not least, I will give some Linux network tweaking advise and share my future plans.

<!--more-->

[toc]

## Goals

The first goal is to create _at least_ a 1 gigabit Ethernet local area network (LAN). My second goal is to create a future proof installation, by using CAT6 cables (cat=category) which could support 10Gbit/s (10GBASE-T) speeds.

My final goal, create a 10Gbit/s connection between my own server and the switch using CAT6**A**. The **A** stands for augmented (improved), doubles data transmission bandwidth, from 250 to 500 MHz; decreases the chance of crosstalk interference; and provides superior reliability and transmission speeds through greater lengths of cable.

## Reality & feasibility study

> _Let's get started!_

The first logical step to start with is buying the stuff I need.

### Bill of materials

This is is the list you need to get started (future proof):

![](/images/2018/10/cat6-mini-desktop-patch-panel-8-poorts-wit.jpg "8 port Patch panel")

- CAT6 **Patch panel**, 8 ports (sure 12 ports is also available if you like);
- Two **CAT6 U/UTP cables** (about 6,2mm in diameter each, more is too much). The length you need is up to you. Or buy one long cable and cut it in halve. _Important:_ Please use a **copper (CU) solid** core! CU: Cupper is better than CCA: Copper Clad Aluminum. And the solid core you need because you need to patch the cables by yourself;
- 1 **gigabit Ethernet switch**. Like the [Netgear Nighthawk S8000](https://www.netgear.com/landings/s8000/default.aspx) which as QoS (Quality of Service) feature, or I prefer the [Neargear ProSafe GS108](http://www.netgear.nl/business/products/switches/unmanaged/GS108.aspx). Or if you want PoE (Power over Ethernet): Netgear ProSAFE GS108PE.  
  Yes, I know&#8230; CAT6 could do 10Gbit/s with an unshielded cable if you do not exceed 55 meters. However, 10 Gigabit network switch is currently _very expensive_ and require some heavy cooling (=noise) for some reason. I will wait until this becomes easier available and mainly cheaper;
- **LSA Punch Down Tool**; for patching the cables in the patch panel as well as the wall-outlet;
- **Network cable tester**; for testing the cable connections;
- One **CAT6 wall-outlet ethernet socket** - built-in version with 2x RJ45 connector. Depending on your house, you either need a horizontal cable intake or vertical cable intake. See figure below for an vertical cable management.

![](/images/2018/10/inbouwdoos-cat6-2x-rj45-ral9003-verticale-invoer.jpg "Built-in wall outlet CAT6 ethernet - 2x RJ45")

Let's say by now you received everything you ordered, so let's continue.

### Build our network

I use the place with the fuse box ("meterkast") in my house, the area where I also get my landline for my Internet as the place to install the patch panel as well as my gigabit switch.

Long story short; below my network design at home:

![](/images/2018/10/my_lan_network.svg "_Note:_ this design is created using open-source app [yEd](https://www.yworks.com/products/yed) together with my [Cisco icon set](https://github.com/danger89/yEd_cisco_icons)")

Between the gigabit switch and the computers I use the patch panel. Meaning the CAT6 cables that go through the house are connected from the Ethernet wall-outlet to the patch panel.

When patching your cables yourself, you need to use the **T-568B standard** (on both ends) for Straight Through UTP cable. Which is normally the case when you are connecting computers with switches. See image below, idea is the same for attaching to a patch panel instead of a RJ45 connector.

![](/images/2018/10/Straight-Through-Cable.png "Straight Through UTP Cable")

For the server I use a CAT6A cable, one end of the cable I attached a RJ45 shielded connector (CAT6A connector) and the other end is attached to the patch panel. From the patch panel to the switch I use regular UTP cables with RJ45 connectors.

Finally the cable tester is very useful to verify if you didn't made any mistake during patching the cables or wall-outlets.

### Initial testing

Once I installed everything correctly, and both systems report that they have 1000Mbit/s (1Gbps) connection. I though this is easy now! Just copy some files via the network and I'm done. 😁

![](/images/2018/10/slow_speed.png)

Wrong! As a test I copied a 5GB file across the network via Samba, a free re-implementation of the **SMB (Server Message Block)** protocol.

I got pretty poor speed test results. It was just around 60MB/s (_note:_ the capital B, 60MB/s = 480 Mbps). These results were really strange I expected near to 1000Mbps speeds, what could be the bottleneck of my low transfer speed?

Could it be:

- **Q:** the cable itself? Maybe incorrectly wired?  
  **A:** Not fully sure, but the Network tester says everything was connected correctly. I also used a cross-cable between the computers, so this was not the issue.
- **Q:** Linux? The kernel or drivers?  
  **A:** Well no, I used a tool called iperf3 (see below for more info), which gives me around 945Mbps (which is good! Almost 1Gbps, this is expected).
- **Q:** Ethernet Switch?  
  **A:** No, if iperf3 gives almost 1Gbps, the switch should handle it.
- **Q:** My network card?  
  **A:** No, if iperf3 can handle it, my network card is sort of safe. Well you never know of course, since a lot of small packages or different protocols could always impact the network in some way.
- **Q:** Disk I/O?  
  **A:** This could be the issue, since iperf3 does the test from memory to memory by default! However, both systems using a solid state disk (SSD), which read and write speeds over 200MB/s = 1.6 Gbps (also random read/write). You can benchmark your disks.  
  **Solution:** Recently I discovered you can _also_ benchmark disk speeds via iperf3.
- **Q:** Protocol? Samba?  
  **A:** Yes, there are a lot of complains on the net about the default Samba implementation within Nautilus/Linux, I also tried to use cifs mounts without much luck either. Used Samba because this was default option for sharing folders in Linux Mint.  
  **Solution:** I'm using the NFS  (Network File System) protocol. Which is fine for a local network, especially since I only have Linux computers within my network.

_Hint:_ If you know everything about the unix tools below, you can skip the "Network software tools" part, and directly go to NFS setup and/or Network tweaking sections below.

## Network Software Tools

### Iperf3 memory to memory

`iperf3` is the main tool I used, a **throughput test** (speed test), which needs a server and client.

Starting a **server** is very easy: `iperf3 -s`  
Start the **client** is easy as long as you know the IP address or hostname of the server: `iperf3 -c hostname`

![](/images/2018/10/image_2018-10-25_23-09-44.png "Iperf3 on client side")

By default iperf in client mode sending the data to the server. Therefore looking at the output of the client, we can see:

- `sender` - is iperf client, Upload speed from iperf client to iperf server is measured
- `receiver` - is iperf server, Download speed on iperf server from iperf client is measured

From server output:

- `sender` - is iperf client, Upload speed from iperf client to iperf server is measured
- `receiver` - is iperf server, Download speed on iperf server from iperf client is measured

You could use the optional `-R` parameter at the client side for a reverse test (client will receive and server will send in that case). When you are using CAT5e and CAT6 cables and gigabit switch, I would expect to see results around the 940Mbps (nearly 1Gbps), this indicates a perfectly fine Gigabit network setup.

### Iperf3 disk to disk

Recently, I discovered you can also do a **disk to disk test** (by using a file from disk). Since iperf3 is using memory to memory by default between the two computers. So next would be a read disk test to memory. `-F` at client-side: read from the file and write to the network, instead of using random data.  
Server: `iperf3 -s` Client: `iperf3 -c hostname -F /storage/data/filename`

Now a write disk test (memory to disk). Note that for disk write tests, you need to run a longer test to factor out network buffering issues. Meaning we run it for 40 seconds. `-F` at server-side: read from the network and write to the file, instead of throwing the data away.  
Server: `iperf3 -s -F /storage/data/test.out` Client: `iperf3 -c hostname -t 40`

And as always; the lowest performing test is your bottleneck. In my case the write disk test (memory to disk) is the slowest with only 70Mbps see below :|. So there is also definitely a bottleneck I need to look further into it.

![](/images/2018/10/bad_disk_write.png 380w "Lowest benchmark so far (=write disk test via iperf3) - server side output")

You can always clean the cache between re-runs. Run as root:

```sh
sync; echo 3 > /proc/sys/vm/drop_caches
```

### Netperf

`netperf` is an ideal tool to measure the different aspects of the network's performance. Data transfer using either TCP or UDP. Also requires client and server.

Start **server** of netperf on a free port (disable firewall is recommended): `netserver -p 16604`  
Run the **client**: `netperf -H 192.168.1.100 -p 16604 -l 100`

![](/images/2018/10/image_2018-10-25_23-18-03.png "Netperf on the client side")

### Ping

Aah, the old-school ping pong. Sure the ping command can be **very useful** for testing if you have any packet loss: `ping <ip_address>`

See `man ping` for more options.

### Ethtool

First install it, if you didn't have it already (`pacman -S ethtool` or `apt install ethtool`).

Ethtool can be useful to see the speed connection of your Ethernet device and other useful statistic information. For some general network device info use (eg. for eth0): `ethtool eth0`

Then display the statistics output via: `ethtool -S eth0`

```sh
tx_packets:           Trasmitted packets
rx_packets:           Received packets
tx_errors:            Transmission errors
rx_errors:            Received errors
rx_missed:            Received misses
align_errors:         Received alignment errors
tx_single_collisions: Trasmitted singular collisions
tx_multi_collisions:  Trasmitted multiple collisions
unicast:              Received unicast
broadcast:            Received broadcast
multicast:            Received multicast
tx_aborted:           Aborted transmission
tx_underrun:          Aborted underruns
```

If possible, to see current settings and the maximum ring buffers allowed, before a frame will be dropped of your network card via (more on this later down below in this article!): `ethtool -g enp6s0`

Get the driver info for network card (first line is the Linux driver, second line the driver version): `ethtool -i eth0`

### IP

The last tool I will talk about; the `ip` command. This command replaces a lot of legacy commands (including but not limited to `netstat`, `iptunnel`, `arp`, `route`, `ifconfig`, ..), meaning this is a **very powerful** command!

Get your IP / broadcast addresses / MTU value of your network devices: `ip addr`

To see statistics of all your network device, try: `ip -s link`  
Very helpful to see errors, dropped packages or overruns.

See route entries in kernel: `ip route`

## NFS Setup

![](/images/2018/10/estimation.png "Windows Transfer Dialog (joke)")

NFS stands for **Network File Transfer.** I will use NFS instead of Samba, since Samba gave poor results.

NFS is an open-source distributed file transfer protocol, widely used within the unix environment.

### NFS Server side

Start with installing the required packages, for Debian/Ubuntu/Linux Mint this will be: `sudo install nfs-kernel-server portmap`

For Arch in my case: `sudo pacman -S nfs-utils`

Creating the so called NFS root (`/srv/nfs/public`) and the target mount point (`/mnt/public`), due to security reasons:

```sh
mkdir -p /srv/nfs/public /mnt/public
mount --bind /mnt/public /srv/nfs/public
```

I will setup this NFS server with the nobody user (so everybody can read/write: public folder via the `all_squash` option). Edit the `/etc/exports` file, add:

```sh
/srv/nfs/public *(rw,subtree_check,all_squash,insecure)
```

Export the new NFS folder: `sudo exportfs -rav`  
View the NFS exported folders: `sudo exportfs -v`

Mount NFS /mnt/public across reboots, edit your `/etc/fstab`and add:

```sh
/mnt/public /srv/nfs/public none bind 0 0
# Optionally, mount locally my own NFS server (on the same computer as my NFS server)
localhost:/srv/nfs/public /mnt/localhost_public nfs noauto,user,x-systemd.automount,x-systemd.device-timeout=10,timeo=14 0
```

On this second line you would see I also mount my own public folder locally (so also create this folder: `mkdir -p /mnt/localhost_public)` on the same computer as where the server runs. I do this because I want to have the same privileges and rights (nobody.nobody). If somebody else have a better proposal; let me know! 🙂

This still leads to write access issue of the nobody user. The solution is **NFSv4 idmapping**, which translate UID (user ID) /  GID (group ID) to string and visa versa. To enable idmapping edit the `/etc/modprobe.d/nfsd.conf` file, and add: `options nfsd nfs4_disable_idmapping=0`

Now, you can mount the localhost_public folder without rebooting: `sudo mount -a`

### NFS Client side

On the client computer(s), it's as easy as creating a folder where to mount it (example): `sudo mkdir -p /mnt/melroy_pc`

(Optionally) I'm using a hostname, if this is not resolved internally on your LAN, you can add the IP address manually to the client's `/etc/hosts` file (example IP): `192.168.1.104 melroy-pc`

And finally add the following line to `/etc/fstab` file on the client:

```sh
melroy-pc:/public /mnt/melroy_pc nfs noauto,user,x-systemd.automount,x-systemd.device-timeout=10,timeo=14,x-systemd.idle-timeout=1min 0 0
```

And once more, mount without reboot: `sudo mount -a`  
Get [more details](http://www.troubleshooters.com/linux/nfs.htm#_Mounting_an_NFS_Share_on_a_Client) of the available NFS mount options.

_Hint:_ A command-line tool that could be useful to debug either server and/or client is: `nfsstat`. See manpage for more info.

## Network tweaking - Linux

Before proceeding to tune your system, you must know that every system differs, whether it is in terms of the CPU, memory, architecture or other hardware configuration.

Add the following content to a new file in: `/etc/sysctl.d/99-sysctl.conf`:

```ini
# Increase size of file handles and inode cache (max number of files open)
fs.file-max = 2097152

# Discourage Linux from swapping idle processes to disk (default = 60)
vm.swappiness = 10

# tells the kernel how many TCP sockets that are not attached to any
# user file handle to maintain. In case this number is exceeded,
# orphaned connections are immediately reset and a warning is printed.
net.ipv4.tcp_max_orphans = 60000

# Increase number of incoming connections backlog queue
# Sets the maximum number of packets, queued on the INPUT
# side, when the interface receives packets faster than
# kernel can process them.
net.core.netdev_max_backlog = 65536

## Software interrupts ##
# SoftIRQ timeout: If the software interrupt doesn’t process packets for a long time,
# it may cause the NIC buffer to overflow and, hence, can cause packet loss.
net.core.netdev_budget = 50000
# high softirq
net.core.netdev_budget_usecs = 5000

## Kernel autotuning TCP buffer limits ##
# Set max to 16MB for 1GE and 32M (33554432) or 54M (56623104) for 10GE
# Don't set tcp_mem itself! Let the kernel scale it based on RAM.

# Default Socket write/ Send buffer
net.core.wmem_default = 262144

# Maximum Socket write/ Send buffer
net.core.wmem_max = 16777216

# Default Socket read/ Receive buffer
net.core.rmem_default = 262144

# Maximum Socket read/ Receive buffer
net.core.rmem_max = 16777216

# Increase the maximum amount of option memory buffers
net.core.optmem_max = 40960

# Disable TCP slow start on idle connections
net.ipv4.tcp_slow_start_after_idle = 0

# Increase the write-buffer-space allocatable
net.ipv4.tcp_wmem = 4096 87380 16777216
net.ipv4.udp_wmem_min = 8192

# Increase the read-buffer-space allocatable
net.ipv4.tcp_rmem = 4096 65536 16777216
net.ipv4.udp_rmem_min = 8192
```

Moreover, after looking at the ring buffers (`ethtool -g <device>`). I noticed I could increase the hardware ring buffer of my card/NIC, so when the network is getting overloaded it will use the ring buffer to buffer the data for a while. So I ran: `ethtool -g enp6s0`. Which gave me (look at `TX` field):

```sh
Ring parameters for enp6s0:
Pre-set maximums:
RX: 168
RX Mini: 0
RX Jumbo: 0
TX: 1024
Current hardware settings:
RX: 168
RX Mini: 0
RX Jumbo: 0
TX: 63
```

It's possible to increase the TX and/or RX buffer via (and `rx-mini` and `rx-jumbo` if applicable): `sudo ethtool -G <device> rx <new_value> tx <new_value>`

So in my case, I increased TX via: `sudo ethtool -G enp6s0 tx 1024`

However, to make these settings persistent between reboots you can add it to the `/etc/rc.local` file, however I'm running Arch with systemd. Meaning this can be solved via a service file: `/etc/systemd/system/increase_tx@.service`.

With the following content:

```ini
[Unit]
Description=Increase TX for %i
Requires=network.target
After=network.target

[Service]
ExecStart=/usr/bin/ethtool -G %i tx 1024
Type=oneshot

[Install]
WantedBy=multi-user.target
```

Enable service: `sudo systemctl enable increase_tx@enp6s0.service`

## Future

To finish this story. My house is partly ready for 10Gb/s, but this is still very expensive. Ethernet cards (PCI cards) are already available for a lot of money if you ask me (starts at € 100). I mean a gigabit ethernet card is sold as low as €10:

![](/images/2018/10/007445_moscojk5yq6hydwv_setting_fff_1_90_end_3000.jpg "Asus XG-C100C - 10Gbit Ethernet PCI card")

However, 10Gb Ethernet switches are still **very expensive** (€ 300 and easily more). Maybe we could go to 2.5 GB/s or 5Gb/s as an intermediate step for _consumers_.

## Conclusion

As you could read, it was definitely not an easy task to get reliable and fast Ethernet within your LAN. Consider to get familiar with the **ton of every useful command line tools** which are available under Unix for debug purposes.

Although CAT6 and CAT6A Ethernet cable are widely available and definitely affordable as well, the world is unfortunately not yet ready for a 10GBe local area network **within** a reasonable **price range**. This is mainly due the limited amount of 10Gbit network cards / **supported motherboards** as well as the _very highly priced_ 10Gbit network **switches**.

Besides 10Gbit/s networks, within this article you could already read how **difficult** it could be to get some stable and decent 1Gb/s network transfer speeds between computers on the same local area network (LAN).

I hope this guide will help you to setup your own gigabit or 10 gigabit (local) network yourself and make it usable at the same time.
