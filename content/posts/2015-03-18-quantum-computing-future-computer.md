---
title: The future of the computer
author: Melroy van den Berg
type: post
date: 2015-03-18T17:12:20+00:00
draft: true
url: /?p=1470
categories:
  - Advanced
  - Intermediate
  - Programming
  - Security
tags:
  - artificial intelligence
  - ASML
  - kwantumcompuer
  - kwantumverstrengeling
  - supercomputer
---

http://computer.howstuffworks.com/quantum-computer.htm

In dit artikel neem ik je mee in hoe computer tot stand komt en vertel ik je meer over wat wij in de toekomst kunnen verwachten van de computer.

Onderwerpen als artificial intelligence, machine learning en quantum computing en neuron computing komen aan de orde, maar laat je niet afschrikken door deze complexe begrippen: ik begin bij het begin.

Eerst leg ik uit hoe de huidige generatie computers gemaakt worden en werken. Daarna vertel ik hoe de toekomstig computer eruit kan kan komen te zien. Deze computers zullen de huidige generatie uiteindelijk vervangen, om nog betere en snellere berekeningen uit te kunnen uitvoeren. Technologie staat nooit stil, lees snel verder!

# Huidige generatie

## Wat is een computerchip?

![Intel CPU processor](/images/2014/09/processor.jpg "Intel CPU processor")

Laten we bij het begin beginnen. Want wat zijn nu precies die "chips" die we terugzien in onze computers, laptops en telefoons?

Een computer bestaat uit verschillende onderdelen: het geheugen, de processor(s) (CPU), een harde schijf/flash, het moederbord, en nog veel meer. Deze onderdelen zijn noodzakelijk om een computer te laten werken, waarbij de processor het belangrijkste onderdeel is. Die voert namelijk alle berekeningen uit. Consumentencomputers bevatten meestal één processor (CPU), maar er bestaan ook computers die meerdere processoren bevatten. Voornamelijk servers, die in datacenters gebruikt worden.

Een CPU, wat staat voor **C**entral **P**rocessing **U**nit, alle CPU"s vandaag de dag zijn microprocessors. Een microprocessor is een combinatie van interne geheugen en andere hardware onderdelen (o.a. diodes en **transistors**), dat allemaal samenwerken om berekeningen uit te voeren.

Deze schakelingen kun je samennemen en zien als 1 core, vele processors vandaag de dag beschikken over meerdere cores. Waardoor er meerdere berekeningen parallel uitgevoerd kunnen worden. Dit alles is allemaal geïntegreerd op 1 enkele chip, vandaar de naam **I**ntegrated **C**ircuit, ook wel **IC**.

![Chip](/images/2014/09/chip.jpg)

Bekende microprocessors in desktop PC"s komen van Intel en AMD vandaan, zie onderstaande afbeelding.  Deze microprocessors kun je vanaf buiten aanspreken om een bepaalde berekening of instructies uit te voeren. Intern zal deze microprocessor de data (ene en nullen) en de elektriciteit door het systeem aansturen. Uiteindelijk wordt het antwoord terug gegeven aan het systeem, waarna het verder gaat met de volgende aanvraag en instructies voor de processor.

![Intel i7 microprocessor](images/2015/03/Intel_i7.jpg "Intel i7 microprocessor")

## Hoe wordt een chip gemaakt?

Computer of geheugen chips/IC"s worden gemaakt op **pure silicium** schijven, in vaktermen "wafers" genoemd.  Op deze wafers wordt een lichtgevoelige laag aangebracht, die daarna in een scanner selectief wordt belicht.

Het licht gaat daartoe eerst door een masker waarop een patroon is aangebracht dat selectief het licht tegenhoudt. Via zeer goed lenzen of spiegels (afhankelijk welke techniek er gebruikt wordt), wordt dit beeld verkleind en geprojecteerd op een klein gedeelte van de wafer (namelijk waar een enkele chip moet komen).

![Belichte wafer](/images/2014/09/wafer-1024x804.jpg "Belichte wafer")

Het belichten van de wafer wordt verschillende keren gedaan, met enorme snelheden en acceleraties, totdat de volledige wafer belicht is.

![Dies](/images/2014/10/dies.jpg "Dies")

Na belichting gaat de wafer door een chemicaliënbad, dat op bepaalde plaatsen de lichtgevoelige laag wegspoelt, afhankelijk van waar wel of geen licht is genomen. Het overgebrachte patroon heeft de gelegenheid om structuren van nieuw materiaal aan te brengen of te bewerken. Zo wordt laagje voor laagje de chip gevormd.

![ASML logo](/images/2014/09/ASML_logo.png)

Er bestaan maar een paar bedrijven op de wereld die zulke lithografiemachines ontwikkelen en bouwen, waarvan de marktleider **ASML** is. De hoofdvestiging van ASML ligt in Veldhoven, Nederland.

## Wat is het probleem met een huidige generatie microprocessors?

