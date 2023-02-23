---
title: Google Analytics, website verbeteringen en alternatieven
author: Melroy van den Berg
type: post
date: 2013-12-08T15:05:17+01:00
url: /2013/google-analytics/
featured_image: /images/2013/11/google_analytics.jpg
categories:
  - Beginner
  - Handy Tools
  - Internet/SEO/Websites
  - IoT
  - Mobile
  - Networking
tags:
  - analytics
  - bounce percentage
  - bounce rate
  - caching
  - Google
  - Google Analytics
  - gosquared
  - free
  - open web analytics
---

![](/images/2013/12/stats.jpg)
Er bestaat verschillende web tools op het internet, die het mogelijk maakt om het internetverkeer van en naar je website te kunnen achterhalen. Zoals hoeveel bezoekers je website heeft en waar deze vandaan komen.  
Dit artikel is _**niet** **alleen**_ interessant voor website ontwikkelaars, maar ook mensen die geïnteresseerd zijn in wat de website eigenaar voor data kan achterhalen, zodra jij een website bezoekt.

Tot slot ga ik ook wat dieper in op enkele technieken die er bestaan om jouw website bovenaan Google te krijgen. Lees snel verder.

<!--more-->

&nbsp;

## Wat is Google Analytics?

![](/images/2013/12/Features_Header.png)
Google Analytics is een veel gebruikte online tool, die het mogelijk maakt om het verkeer op je website te achterhalen en duidelijk weer te geven via een web-interface.

Zelf maak ik vaak gebruik van Google Analytics om te zien op welke '**sleutelwoorden**' mijn website wordt gevonden. En via welke websites men mijn website vinden, hoelang men op mijn website blijven. Noem het maar op.  
Dit verkeer is overigens te achterhalen voor elke website, kortom als je over het internet surft is de kans groot dat je in de gaten wordt gehouden, over **hoe** jij een desbetreffende website heb gevonden (bijvoorbeeld via Google of startpagina.nl) en **hoelang** je erop blijft.

Je kunt een gratis account aanmaken voor Google Analytics op [deze website](http://www.google.com/analytics/). Door middel van een klein stukje code toe te voegen aan je website is het al mogelijk om al deze informatie te achterhalen.

## Google Analytics - Deel 1

Hieronder zie je een screenshot van de hoofdpagina van Google Analytics. Je ziet dat ik de website heb geselecteerd waar je nu dit artikel op leest. Ook zie je dat ik onlangs ben begonnen met deze weblog, waardoor het piekgedrag nog duidelijk te zien is. Ik verwacht in de toekomst meer gebruikers. Daardoor krijg je een vaste stroom van mensen gedurende de dag. En als je het goed doet de nacht ;).

![analytics_website](/images/2013/12/analytics_website.png "Google Analytics van deze website")

Hieronder zie je een andere website door mij ontwikkeld, die al langere tijd online staan en al bekender is.

![](/images/2013/12/andere_analytics_website.png)

Tevens kun je zien wat je doelgroep van de website die jouw website bezoeken. De volgende gegevens zijn voorbeeld gegevens.

![](/images/2013/12/leeftijd_website.png "Leeftijd van de bezoekers")

![](/images/2013/12/geslacht_website.png "Geslacht van de bezoekers")

![](/images/2013/12/intresse_website.png "Interesse van de bezoekers")

Tevens is het mogelijk om via Google Analytics de locatie van de bezoekers op te vragen.

![](/images/2013/12/locatie_website.png "Locatie van de bezoekers")

_Druk op de foto om een grotere versie te bekijken._

Je ziet hier dat de meeste bezoekers gewoon uit Nederland komen. Maar toch staat de United States boven België.

Het is vaak interessant om te weten hoeveel mensen je website weer verlaten. Een **bounce percentage** geeft aan hoeveel procent van je bezoekers je website verlaten binnen een bepaalde tijd. Hoe lager deze 'bounce percentage' is hoe beter. Immers wanneer er bezoekers komen op jouw website, die wil je natuurlijk graag op de website houden.  
Een hoge bounce percentage kan verschillende oorzaken hebben. Het kan komen doordat je website niet overzichtelijk is, of niet de informatie bevat wat wat mensen zoeken en/of de website te traag laad. Helaas hebben mensen vandaag de dag niet zoveel geduld :P. Zie hieronder de bounce percentage (terugkomende) bezoekers.

![](/images/2013/12/returning_visitor_website.png)

![](/images/2013/12/minified_data.png "Minify data")

## Website prestaties

In mijn geval probeer ik als website ontwikkelaar er ook alles aan te doen om de website zo snel mogelijk in te laten laden. Dit kan door allerlei slimme trucjes, Minify is daar 1 van. **Minify** combineert alle javascript en CSS (opmaak) bestanden. Deze tool maakt het daardoor mogelijk dat de website minder bestanden hoeft te downloaden en kan daardoor sneller zijn, plus onnodige data wordt verwijderd uit de bestanden (spaties/enters en dergelijke).

