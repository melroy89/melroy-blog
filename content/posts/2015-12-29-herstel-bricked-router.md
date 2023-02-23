---
title: Herstel bricked Router
author: Melroy van den Berg
type: post
date: 2015-12-29T14:54:15+01:00
url: /2015/herstel-bricked-router/
featured_image: /images/2015/07/netgear_front.jpg
categories:
  - Advanced
  - GNU/Linux OS
  - Hardware
  - Networking
  - Security
  - Server
  - Single Board Computers
tags:
  - apparaat
  - bricked
  - brickt
  - DD-WRT
  - herstel
  - image
  - Netgear
  - OpenWrt
  - reflash
  - reflashing
  - router
  - tftp
  - WNDR3700
---

![Brick](/images/2015/07/brick.jpg)

Ik had per ongelijk de Netgear router gebrickt, of in ieder geval de router startte niet meer goed op. Als een apparaat (router, smartphone, game console) **bricked** is, betekend dat hij niet goed geconfigureerd is, corrupte firmware of een hardware problemen heeft.

Waardoor het betreffende apparaat _niet_ meer goed kan functioneren. En daardoor zou de router enkel nog bruikbaar zijn als jawel een &"brick" (=baksteen). Oopsy!

<!--more-->

Nu zullen vele mensen het apparaat weggooien en een nieuwe kopen... Immers ze weten niet beter, kapot is kapot toch? Zonde! Want er is vaak _wel_ een oplossing, mits je er natuurlijk verstand van heb.  
Kortom, in dit artikel probeer ik te laten zien hoe je deze router weer aan de praat krijgt, zodat hij niet meer in de prullenbak beland.

# Reflashen

![Netgear WNDR3700 Router](/images/2015/07/netgear_router.jpg "Netgear WNDR3700 Router")

We gaan de router zoals dat heet opnieuw flashen. Deze term is afkomstig van het hardware onderdeel waar de software applicatie opslagen op staat, namelijk flashgeheugen.

In dit artikel ga ik de laatste "image" versie downloaden van de Netgear website, deze "image" bevat de software die op het flashgeheugen moet komen. Kortom we gaan de image flashen. Hopelijk start het systeem dan weer goed op. Immers alles wordt weer opnieuw op het systeem gezet, en de instellen zijn dan weer terug naar fabrieksinstellingen.

## Download

