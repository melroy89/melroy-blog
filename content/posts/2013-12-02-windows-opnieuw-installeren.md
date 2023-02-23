---
title: Windows opnieuw installeren
author: Melroy van den Berg
type: post
date: 2013-12-02T17:02:48+01:00
modal: true
url: /2013/windows-opnieuw-installeren/
featured_image: /images/2013/10/Windows7Logo_homepage.png
categories:
  - Handy Tools
  - Intermediate
  - Windows OS
tags:
  - OS
  - backup
  - BIOS
  - boot
  - download
  - laptop
  - PC
  - Windows
---

![Windows reinstall](/images/2013/10/reinstall.jpg)

De laatste tijd hoor ik veel verschillende mensen die graag Windows opnieuw willen installeren op hun computer / laptop. Helaas is de kennis vaak te beperkt om Windows opnieuw te kunnen installeren, tot vandaag tenminste 😉 Als je deze handleiding stap-voor-stap volgt kun je het voortaan gewoon zelf.

Deze volledige handleiding is bedoeld voor mensen die weinig/beperkt kennis hebben van ICT en graag hun computer opnieuw willen installeren. We gaan ervan uit dat je **niet** beschikt over een Windows 7 DVD. Kortom _DE_ handleiding als je nog nooit Windows zelf opnieuw geïnstalleerd hebt.

<!--more-->

### Scenario

Je hebt een trage computer of laptop of je hebt virussen / malware op je PC staan. In deze gevallen is het handig opnieuw je Windows te installeren. In deze handleiding gaan we eruit van dat alles nagenoeg weer in de oude staat terug komt (maar dan bijvoorbeeld zonder virussen :P). We gaan er ook vanuit dat het systeem nog opstart.

### Waarom?

Door je Windows met zekere regelmaat opnieuw te installeren heeft als voordeel dat alles weer "schoon" is, waardoor het systeem weer een stuk sneller reageert. Andere voordelen zijn dat je misschien een virus of malware hebt, door Windows opnieuw te installeren weet je zeker dat je daar vanaf bent.

### Inhoudsopgave

De handleiding is opgebouwd uit de volgende stappen:

1. Data back-uppen
2. Het downloaden van Windows 7
3. Het maken van je Windows 7 installatie DVD
4. (Optioneel) Het maken van je Windows 7 USB stick
5. Het opstarten van je DVD of USB
6. (Optioneel) Je systeeminstellingen aanpassen
7. Windows installatie zelf 🙂
8. Windows activeren
9. (Optioneel) Windows drivers
10. Programma's weer installeren

Als de stap *Optioneel* is, is deze stap niet per definitie noodzakelijk en kan deze stap overgeslagen worden. Echter afhankelijk van je keuzes of problemen dien je deze stappen **wel** te volgen.

Laten we nu maar beginnen met de handleiding, ga naar stap 1.

### Stap 1. Back-up je data

De belangrijkste stap voordat we beginnen, en ik kan het niet vaak genoeg herhalen, is het back-up-en van je data. Kortom sla je belangrijke documenten en bestanden op een andere computer op of zet het op andere media (denk aan een externe harde schrijf of een USB stick). De programma's die nu geïnstalleerd zijn op je huidige systeem kunnen helaas niet zo eenvoudig gebackupped worden. Echter het programma kun je daarna gewoon opnieuw installeren.  _**Goudentip**:_ stel een lijst op met al jouw meest gebruikte programma's.

In dit geval van spellen die je hebt geïnstalleerd, hiervan kun je misschien de opgeslagen bestanden ("save-files") redden, lees hieronder verder waar je dan moet zoeken.

Belangrijke locaties waar je eigenlijk zou moeten kijken voor belangrijke documenten vind je hieronder. Dit geldt voor elke gebruikersaccount op de computer waarvan je een back-up wilt hebben. We gaan er vanuit dat je data op je C: schrijf bewaard wordt (standaard in Windows):