Daarnaast kun je nog denken aan het oversturen van een gecomprimeerde data (**GZIP Compression**) en het opslaan van gedeeltes van jouw website die niet vaak veranderd (ook wel **caching** genoemd).  
Caching is _cruciaal_ voor een grote website die vaak bezocht worden. Door de grote mensen massa aan te kunnen, is het belangrijk dat de data (HTML) zo snel mogelijk paraat is voor de bezoeker. Als je een dynamische website hebt, kun je de data (HTML) tijdelijk opslaan naar een bestand. Zodra er een aanvraag wordt gestuurd naar jouw website, wordt deze cache data geraadpleegd en deze data direct teruggestuurd naar de bezoeker. Hierdoor voorkom je **onnodige** database (MySQL) connecties/query's en andere berekeningen in PHP, ASP, Ruby on Rails, etc. Wat dus gunstig is voor de **laadtijd** van jouw website.

Als je beter gevonden wilt worden, werkt het goed als je je website toevoegen aan zoekmachines. Meestal kun je ook een sitemap opsturen naar die zoekmachines, waardoor de crawler bot (zoekmachine) beter de weg weet te vinden op je website.

## Google Analytics - Deel 2

Naast normale bezoekers, wordt anno 2013 je website regelmatig ook bezocht via een mobiel apparaat. Google Analytics is het mogelijk om deze data in te zien. Hieronder zie je welke mobiele apparaten mijn website het vaakst bezocht hebben.

![](/images/2013/12/mobiele_bezoekers.png "Mobile bezoekers")

Aan de hand van deze data, kun je conclusies trekken... Het is verstandig om je website te optimaliseren voor dit soort mobiele apparaten om het maximale uit jouw website te halen.  
Er bestaan vele manieren hoe je dit kunt doen. Vaak wordt er een ander **uiterlijk** (theme) gepresenteerd aan mobiele bezoekers. Ook zou je geen uitklap-menu's willen hebben, dat is altijd drama om dat met je vinger te moeten besturen. Dit vanwege de nauwkeurigheid die je niet hebt met je vinger, maar wel met je muis.

Deze mobile bezoekers kun je mooi combineren met je welk besturingssysteem de gebruikers hebben, zie hieronder:

![](/images/2013/12/besturingsystemen_website.png "Besturingssysteem bezoekers")

En schermresoluties van de gebruikers:

![](/images/2013/12/scherm_resolutie_website.png "Schermresolutie bezoekers")

Dit was maar een kleine greep uit de mogelijkheden die Google Analytics te bieden heeft. Een account maken is gratis.

Probeer Google Analytics gratis zelf, ga naar [Google Analytics](http://www.google.com/analytics/).

## Alternatieven

Er zijn alternatieven naast Google Analytics. Clicky, GoSquared en Open Web Analytics zijn goede alternatieven. Ik ga ze echter niet zo uitgebreid behandelen als Analytics, maar hieronder leest je een korte beschrijven wat deze websites jouw te bieden hebben.

### Clicky

Clicky is een goed ontworpen en slimme tracking tool. Het leest standaard veel data uit, en wordt infinitief getoond op het scherm. Denk hierbij aan hoeveel verkeer je hebt per uur, top referenties (van andere websites), meeste bezochte pagina's, totale tijd dat bezoekers op de website was en de "bounce rate".

Wat deze website zo uniek maakt is de Heat Map vind ik. Deze "heat map" stelt je in staat te bekijken waarop de bezoeker klikte toen hij de pagina voor zich zag.

![](/images/2013/12/heatmaps.png "HeatMap")

Probeer hier een [demo ](http://clicky.com/stats/?site_id=32020)van Clicky.  
Er is een gratis account mogelijk, ga [hier naar de website van Clicky](http://clicky.com/).

### GoSquared

De kracht van Gosquarded is dat alles 'real-time' wordt weergeven aan de eindgebruiker. Je ziet direct hoeveel mensen er nu actief zijn op de website, waar deze bezoekers zich bevinden op de website en meer.

![](/images/2013/12/gosquared.png "GoSquared")

Probeer hier een demo van [GoSquared](https://www.gosquared.com/now/demo#default). Het is helaas niet  gratis, het goedkoopste account is $9/maand op dit moment.

### Open Web Analytics

![](/images/2013/12/openwebanalytics.png)

Zoals het al zegt, het is een **Open-source** Analytics webservice. Kortom je beschikt over alle mogelijkheden (geen limieten), en compleet **gratis**.

Het grootste verschil tussen alle eerder besproken services en Open Web Analytics, is dat deze tool gedownload moet worden en zelf opgezet moet worden op je eigen server. Open Web Analytics maakt gebruik van JavaScript, PHP of RestFull interface.

Voor de rest heeft het vergelijkbare mogelijkheden als Google Analytics. Echter Open Web Analytics heeft geen data limiet vergeleken met Google Analytics. Plus je kunt onbeperkt aantal websites volgen. Open Web Analytics beschikt echter wel over een heatmap mogelijkheid in tegenstelling tot Google Analytics.

![](/images/2013/12/heatmaps_2.jpg "HeatMap")

Tot slot heeft Open Web Analytics "build-in" Content Management System (CMS) integratie voor WordPress, MediaWiki en Drupal websites. Google heeft enkel 3e partijen die deze plugins maken voor Google.

**Vergelijk** [hier](http://www.openwebanalytics.com/?page_id=158) Google Analytics met Open Web Analytics.

Download **gratis** je [Open Web Analytics hier](http://www.openwebanalytics.com/).