Zoals ik eerder aangaf, zijn huidige microprocessors niks anders dan een hoop aan elkaar geknoopte transistors (soms wel miljarden), die als basis dient voor de processor. Deze transistors worden als schakelaars gebruikt (hoog of laag, kortom "1" of "0"). Dit tweetalig rekenstelsel (1 of 0) heet binair.

Deze huidige chips zijn erg goed in wiskundige problemen op te lossen. Ze kunnen snel exacte berekeningen uitvoeren en zijn vergelijkbaar met een rekenmachine. Tevens moet alles beschreven worden, hoe iets uitgevoerd moet gaan worden.  
Als programmeur in de IT sector doe je ook niets anders dan code schrijven, wat vertaald wordt naar instructies voor de processor. Het is eenvoudiger om programmeertaal te gebruiken voor applicaties te maken, dan direct deze instructies te schrijven (ook wel bekent als Assembly). Dit komt omdat Assembly zeer "low-level" is en daardoor lastig te programmeren is. Terwijl hogere programmeertalen (C, C++, Java, e.d.) zorgen voor abstractie en wat in eerste instantie lijkt als een eenvoudige opdracht, wordt vertaald naar vele regels geoptimaliseerde Assembly code door de compiler.

```java
public class Hallo {
    public static void main(String[] args) {
        System.out.println("Hallo wereld!");
    }
}
```

Hallo wereld-code in Java programmeertaal

Welke programmeertaal er uiteindelijk ook wordt gebruikt, elke stuk code op de wereld geeft voorspelbaar gedrag en is geprogrammeerd om iets expliciet te doen volgens de geschreven regels. Het gedrag is daarom altijd voorspelbaar en te beredeneren (hoewel programmeurs het soms ook even niet weer weten als men rare code heeft geschreven 😛).

Dat het voorspelbaar is, heeft natuurlijk vele voordelen in onze wereld. Het maakt daarom altijd dezelfde beslissingen afhankelijk van de invoer, tenzij je schrijf dat het kan kiezen tussen beslissingen die je weer programmeert. Voorbeeld: "druk je op het Google Chrome icoontje, dan opent hij de Chrome webbrowser". Wil je volgens een website toevoegen aan je bladwijzers, geen probleem, maar het blijft altijd hetzelfde doen. Wat zeker **NIET** gebeurd is; dat je computer voor jou beslist dat je helemaal geen Chrome nodig hebt, maar een andere applicatie voor jouw opent. Omdat de computer weet wat je achterliggende probleem is, waarbij een andere toepassing wel jouw vraag kan beantwoorden bijvoorbeeld.

In dat laatste geval, krijg je te maken met **A**rtificial **I**ntelligence (AI). Je computer heeft een zekere manier van "kennis", "slimmigheid" of "bewustzijn"?. Lees snel verder.

# De toekomst

Wat de toekomst exact in petto dat weet natuurlijk niemand. Maar in het volgende gedeelte van dit artikel gaat u een verhaal lezen over eigen ervaringen / kennis, verschillende ideeën en feiten in de huidige techniek. Dit geef hopelijk een beeld van hoe de toekomst van onder andere **artificial intelligence,** **machine learning** en **computerprocessing** eruit kan komen te zien.

Om de toekomst te kunnen schetsen, vergt dit een een andere manier denken (out-of-the-box), zoals sneller te zijn dan de huidige supercomputers. Afwijken van de gangbare computer chips. Of juist een computer die je helpt wat nu nog ondenkbaar is, bijvoorbeeld met denken. Misschien zelfs wel een "bewustzijn" kan hebben?

Ik zie de toekomst van de computer **niet** in de huidige generatie computer chips, maar een hele andere manier dan hoe wij vandaag de computer kennen. In plaats van 1 en 0 nullen, zou je eerder het menselijk brein willen namaken via **neutronen** of **quantum** **computing**.

## Kwantum Computer

Men is nu al druk bezig met verschillende studies over kwantum computers. In de fysica is  kwantum het kleinste, ondeelbare hoeveelheid van een grootheid die bij een interactie betrokken kan zijn. Quantum computing, is een _onderdeel_ van quantum mechanical (waaronder _superpositie_ en _verstrengeling_). Waarbij ik eerder zei dat huidige computers chips gebruik maken van transistors met digitale enne of nullen, maken ze bij kwantum computer gebruik van qubits (quantum bits), die in een superposities kunnen staan. Superposities houd in dat een qubit zowel een "0" en een "1" tegelijkertijd is. Tenzij je het probeer te meten, dan verstoor je de superpositie, waardoor je enkel een "0" of een "1" ziet.

![Google"s Kwantum Computer](/images/2015/03/kwantum_computer.png "Google"s Kwantum Computer")

Doordat een je meerdere toestanden heb waarin een qubit zich kan bevinden en je gaat dit combineren met andere qubits, dan is het mogelijk om vele snellere berekeningen uit te voeren dan nu mogelijk is. Zoals ik eerder zei, als je kijkt naar een qubit, dan verdwijnt de superpositie en dan zie je "1" of "0" van een willekeurige qubit, op dit moment ben je alle data kwijt . Men laat daarom de quantum deeltjes met elkaar interfereren om uiteindelijk de data waarin je geïnteresseerd eruit te halen.

