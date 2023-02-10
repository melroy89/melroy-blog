---
title: "New Server: Buy & Assemble (Part I)"
author: Melroy van den Berg
type: post
date: 2020-12-20T00:20:26+00:00
toc: true
modal: true
url: /2020/new-server-buy-assemble-part-1/
featured_image: /images/2020/12/cooler.jpeg
categories:
  - Beginner
  - GNU/Linux OS
  - Intermediate
  - Internet/SEO/Websites
  - Server
tags:
  - AMD
  - firmware
  - new-server-series
  - NVMe
  - Ryzen
  - server
  - SSD
  - update
  - upgrade
---

My [current server](https://server.melroy.org/) is 15 years old, and time for an upgrade! Finally! After all, adding additional memory is not good enough and we hitting the limits of the old hardware. We will replace the whole server from the ground-up.

<!--more-->

Although during covid-19 pandemic it's not the best moment to assemble a new computer, due to the limited stock availability. Luckily, I don't need a GPU in this server, I won't advice others to buy a PC at this moment. Not only the GPUs (both AMD & Nvidia) but also the latest Ryzen 5000 series CPUs are hard to get and overpriced. Even second hand (I call them crapper's; reselling the product for more by taking profit themselves), don't do that.

Anyway, I digress. Let's continue with my journal to buy, assemble, configure and setup the whole new server.

**Important:** **This article is part of a series** of the new server "Buy & Assemble", "Install & Setup" and "Advanced Configuration" items and maybe more.

## Hardware Specs

I want to use my server for running several services, including but not limited to: Nextcloud, GitLab, Matrix Synapse, TeamSpeak, Tor Relay node, Gitea, Influx + Granfana and web hosting (Nginx, MySQL, Postgres, Redis, memcached). Plus I run many docker containers and the server needs to be 'future ready'. Notice that I don't use the word "future proof", since that is not possible with all the changes in the IT world.

**Bottom-line:** I will buy the high-end desktop hardware and use it as my server. At the same time, also looking at the _electricity_ _energy_ usage (kWh). Especially for components like the CPU (I won't use a GPU, so forget about that).

The hardware component list of my server:

- **Processor:** AMD Ryzen 7 3700X
- **CPU Cooler:** Noctua NH-U12S
- **Memory:** Crucial Ballistix 32GB DDR4 3600MT/s CL16 (2x16GB)
- **Motherboard:** MSI MEG X570 UNIFY
- **Network adapter:** ASUS XG-C100C
- **Power supply:** BE QUIET! STRAIGHT POWER 11 | 550W Platinum
- **Case:** Be Quiet! Silent Base 802 Black
- **Disks:**
  - 1x WD Black SN850 NVMe SSD 500GB (OS disk)
  - 2x WD Black SN850 NVMe SSD 1TB (Data, RAID-1: Mirroring)
  - 2x Crucial MX500 SSD 1TB (Extra data, RAID-0)

### In-depth component selection choices

It is quite a list! 😮 Of-course I went for AMD Ryzen processor with only 65 Watt power usage at maximum load. Together with the latest X570 motherboard, supporting even the latest Ryzen Zen 3 processors if we want to upgrade later down the road.  
X570 also include PCIe 4.0 support/lanes required for the WD Black SSDs connected via PCIe. WD Black SN850 have read speed up-to 7GBytes/s. Keep in mind, those WD Black SSDs aren't advised for servers, but should work just fine. 😎

The memory is very fast memory (3600Mhz! with CL16 timing), all Ryzen processors enjoy fast memory and the selected speed is _sweat spot_ for current Ryzen systems.

A platinum power supply is very welcome on a server that is on 24/7, not wasting energy in form of heat or anything else up to 93.8% efficient. Yet, we will never use more than 300 Watt, so 550 Watt is good enough by a long shot. Also there weren't any platinum power supply below the 550 Watt range. Last but not least, we try to have 10Gb/s LAN in our home network, this network adapter is a start. We already have CAT6a and CAT7 cables in the house, next steps would be 10Gbit network switch (maybe I'll discuss that in another blog item).

There we have it:

![](/images/2020/12/IMG_20201207_195944-scaled.jpg)

Just **snap** with your fingers and pwoef:

![](/images/2020/12/IMG_5489-scaled.jpg)

![](/images/2020/12/IMG_5503-scaled.jpg)

![](/images/2020/12/IMG_5497-scaled.jpg)

![](/images/2020/12/IMG_5496-scaled.jpg)

Assembled and well. We can continue with firmware updates.

## Hardware firmware

In the past, you just got your hardware and be done with it. Nowadays, we need to update and flash all kind of firmware to the latest versions. Because, well they're either shipping their products too early or the world is changing to fast. Only the last reason is a good reason to deliver firmware updates to customers.

### BIOS

Let's start with the motherboard BIOS. I found a new BIOS version on the [MSI website](https://www.msi.com/Motherboard/support/MEG-X570-UNIFY). Just put the file on a USB stick, put in the back of your motherboard (often a special USB port for BIOS flashing). During boot press 'DEL' key to get into your BIOS, in case of MSI we need to go to the flashing service called 'M-Flash' and select your new BIOS file from the USB to start the update:

![](/images/2020/12/IMG_20201210_004349-1-scaled.jpg)

### BIOS Tuning

I changed several configurations in the MSI BIOS (in arbitrary order):

- Changed boot order
- Disabled LEDs on the motherboard (although I didn't had RGB, I don't need to matrix display on all the time)
- Enable XMP profile (#1) to get the advertised speed (3600Mhz) of the memory modules
- Disabled on-board LAN (after all I got a separate network card)
- Disabled WiFi (yeah, motherboards are shipped with WiFi 😕 )
- Changed the fan curves of CPU & case fans
- Enabled Boot after Power-Failure, so the server restarts automatically when there is a power outage

## Disks

Next step was to update my&#8230; WD SN850 NVMe SSDs actually, I read about some hardware issues on [Tweakers.net](https://tweakers.net/reviews/8434/9/wd-black-sn850-ssd-prestatiekroon-met-slag-om-de-arm-firmwareperikelen.html) (Dutch tech news site), oopsy. I have 3 of them, so let's update them all.

Instead of using Linux Vendor Firmware Service (Windows has a very similar service called: Component Firmware Update). Western Digital decided on delivering their own bloat software called "WD Dashboard": [download link](https://wddashboarddownloads.wdc.com/wdDashboard/DashboardSetup.exe). You guested it, its for Windows only. So I needed to first install Windows on my brand new system, in order to update my SSDs disks!? 👿 [What is Windows?](https://techterms.com/definition/windows)

Using WD Dashboard we can see if there is a firmware update available for your disks. Update each drive separately to the latest version: 611**110**WD. On the photo below you still see the old version (6111**100**WD) saying it's up-to-date, but you get the idea hopefully. Again now 611110WD is the latest version. Which should increase stability and avoid read issues.

![](/images/2020/12/IMG_20201211_222827-scaled.jpg "Don't look! This is Windows 10")

## Finalize

Once all firmware updates are completed, we can format your disks again. And put a decent operating system on it.

I want to use an update-to-date distribution with some of the latest Linux kernel + firmware to get the most out of my Ryzen system and NVMe's. To be honest, Debian Buster gave me some issues with the UEFI Boot. Eventually, I went for Ubuntu Server 20.04 LTS - [download link](https://releases.ubuntu.com/20.04/ubuntu-20.04.4-live-server-amd64.iso).

That's it for now! I hope you enjoyed it! This article is part of a series of blog articles related to my new server.

**Update:** [Part II is out now](/2021/new-server-setup-linux-part-2/)!
