---
title: "Ubuntu commando's & locaties"
author: Melroy van den Berg
type: post
date: 2013-12-04T14:58:36+01:00
url: /2013/ubuntu-commandos-locaties/
featured_image: /images/2013/10/terminal_commands_ubuntu_homepage.png
categories:
  - Beginner
  - GNU/Linux OS
  - Handy Tools
  - Intermediate
  - Internet/SEO/Websites
  - Server
tags:
  - commands
  - download
  - GNU
  - free
  - useful
  - Linux
  - locations
  - Ubuntu
---

![](/images/2013/10/ubuntu_logo.png)

Ik kreeg onlangs de vraag of ik enkele handige commando's wist voor op Ubuntu. Voor de mensen die niet weten wat Ubuntu is, dat is een besturingssysteem net als Windows of Mac OS X, maar deze is gebaseerd op GNU/Linux genaamd "Ubuntu Linux" Deze zogenaamde distributie is **gratis** te [downloaden](http://www.ubuntu-nl.org/download) en te gebruiken. Lees dit artikel verder voor alle handige commando's en locaties voor Ubuntu.

Goed alternatief voor Ubuntu is [Linux Mint](https://linuxmint.com/), ook tevens gratis te gebruiken.

<!--more-->

### Nog even dit...

De meeste commando's die ik hieronder heb staan gelden voor Ubuntu Linux en zullen daarom ook op andere Linux besturingssystemen werken zoals Debian. Echter sommige commando's zijn redelijk specifiek en zullen daarom niet beschikbaar zijn op alle distributies (=een verzamelnaam voor alle verschillende Linux gebaseerde besturingssystemen).

### Handige commando's

Hieronder vind je een overzicht van veel gebruikte en handige commando's onder Ubuntu, de tabel loopt van **vaak gebruikte** commando's naar **steeds meer geavanceerde** commando's.

| Commando                            | Beschrijving                                                                                                                           |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| man <commando>                      | Uitleg voor hoe je het desbetreffende commando moet/kan gebruiken.                                                                     |
| su - root                           | Inloggen als Root gebruiker                                                                                                            |
| sudo                                | Commando uitvoeren met (beperkte) root privileges                                                                                      |
| cd <map>                            | Ga naar de betreffende map, met een slash (/) kun je in een keer meerdere mappen diep                                                  |
| cp <bestand> <plaats waarheen>      | Kopieer een bestand (eventueel ook naar een andere locatie)                                                                            |
| mv <bestand> <plaats waarheen>      | Verplaats een bestaand bestand naar een andere locatie                                                                                 |
| rm <bestand>                        | Verwijder het bestand                                                                                                                  |
| rmdir <folder>                      | Verwijder de map/folder                                                                                                                |
| mkdir <folder>                      | Maak een map/folder aan                                                                                                                |
| ls                                  | Print de inhoud van de huidige map                                                                                                     |
| sudo apt-get update                 | Pakkage manager (vergelijkbaar met: Google's Play Story) database bijwerken                                                            |
| sudo apt-cache search <naam>        | Zoek naar een pakket in de database                                                                                                    |
| sudo apt-get install <naam>         | Installeer het desbetreffende programma/pakket. Met -f optie, probeer je een bestaand programma op te lossen indien er problemen zijn. |
| sudo apt-get remove <naam>          | Verwijder het desbetreffende programma/pakket (configuratie bestanden blijven aanwezig)                                                |
| sudo apt-get --purge remove <naam>  | Verwijder het programma inclusief configuratie bestanden                                                                               |
| apt-get autoremove                  | Verwijder alle overbodige/onnodige pakketten                                                                                           |
| gksudo nautilus                     | Open bestandsbeheer als root gebruiker                                                                                                 |
| gedit                               | Open grafische tekstverwerker                                                                                                          |
| passwd                              | Stel een nieuw wachtwoord in voor de huidige gebruiker                                                                                 |
| sudo /etc/init.d/networking restart | Herstart het netwerk                                                                                                                   |
| ifup <interface>                    | Schakel een interface in (bijv. ifup eth0)                                                                                             |
| ifdown <interface>                  | Schakel een interface uit                                                                                                              |
| ifconfig                            | Overzicht van de netwerk instellingen                                                                                                  |
| iwconfig                            | Overzicht van de wireless instellingen                                                                                                 |
| start <service>                     | Start een service (bijv. start apache2)                                                                                                |
| stop <service>                      | Stop een service                                                                                                                       |
| status <service>                    | Bekijk de status van een service (is het actief)                                                                                       |
| sudo /etc/init.d/gdm restart        | Herstart X (GNOME)                                                                                                                     |
| Ctrl+Alt+Backspace                  | Herstart X omgeving (wanneer het hangt)                                                                                                |
| Ctrl+Alt+F<N>                       | Schakel naar een command-line scherm. N is een getal tussen 1 en 12, behalve 7                                                         |
| Ctrl+Alt+F7                         | Schakel terug naar de X omgeving (voor GNOME)                                                                                          |
| lsb_release -a                      | Vraag de huidige Ubuntu versie op                                                                                                      |
| uname -r                            | Vraag kernel versie op                                                                                                                 |
| uname -a                            | Vraag alle kernel informatie op                                                                                                        |
| sudo ufw enable                     | Zet de firewall aan (ubuntu)                                                                                                           |
| sudo ufw disable                    | Zet de firewall uit                                                                                                                    |
| sudo ufw status [verbose]           | Vraag de firewall status op (met verbose krijg je een uitgebreide status)                                                              |
| sudo ufw default allow              | Sta alle verbindingen standaard toe                                                                                                    |
| sudo ufw default deny               | Laat alle verbinding standaard vervallen                                                                                               |
| sudo ufw allow port <poort>         | Sta verbinding toe op een specifieke poort                                                                                             |
| sudo ufw deny port <poort>          | Blokkeer de verbinding op een specifieke                                                                                               |
| sudo ufw deny from ip <ip_adres>    | Blokkeer verbinding van een specifiek IP-adres                                                                                         |

### Handige locaties

Hieronder vind je een overzicht van veel gebruikte en handige locaties.

| Locatie / Bestand                  | Beschrijving                                                                                                          |
| :--------------------------------- | :-------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| cd ~                               | Ga je naar je home-map van je huidige gebruiker                                                                       |
| cd -                               | Ga je 1 map terug                                                                                                     |
| cd ..                              | Ga je een level omhoog in de map structuur                                                                            |
| cd ~/Desktop                       | Ga naar je bureaublad folder                                                                                          |
| cd ~/Documents                     | Ga naar je documenten folder                                                                                          |
| sudo gedit /etc/network/interfaces | Netwerk instellingen bestand (instellingen toepassen doe je via: sudo /etc/init.d/networking restart)                 |
| sudo gedit /etc/resolv.conf        | DNS configuratie bestand                                                                                              |
| cd /var/www                        | Webserver map                                                                                                         |
| gedit /var/log/auth.log            | Autorisatie log bestand                                                                                               |
| gedit /var/log/kern.log            | Kernel log bestand                                                                                                    |
| gedit /var/log/messages            | Nuttig informatie log bestand van programma's                                                                         |
| gedit /var/log/syslog              | Systeem informatie log bestand van je Ubuntu systeem                                                                  |
| grep sshd /var/log/auth.log        | less                                                                                                                  | Een overzicht van alle externe login pogingen via SSH |
| gedit /var/log/rkhunter.log        | Overzicht van rootkit hunter, dit programma controleert voor backdoors, sniffers en rootkits op je Ubuntu installatie |
| gedit /var/log/cups/error_log      | Problemen met printen? Zoek een in dit log bestand                                                                    |
| faillog                            | Mislukte aanmeldingen                                                                                                 |
| lastlog                            | less                                                                                                                  | Laatste login poging                                  |
| who                                | Huidige lijst van ingelogde gebruikers op het systeem                                                                 |
| gedit /var/log/apache2/access.log  | Toegangs log bestand voor Apache webserver                                                                            |
| gedit /var/log/apache2/error.log   | Error log bestand voor Apache webserver                                                                               |

#### Meer...

Als je meer wilt weten hoe je met een Terminal werkt, kun je [hier klikken](http://wiki.ubuntu-nl.org/community/WerkenMetDeTerminal).

Handige sneltoets combinaties in Ubuntu, kun je [hier vinden](http://www.maketecheasier.com/useful-shortcut-keys-in-ubuntu/).
