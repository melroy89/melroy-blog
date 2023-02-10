---
title: Postfix mail server opzetten onder Ubuntu Linux
author: Melroy van den Berg
type: post
date: -001-11-30T00:00:00+00:00
draft: true
url: /?p=1702
categories:
  - Intermediate
  - Server
tags:
  - Exim
  - IMAP
  - Mail server
  - Outlook
  - Postfix
  - Sendmail
  - SMTP
---

In deze korte handleiding laat ik zien hoe je een eigen mail server kan opzetten onder Linux (Ubuntu Server), die gebruik maakt van je Gmail gegevens om e-mails te versturen.

Ik begin eerst uit te leggen wat een **mail server** is en waarom je  überhaupt een mailserver zou willen opzetten... Daarna leg ik uit wat Postfix inhoudt. Tot slot komt de handleiding aanbod, hoe jezelf een mailserver kunt opzetten.

## Wat is een mailserver?

Een **mail server** (ook wel bekent als _mail transfer agent_ of _MTA_) wordt gebruikt om e-mails te versturen en/of te ontvangen. Bekende mail servers zijn: Microsoft Exchange, qmail, Exim, Sendmail.

Een mail server draait meestal op een server die altijd online staat al kun je zelf ook een eigen mail server draaien op je eigen server of computer.

Als je een e-mail verstuurd van bijvoorbeeld Outlook, dan wordt deze e-mail verzonden naar de mail server, die op zijn beurt doorstuurt verstuurt naar een andere mailserver.

![Mail schema](/images/2014/06/mail_schema.png)

http://en.kioskea.net/contents/116-how-email-works-mta-mda-mua

Om e-mail te ontvangen wordt meestal SMTP (Simple Mail Transfer Protocol) gebruikt voor het ontvangen van e-mails.

### Waarom?

Een eigen mail server kan erg handig zijn.

### OK, maar wat is Postfix dan?

Postfix is een open-source mail server afkomstig van [IBM research](http://www.research.ibm.com/), en een alternatief bied voor Sendmail (wat nog veel gebruikt wordt).

Sendmail is een oude mail server. De eerste versie dateert uit de jaren 80. In die tijd was nog niet voorzien wat het internet zou worden, zoals we het nu kennen.

Postfix bied daarom een mooi alternatief, echter wel compatibel met Sendmail. Daarnaast bied Postfix meer veiligheid, snelheid, <span id="result_box" class="short_text" lang="nl"><span class="hps alt-edited">soliditeit en <span id="result_box" class="short_text" lang="nl"><span class="hps">flexibiliteit dan Sendmail</span></span>. Het wordt daarom aanbevolen om eerder Postfix te gebruiken dan Sendmail als mail server.<br /> </span></span>

## How-to

Nu je het achterliggend verhaal weet, laat ik nu zien hoe je Linux kan configureren om zelf e-mails te versturen via Postfix naar een willekeurig e-mailadres. Postfix maakt gebruik van Gmail SMTP gegevens om de e-mail te versturen naar het opgegeven e-mailadres.

We beginnen met het installeren van de benodigde pakketten, via: `apt-get install postfix mailutils libsasl2-2 ca-certificates libsasl2-modules`

To tell Postfix to relay all messages destined for `*@gmail.com` through Google’s SMTP server, put this into `/usr/local/etc/postfix/transport`:

```
gmail.com smtp:[smtp.gmail.com]:587
```

Then, create the `/usr/local/etc/postfix/sasl_passwd` file, telling Postfix to authorize with your Gmail login credentials when connecting to Google’s SMTP server:

```
[smtp.gmail.com]:587 _username_@gmail.com:_password_
```

Fix permission and update postfix config to use sasl_passwd file: `sudo chmod 400 /etc/postfix/sasl_passwd`

&nbsp;

In een new bestand tls_policy, zet je:

```
[smtp.gmail.com]:587 encrypt
```

Dan in de terminal genereer je database files:

```sh
sudo postmap transport && sudo postmap sasl_passwd && sudo postmap tls_policy
```

In de main.cf file:

```ini
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_tls_policy_maps = hash:/etc/postfix/tls_policy
smtp_sasl_security_options = noanonymous
smtp_tls_CAfile = /etc/postfix/cacert.pem
smtp_use_tls = yes
transport_maps = hash:/etc/postfix/transport

relayhost = [smtp.gmail.com]:587
```

`sudo /etc/init.d/postfix stop`

`sudo /etc/init.d/postfix start`

Be sure postfix is running, then reload the configure to be sure:

`sudo /etc/init.d/postfix reload`

Uiteindelijk kun je nu een e-mail sturen naar jezelf om te verifiëren of alles werkt. Dit kan door het volgende commando uit te voeren:

```sh
echo "Test mail from postfix" | mail -s "Test Postfix" jouw@emailadres.com
```

Verander uiteraard  you@example.com naar je eigen e-mailadres.

Loop je tegen problemen aan tijdens deze handleiding? Probeer eens in de log te kijken: `nano /var/log/mail.log`

Of laat een bericht hieronder achter.