Ik downloadde de laatste image van: [netgear.com/support/download](https://www.netgear.com/support/download)

In mijn geval zocht ik op: **WNDR3700v1**

Het type nummer & VERSIE nummer is cruciaal! Ik heb [hier gelezen](http://www.dd-wrt.com/wiki/index.php/Netgear_WNDR3700#v1) dat versie 1 geen versie nummer heeft afgebeeld op de router zelf (enkel het type nummer). Pas vanaf versie 2 wordt het versienummer vermeld op de desbetreffende router.

De volgende stap is om alvast het noodzakelijk programma te installeren, onder Linux installeren we tftp via de command-line als volgt: `sudo apt-get install tftp`

Voor Windows en andere besturingssystemen zijn er alternatieve tftp clients. Google is your friend.

## Verbind de router

We gaan verbinding maken met de router. Het verschilt per apparaat en model hoe je je router kunt herstellen. De Netgear WNDR3700 router kunnen we flashen via een LAN kabel en via het tftp protocol. In sommige gevallen is het (ook) mogelijk om je router of ander apparaat te herstellen via bijvoorbeeld via een seriële kabel. Zo"n seriële kabel bevat data lijnen TX & RX en power lijnen: GND & PWR. Hierbij komt andere software bij kijken en het configureren van COM poort is dan ook noodzakelijk (baud, parity, stop bit, etc.). Zoals ik eerder aangaf, gelukkig kunnen we deze Netgear router gewoon opnieuw flashen via een normale LAN Kabel (geen cross-kabel).

We verbind de computer dus met de LAN kabel. En stel een vast IP-adres in op de computer (Bijvoorbeeld: 192.168.1.5). Doe de andere kant van de LAN kabel in een normale Ethernet poort van de router (niet de WAN poort).

## Flashing

Start de router op in "flash" mode, dit kan door tijdens het opstarten van de router de "factory reset" knop ingedrukt te houden (klein rood knopje aan de achterkant van de router). Doe dit zolang het groene power ledje gaan branden. Laat dan pas los. Nu moet de power led gaan **knipperen**.

Als het goed is moet je de router nu kunnen pingen: `ping 192.168.1.1`

Ga eerst naar je download map, waar je de \*.img file heb uitgepakt (dit is het bestand wat we gedownload hebben in het begin van dit artikel). Start vanuit daar een nieuwe terminal op. Of: cd naar de betreffende map.

We gaan naar tftp starten: `tftp`  
Zet hem in octet mode door het volgende te typen: `binary`

Verbind met de router in tftp terminal: `connect 192.168.1.1`

We versturen nu het bestand (image) naar de router, via: `put voorbeeld.img`

**WACHT** nu totdat de router zichzelf automatisch herstart. Vermeid onnodig contact met de router, en doe zeker de stroom er NIET af.

De router start automatisch opnieuw op. Nu kun je in je browser naar de web-interface gaan: [http://192.168.1.1](http://192.168.1.1)  
(In mijn geval is de standaard gebruikersnaam/wachtwoord: "admin" & "password")

Nu de router weer werkt, kunnen we verder gaan met het installeren van DD-WRT. DD-WRT is een open-source gratis router OS. Er bestaan ook alternatieven zoals [OpenWRT](https://www.openwrt.org/).

Het voordeel van DD-WRT ten opzichte van de standaard firmware van Netgear, vind ik dat het stabiel is, en dat je heel veel meer functionaliteit krijgt op dezelfde router.  
Denk hierbij aan: QoS (Quality of Service), telnet, SSH (terminal) server, UPnP, WiFi signaal kun je versterken, aparte gast WiFi / Hotspot Portal (handig als je een Hotel runt, e.d.) , VLANs, WMM, SNMP, NTP, Port triggering / forwarding, repeater mode, Afterburner, MAC-filtering...

![DD-WRT SSH terminal toegang](/images/2015/07/dd_wrt_shell.png "DD-WRT SSH terminal toegang")

En zo kan ik nog wel even doorgaan waarom jij ook zou moeten kiezen voor DD-WRT of OpenWRT.

# DD-WRT installeren

![DD-WRT Logo](/images/2015/07/ddwrt_logo.jpg)

## Downloaden

We downloaden eerst de juiste image van: [http://www.dd-wrt.com/wiki/index.php/Netgear_WNDR3700](http://www.dd-wrt.com/wiki/index.php/Netgear_WNDR3700)

Nogmaals ik beschikte over v1, kortom ik koos voor **V1 World Wide (WW)**; dit geeft me het bestand genaamd: "wndr3700-factory.img".

## Flashen

In plaats van het flashen via tftp, kunnen we eenvoudig de DD-WRT image flashen via de interface van de Netgear router zelf.

Ga hiervoor naar naar de "Router Upgrade" in de web-interface van de Netgear router. Kies nu voor de net gedownloade dd-wrt image (wndr3700-factory.img). En druk op "Upload" knop. Zie screenshot hieronder:

![DD-WRT flashen via Router Upgrade](/images/2015/07/router_upgrade.png "DD-WRT flashen via Router Upgrade")

Ik kreeg dat de versie zo genaamd ouder is dan de huidige versie. Dit kun je negeren en op "Yes" drukken om door te gaan.

Weer een belangrijk moment: **WACHTEN**. Wacht totdat de router zichzelf herstart, dit kan zeker enkele minuten duren (wacht ook minimaal 1 minuut, nadat de laadbalk 100% aangeeft). Doe niet zo maar de stroom eraf!

Na het herstarten kun je proberen opnieuw verbinding te maken met dd-wrt in je webbrowser: [http://192.168.1.1](http://192.168.1.1)  
(Inloggen in DD-WRT kan met: "root" en als wachtwoord: "admin")

![DD-WRT GUI](/images/2015/07/dd_wrt_screenshot.png "DD-WRT GUI")

Ik hoef je hopelijk niet uit te leggen dat verstandig is om eerst je wachtwoord te veranderen :). Veel plezier met DD-WRT!  Bedankt dat je kiest voor open-source / gratis Linux-based firmware voor routers & acces-points.
