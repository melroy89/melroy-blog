---
title: "Antergos & Linux Mint"
author: Melroy van den Berg
type: post
date: 2015-12-18T13:01:50+00:00
url: /2015/antergos-linux-mint/
featured_image: /images/2015/11/antergos_wallpaper.png
categories:
  - Beginner
  - GNU/Linux OS
tags:
  - Antergos
  - Arch Linux
  - Cinnamon
  - Gnome
  - lightweight
  - pacman
  - rolling release
  - snel
  - yaourt
---

![High performance](/images/2015/11/high_perfomence.png)

We willen allemaal het maximale uit onze computer/laptop halen, in termen van gebruikersgemak, snelheid, optimalisatie en productiviteit.  
Zelf heb ik heel lang [Ubuntu](http://www.ubuntu.com/) gebruikt als besturingssysteem (meer dan 5 jaar). Met ups en downs, af en toe toch weer stiekem naar Windows of dual-boot. Of ik ging andere distributies uitproberen, zoals [Debian](https://www.debian.org/), [Fedora](https://getfedora.org/), [Gentoo](https://www.gentoo.org/), [CentOS](https://www.centos.org/) en meer. Ik heb zelfs [Arch Linux](https://www.archlinux.org/) geprobeerd.

Door de bomen zie je het bos niet meer. Als je kiest voor Linux, welke distributie kies je? Ik wil je graag meenemen in het verhaal waarbij ik zelfs weer terecht kwam bij Arch Linux.

<!--more-->

## Speelgoed?

Na al dat proberen van distributies, wil je niet altijd je systeem gebruiken als speelgoed. Wat ik bedoel te zeggen is; je wil je computer aanpassen zoals je wilt, maar zonder veel problemen en zonder gedoe. Immers soms heb je helemaal geen zin of tijd om bepaalde zaken te fixen. Bijvoorbeeld: je wil je printer niet configureren, pakketten en afhankelijkheden installeren, configuratie bestanden aanpassen en permissies goed zetten....

Terwijl je je je verslag morgen al moet inleveren!

## Linux Mint

![DistroWatch.com](/images/2015/11/laatste_distros.png "DistroWatch.com")

Zodoende kwam ik terecht bij **[Linux Mint](http://linuxmint.com/)**. Ondertussen al meer dan 3 jaar achter elkaar in gebruik, zonder terug te grijpen naar Windows of een andere distributie. Linux Mint is een distributie die helemaal compleet geleverd wordt met een eigen interface genaamd "Cinnamon". Mint heeft de voordelen van deb files en PPA"s (Personal Package Archive) van Ubuntu. Ik heb eerder al een blog artikel gepubliceerd over [Linux Mint (versus Ubuntu)](/2014/windows-vs-ubuntu-vs-linux-mint/#Ubuntu_vs_Linux_Mint).

Ik ben heel lang tevreden geweest met Linux Mint. Maar ik wil graag meer leren en uitgedaagd worden. [En mijn Linux Mint systeem werd wat traag bij het opstarten door mij]. Ik wou mijn OS opnieuw installeren en keek ook naar een andere distributie, en plots kwam ik de naam "Antergos" tegen op distrowatch.com aan de linkerkant van de site onder "Laatste distributies". Nooit van gehoord natuurlijk, maar ik was wel meteen geïnteresseerd.

_Update 2021:_ Ik ben weer terug bij Linux Mint. Maar wel met XFCE.

## Antergos

Antergos is net als Linux Mint ook een distributie, alleen _**niet**_ gebaseerd op Debian of Ubuntu. Maar op **Arch Linux**. Je bent natuurlijk helemaal blij als je iets nieuws ga proberen. Voor de mensen die Arch Linux niet kennen, bij deze een korte impressie:

1. Je stop je CD of opstartbare USB stick in je computer. Met geluk zie je de grub loader! Jeej! Je gaat verder...
2. Je gaat je harde schijf opzetten en formatteren via cgdisk. Ging niet vanzelf, maar uiteindelijk is het je gelukt.
3. Je mount je partities en installeer je base systeem met de nodige moeite.
4. Je moet nu alles zelf configureren zoals fstab en de grub bootloader installeren en configureren. Je raakt lichtelijk geïrriteerd en vermoeit, MAAR je weet waarvoor je het doet!!
5. Uiteindelijk herstart je je systeem. En tada! Dit is wat je ziet:

![Arch tty login](/images/2015/11/arch_login_tty.png "Arch Linux login terminal")

![Are you kidding me?](/images/2015/11/kidding_me.jpg)

Ow no! :O Ja, dat is het, een login console. Je bent nu vrij om te doen wat je wilt. "Less is more". X server installeren en configureren en je eigen window manager installeren. Wat een gedoe....

Gelukkig kwam iemand op het idee om een distributie te maken die de gebaseerd is op Arch Linux. Deze distributie heet **Antergos**. Met Antergos heb je alle voordelen van Arch, terwijl de installatie 20x sneller en eenvoudiger is.

### Installatie

Antergos kun je downloaden van: [antergos.com](https://antergos.com/try-it/). Kies voor het gemak voor "Antergos Live ISO", die ook installatie mogelijkheden bied. Je kunt ook voor de "Antergos ISO minimal" gaan als je hem enkel wilt installeren.

Opstartbare USB kun je maken het `dd` commando. Dit commando kopieert bitje voor bitje je ISO naar je USB stick. Volg [deze handleiding](https://antergos.com/wiki/nl/install/create-a-working-live-usb/).

Installatie verliep bij mij vlekkeloos, geen problemen ondervonden en ziet er mooi uit. Ik koos voor Cinnamon als desktop omgeving.

![](/images/2015/11/select_desktop.png "Selecteer jouw favoriete window manager")

Als je dit keer je systeem herstart na installatie heb je een systeem die je meteen kunt gebruiken. Het ziet er ook gelikt uit, omdat Antergos gebruikt maakt van het [Numix Project](http://numixproject.org/). Numix heeft prachtige icons.

![Antergos - Cinnamon](/images/2015/11/antergos_cinnamon.png "Antergos - Cinnamon")

### Gebruik

![](/images/2015/11/arch-linux-logo.png)

Antergos is zoals eerder gezegd eigenlijk gewoon Arch Linux onder water. Wat bied Arch voor mogelijkheden ten opzichte van andere Linux distros? Waarom is Arch zo bijzonder?

In het eerste geval in Arch behoorlijk uniek van de manier van uitrollen van pakketten. Zo kent Debian bijvoorbeeld releases met een redelijke vaste versies van pakketten (Debian Stable en Testing).  Terwijl Arch Linux per definitie een rolling-release is. Een rolling release betekent dat zodra er een nieuwe versie beschikbaar komt in de Arch repository, deze versie meteen te installeren / updaten is. Zo heb je eigenlijk altijd de meest nieuwe versie binnen handbereik.

Arch Linux heeft als doel om _simpel_, _lichtgewicht_ te zijn waarbij de gebruiker in beheer is. Arch is op de _gebruiker afgestemd_, terwijl andere distributies juist meer "gebruiksvriendelijker" proberen te zijn.  Arch Linux is in het algemeen wel bedoeld voor de wat geavanceerde Linux gebruiker en ontwikkelaars. Antergos maakt Arch daarentegen een stuk toegankelijker voor de gebruiker.  
Arch heeft net als Debian/Ubuntu ook een package manager, pacman, waarbij Arch enkel de architecturen i686 en x86_64 ondersteund (officieel). Ja, Arch is ook te gebruiken op Raspberry Pi, wat dan weer een ARM architectuur betreft. Doordat Arch voornamelijk i686 / X86_64 architecturen ondersteund, zijn de gebouwde pakketten sneller en meer geoptimaliseerd vergeleken i486/i586 binary distributies.

Arch kent "AUR" (Arch User Repository), waarbij je een behoorlijk groot aantal extra gecompileerde pakketten erbij krijgt. Je maakt dan gebruik van het commando _yaourt_ in plaats van _pacman_ (gelukkig wel met dezelfde syntax te gebruiken 🙂 ). Veel pakketten beginnen eerst in AUR, voordat de pakketten toegevoegd worden aan de officiële repositories.

Heb ik je nog niet weten te overtuigen? Lees dan eens de [Arch Principles](https://wiki.archlinux.org/index.php/Arch_Linux#Principles).

## Conclusie

![](/images/2015/11/antergos_display.png)

Ik ben erg te spreken over Antergos. Van niks tot een werkend Arch Linux systeem was zo gepiept. Antergos is erg lichtgewicht, krachtig en elegant. Het is niet super lastig om Arch linux te snappen en te gebruiken helemaal nu Antergos al veel voor je geconfigureerd heeft. Je moet alleen niet bang zijn voor de command-line. Dit maakt Arch juist zo krachtig.

Arch is iets meer tijdrovend om te configureren vergeleken met Linux Mint. Zo krijg je niet allerlei onnodige pakketten voorgeinstalleerd, enkel de hoognodige, waardoor het systeem super snel is. Uiteindelijk doe je veel ervaring op en geeft het je veel waardering. Antergos neemt gelukkig al veel van het installeren en initiële opzet uit handen, zodat je een goede basis hebt. Ga Antergos gewoon proberen!
