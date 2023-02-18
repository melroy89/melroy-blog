---
title: Het grootste beveiligingslek in de geschiedenis – Heartbleed Bug
author: Melroy van den Berg
type: post
date: 2014-12-01T15:51:26+00:00
modal: true
url: /2014/openssl-heartbleed-bug/
featured_image: /images/2014/04/Heartbleed-Symbol.gif
categories:
  - GNU/Linux OS
  - Intermediate
  - IoT
  - Networking
  - Security
  - Windows OS
tags:
  - Bug
  - certificaat
  - Core Infrastructure Initiative
  - Dropbox
  - Facebook
  - Google
  - Heartbleed
  - LinkedIn
  - OpenSSL
  - private
  - public
  - Robin Seggelman
  - SLL
  - WordPress
  - Yahoo
---

![hearthbleed](/images/2014/04/Heartbleed-Symbol.gif "Heartbleed Bug")

Afgelopen weken stond het internet er vol mee: de **OpenSSL Hearbleed Bug**.

Maar wat is precies het probleem? En waarom eigenlijk? Wat zijn de gevolgen en hoe heeft het ooit kunnen ontstaan?

Het roept veel vragen op, ik geef je in dit artikel meer duidelijkheid over de Heartbleed bug. Lees snel verder en kom te weten hoe ons internet beveiligd is en wat de Heartbleed bug betekent voor ons allen.

## Het verhaal

Op _8 april_ werd publiekelijk bekend dat er een lek was gevonden dat grote gevolgen heeft. Het staat bekend als het grootste beveiligingslek tot nu toe: ze noemen het de **Hearbleed Bug**. De bug (een programmeerfout in een programma) werd gevonden in OpenSSL, dat zowat door *iedereen ter wereld* gebruikt wordt.

Deze bug stelt je instaat om wachtwoorden en andere versleutelde gegevens te ontcijferen en te stelen van iedereen die OpenSSL versie 1.0.1 en 1.0.2 gebruikt.

## Wie zijn geraakt?

Helaas teveel om op te noemen 🙁 . De belangrijkste lijst zie je hieronder. Ondertussen hebben deze websites hun OpenSSL versie bijgewerkt, echter blijft het verstandig om je wachtwoorden te wijzigen: maar liefst twee derde van alle websites zijn geraakt, aldus McAfee.

**Websites:**

- Facebook
- Google & Gmail & YouTube
- LinkedIn
- Netflix
- Dropbox
- Minecraft
- Yahoo & Yahoo Mail
- Amazon Web Services
- WordPress
- GitHub
- SoundCloud
- Instagram, Flickr en Tumblr
- GoDaddy en meer...

**Overige diensten/hardware**:

- Sommige Android Apps (Android zelf niet)
- iPhone & iPad
- OpenVPN
- Tor netwerk
- Java MySQL connector / Mobile & Wireless en meer...

## Wat is OpenSSL?

Voordat we verder gaan is het belangrijk om te weten wat **OpenSSL** is en hoe OpenSSL werkt. OpenSSL is één "groot stuk code" dat hergebruikt kan worden door software applicaties (ook wel bibliotheken genoemd). Met OpenSSL is het mogelijk om data te identificeren, te verifiëren en/of het dataverkeer te versleutelen. Het wordt daarom veel toegepast op applicaties en op heel veel websites. De programmeerfout in OpenSSL zorgt ervoor dat kwaadwillenden toegang hebben tot gevoelige informatie.

OpenSSL is een open-source implementatie van SSL/TLS. Wil je weten wat SSL is? Lees dan snel verder!

### Theorie

Veel websites maken gebruik van een beveiligde verbinding, dit kan je herkennen in de webbrowser aan de HTTP**S** verbinding. Tevens wordt een beveiligde verbinding ook vaak aangegeven via een sleuteltje naast het webadres in de browser. Deze beveiligde verbinding wordt dan ook wel SSL (Secure Sockets Layer) /TLS genoemd, zoals de naam al verklapt een is een beveiligde socketlaag waar het internet gebruik van maakt.

![HTTPS in Chrome](/images/2014/04/https_in_chrome.png)

Voorbeeld: Google HTTPS in Chrome, het groene sleuteltje geeft aan dat je gebruik maakt van SSL (een veilige verbinding)

#### Asymmetrisch en Symmetrisch Encryptie

Om het verdere verhaal te snappen is het belangrijk om te weten dat er twee soorten manieren van versleuteling bestaan: _asymmetrisch_ en _symmetrisch_ encryptie.

Bij Asymmetrische encryptie wordt gebruik gemaakt van een zogenaamde sleutelpaar. Een combinatie van zowel een **privé sleutel** als een **publieke sleutel**. De publieke sleutel wordt normaliter gebruikt voor het versleutelen van de data, terwijl de publieke sleutel gebruikt wordt voor het ontcijferen van de data.  
Symmetrische encryptie heeft altijd maar één sleutel, voor zowel het versleutelen als het ontcijferen van de data.

#### Handdruk

Bij het maken van een beveiligde SSL verbinding tussen jou en de server wordt er een handdruk (SSL Handshake) uitgevoerd. Vergelijk zo'n handdruk met een zakelijke deal waarbij beide partijen overeenkomen het eens te zijn met een besluit. Tijdens zo'n handdruk, worden privé sleutels en publieke sleutels uitgewisseld, om vervolgens de data veilig over het internet te kunnen versturen. Hieronder een voorbeeld:

Een server beschikt over een zogenaamd **certificaat** die gemaakt is met een **privé sleutel** een een **publieke sleutel** (kortom asymmetrische encryptie, zie wederom _Theorie_). Vervolgens wil jij met de computer (cliënt) verbinding maken met een website (server).

