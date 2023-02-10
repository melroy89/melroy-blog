---
title: Cross-compiling Linux Driver (Raspberry Pi)
author: Melroy van den Berg
type: post
date: 2014-12-28T14:55:28+00:00
url: /2014/cross-compiling-linux-driver-raspberry-pi/
featured_image: /images/2014/07/GNU_Compiler_Collection_logo.svg-.png
categories:
  - Advanced
  - GNU/Linux OS
  - Hardware
  - IoT
  - Networking
  - Programming
  - Single Board Computers
tags:
  - cross-compiling
  - GCC
  - "Linux Kernel"
---

Onder **cross-compiling** wordt verstaan dat je code bouwt (compileert) op een computer, wat eigenlijk bedoeld is voor een ander platform. Zo is het mogelijk dat je onder Windows een uitvoerbaar bestand kunt compileren voor Linux of Android.

<!--more-->

In dit artikel gaan we dit zelfde "trucje" gebruiken om onder Linux te cross-compileren naar Raspbian (ARM).

Cross-compilen kunnen we doen als Linux bijvoorbeeld de WiFi dongle niet automatisch wordt herkent, maar wel een driver beschikbaar is. Helaas vergt dat wel wat tijd en kennis. Hieronder leg ik stap voor stap uit wat je moet doen, om je eigen kernel module te compileren. In mijn geval was [de code al wel beschikbaar](https://github.com/gnab/rtl8812au.git), maar de dongle werkte niet standaard zodra ik deze in de USB stopte.

## Wifi-Dongle (optioneel)

Ik beschik over een WiFi dongle, echter de driver is niet standaard meegeleverd met Raspbian.

![](/images/2014/07/netgear-a6100-dual-band-ac600-wifi-usb-mini-adapter.jpeg "Neargear A6100 Dual Band - AC600 mini USB adapter")

### Linux Kernel

We beginnen met het clonen van de Git **Linux kernel** reposority: `git clone https://github.com/raspberrypi/linux.git`

En we installeren de dependenties: `sudo apt-get install gcc-arm-linux-gnueabi make ncurses-de`

Eerst moeten we er zeker van zijn dat er geen targets aanwezig zijn, dus we ruimen alles eerst netjes op:

```sh
cd linux
make mrproper
```

We halen de configuratie  bestand van de Raspberry Pi zelf. Deze staat in **/pro/config.gz** en de configuratie bestand moet .config heten in de linux folder, dit kun je uitpakken via: `zcat config.gz > .config`

Optioneel kun je gebruik maken van mijn werkende config file: [Download mijn config bestand](/downloads/compile-config) (hernoem dit bestand naar `.config`).

Nu clonen we ook de "tools", hierin zit de correcte cross-compile binary: `git clone https://github.com/raspberrypi/tools.git`

Nu deze map hebben, gaan we weer naar de linux map. En zetten de cross-compilere binary goed: `export CCPREFIX=/home/melroy/tools-master/arm-bcm2708/arm-bcm2708-linux-gnueabi/bin/arm-bcm2708-linux-gnueabi-`

We controleren op de configuratie correct & volledig is (deze maakt gebruik van de `.config` file): `make ARCH=arm CROSS_COMPILE=${CCPREFIX} oldconfig`

Uiteindelijk cross-compileren we de kernel via het commando: `make ARCH=arm CROSS_COMPILE=${CCPREFIX}`

Dit kan even duren, maar je hebt nu een gecompileerde Raspberry Pi Linux Kernel. 😀 Gefeliciteerd!

### Linux Kernel Module

Een Linux kernel module is vergelijkbaar met een Windows driver. Ik beschik over een Netgear AC600 wifi adapter ook wel bekent onder de naam &"Netgear Wifi mini adapter". Helaas is deze driver (nog) **niet** standaard beschikbaar in de Linux Kernel die meegeleverd wordt met Raspbian. Kortom we moeten zelf aan de slag...

De driver is gelukkig wel te vinden op GitHub, we gaan eerst de code clonen naar onze computer via:

```sh
git clone https://github.com/gnab/rtl8812au.git
cd rtl8812au
```

Open de Makefile (nano Makefile) en we veranderen de Raspberry Pi configuratie naar (let op de KSRC):

```Makefile
ifeq ($(CONFIG_PLATFORM_ARM_RPI), y)
EXTRA_CFLAGS += -DCONFIG_LITTLE_ENDIAN
ARCH := arm
CROSS_COMPILE := arm-bcm2708-linux-gnueabi-
KVER  := 3.12.22+
KSRC ?= /home/melroy/netgear/linux
MODDESTDIR := /lib/modules/$(KVER)/kernel/drivers/net/wireless/
endif
```

Weet zeker dat bovenaan in de Makefile RPI config op "y" staat: `CONFIG_PLATFORM_ARM_RPI = y`

Optioneel kun je _CONFIG_POWER_SAVING_ op "n" zetten. De rest van de beschikbare configuraties voor de platformen moet op "n" staan.

Zet the cross-compiler in the path variable: `export PATH=$PATH:/home/melroy/tools-master/arm-bcm2708/arm-bcm2708-linux-gnueabi/bin`

We gaan bouwen:

```sh
make clean
make
```

Als het goed is beschikt je nu over een Kernel Module, dit bestand staat in de root folder en heeft als extensie **.ko**.

### Module op de Raspberry Pi

We beschikken nu over de Kernel Module. Dit .ko bestand gaan we nu verplaatsen naar de Raspberry Pi (dit ook via SFTP bijvoorbeeld) in de volgende map: `sudo cp 8812au.ko /lib/modules/$(uname -r)/kernel/drivers/net/wireless`

Om te zorgen dat de module bij het opstarten automatisch opstart, gaan we **/etc/modules** bewerken. En voegen onderaan de module toe aan de lijst: `8812au`

En voer het volgende uit in de terminal:

```sh
depmod -a
modprobe 8812au
```

De wifi module is gestart en de module start voortaan nu automatisch op.

## Vervolg

Dit artikel is onderdeel van een groter artikel, [lees hier verder...](/2014/raspberry-pi-camera-module-motion/)
