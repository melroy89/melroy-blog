---
title: Raspberry Pi – Camera Module + Motion
author: Melroy van den Berg
type: post
date: 2014-12-16T15:21:13+00:00
toc: true
modal: true
url: /2014/raspberry-pi-camera-module-motion/
featured_image: /images/2014/07/pi_camera_module.jpg
categories:
  - Advanced
  - GNU/Linux OS
  - Hardware
  - IoT
  - Networking
  - Programming
  - Single Board Computers
tags:
  - ARM
  - Camera Module
  - eth0
  - git
  - Motion
  - MotionEye
  - Raspberry Pi
  - Raspbian
  - systemd
  - WiFi dongle
  - wlan0
---

In deze tutorial leg ik uit hoe je de **Raspberry Pi** kunt opzetten / configureren met de **Camera Module.** Deze module is niet standaard inbegrepen bij aanschaf van de Raspberry Pi.

Ik leg ook uit welke **software** je het beste kunt gebruiken voor het detecteren van beweging. Verder bespreek ik stap voor stap hoe je het beste je **netwerk** kunt configureren. Ik sluit af met een lijstje met handige commando's die je zeker gaan helpen tijdens het project.

Kortom, een mooi projectje voor in het weekend! 🙂

<!--more-->

![Raspberry Pi - Camera Module](/images/2014/07/pi_camera_module.jpg "Raspberry Pi - Camera Module")

![Raspberry Pi](/images/2014/07/raspberry_pi.jpg "De Raspberry Pi")

_**Note:** In deze tutorial ga ik er vanuit dat er basis Linux kennis aanwezig is en je al beschikt over de nodige hardware (zie Raspberry Pi op de foto rechts). Plus het aansluiten van deze hardware. Mocht je daarover echter toch nog vragen hebben, laat dan gewoon een reactie achter en ik help je graag verder!_

## Raspbian Installeren

