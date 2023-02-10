---
title: i3 vs Awesome vs Xmonad vs dwm
author: Melroy van den Berg
type: post
date: -001-11-30T00:00:00+00:00
draft: true
url: /?p=1647
categories:
  - Windows OS
---

i3, Awesome, Xmonad, dwm, de wattes? Ik snap dat de meeste mensen niet bekent zijn met 1 van deze namen. Echter het zijn stuk voor stuk zeer krachtige en geavanceerde **window managers** voor GNU/Linux (niet te verwarren met Windows 😉 ).

## Wat zijn Window Managers?

Window Managers (WM), ook bekent als vensterbeheerder, is software die verantwoordelijk is voor het "tekenen" en plaatsen van de vensters op het scherm van de gebruiker van een besturingssysteem, zie onderstaande afbeelding voor een voorbeeld van Linux Mint. Linux Mint gebruikt zogenaamd Muffin voor zijn vensterbeheer software. Dit stuk software is dus een belangrijk onderdeel voor het grafisch weergeven van de gebruikersinterface. Het is gebruikelijk dat je deze vensters kunt verplaatsen, dichtklappen, vergroten/verkleinen, sluiten en meer. Alleen sommige mensen die vinden deze standaard mogelijkheden "ouderwets". Deze mensen gebruiken daarom wat minder voor de hand liggende Window managers.

![Linux Mint Muffin](/images/2014/05/linux_mint.png "Linux Mint - maakt gebruik van Muffin (fork van Mutter)")

## Window Managers voor gevorderden

Zoals eerder aangegeven, bestaand er ook geavanceerde Window managers. In dit artikel ga ik verder in zogenaamde tiling window managers. Deze window managers maken ook gebruik van "vensters", maar deze overlappen elkaar niet in tegenstelling tot de meer populaire/gangbare manier zie Linux Mint of Windows 7.

De vier meest bekende tiling window managers heten: i3, Awesome, Xmonad en dwm (**niet** gesorteerd op bekendheid). Waarom zou je afwijken van de standaard Window manager? En wat bieden deze Tiling window managers die andere Window managers niet bieden?  
Lees snel verder.

### Awesome

Awesome is een van de geavanceerde window managers voor Linux. Awesome is uiterst configureerbaar, snel en uitbreidbaar. Zie hieronder enkele voorbeelden:

![](/images/2014/05/archlinux_awesome_wm.png "Awesome WM #1")

![](/images/2014/05/arch_linux_and_awesome.png "Awesome WM #2")

![](/images/2014/05/Awesome_WM.png "Awesome WM #3")

Awesome hè? 😛

Zoals je ziet, ziet Awesome er zeer anders uit dat de meest gangbare window managers. Je kunt Awesome configureren via een taal genaamd Lua, wat erg op de Python programmeertaal lijkt. Hierin kun je aangeven hoe je scherm eruit kom te zien, wat je waar kunt zetten, welke toetscombinaties je wilt gebruiken en nog veel meer. Wat een zeer krachtig aspect van Awesome is dat je **geen** muis nodig hebt, alles kun je aansturen met je toetsenbord.

#### Installeren & gebruiken

Awesome kun je onder Linux installeren via: `sudo apt-get install awesome`

Voor extra libaraies (zoals **Vicious**, zie later), installeer: `sudo apt-get install awesome-extra`

Standaard maakt Ubuntu en Linux Mint al gebruik van een login manager. In dat geval wordt Awesome automatisch geïnstalleerd in deze login managers: GDM (Gnome Display Manager) voor Ubuntu of **MDM** (mdm Display Manager) voor Linux Mint.

Het configuratie bestand kun je vinden in je home folder: `gedit ~/.config/awesome/rc.lua`

## Xmonad