- Je **documenten**: C:\Users\<jouw_gebruikersnaam>\Documents
- Je **muziek**: C:\Users\<jouw_gebruikersnaam>\Music
- Je **foto's**: C:\Users\<jouw_gebruikersnaam>\Pictures
- Je **downloads** (kijk alleen wat je echt nodig hebt) C:\Users\<jouw_gebruikersnaam>\Downloads
- Opgeslagen bestanden voor **spellen** (save-files) kunnen vaak gevonden worden in een verborgen mappen: C:\Users\<jouw_gebruikersnaam>\AppData\LocalEn: C:\Users\<jouw_gebruikersnaam>\AppData\RoamingGevolgd door de naam van het spel.
- Eventuele website **favorieten** (van je webbrowser): C:\Users\<jouw_gebruikersnaam\Favorites
- Kijk voor de zekerheid ook even op je **bureaublad** (Desktop) of daar belangrijke documenten aanwezig zijn die opgeslagen moeten worden.

De belangrijkste stap heb je nu gedaan: het veiligstellen van je belangrijke documenten en data ;).

### Stap 2. Download de Windows 7 DVD

Zoals eerder genoemd, gingen we er vanuit dat je **niet** over een bestaande Windows 7 CD of USB beschikte. Als je deze wel bijdehand hebt is dat natuurlijk prima en kun je deze stap overslaan. De legale manier om een Windows CD te downloaden is om de zogenaamde OEM cd te downloaden, wat staat voor **O**riginal **E**quipment **M**anufacturer en vervolgens te installeren met je eigen Windows sleutel (download hiervoor [dit programma](http://www.magicaljellybean.com/downloads/KeyFinderInstaller.exe), om je Windows sleutel te achterhalen). Echter we gaan in deze handleiding verder over hoe je dit moet doen als je niet weet hoe je aan je OEM CD komt en welke je dan moet hebben.

Je hebt twee keuzes: 32bit of 64bit. Ok, nu niet meteen gaan stressen welke je moet hebben 😛 Dat leg ik je nu rustig uit.  
Ga naar Start (Windows-icoontje linksonder in), via **RECHTER**muis klik druk je op "Computer". Je krijgt dan een menu te zien, en je kies voor "Eigenschappen".

![eigenschappen](/images/2013/10/eigenschappen.png "Computer Eigenschappen")

Nu opent Windows een nieuw scherm, met informatie. Op een begeven moment zie je "Geïnstalleerde geheugen (RAM):" staan. Hier kan bijvoorbeeld; 1GB, 2GB of 4GB staan. De regel is simpel: heb je meer 4GB of meer..? Kies dan voor de 64bit variant en anders voor de 32bit Windows variant. Zoals hieronder heb ik meer dan 4GB je ziet daaronder dat mijn huidige Windows installatie een "64 bitsbesturingssysteem" is.

![ram](/images/2013/10/ram.png "Windows geheugen")

Vervolgens heb je [µTorrent](http://www.utorrent.com/downloads/win) nodig om het bestand daadwerkelijk te kunnen downloaden, dit programma is gratis te download, [klik hier](http://www.utorrent.com/downloads/win).

![utorrent](/images/2013/10/utorrent.png "uTorrent programma")

Nadat je µTorrent geïnstalleerd hebt, download je de desbetreffende Windows 7 installatie CD:

- Download: [Windows 7 32bit](http://kickass.to/microsoft-windows-7-sp1-ultimate-32bit-677453-nl-t5861339.html)
- Download: [Windows 7 64bit](http://kickass.to/microsoft-windows-7-sp1-all-in-one-64bit-nl-t5862494.html)

Druk op de "Download Torrent" knop op het bestand te downloaden:[![download_torrent](/images/2013/10/download_torrent.png)](http://kickass.to/microsoft-windows-7-sp1-ultimate-32bit-677453-nl-t5861339.html)

Het download proces is afhankelijk van je internet snelheid, en kan daardoor even duren. Je hebt uiteindelijk een digitale kopie van de Windows DVD (het bestand eindigt op: .iso).

### Stap 3. Het bestand wegschrijven naar een DVD

_Beschik je niet over een lege DVD, maar wel een **USB**? Zie de volgende stap (stap 4) en sla deze stap over._

In de vorige stap heb je een Windows DVD gedownload, dit bestand kunnen we nu gaan schrijven op een DVD. Dit doen we door gebruik te maken van "Windows 7 USB & DVD Tool", dit programma is van Windows en is gratis [hier te downloaden](]http://images2.store.microsoft.com/prod/clustera/framework/w7udt/1.0/en-us/Windows7-USB-DVD-tool.exe).

![Windows-7-USB.DVD-download-tool](/images/2013/10/Windows-7-USB.DVD-download-tool.png) "Windows 7 USB & **DVD** Tool"

Start het programma op. En plaats vervolgens een lege DVD in je CD/DVD branden. Volg de stappen op het scherm (stap 1: selecteer het bestand die je net heb gedownload, stap 2: kies voor "DVD", stap 3: selecteer de lege DVD en druk op "Start branden").

Het branden van de DVD kan even duren, kortom heb even geduld en neem gerust een bakkie koffie.

![koffie](/images/2013/10/koffie.png)

Gefeliciteerd! Je hebt nu een Windows DVD :D. Ga verder met stap 5.

### Stap 4. (Optioneel) Het bestanden wegschrijven naar een USB

_Sla deze stap over als je al een DVD heb gemaakt in stap 3._

![windows_usb](/images/2013/10/windows_usb.png)

In stap 2 heb je een Windows ISO bestand gedownload, dit bestand kunnen we wegschrijven naar een USB stick (met minimaal 4GB aan opslaggeheugen). Let op dat alle data wordt verwijderd van deze USB stick, dus back-up eventuele data eerst van deze USB voordat je verder gaat.

We maken gebruik van de gratis tool genaamd "Windows 7 USB & DVD tool" en deze is [hier te downloaden](]http://images2.store.microsoft.com/prod/clustera/framework/w7udt/1.0/en-us/Windows7-USB-DVD-tool.exe). Doe de USB stick erin en start het programma. Volg de stappen op het scherm (stap 1: selecteer het bestand die je net heb gedownload, stap 2: kies voor "USB apparaat", stap 3: select de USB stick en druk op "Start branden").

![Windows-7-USB.DVD-download-tool](/images/2013/10/Windows-7-USB.DVD-download-tool.png "Windows **USB** & DVD Tool")

Gefeliciteerd! Je hebt nu een Windows opstartbare USB :D.

### Stap 5. DVD / USB opstarten

Je beschikt nu over een DVD of een USB stick met Windows erop, hiermee kunnen we Windows op je computer of laptop installeren. Doe je DVD in de DVD speler van je computer waar Windows opnieuw op geïnstalleerd wilt hebben of doe je USB stick in je computer.

Start je computer opnieuw op, indien je Windows installatie automatisch opstart is dat een goed teken. Druk op een willekeurige toets als dat wordt gevraagd. Je kunt nu verder naar stap 7.  
Indien je Windows installatie nu **niet** **automatisch** begint, dan moet je eerst nog de opstart volgorde veranderen van je computer / laptop. Helaas is het laatste geval meestal van toepassing, zie stap 6.

### Stap 6. (Optioneel) Systeem instellingen aanpassen

Vaak is het nodig om de opstart volgorde kan je aanpassen, dit kan via de BIOS. De BIOS is als het ware het beginpunt van je computer (als je de computer aanzet).

Om toegang te krijgen tot deze BIOS, moet je bij het opstarten van je computer op een toets drukken. De laatste jaren worden over het algemeen de toetsen **F1, F2, DEL, ESC, of de F10** toets gebruikt. Meestal staat er op je opstartscherm ook welke toets je toegang geeft tot deze BIOS. We gaan er vanuit dat het de F2 toets betreft, druk dan (het liefst meerdere malen) de F2 toets in totdat je in de BIOS bent. Dit ziet er zo uit:

![bios](/images/2013/10/bios.png "Zo kan de BIOS eruit zien")

De BIOS ziet er vaak blauw en ouderwets uit, wees **niet** bang hoe het eruit ziet. Ik laat je nu stap voor stap door de instellingen lopen, zodat je de opstart volgorde kan veranderen waardoor Windows installatie wel gaat opstarten.

Jammer genoeg ziet niet elke BIOS er hetzelfde uit, maar het komt allemaal op grofweg op hetzelfde neer. Als eerste selecteert u met behulp van de pijltjestoetsen het **Boot/menu/tab** van het BIOS en druk je op enter. Als je geen Boot menu/tab hebt, ga dan naar "Advanced BIOS features" en zoek naar "Boot Device".

Hieronder de het Boot menu/tab geselecteerd:

![bios_boot_menu](/images/2013/10/bios_boot_menu.png "De Boot tab is geselecteerd")

Onderaan zie je welke knop je moet gebruiken voor het veranderen van de volgorde, in dit geval gebruik je de **min (-)** en **plus (+)** knop op je toetsenbord. Soms moet je eerst op Enter drukken om de eerste item te selecteren.

**_Heb je een DVD?_**  
Selecteer "CD-ROM Drive" (of qua naam erop lijkt, zoals "P0-HL-DT-ST DVDROM") via de pijltjestoetsen als eerste opstart prioriteit. "CD-Rom Drive" moet komt dus bovenaan te staan.

**_Heb je een USB stick?_**  
In dit geval moet "Removable Devices" (of qua naam erop lijkt, zoals "USB drive") bovenaan staan als eerste opstart prioriteit.

Let erop dat je je "Hard drive" nooit uit je opstartvolgorde verwijderd.

**_Tip:_** Als je denkt dat je iets niet goed heb gedaan, druk je gewoon op de Esc knop, waardoor je wijzigingen **NIET** worden opgeslagen. Je kunt gewoon overnieuw beginnen totdat je denkt dat het klopt.

Nu je de opstartvolgorde succesvol heb veranderd, kun je de instellingen opslaan door op F10 te drukken. En daarna te bevestigen met de Enter toets.

![bios confirm](/images/2013/10/bios_confirm.png "Bevestig je instellingen door op F10 te drukken")

Goed zo, het is je gelukt :D! Je hebt nu de opstartvolgorde veranderd. Herstart je computer om naar je Windows installatie te gaan. Druk op een willekeurige toets als dat wordt gevraagd.

### Stap 7. Windows installatie

We zijn in de Windows installatie. Eindelijk..., mogen we wel zeggen. Volg de volgende stappen voor het installeren van Windows:

1. Geef op de pagina Windows installeren uw taal op en klik op Volgende. Druk daarna op "Nu Installeren"  
   ![installatie 1](/images/2013/10/installatie_1.jpg)
2. Klik op Ik ga akkoord met de licentievoorwaarden. Klik daarna op Volgende.  
   ![installatie 3](/images/2013/10/installatie_3.jpg)
3. Klik op nu op Aangepaste installatie:  
   ![installatie 4](/images/2013/10/installatie_4.jpg)
4. Klik op de pagina Waar wilt u Windows installeren? op Stationsopties (geavanceerd).
5. Klik op de partitie die u wilt wijzigen, klik op de formatteeroptie die u wilt uitvoeren en volg de instructies.  
   ![installatie 5](/images/2013/10/installatie_5.jpg)
6. Klik op Volgende wanneer u klaar bent met formatteren. De installatie begint nu:  
   ![installatie 6](/images/2013/10/installatie_6.jpg)
7. Tijdens de installatie zal Windows automatisch nieuw opstarten. Volg de instructies om de installatie van Windows 7 te voltooien, zoals het opgeven van een naam voor de computer en het instellen van een gebruikersaccount.  
   ![installatie 7](/images/2013/10/installatie_7.jpg)  
   ![installatie 8](/images/2013/10/installatie_8.jpg)
8. Wanneer er gevraagd wordt om je Windows productcode, druk dan gewoon op Volgende om deze stap over te slaan.  
   ![installatie 9](/images/2013/10/installatie_9.jpg)
9. Bij Windows Updates kiezen we voor Later opnieuw vragen. We willen geen updates installeren, deze kunnen in de toekomst enkel problemen geven met het activeren van je Windows installatie.  
   ![installatie 10](/images/2013/10/installatie_10.jpg)
10. De klok instellingen staan standaard goed. Druk op Volgende.
11. Kies voor Thuisnetwerk:  
    ![installatie 11](/images/2013/10/installatie_11.jpg)
12. We zijn klaar met Windows installeren!

### Stap 8. Windows activeren

Als je een legale sleutel hebt, dan kun je deze proberen (je hebt immers meestal al betaald voor Windows). Helaas de stikker die achterop je computer zit met een Windows productcode moet je wederom weer voor betalen om deze productcode te kunnen gebruiken. Kortom: Windows maakt het weer onnodig ingewikkeld en dat terwijl je er voor hebt betaald!

Daarom leg ik je nu uit hoe je eenvoudig je Windows kan activeren, via een programma genaamd Windows Loader, zoek het liefst op [Google](https://www.google.nl/#q=window+Genuine+%28By+Daz%29&safe=off) voor de laatste versie. Of [download hier](http://kickass.to/windows-loader-2-2-1-by-daz-t7250965.html) (het .torrent bestand kun je open met [uTorrent](http://www.utorrent.com/downloads/win), wat je eerder al geïnstalleerd had) de laatste versie op dit moment (3.5.5).

Druk op de "Download Torrent" knop op het bestand te downloaden:

[![windows loader](/images/2013/10/windows_loader.png)](http://kickass.to/windows-loader-2-2-1-by-daz-t7250965.html)

Start het programma op nadat je het gedownload hebt. En druk op de Install knop. Herstart daarna je computer. En start opnieuw het programma op. Uiteindelijk moet er bij de status: **Licensed** staan, zoals in de afbeelding hierboven.

**Je hebt nu Windows succesvol geactiveerd!**

Stap 9. (Optioneel) Windows Drivers

Eerste vraag die misschien bij je opkomt is: wat zijn drivers? Een driver is eigenlijk een stukje software dat de communicatie mogelijk maakt tussen in dit geval Windows 7 en jouw computer hardware. Denk dan bijvoorbeeld aan je geluidskaart (voor geluid), videokaart (voor beeld), draadloze netwerkkaart (voor je internet op een laptop), noem het maar op.

Gelukkig installeert Windows al heel veel voor jou, wat betekend dat je eigenlijk nauwelijks tot geen drivers hoeft te installeren. Echter het kan wel verstandig zijn om een driver te installeren van de hardware fabrikant, omdat je systeem presentaties ten goede komt (oftewel je systeem kan sneller reageren).

Om te achterhalen wat je moet installeren, gebruiken we een **gratis** programma genaamd Speccy. Speccy kun je [hier downloaden](http://www.piriform.com/speccy/download/standard). Installeer het programma (kies eventueel voor Nederlands als taal) en start het programma.
![speccy](/images/2013/10/speccy.png "Speccy in het Nederlands")

Je ziet standaard het Overzicht van je systeem in Speccy. Dit overzicht is voldoende om te achterhalen wat jij straks eventueel nodig hebt. Het is onderverdeeld in 3 categorieën: grafisch, geluid en draadloos internet.

#### Grafisch

Je hebt altijd wel beeld, maar je computer reageert een stuk sneller met de juiste juiste video driver. We kijken daarom bij Grafisch. Zie je iets van NVIDIA GeForce? Dan kun je de NVIDIA driver downloaden op de officiele NVIDIA website.

**Nvidia**

- Heb je Windows 32bit geïnstalleerd, [gebruik deze download](http://download.cnet.com/nVidia-Graphics-Driver-Windows-Vista-32-bit-Windows-7-32-bit-Windows-8-32-bit/3000-2108_4-10630932.html). Gebruik voor je eigen wil de Direct Download Link (onder de groene download knop).
- Heb je Windows 64bit geïnstalleerd, [gebruik deze download](http://download.cnet.com/nVidia-Graphics-Driver-Windows-Vista-64-bit-Windows-7-64-bit-Windows-8-64-bit/3000-2108_4-10630939.html). Gebruik voor je eigen wil de Direct Download Link (onder de groene download knop).

Heb je echter iets staan van AMD Radeon? Dan heb je een AMD videokaart.

**AMD**

- Heb je Windows 32bit geïnstalleerd, [gebruik deze download](http://download.cnet.com/nVidia-Graphics-Driver-Windows-Vista-32-bit-Windows-7-32-bit-Windows-8-32-bit/3000-2108_4-10630932.html). Gebruik voor je eigen wil de Direct Download Link (onder de groene download knop).
- Heb je Windows 64bit geïnstalleerd, [gebruik deze download](http://download.cnet.com/nVidia-Graphics-Driver-Windows-Vista-64-bit-Windows-7-64-bit-Windows-8-64-bit/3000-2108_4-10630939.html). Gebruik voor je eigen wil de Direct Download Link (onder de groene download knop).

#### Geluid

Vaak is het **NIET** noodzakelijk om een andere driver te installeren, omdat Windows standaard een werkende driver installeert voor jou. Heb je echter wel problemen met je geluid bekijk dan wat er onder het kopje Geluid staat in Speccy.

**Realtek**

Staat er Realtek High Definition, gebruik [deze link ](http://download.cnet.com/Realtek-High-Definition-Audio-Codec-Windows-Vista-Windows-7-Windows-8-32-bit/3000-2120_4-10788600.html)om je driver te downloaden.

Bij andere merken zoek op Google naar de desbetreffende driver met de naam die je ziet in Speccy onder "Geluidskaarten" bij Geluid.

#### Draadloos Internet

Als je een laptop hebt met draadloos internet (Wireless), en je draadloos netwerk werkt niet. Klik dan in Speccy aan de linkerkant op Netwerk. Bekijk vervolgens wat er staat bij "Adapterlijst".  Staat er iets met Intel PROSet Wireless?

**Intel PROSet**

- Heb je Windows 32bit geïnstalleerd, [gebruik deze download](https://downloadcenter.intel.com/confirm.aspx?httpDown=http://downloadmirror.intel.com/23186/eng/wireless_16.1.5_Ds32.exe&lang=eng&Dwnldid=23186).
- Heb je Windows 64bit geïnstalleerd, [gebruik deze download](https://downloadcenter.intel.com/confirm.aspx?httpDown=http://downloadmirror.intel.com/23186/eng/wireless_16.1.5_Ds64.exe&lang=eng&Dwnldid=23186).

Bij andere merken zoek op Google naar de desbetreffende driver, met de naam die je ziet in Speccy onder "Adapterlijst" bij Netwerk.

### Stap 10. Installeer je programma's

Als je de goudentip heb gevolgd bij stap 1, heb je een lijst met jouw meest gebruikte programma's. Deze programma's kun je op internet opzoeken via Google, downloaden en installeren.

Hieronder een overzicht van enkele handige programma's:

- Bestanden bewerken/maken met **Microsoft Office**: [download hier](http://kickass.to/microsoft-office-2007-nl-dutch-repost-dutchreleaseteam-t7375354.html)
- Gratis **Avast! Anti-virus**: [download hier](http://www.avast.com/nl-nl/download-thank-you.php?product=FA-AVAST&locale=nl-nl)
- Webbrowser **Firefox**: [download hier](http://www.mozilla.org/nl/download/?product=firefox-stub&os=win&lang=nl)
- Webbrowser **Google Chrome**: [download hier](http://www.google.nl/intl/nl/chrome/browser/)
- Muziek luisteren via **Spotify**: [download hier](https://www.spotify.com/nl/download/)
- Video kijken via **VLC media player**: [download hier](http://www.videolan.org/vlc/download-windows.html)
- Gesprekken voeren via **Skype**: [download hier](http://www.skype.com/nl/download-skype/skype-for-windows/)
- Bestanden delen via **Dropbox**: [download hier](https://www.dropbox.com/downloading)
- **Java** in je webbrowser: [download hier](http://java.com/nl/download/)
- **Flash** in je webbrowser: [download hier ](http://get.adobe.com/nl/flashplayer/)
- Spellen spelen via **Steam**:[ download hier](http://cdn.steampowered.com/download/SteamInstall.msi)
- Schermdelen via **TeamViewer**:[ download hier](http://www.teamviewer.com/nl/download/windows.aspx)
- Bestanden uitpakken via **WinRAR**: [download hier](http://www.rarlab.com/rar/winrar-x64-420nl.exe)

Bedankt voor het volgen van deze handleiding! 🙂 Ik hoop dat alles gelukt is en zo niet stel dan a.u.b. je vraag hieronder.  
Heb je nog ideeën of aanvullingen op deze handleiding? Laat het mij dan ook weten. Bedankt.