![SSL handshaking](/images/2014/04/how_ssl_works_summary_of_SSL_handshake_2.jpg "SSL handshaking")

In de afbeelding hierboven gebeurt dan het volgende:

1. De computer probeert contact te maken met de server;
2. Je krijgt een server certificaat terug van de server (met een **publieke sleutel** erin);
3. De computer creëert zijn eigen zogenaamde _sessie sleutel_;
4. De computer stuurt deze sleutel terug naar de server, door het te encrypteren met de **publieke sleutel**.
5. De server ontcijfert de sleutel door zijn **privé sleutel**. Alleen de server beschikt over deze **privé sleutel**, en kan daardoor het bericht ontcijferen van de computer;
6. Uiteindelijk maakt zowel de computer als de server gebruik van deze _sessie sleutel_ en het verkeer verder te versleutelen.

Tot zover de theorie... 😉

### HACKEN (Praktijk)

OpenSSL maakt onder andere gebruik van een TLS-uitbereiding genaamd **Heartbeat**, die bedoeld is om een beveiligde verbinding tussen een computer en server open te houden. Deze mogelijkheid werd in februari 2012 officieel toegevoegd aan het TLS-protocol. Vandaar ook de naamspeling "Heartbleed".

Als kwaadwillig persoon is het het mogelijk om deze Heartbeat-functionaliteit te misbruiken door foutieve data te versturen naar een kwetsbare webserver. Met foutieve data bedoel ik data dat groter is dan eigenlijk de bedoeling is (tot 64kb groot). Hierdoor krijg je niet alleen je verzoek terug gestuurd, maar ook **extra data uit het geheugen**.

![heartbleed](/images/2014/04/heartbleed.jpg)

Deze gevoelige informatie uit het geheugen kan niet alleen wachtwoorden, creditcardgegevens en cookies authenticatie bevatten, maar zelfs de **privé sleutel** van de server (zie kopje _Theorie_). Indien je eenmaal beschikt over de privé sleutel is het mogelijk om het dataverkeer te **ontcijferen** van alles clients (computers/mobiele telefoons, ..) en de server.

Doordat de privé sleutel wellicht achterhaald kan zijn, is het zeer verstandig om het server certificaat (zie kopje _Theorie_) opnieuw aan te maken met een **nieuw** gegenereerd sleutelpaar. Op [deze website](https://zmap.io/heartbleed/certificates.html) kun je zien welke websites nog _geen_ nieuw certificaat hebben aangemaakt (na 1 april 2014). Hierdoor zijn die websites minder betrouwbaar en kwetsbaar.

Zelf proberen te hacken? [Download hier](/downloads/fox_heartbleedtest.zip) de Heartbleed testcode in Python. Je hoeft alleen nog een server te vinden die nog niet over de laatste versie van OpenSSL beschikt... Een alternatief is de website te controleren via [deze website](https://filippo.io/Heartbleed/), en je komt erachter of de website veilig is of niet.

## Voorkomen

Hoe kan het gebeuren dat zo'n klein stukje code zoveel gevolgen heeft? En hoe had dit voorkomen kunnen worden?

> Ik heb gewerkt aan OpenSSL en heb enkele code fouten eruit gehaald en nieuwe mogelijkheden geïntroduceerd in de code. In een patch voor een nieuwe "feature" heb ik blijkbaar een lengte controle gemist te implementeren

als dus Robin Seggelman, een Duitse programmeur, die de Heartbleed heeft geïntroduceerd.

Niet heel verrassend achteraf gezien, want de mensen die aan OpenSSL werken doen dat vaak in hun vrije tijd en maar **1 full-time persoon**. En krijgen slechts $2000 aan donaties jaarlijks. De code is weliswaar gereviewd, maar fouten kunnen altijd onopgemerkt en zonder opzet erdoorheen komen.

Mensen die werken aan OpenSSL en andere open-source projecten krijgen te weinig respect voor wat ze doen, en te weinig uitbetaald (of helemaal niet betaald).

![heartbleed fixed](/images/2014/04/heartbleed_fixed.png)

Ondanks dat de bug in april 2014 is gevonden, bleef deze fout 2+ jaar lang onontdekt voor iedereen. Daarnaast is deze bug niet terug te vinden in de server logs, waardoor het voor systeembeheerder lastig te ontdekken valt. De code is wel voor iedereen inzichtbaar, dus theoretisch had jij of ik de bug kunnen vinden (of misbruiken...).

De bug is uiteindelijk gevonden en gerapporteerd door een OpenSSL team genaamd Neel Mehta van Google's beveiligingsteam. OpenSSL heeft direct daarna een noodpatch uitgebracht.

![core infrastructure initiative](/images/2014/04/core-infrastructure-initiative.jpg)

De Linux Foundation en grote technologiebedrijven als Google, Facebook en Microsoft zijn het Core Infrastructure Initiative gestart. Dit is een initiatief om een tweede Heartbleed-bug te voorkomen in de toekomst. Ze stellen **miljoenen** dollars beschikbaar om OpenSSL veiliger te maken. In het begin richt het initiatief zicht eerst op OpenSSL.

Later zal het Core Infrastructure Initiative zich ook richten op ModSSL (beveiliging voor servers), PGP (beveiliging voor e-mailverkeer) en OpenCryptolab. Beetje mosterd na de maaltijd, maar beter nu dan nooit.

Ben je geïnteresseerd in de gewijzigde code? [Bekijk hier de commit](http://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=96db902) patch in OpenSSL die de wereld heeft gered.
