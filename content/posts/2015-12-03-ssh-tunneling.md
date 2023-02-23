---
title: "SSH tunneling: interne/externe poort doorsturing"
author: Melroy van den Berg
type: post
date: 2015-12-03T11:23:39+01:00
url: /2015/ssh-tunneling/
featured_image: /images/2015/10/cern_large_hadron_collider.jpg
categories:
  - GNU/Linux OS
  - Handy Tools
  - Intermediate
  - Mobile
  - Security
  - Server
tags:
  - externe poort doorsturen
  - firewall
  - lokale poort
  - NAT
  - OpenSSH
  - remote access
  - secure shell
  - SSH
  - SSH forwarding
  - SSH tunneling
---

![SSH login](/images/2015/10/ssh_login.png "SSH login")

SSH (Secure-shell) wordt gebruikt om remote in te loggen in een server of computer. Maar wist je dat je nog veel meer met SSH kunt doen? Naast remote inloggen, bied SSH ook ondersteuning voor het *doorsturen van TCP poorten* (tunnel), X11 verbindingen om je _beeld_ door te sturen en tot slot *bestandsoverdracht* (wat via SFTP of SCP gaat).  
We houden het in dit artikel bij het doorsturen van poorten, ook wel **SSH tunneling** genoemd.

Wat is SSH tunneling? En wat kun je er allemaal mee doen?

<!--more-->

## Secure Shell tunneling {#Secure_Shell_tunneling}

**SSH** (Secure-Shell) kan gebruikt worden om via een beveiligde manier verbinding te leggen met je SSH server, die publiekelijk bereikbaar is. Er bestaan twee soorten manieren om een SSH tunnel te creëren. De eerste manier is een lokale of externe poort door te sturen. De andere manier is dynamische doorsturen, het laatste komt niet aanbod in dit artikel.

We behandelen hoe je een externe server/website/computer kan bereiken binnen je huidige netwerk. Het betreft dan een server, website of computer waarbij je op dit moment niet bij kunt. Daarnaast behandelen we hoe je je eigen lokale poort door te sturen naar "buiten" zonder dat je de poorten hoeft op te zetten op je router.

## Lokale poort doorsturing

Stel we willen een website bereiken, die je op dit moment op je huidige netwerk niet kan bereiken omdat deze geblokkeerd is. Dit kan komen door firewall regels in een router of gewoonweg internet censuur!

Stel we nemen tinypic.com als voorbeeld. Om langs de internet blokkade te werken is het mogelijk om een SSH tunnel op te zetten. Uiteraard moet de SSH server dan wel toegang hebben tot deze website. Om op je huidige netwerk toch bij tinypic.com te kunnen komen, voer je het volgende uit op de Linux terminal:

```sh
ssh -nNt -L 8080:tinypic.com:80 gebruiker@jouwserver.nl
```

Zolang dit commando actief is, kun je de website op je huidige netwerk toch bereiken door naar het volgende adres te gaan in je webbrowser: [http://localhost:8080](http://localhost:8080). Optioneel kun je het commando uitvoeren zonder &#8220;-nNT&#8221;, op dat moment log je in, net als bij normaal SSH gebruik.

![Locaal tunneling](/images/2015/10/ssh_tunneling.png "Lokaal tunneling: `ssh -L 1234:localhost:5678 gebruiker@jouwserver.nl`")

Dit zelfde principe gebruik ik soms om computers of routers te bereiden zonder dat ik daartoe direct toegang toe heb. Zolang ik een server heb waarop ik kan inloggen via SSH, kan ik toch  bij de router webinterface komen. Stel in dit geval is het routers IP-adres: 192.168.1.1. Om deze router te benaderen gebruik je het volgende commando (mijn SSH server staat dan wel in hetzelfde netwerk als de router):

```sh
ssh -nNt -L 8080:192.168.1.1:80 gebruiker@jouwserver.nl
```

Als ik nu naar [http://localhost:8080](http://localhost:8080) zou gaan, dan kom ik terecht op de router  van het externe netwerk. Gevaarlijk? Tja, misschien. Veilig? Het gaat via secure verbinding, dus dat is wel veilig. Alleen de manier waarop uhh... Strafbaar? Geen idee 🙂.

## Externe poort doorsturing

Nu draaien we de boel om. Stel je wilt een lokale poort in je huidige netwerk naar buiten brengen. Echter je hebt geen rechten om de NAT instellingen van de router te wijzigen.

Om nu je lokale poort bereikbaar te maken vanaf buitenaf en te binden op alle interfaces, gebruik je het volgende commando: `ssh -nNT -R \*:8080:localhost:80 -N gebruiker@jouwserver.nl`

Het verschil is relatief klein, in plaats van "-L" is het nu "-R". In het bovenstaande voorbeeld kun je nu verbinding maken met jouwserver.nl:8080 die dan verwijst naar poort 80 op **jouw eigen** computer.

![Extern tunneling](/images/2015/10/ssh_tunneling_extern.png "Extern tunneling: `ssh -R 1234:localhost:5678 gebruiker@jouwserver.nl`")

Kortom, via externe poort forwarding is het mogelijk dat mensen buiten jouw netwerk toegang krijgen tot jouw lokale webserver (die op poort 80 draait). Al zit er een firewall en NAT tussen.

Als je externe poort forwarding wilt gebruiken en je gebruikt OpenSSH, dan is het noodzakelijk dat je het volgende configuratie bestand aanpast: `sudo nano /etc/ssh/sshd_config`

Zet dan `GatewayPorts` op `Yes`:

```
GatewayPorts Yes
```

Herstart nu de SSH server: `sudo service ssh restart`