### Kwantumverstrengeling

Kwantumverstrengeling vormt de sleutel tot het maken van kwantumcomputers. Kwantumverstrengeling treedt op tussen twee of meer deeltjes, die onderhevig zijn aan kwantumeffecten. In de praktijk zijn dit erg kleine deeltjes zoals elektronen, atomen en moleculen. Deze deeltjes zijn dusdanig verbonden, dat het ene object niet los beschreven kan worden van het andere. De verstrengelde deeltjes gedragen zich als één, ook als de deeltjes enorm ver van elkaar verwijderd zijn. Dat kan 3 meter zijn, maar net zo goed andere de kant van het universum.

Deze deeltjes worden meestal in diamant opgeslagen, omdat daarin een "mini-gevangenis" voor elektronen worden gevormd. Door bepaalde processen, zoals botsingen of tegelijkertijd ontstaan, kunnen twee deeltjes met elkaar verstrengeld raken. Ze gaan zich daarna in zekere zin gedragen als één deeltje: een meting aan het ene deeltje betekent dat de volgens de Heisenbergrelatie gekoppelde eigenschappen van het andere deeltje exact vastliggen.

Einstein geloofde deze voorspelling niet en noemde dit ‘spooky action at a distance’, maar talloze experimenten hebben laten zien dat de verstrengeling echt bestaat.

### Kwantum teleportatie

Kwantum teleportatie is een manier om de kwantum toestand van het ene kwantum systeem naar een andere over te zetten door gebruik te maken van de kwantum verstrengeling, tussen deze twee systemen. Wat het zo bijzonder maakt, is dat je nu een bericht kunt versturen tussen deze systemen, **zonder** dat er een fysieke verplaatsing noodzakelijk is.

### Kwantum tunneling

quantum tunneling in flash memory..

{{< youtube "s7JLXs5es7I" >}}

### Conclusie

De kwantum computer kan de wereld op z'n kop zetten. Alles wat we dachten wat nu veilig was, zoals SSL/TLS (met privé en publieke sleutels) je data encryptie wordt. Denk hierbij aan je bankgegevens, of andere gevoelige data, is met de kwantum computer binnen een fractie van een seconde gekraakt. Alle gevoelige data (onder andere data verkeer) wat nu onleesbaar is, maar toch opgeslagen wordt. Kan door de NSA met de kwantum computer leesbaar worden gemaakt. Deze kwantum computers worden ergens na 2025 verwacht. Er wordt nu al miljoenen euro's gestoken in een project, die `cryptologie` ontwikkelt die de kracht van de kwantum computer aan weerstaan, genaamd PQCRYPTO. Verschillende universiteiten over de gehele wereld, maar ook Google en NASA is bezig met het ontwikkelen van de eerste kwantum computers.

## Neutronen Computer

http://www.nu.nl/gadgets/4013682/nederland-werkt-met-denemarken-ontwikkeling-kwantumcomputer.html

http://googleresearch.blogspot.nl/2015/03/a-step-closer-to-quantum-computation.html

http://www.nrc.nl/handelsblad/van/2014/augustus/30/de-toekomst-van-de-computer-zit-in-koolstof-nanobu-1414375

http://www.volkskrant.nl/dossier-onderwijs/de-supercomputer-van-de-toekomst-vijf-vragen-over-de-quantumcomputer~a3520149/

http://nl.wikipedia.org/wiki/Supercomputer#Toekomst

synapse chip?

http://www.theregister.co.uk/2014/08/07/ibm\_synapse\_chip/

http://www.extremetech.com/extreme/189155-google-begins-developing-its-own-quantum-computer-chips-to-prepare-for-the-future

http://fastfacts.nl/content/ronald-hanson-quantumteleportatie

https://scientias.nl/waar-deeltjes-verstrengeld-zijn-een-wormgat-te-vinden/ Waar deeltjes verstrengeld zijn, is een wormgat te vinden"

https://www.visionair.nl/wetenschap/massale-kwantumverstrengeling-opent-poort-naar-nieuwe-natuurkunde Massale kwantumverstrengeling opent poort naar nieuwe natuurkunde

https://scientias.nl/reizen-door-de-tijd-met-dank-aan-kwantumverstrengeling/ Reizen door de tijd met dank aan kwantumverstrengeling?

https://www.visionair.nl/wetenschap/tijd-veroorzaakt-door-kwantumverstrengeling/ Tijd veroorzaakt door kwantumverstrengeling

https://www.visionair.nl/wetenschap/universum/zwaartekracht-is-gevolg-van-kwantumverstrengeling/ Zwaartekracht is gevolg van kwantumverstrengeling

http://webwereld.nl/datacenter/2-de-kwantumcomputer-wanneer-waarvoor-en-waarom

http://curiosity.discovery.com/question/quantum-entanglement-useful-computing

http://www.kennislink.nl/publicaties/kwantum-verstrengeling-als-basis-voor-de-kwantumcomputer