We beginnen met het downloaden van de **Raspbian** image (Torrent is het snelste): [Ga naar Download site](http://www.raspberrypi.org/downloads/).

Kies voor "Raspbian" onderaan de webpagina (NOOBS mag ook, maar die keuze laat ik bij jou liggen). In deze tutorial ga ik de Debian versie voor Raspberry Pi gebruiken (ook wel Raspbian).

![](/images/2014/07/raspbian_logo.png "Pak de gedownloade .zip bestand uit, hierin zit een `.img` bestand.")

### Optie #1 - Handmatig installatie

Open Gparted (sudo apt-get install gparted). En controleer welke harde schrijven er allemaal zijn. Doe nu de SD kaart in je computer en start Gparted opnieuw op, als het goed is, is er nu een extra sdxxx erbij gekomen  (deze kan echter ook anders beginnen qua naamgeving). Verwijder eventuele partities van de SD kaart via Gparted. Je moet er zeker van zijn dat er geen partities aangekoppeld/gemount zijn.

Ga naar de map waar je `.img` bestand is. En open hier een Terminal. Voer daarna het volgende opdracht uit om de image (`.img`) te schrijven naar je SD kaart: `sudo dd bs=4M if=201x-xx-xx-wheezy-raspbian.img of=/dev/sdxxx`

Veranderd sdxxx naar het apparaat wat je SD kaart moet zijn. Zet er geen getal achter, want dat verwijst naar een partitie, in dit geval moet de image naar z"n volledige opslag geschreven worden. Mocht dit nu niet werken, kun je altijd een kleine block size (_bs_) gebruiken, echter dit zorgt er wel voor dat het langer duurt voordat de image op je SD kaart staat.

### Optie #2 - Automatisch via script

Een alternatief is door gebruik te maken van mijn eigen installatie script, zie: [install_raspbian.sh](https://raw.githubusercontent.com/MelroysBlog/linux-scripts/master/install_raspbian.sh). Dit script is onderdeel van de [Linux Script repo](https://github.com/MelroysBlog/linux-scripts) op Gihub.com, onderdeel van [Melroy's Blog](https://github.com/MelroysBlog) account.

Sla dit bestand op dezelfde locatie op als waar je download staat. En maakt deze uitvoerbaar via: `sudo chmod +x install_raspbian.sh`

En voer het uit: `./install_raspbian.sh`

## Eerste keer opstarten

Steek je SD kaart vervolgens in je Raspberry Pi en zet de stroom erop. Als je eenmaal door de installatie bent gelopen log dan in met de gebruiker "pi" en jouw gekozen wachtwoord.

Om te beginnen gaan we het netwerk aanpassen, zodat je een statisch IP adres toegewezen krijgt. Dit kan door het volgende bestand aan te passen: `sudo nano /etc/network/interfaces`

Verander eth0 interface naar:

```sh
allow-hotplug eth0
iface eth0 inet static
 address 192.168.0.80
 netmask 255.255.255.0
 network 192.168.0.0
 broadcast 192.168.0.255
 gateway 192.168.0.1
```

Sla het bestand op (via ctrl+x), type daarna: "y" en druk op enter. Zoals beschreven staat in de [Debian handleiding ](http://www.debian.org/doc/manuals/debian-reference/ch05.en.html#_the_network_interface_with_the_static_ip)zorgt de **_allow-hotplug_** regel ervoor, dat _ifup_ de eth0 interface opbrengt, en **_iface_** regel zorgt ervoor dat _ifup_ het statische IP adres gebruikt bij het configureren van de interface.

We gaan hier vanuit dat de resolvconf pakket geïnstalleerd is, dit zorgt ervoor dat DNS instellingen automatisch doorgevoerd wordt (anders zou je het bestand /etc/revolv.conf moeten aanpassen; enkel "nameserver" is verplicht). Zie DNS hoofdstuk later in het artikel.

Herstart eth0 interface via:

```sh
sudo ifdown eth0
sudo ifup eth0
```

Controleren van de netwerk instellingen kan met _ifconfig_ commando (zonder parameters).

Vanwege het feit dat je enkel 1 ethernet connector heb op de Raspberry Pi hoeft ook enkel die gecontrolleerd te worden door de ifplugd service als er een kabel ingeplugged wordt. Vandaar dat we auto veranderen naar **eth0**. Dit veranderen in verband met eventuele toekomstige  problemen als je ooit bijvoorbeeld een wifi dongle wilt aansluiten (wlan0 interface).

```sh
sudo nano /etc/default/ifplugd
```

Verander auto naar eth0. Sla wederom het bestand op.  
We updaten het huidige systeem, zodat alles up-to-date is:

```sh
sudo apt-get update
sudo apt-get upgrade
```

Als je dat nog niet gedaan heb, gaan we de camera module "activeren" via de Raspberry Pi commando: `sudo raspi-config`

Kies "Enable Camera". Selecteer "Enable" en druk daarna op enter. Selecteer vervolgens Finish. Nu reboot de Raspberry Pi zichzelf als het goed is. En anders type je om te herstarten: `sudo reboot`

_**TIP**!_  
SSH (Secure Shell) is standaard actief*,* via SSH kun je de Raspberry Pi  over afstand overnemen. Dit kan op je computer via het commando: `ssh pi@192.168.0.80`

En vervolgens voer je je wachtwoord in. Nu zit je "remote" in je Raspberry Pi terminal!

## Camera check

Als je de Raspberry Pi camera nog niet aangesloten heb, doe dat nu.

_**UPDATE:**_ We gaan het volgende bestand uitbreiden met een kernel module, hierdoor wordt de camera gezien als een "normale" camera onder Linux (net als een webcam): `sudo nano /etc/modules`

Voeg deze regel toe aan het einde: `bcm2835-v4l2`

Dit zorgt ervoor dat GNU/Linux voortaan deze module automatisch start bij het opstarten. Voor nu starten we het eenmaal handmatig op: `sudo modprobe bcm2835-v4l2`

We kunnen nu controleren op de camera überhaupt werkt via: `raspistill -o test.jpg`

Dit zou een foto moeten maken en opslaan onder de naam test.jpg: `ls /dev/`

Dit commando moet nu een lijst geven, waaronder _video0_, je kunt nu doorgaan met het artikel. Als je geen video0 ziet, controleer dan a.u.b. opnieuw de camera aansluiting en/of je de module wel goed hebt ingeladen.

Installeer het volgende pakket voordat je avconv commando kunt gebruiken: `sudo apt-get install libav-tools`

Neem een video op om te testen: `avconv -f video4linux2 -r 25 -i /dev/video0 -vcodec mpeg4 -y webcam.mp4`

![Output van Motion software (diff)](/images/2014/07/outputmotion.jpg "Output van Motion software (diff)")

## Motion Software

Nu gaan we Motion software installeren, deze software gaat straks beweging detecteren door middel van de camera beelden, installeren doen we via: `sudo apt-get install motion`

Klaar 🙂!

## Motion Web-interface

Nu kun je schermopnames of een video maken wanneer motion beweging detecteert en deze naar een bepaalde map plaatsen. Maar het kan ook handig zijn om live het beeld te zien en een online configuratie interface, dat kan met **[MotionEye](https://github.com/ccrisan/motioneye).** Sinds versie 0.27 is MotionEye voortaan op github te vinden.

We beginnen met de multimedia repository toe te voegen aan APT. Log eerst in als `root` gebruiker: `su -`

En dan:

```sh
echo "deb http://www.deb-multimedia.org jessie main non-free" >> /etc/apt/sources.list
apt-get update
apt-get install deb-multimedia-keyring
```

En uiteindelijk nogmaals een update na de keyring installatie: `sudo apt-get update`

Voordat we verder gaan, installeren we eerst de afhankelijkheden voor MotionEye: `sudo apt-get install python-pip python-dev libssl-dev libcurl4-openssl-dev libjpeg-dev ffmpeg v4l-utils`

Nu we Python-pip hebben, wordt de installatie eenvoudiger. Python pip helpt je met installeren van python pakketten. We gaan nu motioneye installeren: `sudo pip install motioneye`

De laatste versie is nu v0.28.3. MotionEye is aanwezig in de [Python pip repository](https://pypi.python.org/pypi/motioneye). In mijn tutorial ga ik er vanuit MotionEye geïnstalleerd wordt via python pip.

Mocht je _echt_ de laatste "unstable" versie willen hebben, dan kun je de github repo clonen:

```sh
git clone https://github.com/ccrisan/motioneye.git
```

## Configureren

MotionEye maakt gebruik van een motioneye.conf file. Creëert de correcte map: `sudo mkdir -p /etc/motioneye`

Zet het voorbeeld configuratie bestand naar de nieuwe map: `sudo cp /usr/local/share/motioneye/extra/motioneye.conf.sample /etc/motioneye/motioneye.conf`

Mocht je niet over dit motioneye.conf.sample bestand beschikken, probeer [deze versie](https://github.com/ccrisan/motioneye/blob/master/extra/motioneye.conf.sample) direct van github.com. Het configuratie bestand bewerken kan via: `sudo nano /etc/motioneye/motioneye.conf`

Optioneel kun je de poort veranderen naar poort `80`. Ik vind het gewoon fijn om het IP-adres in te vullen in de webbrowser zonder na te denken welke poort het ook alweer was: `port 80`

Maak de standaard media map aan (waar de foto`s/video`s terecht komen): `sudo mkdir -p /var/lib/motioneye`

Tot slot maken we gebruik van het meegeleverde systemd opstart-script, die het opstarten vereenvoudigd. [Systemd](https://wiki.debian.org/systemd) is de nieuwste opstartbeheerder van Debian 8 Jessie.

```sh
cp /usr/local/share/motioneye/extra/motioneye.systemd-unit-local /etc/systemd/system/motioneye.service
```

Mocht je op een of andere manier niet over dit systemd init script beschrikken, ook [dit bestand](https://github.com/ccrisan/motioneye/blob/master/extra/motioneye.systemd-unit-local) kun je vinden op Github. Dit init script maakt standaard gebruik van /etc/motioneye/motioneye.conf configuratie bestand.

Voeg motioneye toe aan system control:

```sh
sudo systemctl daemon-reload
sudo systemctl enable motioneye
```

Zonder reboot kun je MotionEye starten via: `sudo systemctl start motioneye`

Stoppen kan weer via: `sudo systemctl stop motioneye`

Als alles goed is gedaan, kun je nu verbinden met de MotionEye webserver via: [http://localhost](http://localhost).  
Of remote, via je eigen PC bijvoorbeeld, ga dan naar (verander eventueel het IP adres naar de gene die jij gebruikt hebt):  
[http://192.168.0.80](http://192.168.0.80)

Hij zou vragen om een nieuwe camera te configureren, druk op de link voor het toevoegen van een camera. En selecteer de camera, waarschijnlijk iets met "mmal". Als het goed is heb je nu **live** beeld!

## WiFi Dongle

Je kunt je Raspberry Pi uiteraard aansluiten op het netwerk, handig om je opnames op te slaan op een netwerk schrijf. De Raspberry Pi Model B beschikt over een LAN ethernet poort, waardoor je het op een bekabelt netwerk kunt aansluiten. Echter in deze situatie is het verstandiger om gebruik te maken van draadloze netwerk verbinding door gebruik te maken van een WiFi Dongle.

Het is verstandig om te kiezen voor een WiFi Dongle die "out-of-the-box" werkt, kortom dat je hier geen extra handelingen voor moet doen. Op [deze pagina](http://elinux.org/RPi_USB_Wi-Fi_Adapters) kun je een overzicht vinden van alle dongles die al dan wel of niet goed ondersteund worden door Raspberry Pi (Raspbian).

Ik heb een [losstaand artikel geschreven](/2014/cross-compiling-linux-driver-raspberry-pi/) waarin ik stap voor stap uitleg hoe je je eigen WiFi driver kunt compileren en gebruiken voor Raspberry Pi. Dit behandel ik daarom verder niet meer in dit artikel.

### WiFi Configureren

In Linux kunnen we WPA supplicant gebruiken voor het opgeven van de wifi instellingen.  
Wijzig hiervoor het volgende configuratie bestand: `sudo nano /etc/wpa_supplicant/wpa_supplicant.conf`

Met als inhoudt nu:

```conf
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
ap_scan=1

network={
  ssid="JOUW_WIFI"
  psk="WACHTWOORD"
  proto=RSN
  key_mgmt=WPA-PSK
  pairwise=CCMP TKIP
  group=CCMP TKIP
  auth_alg=OPEN
}
```

Ps. Je kunt MotionEye configuratie aanpassen, zodat je de WiFi instellingen ook via MotionEye kan veranderen.

```sh
sudo nano /etc/motioneye/motioneye.conf
```

Verander de regel met wpa_supplicant_conf naar (vergeet niet het `#`-teken te verwijderen): `wpa_supplicant_conf /etc/wpa_supplicant/wpa_supplicant.conf`

Korte uitleg van mogelijke configuratie items in wpa_supplicant.conf bestand:

- `update_config` (optioneel): indien op 1, dan is het mogelijk om de wifi instellingen te veranderen via grafische interface
- `ap_scan`:  0 wordt enkel voor bekabelde verbindingen gebruikt. Zoals nu op 1, is het standaard voor wifi. En 2 wordt enkel gebruikt wanneer voor drivers te zetten met SSID, die niet goed raad weten met wpa_supplicant (developer / crappy drivers).
- `ssid`: de naam van je WiFi
- `psk`: het wachtwoord van je WiFi netwerk
- `scan_ssid` (optioneel): zeer waarschijnlijk **1** (voor normale netwerken) of **2** voor verborgen netwerken.
- `proto`: kan zijn **RSN** (Robust Security Network: WPA2) of **WPA** (WPA1).
- `key_mgmt`: kan zijn **WPA-PSK** (zeer waarschijnlijk) of **WPA-EAP** (enterprise netwerken).
- `pairwise`: kan zijn **CCMP** (WPA2) of **TKIP** (WPA1).
- `auth_alg` (optioneel): is waarschijnlijk **OPEN** (nodig voor WPA/WPA2), andere opties zijn **LEAP** en **SHARED**.
- `group`: kun je zetten op **CCMP** (WPA2), **TKIP** (WPA1), **WEP104** of **WEP40**.
- `priority` (optioneel): hoe hoger het getal hoe meer wenselijk dit netwerk is om te gebruiken.

Zet de rechten goed, immers _wpa_supplicant.conf_ bevat gevoelige informatie: `sudo chmod 600 /etc/wpa_supplicant/wpa_supplicant.conf`

Je zou de Raspberry Pi een statisch (vast) IP-adres kunnen meegeven voor het volgende bestand aan te passen: `sudo nano /etc/network/interfaces`

Met als inhoud:

```sh
auto lo
auto wlan0

iface lo inet loopback
iface eth0 inet dhcp

allow-hotplug wlan0
iface wlan0 inet static
address 192.168.0.80
netmask 255.255.255.0
network 192.168.0.0
broadcast 192.168.0.255
gateway 192.168.0.1
wpa-conf /etc/wpa_supplicant/wpa_supplicant.conf

iface default inet dhcp
```

**Let op!**  
Dat je **wpa-config** gebruikt en niet wpa-roam.

Als je ook een eth0 interface hebt geconfigureerd als een statisch IP-adres... Dan moet je de _gateway_ regel bij wlan0 verwijderen, anders krijg je een foutmelding.

_**UPDATE:**_ Om problemen te voorkomen met DHCP, verwijderen we wlan0 uit de "link detection daemon". Daarvoor wijzigen we het volgende bestand: `sudo nano /etc/default/ifplugd`

Verander "_auto_" en "_all_" naar "_eth0_":

```sh
INTERFACES="eth0"
HOTPLUG_INTERFACES="eth0"
ARGS="-q -f -u0 -d10 -w -I"
SUSPEND_ACTION="stop"
```

Control+X, en sla het bestand wederom op.

### Crontab (Optioneel)

_**NIEUW:**_ Eventueel kun je een zogenaamde "crontab" script schrijven, die elke x minuten controleert of de WiFi verbinding niet verbroken is. En anders opnieuw verbinding probeert te maken (just to be sure). Script genaamd check_wifi.sh:

```bash
#!/bin/bash
if iwconfig wlan0 | grep -q "Melroy_Dennis_HQ" ; then
:
else
   echo "Network connection down! Attempting reconnection."
   ifdown --force wlan0
   sleep 5
   ifup wlan0
fi
```

Uitvoerbaar maken met: `chmod +x check_wifi.sh`

En als laatste toevoegen aan crontab (e van edit): `crontab -e`

Elke 30 minuten controleren: `*/30 * * * * /home/pi/check_wifi.sh`

### DNS (Optioneel)

Optioneel kun je OpenDNS gebruiken. Veranderd het resolv.conf bestand: `sudo nano /etc/resolv.conf`

En voeg of vervang de volgende regel toe aan dit bestand (voor OpenDNS): `nameserver 208.67.222.222`

En sla het bestand op. Op dit moment is OpenDNS altijd geconfigureerde als eerste DNS server, ongeacht welk netwerk interface je gebruikt.

## Handige Commando's

Indien je informatie wilt opvragen over de interface kunt je gebruik maken van (of het achterhaalde commando ifconfig): `ip addr`

Zodra je twee interfaces heb gedefinieerd, dan kun je de netwerken herstarten op je Pi zelf via:

```sh
sudo service networking stop
sudo service networking start
```

Gebruik liever **geen** _networking restart_, dit kan problemen opleveren met het opbrengen van de interface en is daarom achterhaald. Let er op dat je verbinding verliest mocht je via SSH verzonden zijn.

Je kunt ook per interface "opbrengen" via:

```sh
sudo ifdown eth0
sudo ifup eth0
```

Vraag je je af welke WiFi access points er in de buurt zijn, gebruik: `sudo iwlist wlan0 scan`

Wilt je controleren of je nu echt bent **verbonden** bent met je WiFi Access Point? Maak handig gebruik van het iwconfig commando:

```sh
sudo iwconfig 2>&1 | grep ESSID
wlan0     IEEE 802.11bgn  ESSID:"Melroy_Dennis_HQ"  Nickname:"rtl_wifi"
```

Controleer je IP route table via het _route_ commando. Let er dus op dat je standaard gateway verwijst naar 0.0.0.0 en die verwijst weer naar de router met het IP-adres 192.168.0.1:

```sh
route -n
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
0.0.0.0         192.168.0.1     0.0.0.0         UG    0      0        0 wlan0
192.168.0.0     0.0.0.0         255.255.255.0   U     0      0        0 wlan0
```

Wil je testen of je google.com kunt bereiken? Probeer het domeinnaam te pingen:

```sh
ping google.com
PING google.com (173.194.65.101) 56(84) bytes of data.
64 bytes from ee-in-f101.1e100.net (173.194.65.101): icmp_req=1 ttl=48 time=14.4 ms
64 bytes from ee-in-f101.1e100.net (173.194.65.101): icmp_req=2 ttl=48 time=18.9 ms
```

Mocht je tegen problemen aanlopen, probeer eens te kijken in het /var/log/syslog bestand, via:

```sh
tail -f /var/log/syslog
 Jul 27 22:21:14 raspcam wpa_supplicant[3626]: wlan0: Trying to associate with c0:3f:0e:be:bb:2c (SSID='Melroy_Dennis_HQ' freq=2437 MHz)
 Jul 27 22:21:14 raspcam wpa_supplicant[3626]: wlan0: Association request to the driver failed
 Jul 27 22:21:15 raspcam kernel: [ 1844.563776] r8712u 1-1.2:1.0 wlan0: r8712_got_addbareq_event_callback: mac = c0:3f:0e:be:bb:2c, seq = 0, tid = 0
 Jul 27 22:21:15 raspcam wpa_supplicant[3626]: wlan0: Associated with c0:3f:0e:be:bb:2c
 Jul 27 22:21:15 raspcam wpa_supplicant[3626]: wlan0: WPA: Key negotiation completed with c0:3f:0e:be:bb:2c [PTK=CCMP GTK=TKIP]
 Jul 27 22:21:15 raspcam wpa_supplicant[3626]: wlan0: CTRL-EVENT-CONNECTED - Connection to c0:3f:0e:be:bb:2c completed (auth) [id=0 id_str=]
 Jul 27 22:21:15 raspcam ifplugd(wlan0)[3606]: Link beat detected.
 Jul 27 22:21:15 raspcam ifplugd(wlan0)[3606]: Executing '/etc/ifplugd/ifplugd.action wlan0 up'.
 Jul 27 22:21:15 raspcam ifplugd(wlan0)[3606]: client: /sbin/ifup: interface wlan0 already configured
 Jul 27 22:21:15 raspcam ifplugd(wlan0)[3606]: Program executed successfully.
```
