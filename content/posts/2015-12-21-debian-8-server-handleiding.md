---
title: Debian 8 Jessie Server handleiding
author: Melroy van den Berg
type: post
date: 2015-12-21T13:42:56+00:00
toc: true
modal: true
url: /2015/debian-8-server-handleiding/
featured_image: /images/2015/07/debian_server_manual.png
categories:
  - Big Data
  - GNU/Linux OS
  - Hardware
  - Intermediate
  - Networking
  - Security
  - Server
tags:
  - Apache
  - certificaat
  - cloud storage
  - CI/CD
  - Debian
  - Dovecot
  - GitLab
  - handleiding
  - hostname
  - hosts
  - htop
  - IMAP
  - Linux
  - mailserver
  - Monit
  - MySQL
  - netstat
  - netwerk
  - OpenSSL
  - nextcloud
  - PHP
  - PHPMyAdmin
  - Postfix
  - RAID
  - server
  - smartctrl
  - SMTP
  - SSL
  - TLS
  - webmail
  - webserver
---

![Intro header](/images/2015/07/debian_handleiding_small.png)

Niet lang geleden heb ik mijn server opnieuw opgezet. Ik maak gebruik van Debian 8 (Jessie) als Linux distributie, en heb veel verschillende services geïnstalleerd en geconfigureerd (waaronder een mail server, webmail, cloud storage en git). Gelukkig hield ik alles netjes bij in een logboek. Ik zou graag mijn stappen willen delen, zodat iedereen een **eigen server** kan opzetten.

Ik ga ervan uit dat je beschikt over enige basis kennis van GNU/Linux (Debian). Ook al beschik je niet tot nauwelijks over deze kennis, zou het toch mogelijk moeten zijn om deze handleiding stap voor stap te volgen.

<!--more-->

Mijn server is bedoeld voor opslag van bestanden/foto's/muziek, mijn projecten maar ook voor mijn e-mail. Ik heb hieronder alle services per hoofdstuk onderverdeeld, zodat je er makkelijker doorheen kunt bladeren. Waar nodig sla je een hoofdstuk over indien je deze service niet wil gebruiken. Immers niet alle hoofdstukken zijn verplicht, gebruik wat je gebruiken kunt.

Ik heb tevens een website aangemaakt voor de server, hierop vindt je alle relevante informatie: [https://server.melroy.org](https://server.melroy.org).

Ik gebruik tijdens mijn handleiding vaak het commando `nano`. nano is een terminal tekstbewerker. Er bestaat ook alternatieven, zoals "vi" en "vim". Vim is iets minder toegankelijk voor beginners.

# Netwerk configuren

![Linux server](/images/2015/07/linux_server.png)

Nadat je Debian op je systeem heb geïnstalleerd, is de eerste stap het configureren van een zogenaamd statisch IP-adres. Dit is cruciaal als je port-forwarding wilt doen in de routers firewall. Immers je wilt niet dat je server elke keer een ander IP-adres krijgt toegewezen binnen je netwerk.

In dit voorbeeld geven we de server het IP-adres: _192.168.1.130_ op de LAN-interface (eth0): `nano /etc/network/interfaces`

```sh
allow-hotplug eth0
iface eth0 inet static
address 192.168.1.130
netmask 255.255.255.0
network 192.168.1.0
broadcast 192.168.1.255
gateway 192.168.1.1
```

Herstarten van het netwerk kan via (gelieve dit uit te voeren op de server zelf, anders kan het voorkomen dat je niet meer kan vinden): `service networking restart`

# Hostnaam

Mogelijk heb je je **hostname** ingesteld tijdens de Debian installatie. Desalniettemin, kun je deze nog steeds veranderen: `nano /etc/hostname`

# Hosts bestand

Je moet het "**hosts**" bestand niet verwarren met je hostname eerder. Hosts is een soort lokale DNS van je systeem. Ik verwijs mijn domeinnaam naar het IP-adres 127.0.1.1 (dit is een soort localhost / 127.0.0.1). Je domeinnaam noemt met een fully qualified domain name (FQDN). Als je een vast IP-adres heb moet je die gebruiken, en anders voldoet 127.0.1.1.

```sh
nano /etc/hosts
```

Voorbeeld:

```sh
127.0.0.1    localhost
127.0.1.1    server.melroy.org
127.0.1.1    mail.melroy.org melroy-server
127.0.1.1    gitlab.melroy.org gitlab
127.0.1.1    ci.melroy.org ci
```

Controle:

- `hostname`: dit commando geeft je de korte host naam (van je server lokaal).
- `hostname -f`: dit commando geeft de eerste bekende fully qualified domain name (FQDN).

# TLS/SSL certificaat aanmaken

**UPDATE:** Ik maak nu gebruik van Let's Encrypt voor mijn certificaten in plaats van m'n eigen certificaten te ondertekeken. Zie mijn [Let's Encrypt blog artikel](/2016/lets-encrypt/).

We gaan nu een eigen certificaat aanmaken, die gebruikt kan worden bij webservices, zoals apache webserver en andere diensten. Dit certificaat wordt gebruikt om (gevoelige) gegevens te versleutelen tussen de server en jouw computer.

![HTTP vs HTTPS](/images/2015/07/http-vs-https.png)

We gaan niet zo maar een certificaat maken, maar een zogenaamde "self-signed" certificaat. Dit certificaat is dus ondertekend door jezelf, hierdoor hoef je geen geld te betalen. Als alternatief kun je een certificaat kopen, waarbij je certificaat ondertekend is door bedrijven als GeoTrust, VeriSign of GlobalSign. Of je kunt gratis bij StartSSL terecht voor een certificaat.

Laten we beginnen met het bijwerken van de softwarepakken lijst: `sudo apt-get update`

Installeren van openssl pakket: `sudo apt-get install openssl`

We beginnen eerst met een privé sleutel te creeren. Deel deze sleutel met niemand!

```sh
openssl genrsa -des3 -out server.key 2048
```

Maak Certificate Signing Request (CSR) bestand aan. Dit CSR bestand is een aanvraag bestand, straks gebruiken we dit CSR bestand om je eigen certificaat te maken: `openssl req -new -key server.key -out server.csr`

Als Common Name, gebruik: "\*.melroy.org" voor **wildcard** certificaat. Wildcard certificaat kan gebruikt worden voor meerdere sub-domeinen, waarbij een hetzelfde certificaat voldoet.

Verwijder eventueel het wachtwoord van het \*.key bestand (aangeraden). Anders zal er elke keer om gevraagd worden, o.a. bij elke keer als de Apache server opstart:

```
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
```

We gaan nu het certificaat echt creëren: `openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt`

Kopieer nu de bestanden naar de juiste locaties:

```sh
cp server.crt /etc/apache2/ssl/server.crt
cp server.key /etc/apache2/ssl/server.key
```

(Optioneel) Als je wilt kun je nog een \*.pem bestand aanmaken, dit is een combinatie van de private (key) & public (crt) certificaten.

```sh
openssl pkcs12 -export -in server.crt -inkey server.key -out server.p12
openssl pkcs12 -in server.p12 -nodes -out server.pem
```

**LET OP:**

> Omdat het server.pem bestand **ook** de privé sleutel bevat, moet je dit pem bestand **NOOIT** delen met andere mensen of servers! Dit geldt ook voor server.key.
> Enkel het server.crt bestand kan gedeeld worden met iedereen, dit bevat enkel de publieke sleutel.

Vertrouw het self-signed certificaat, door deze te labelen als CA (Certificate Authority) certificaat:

```sh
apt-get install ca-certificates
cp /etc/apache2/ssl/server.crt /usr/local/share/ca-certificates/
update-ca-certificates
```

Anders kun je problemen krijgen met bepaalde services met foutmeldingen zoals:

> 509: certificate signed by unknown authority

Maak een link naar de /etc/ssl/certs folder: `ln -s /etc/apache2/ssl/server.crt /etc/ssl/certs/server.crt`

En: `ln -s /etc/apache2/ssl/server.key /etc/ssl/private/server.key`

Tot slot: `c_rehash`

# Apache2 webserver & PHP & MySQL

**UPDATE:** In dit artikel leg ik uit hoe je Apache2 web server kan gebruiken voor alle web-services, echter op dit moment ben ik overgestapt naar **Nginx**. Een ander artikel komt er nog aan waarin ik uitleg hoe je Nginx opzet.

![Apache server](/images/2015/07/apache_server.png)

Installeren van de noodzakelijke pakketten: `apt-get install apache2 apache2-utils php5 libapache2-mod-php5 libapache2-mod-proxy-html php5-mysql mysql-server mysql-client`

Apache 2 modules (soort plugins) aanzetten: `a2enmod rewrite php5 proxy_http headers ssl`

We gaan Apache2 configureren met een SSL beveiligde verbinding, daarvoor veranderen we de default-ssl.conf bestand: `nano /etc/apache2/sites-available/default-ssl.conf`

```sh
<IfModule mod_ssl.c>
  <VirtualHost _default_:443>
      ServerAdmin webmaster@mydomain.com
      DocumentRoot /var/www/html/homepage

      ErrorLog ${APACHE_LOG_DIR}/error.log
      CustomLog ${APACHE_LOG_DIR}/access.log combined

      SSLEngine on
      SSLOptions +StrictRequire
         SSLCertificateFile     /etc/apache2/ssl/server.crt
         SSLCertificateKeyFile  /etc/apache2/ssl/server.key
         SetEnvIf User-Agent ".*MSIE.*" nokeepalive ssl-unclean-shutdown
         CustomLog /var/log/apache2/ssl_request_log \
            "%t %h %{SSL_PROTOCOL}x %{SSL_CIPHER}x \"%r\" %b"

      [...]

  </VirtualHost>
</IfModule>
```

Activeren van de nieuwe Apache "site": `a2ensite default-ssl`

Al het normale HTTP (poort 80) verkeer verwijst ik door naar HTTPS (poort 443): `nano /etc/apache2/sites-available/000-default.conf`

```sh
<VirtualHost *:80>
  ServerAdmin webmaster@mydomain.com

  ServerSignature Off

  RewriteEngine on
  RewriteCond %{HTTPS} !=on
  RewriteRule .* https://%{SERVER_NAME}%{REQUEST_URI} [NE,R,L]
</VirtualHost>
```

Tot slot de ports.conf aanpassen, we gaan nu ook HTTPS poort gebruiken (443): `nano /etc/apache2/ports.conf`

```sh
Listen 80

<IfModule ssl_module>
  Listen 443
</IfModule>

<IfModule mod_gnutls.c>
  Listen 443
</IfModule>
```

Herstarten: `service apache2 restart`

# phpMyAdmin & Database Manager

Installeren van het pakket: `apt-get install phpmyadmin`

Selecteer auto-configure voor **Apache2** tijdens de installatie.

Voeg nieuwe site toe: `nano /etc/apache2/sites-available/phpmyadmin.conf`

```sh
<VirtualHost *:443>
  ServerName mysql.melroy.org
  DocumentRoot "/usr/share/phpmyadmin"

  SSLEngine on 
  SSLOptions +StrictRequire
  SSLCertificateFile    /etc/apache2/ssl/server.crt
  SSLCertificateKeyFile /etc/apache2/ssl/server.key  
</VirtualHost>
```

![phpMyAdmin](/images/2015/07/phpmyadmin.png "phpMyAdmin")

Aanzetten van de phpmyadmin site:

```sh
a2ensite phpmyadmin
service apache2 reload
```

Bewerk `nano /etc/phpmyadmin/config.inc.php`:

```php
$cfg['ForceSSL'] = true;
```

# Software RAID toevoegen (na installatie)

Overzicht van alle schrijven: `ls /dev/ | grep sd`

Vraag informatie op over een harde-schrijf: `fdisk -l /dev/sdX`  
(vervang X door a,b,c, etc.)

In mijn geval ga ik 2x 1TB harde schrijven in RAID 1 (kortom mirror/dupliceren van elkaar) zetten, namelijk sdb & sdc: `fdisk -l /dev/sdb /dev/sdc`

```sh
Disk /dev/sdb: 931.5 GiB, 1000204886016 bytes, 1953525168 sectors
 Units: sectors of 1 * 512 = 512 bytes
 Sector size (logical/physical): 512 bytes / 4096 bytes
 I/O size (minimum/optimal): 4096 bytes / 4096 bytes

 Disk /dev/sdc: 931.5 GiB, 1000204886016 bytes, 1953525168 sectors
 Units: sectors of 1 * 512 = 512 bytes
 Sector size (logical/physical): 512 bytes / 4096 bytes
 I/O size (minimum/optimal): 4096 bytes / 4096 bytes
```

Partitie voor **sdb** schrijf opzetten:  
`fdisk /dev/sdb`

```
n (new partitie)
p (primary)
```

selecteer begin tot eind sectors (standaard volledige schrijf)

Partitie type veranderen:

```
t (type change)
L (list all codes)
fd (voor Linux raid auto)
```

Overzicht laten zien:

```
p (print)
```

Geeft nu:

```sh
Disk /dev/sdb: 931.5 GiB, 1000204886016 bytes, 1953525168 sectors
 Units: sectors of 1 * 512 = 512 bytes
 Sector size (logical/physical): 512 bytes / 4096 bytes
 I/O size (minimum/optimal): 4096 bytes / 4096 bytes
 Disklabel type: dos
 Disk identifier: 0x8658d1a6

Device     Boot Start        End    Sectors   Size Id Type
 /dev/sdb1        2048 1953525167 1953523120 931.5G fd Linux raid autodetect
```

Indien alles klopt, gaan we het nu wegschrijven via: `w`

Partitie opzetten voor **sdc** schrijf: `fdisk /dev/sdc`. Voer vervolgens de commando's uit:

```
p
t
fd
p
```

Geeft nu:

```sh
Disk /dev/sdc: 931.5 GiB, 1000204886016 bytes, 1953525168 sectors
 Units: sectors of 1 * 512 = 512 bytes
 Sector size (logical/physical): 512 bytes / 4096 bytes
 I/O size (minimum/optimal): 4096 bytes / 4096 bytes
 Disklabel type: dos
 Disk identifier: 0x761dea68

Device     Boot Start        End    Sectors   Size Id Type
 /dev/sdc1        2048 1953525167 1953523120 931.5G fd Linux raid autodetect
```

Wegschrijven kan dan via de letter: `w`

Laat de kernel weten dat we de schrijven hebben veranderd, herstart het systeem: `reboot`

Na een herstart, verifiëren we of de schrijven nu goed herkent worden: `fdisk -l`

![RAID 1](/images/2015/07/RAID1.jpg "RAID 1 betekent het spiegelen van de schrijven (kopie)")

Nu zetten we een RAID 1 array op tussen **/dev/sdb1** & **/dev/sdc1** partities, ik gebruik nu /dev/md1 in plaats van md0 (ik beschikte namelijk al over een andere RAID op hetzelfde systeem):  
`mdadm --create /dev/md1 --level=1 --raid-devices=2 /dev/sdb1 /dev/sdc1`

Optioneel kun je de flag: `--assume-clean` gebruiken. Deze zorgt ervoor dat `mdadm` het resync-en overslaat. Echter meestal is dit geen goed idee, helemaal niet met RAID 5 (eigen risico).

Bekijk nu live de voortgang van je nieuwe RAID opstelling: `watch cat /proc/mdstat`

Mocht de resync nu een status "PENDING" (resync=PENDING) krijgen, voer dan het volgende commando uit: `mdadm --readwrite /dev/mdX`

(Vervang  X voor 0, 1, 2, ..)

Wanneer het sync-en compleet is, maken we een nieuwe ext4 partitie aan op **/dev/md1**: `mkfs.ext4 /dev/md1`

Haal **UUID** (universally unique identifier) op van de nieuwe RAID 1 opstelling: `blkid /dev/md1`

Auto-mount deze nieuwe RAID opstelling (gebruik de UUID van het vorige commando): `nano /etc/fstab`

Voeg onderaan een nieuwe regel toe:

```sh
UUID=abc1234 /media/data    ext4   defaults        0       2
```

Verander eventueel ook de mount folder. Weetje: de laatste optie (getal: _2_) betekent dat de pc/server een fsck uitvoert bij elke opstart. Prio "2" is een minder hoge prioriteit. Een prio "1" moet je root systeem zijn, "0" betekent uit.

Werk de mdadm.conf configuratie bij: `mdadm -Es`

Kopieer en plak de nieuwe RAID regel toe aan het config file: `nano /etc/mdadm/mdadm.conf`

Optioneel: veranderd het e-mailadres in hetzelfde mdadm.conf bestand:

```conf
MAILADDR jou@mail.com
```

Werk dje boot image bij via: `update-initramfs -u`

Tot slot, herstart je systeem: `reboot`

Nu hoort je een /dev/mdX erbij te hebben. Je kunt je harde schrijven, partities & raid opstelling eenvoudig controleren via: `lsblk`

Voorbeeld van 4 harde schrijven, waarvan sda1 & sdb1 in RAID 1 staan. En sdc1 & sdd1 in RAID 1 staan:

```
NAME    MAJ:MIN RM   SIZE RO TYPE  MOUNTPOINT
 sda       8:0    0 465.8G  0 disk
 ├─sda1    8:1    0 456.5G  0 part
 │<span style="color: #008000;"> └─md0   9:0    0 456.3G  0 raid1 /</span>
 └─sda2    8:5    0   9.3G  0 part  [SWAP]
 sdb       8:16   0 465.8G  0 disk
 ├─sdb1    8:17   0 456.5G  0 part
 │<span style="color: #008000;"> └─md0   9:0    0 456.3G  0 raid1 /</span>
 └─sdb2    8:21   0   9.3G  0 part
 sdc       8:32   0 931.5G  0 disk
 └─sdc1    8:33   0 931.5G  0 part
<span style="color: #800080;"> └─md1   9:1    0 931.4G  0 raid1 /media/data</span>
 sdd       8:48   0 931.5G  0 disk
 └─sdd1    8:49   0 931.5G  0 part
<span style="color: #800080;"> └─md1   9:1    0 931.4G  0 raid1 /media/data</span>
```

Bijbehorende fstab:

```
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
 <span style="color: #008000;">UUID=87dbf687-...... /               ext4    errors=remount-ro 0     1</span>
 # swap
 UUID=17f4568b-...... none            swap    sw              0       0
 # Second swap (enable only when needed)
 #UUID=2f37123c-..... none            swap    sw              0       0
 # Data disk
 <span style="color: #800080;">UUID=7b241b86-...... /media/data     ext4   defaults         0       2</span>
```

mdadm.config bevat bij mij onder andere:

```
# definitions of existing MD arrays
 ARRAY /dev/md/0  metadata=1.2 UUID=49071dca:........ name=server:0
 ARRAY /dev/md/1  metadata=1.2 UUID=7c8044bb:........ name=server:1
```

# Gitlab & Continuous Integration (CI)

GitLab wordt gebruikt als git repository manager, issue tracker, code review en wiki pagina's. Kortom een heel compleet pakket voor het ontwikkelen en beheren van je software.

![GitLab Community Edition](/images/2015/07/gitlab.png "GitLab Community Edition")

Ik ga de Omnibus pakket gebruiken, dit is het meest voor de handliggende en eenvoudigste manier. We starten met de afhankelijkheden te installeren:  
`apt-get install curl openssh-server ca-certificates`

Installeren van de laatste versie van Gitlab CE (Community Edition):

```sh
curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
apt-get install gitlab-ce
```

Eerste keer configuren / opzetten: `gitlab-ctl reconfigure`

Daarna de config aanpassen: `nano /etc/gitlab/gitlab.rb`:

```Ruby
external_url 'https://gitlab.melroy.org'
gitlab_rails['backup_path'] = "/media/data/gitlab/backups"
git_data_dir "/media/data/git-data"
web_server['external_users'] = ['www-data']
nginx['enable'] = false
```

Nogmaals her-configureren: `gitlab-ctl reconfigure`

Gitlab Continous Intergration (CI) is nu standaard beschikbaar in GitLab. Via Gitlab CI kun je build proces starten of auto-testers aftrappen bij elke push naar de git server.

![GitLab Pipelines](/images/2015/07/gitlab_ci-1.png)

Ik maak gebruik van Let's Encrypt certificaten om een veilige SSL verbinding om te zetten. In plaats van een self-sign certificaat. Zie [mijn ander artikel][3] over hoe je Let's Encrypt certificaten aanvraagt.

Ik heb de built-in nginx server uitgezet (zie de tekst in het oranje hierboven).  We gaan gebruik maken van Apache 2.2 om de GitLab server te bereiken.

`nano /etc/apache2/sites-available/gitlab.conf`:

```
<VirtualHost *:443>
    SSLEngine on
    #strong encryption ciphers only
    #see ciphers(1) http://www.openssl.org/docs/apps/ciphers.html
    SSLProtocol all -SSLv2
    SSLHonorCipherOrder on
    SSLCipherSuite "ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:ECDH+AES128:DH+AES:ECDH+3DES:DH+3DES:RSA+AESGCM:RSA+AES:RSA+3DES:!aNULL:!MD5:!DSS"
    Header add Strict-Transport-Security: "max-age=15768000;includeSubdomains"
    SSLCompression Off
    SSLCertificateFile /etc/apache2/ssl/server.crt
    SSLCertificateKeyFile /etc/apache2/ssl/server.key
    #SSLCACertificateFile /etc/httpd/ssl.crt/your-ca.crt

    ServerName gitlab.melroy.org
    ServerSignature Off

    ProxyPreserveHost On

    # Ensure that encoded slashes are not decoded but left in their encoded state.
    # http://doc.gitlab.com/ce/api/projects.html#get-single-project
    AllowEncodedSlashes NoDecode

    <Location />
        # New authorization commands for apache 2.4 and up
        # http://httpd.apache.org/docs/2.4/upgrading.html#access
        Require all granted

        ProxyPassReverse http://127.0.0.1:8080
        ProxyPassReverse https://gitlab.melroy.org/
    </Location>

    #apache equivalent of nginx try files
    # http://serverfault.com/questions/290784/what-is-apaches-equivalent-of-nginxs-try-files
    # http://stackoverflow.com/questions/10954516/apache2-proxypass-for-rails-app-gitlab
    RewriteEngine on
    RewriteCond %{DOCUMENT_ROOT}/%{REQUEST_FILENAME} !-f
    RewriteRule .* http://127.0.0.1:8080%{REQUEST_URI} [P,QSA]
    RequestHeader set X_FORWARDED_PROTO 'https'

    # needed for downloading attachments
    DocumentRoot /var/opt/gitlab/gitlab-rails/

    #Set up apache error documents, if back end goes down (i.e. 503 error) then a maintenance/deploy page is thrown up.
    ErrorDocument 404 /404.html
    ErrorDocument 422 /422.html
    ErrorDocument 500 /500.html
    ErrorDocument 503 /deploy.html

    LogFormat "%{X-Forwarded-For}i %l %u %t \"%r\" %>s %b" common_forwarded
    ErrorLog /var/log/apache2/gitlab.melroy.org_error.log
    CustomLog /var/log/apache2/gitlab.melroy.org_forwarded.log common_forwarded
    CustomLog /var/log/apache2/gitlab.melroy.org_access.log combined env=!dontlog
    CustomLog /var/log/apache2/gitlab.melroy.org.log combined
</VirtualHost>
```

```
a2ensite gitlab
```

Voor Gitlab-CI, gebruik ik een /etc/apache2/sites-available/gitlab-ci.conf bestand. Met exact dezelfde inhoud als hierboven. Behalve de **ServerName**, **ProxyPassReverse** en **ErrorLog**/**CustomLog** heb ik veranderd naar `ci.melroy.org`. Daarnaast gebruik GitLab-CI poort `8181` in plaats van `8080`. Ook dat moet je veranderen.

```
a2ensite gitlab-ci
```

Poort `22`, `80` en `443` moet je opzetten in de router's firewall, wil je het van buitenaf bereikbaar maken.

Het adres wordt dus [https://gitlab.melroy.org](https://gitlab.melroy.org). Inloggen op GitLab kan met (admin gebruiker):  
**Gebruikersnaam**: root  
**Wachtwoord**: secret

Eenmaal verder, kreeg ik bij een `git clone` de melding:

> Agent admitted failure to sign using the key.

Nu bleek dat ik de RSA identiteit aan de authenticatie agent moest toevoegen (via ssh-agent), voer daarvoor het volgende commando uit: `ssh-add ~/.ssh/id_rsa`

Vraag de publieke sleutel op: `cat ~/.ssh/id_rsa.pub`

Voeg deze volledige regel toe aan je profiel in Gitlab. Dit kan door middel: **Profile -> SSH keys -> Add SSH key** in Gitlab.

Plak de inhoud van de id_rsa.pub in het desbetreffende "**key**" veld.  
Stel de globale instellingen in op je lokale computer:

```sh
git config --global user.name "Uw naam"
git config --global user.email "jouw@email.com"
```

Nu kun je succesvol je git repositories clonen vanaf GitLab, voorbeeld: `git clone git@gitlab.melroy.org:melroy/voorbeeld_project.git`

Starten / Stoppen / restart:

```sh
gitlab-ctl stop
gitlab-ctl start`
gitlab-ctl restart
```

Debugging kan via:

```sh
gitlab-ctl tail
```

Backup maken van GitLab (v12.2 en later) kan via: `sudo gitlab-backup create`

# Postfix & SMTP Server

![Postfix](/images/2015/07/postfix.gif)

Postfix is een SMTP protocol mailserver waarbij je e-mail mee kunt **versturen** en meer kunt **ontvangen**. Ik ga postfix combineren met Dovecot voor het ontvangen van e-mails. Postfix configureren we door gebruik te maken van virtuele mailboxen configuratie bestanden. In deze virtuele mailbox bestanden staan de gebruikersgegevens opgeslagen. Optioneel kun je dit koppelen aan MySQL database.

Ik begin eerst met een overzicht, om het verhaal te verduidelijken:

![big picture overview](/images/2015/07/big_picture.png "Overal geheel")

Ontvangen van de e-mail:

1. Een externe mailserver vraag een TCP verbinding aan op poort 25 van onze mailserver. The firewall laat deze verbinding door. En **Postfix** accepteert de verbinding.
2. Postfix verzamelt de informatie van de afzender en bekijkt naar wie de e-mail verzonden wordt (de ontvangers).
3. Postfix doet ook een real-time black lijst (RBLs) check via DNS, of te de afzenders IP-adres wel vertrouwd kan worden. Een e-mail kan dan worden geweigerd.
4. Postfix stuurt de e-mail door naar **Dovecot**, om te zien of de ontvangers e-mailadres overeenkomt met een bekende gebruiker.
5. Dovecot bekijkt de virtualmail box bestanden (optioneel kan ook MySQL gebruikt worden) en controleert of het e-mailadres behoort tot een gebruiker.
6. Indien de gebruiker bestaat, wordt de e-mail geaccepteerd en doorgestuurd naar Dovecot. Dit verloopt via een **L**ocal **D**elivery **A**gent, ookwel "Dovecot LDA" genoemd.
7. Dovecot slaat de ontvangen e-mail op in een bestand, in ons geval binnen een folder in `/media/data/email/`
8. De gebruiker haalt de nieuwe e-mail op via POP3 or IMAP protocol van Dovecot.

Stel je wilt deze e-mail beantwoorden, kortom het versturen van een e-mail:

1. De gebruikers e-mail client (bijvoorbeeld Roundcube), stelt een SMTP verbinding op met Postfix. Het stuurt de gebruikersnaam & wachtwoord door ter authenticatie.
2. Postfix vraagt aan Dovecot of de gebruikersnaam & wachtwoord overeenkomen.  Zodat er niet zo maar e-mail vanaf jouw adres verzonden kan worden.
3. Dovecot doorzoekt de gebruikers informatie in de virtuele mailbox bestanden. Het vertelt Postfix of het authenticatie succesvol was.
4. Postfix zoekt nu uit naar welke mail server op het internet de e-mail verzonden moet worden. Postfix vraagt de DNS (domain name service) voor het opvragen van de MX (Mail eXchange) record van het ontvangen domeinnaam. Indien dit gelukt is, krijgen we het adres terug en weten we waar we de e-mail naar toe moeten sturen.
5. Postfix maakt verbinding met de betreffende mailserver van de ontvanger.  Het zet een SMTP verbinding op en stuurt de e-mail.

Laten we nu beginnen met Postfix te installeren: `apt-get install postfix`

`nano /etc/postfix/postfix`:

```ini
# Hostname
myhostname = mail.melroy.org
myorigin = /etc/mailname

# Virtual mailbox configs
virtual_mailbox_domains=hash:/etc/postfix/vmail_domains
virtual_mailbox_maps=hash:/etc/postfix/vmail_mailbox
virtual_alias_maps=hash:/etc/postfix/vmail_aliases
virtual_transport=dovecot

# Location
virtual_mailbox_base= /media/data/email
```

`nano /etc/postfix/vmail_domains`:

`yourdomain.com OK`

`nano /etc/postfix/vmail_mailbox`:

```
info@yourdomain.com yourdomain.com/info
 melroy@yourdomain.com yourdomain.com/melroy
```

`nano /etc/postfix/vmail_aliases`:

```
melroy@yourdomain.com melroy
info@yourdomain.com info
```

Creeer db-formaat (hash) voor de virtuele bestanden via postmap commando: `postmap /etc/postfix/vmail_domains  && postmap /etc/postfix/vmail_mailbox &&  postmap /etc/postfix/vmail_aliases`

Voeg onderaan /etc/postfix/master.cf toe:

```
dovecot   unix  -       n       n       -       -       pipe
 flags=DRhu user=email:email argv=/usr/lib/dovecot/deliver -f ${sender} -d ${recipient}
```

Tot slot herstarten we de service: `service postfix restart`

# Dovecot & Mailserver

![Dovecot](/images/2015/07/dovecot.png)

Dovecot is een IMAP en POP3 e-mailserver (en bevat ook een delivery agent, zoals je kunt zien bij het [hoofdstuk over Postfix](#Postfix_8211_SMTP_Server). Dovecot is daarom in staat om e-mails te ontvangen en versturen. Onder GNU/Linux wordt er standaard gebruik gemaakt van mbox formaat. Mbox is 1 bestand, waarin alle e-mail zit. Hoewel dit ideaal werkt voor een lokaal systeem, gaan wij gebruik maken het "**Maildir**" e-mail formaat. Je raad het wellicht al; Maildir maakt gebruik van verschillende mappen en bestanden voor opslag van e-mail.

We beginnen met het installeren van Dovecot: `sudo apt-get install dovecot-core dovecot-imapd dovecot-pop3d dovecot-lmtpd dovecot-sieve`

We maken een nieuwe gebruiker & groep aan, genaamd email voor de mail mappen.

```sh
cd /media/data
mkdir email
groupadd email -g 7788
useradd email -r -g 7788 -u 7788 -d /media/data/email -m -c "mail user"
chown -R email:email ./email
```

Nu gaan we verder met Dovecot configureren: `nano /etc/dovecot/dovecot.conf`:

```
protocols = imap pop3 lmtp
```

`nano /etc/dovecot/conf.d/10-master.conf`:

```conf
service imap-login {
  inet_listener imap {
    port = 143
  }
  inet_listener imaps {
    port = 993
    ssl = yes
  }
}

[...]

# Postfix smtp-auth

unix_listener /var/spool/postfix/private/auth {
  mode = 0666
}
```

`nano /etc/dovecot/conf.d/10-auth.conf`:

```conf
auth_mechanisms = plain login
```

Optioneel als je wilt debuggen: `nano /etc/dovecot/conf.d/10-logging.conf`"

```conf
auth_verbose = yes
mail_debug = yes
```

`nano /etc/dovecot/conf.d/10-mail.conf`:

```conf
# Location of the mailbox
mail_location = maildir:/media/data/email/%d/%n/Maildir

# User & Group permissions
first_valid_uid=7788
last_valid_uid=7788
first_valid_gid=7788
last_valid_gid=7788

mail_privileged_group = email
```

Voeg subscribe (abonneren) toe aan de volgende mailboxen. Subscribe zorgt er ook voor dat de mappen automatisch aangemaakt worden:
`nano /etc/dovecot/conf.d/15-mailboxes.conf`:

```conf
namespace inbox {
  mailbox Drafts {
    auto = subscribe
    special_use = \Drafts
  }
  mailbox Junk {
    auto = subscribe
    special_use = \Junk
  }
  mailbox Trash {
    auto = subscribe
    special_use = \Trash
  }
  mailbox Sent {
    auto = subscribe
    special_use = \Sent
  }
}
```

`nano /etc/dovecot/conf.d/10-ssl.conf`:

```conf
ssl = yes
ssl_cert = /etc/apache2/ssl/server.crt
ssl_key = /etc/apache2/ssl/server.key
ssl_cipher_list = ALL:!LOW:!SSLv2
```

Optioneel kun je gebruik maken van Sieve. Sieve is een plugin waarmee de gebruiker met een configuratie bestand kan aangeven wat er gebeurd met je inkomende berichte. Sieve filtert inkomende berichten, afhankelijk van je instellen, kun je e-mails in mappen plaatsen, doorsturen, negeren, weggooien, etc.

`nano /etc/dovecot/conf.d/15-lda.conf`:

```conf
protocol lda {
     mail_plugins = sieve
}
```

We maken een nieuw bestand aan, die voor door autorisatie gaan zorgen: `nano /etc/dovecot/conf.d/auth-users.conf`:

```conf
passdb passwd-file {
     driver = passwd-file
     args = scheme=SHA1 username_format=%u /etc/dovecot/users.conf
}

userdb static {
    driver = static
    args = username_format=%u /etc/dovecot/users.conf
    default_fields = uid=7788 gid=7788 home=/media/data/email/%d/%n allow_all_users=yes
}
```

Genereer nieuw wachtwoord voor een nieuwe gebruiker via: `doveadm pw -s SHA1`

Gebruikt de output, zonder (SHA1). Zet dit in het **users.config** bestand, gecombineerd met je e-mailadres (toekomstige login):
`nano /etc/dovecot/users.conf`:

```conf
info@yourdomain.com:AbcDef123=
melroy@yourdomain.com:AbcDef123=
```

Zet de rechten goed van de gebruikers-database: `sudo chown dovecot:dovecot /etc/dovecot/users.conf`

Herstart Dovecot: `sudo service dovecot restart`

Controlleer welke protocollen worden geaccepteerd en op welke interface / adressen geluisterd wordt: `doveconf protocols listen`

Als je "imap pop3 lmtp" ziet, dan is het goed. Tweede test: je zou een "OK" moeten krijgen als je via telnet verbinding maakt met IMAP poort: `telnet localhost 143`

Voorbeeld:

```sh
> - OK [CAPABILITY IMAP4rev1 LITERAL+ SASL-IR LOGIN-REFERRALS ID ENABLE IDLE AUTH=PLAIN AUTH=LOGIN] Dovecot ready.
```

Logging van e-mail kun je hier vinden: `cat /var/log/mail.log`

Dovecot logt ook naar syslog: `tail -f /var/log/syslog`

Controleer of je DNS record (MX) klopt, via dig commando: `dig +short A $(dig +short MX melroy.org | head -1 | cut -d' ' -f2)`

Dit zou het IP-adres moeten geven van je server, dan zijn je DNS instellingen goed.

# Roundcube & Webmail

Ik ga in deze handleiding Roundcube installeren van de broncode. Immers dan beschik ik over de laatste versie. Downloaden kan vanaf:

- [https://roundcube.net/download/](https://roundcube.net/download/)
  _OF:_
- ```sh
  git clone https://github.com/roundcube/roundcubemail.git
  mv roundcubemail roundcube
  cd roundcube
  git checkout tags/1.1.2
  ```
  _OF:_
- `curl -L "http://sourceforge.net/projects/roundcubemail/files/latest/download?source=files" > /tmp/roundcube-latest.tar.gz`

![Roundcube Next](/images/2015/07/roundcube.jpg "Roundcube Next")

Uitpakken/installeren van Roundcube:

```sh
tar -xfz roundcube-latest.tar.gz /var/www/
rm -f /tmp/roundcube-latest.tar.gz
cd /var/www/
mv roundcubemail-* roundcube
chown www-data:www-data -R roundcube/
```

Je voeg nu Roundcube toe aan de Apache2 configuratie: `nano /etc/apache2/sites-available/roundcube.conf`

```conf
<VirtualHost \*:443>
   ServerName mail.melroy.org
   DocumentRoot "/var/www/roundcube"
</VirtualHost>
```

Activeer de nieuwe "site": `a2ensite roundcube`

Tot slot, ga nu naar de installatie van Roundcube:
[https://mail.yourdomain.com/installer](https://mail.yourdomain.com/installer)

In mijn geval gaf de installer aan dat er nog enkele pakketten van  3{{< super e >}} ontbraken (als je kiest voor Roundcube depedent). Deze installeerde ik als volgt:

```sh
apt-get install php-pear
pear install mail
pear install Net_SMTP
pear install Auth_SASL
pear install mail_mime
pear install Mail_mimeDecode
```

# pear install channel://pear.php.net/Net_IDNA2-0.1.1 </code> </span>

Eventueel kun je je de instellingen nog veranderen. %t zorgt ervoor dat je kunt inloggen zonder @melroy.org in mijn geval (controleer dit met: `hostname -d`).

Bewerk `nano /var/www/roundcube/config/config.inc.php`:

```php
$config['username_domain'] = '%t';
```

# ownCloud & Cloud opslag

**Update:** Vandaag de dag zou je voor [Nextcloud](https://nextcloud.com/) moeten gaan, in plaats van ownCloud.

ownCloud is een gratis open-source alternatief voor dropbox, waarbij je alle documenten, foto's en muziek in eigen beheer heb.

![ownCloud](/images/2015/07/owncloud.png "ownCloud Webinterface")

Installeren: `sudo apt-get install owncloud owncloud-server`

We gaan ownCloud instellen in Apache2 webserver: `nano /etc/apache2/sites-available/owncloud.conf`:

```conf
<VirtualHost \*:443>
ServerName cloud.melroy.org
DocumentRoot "/var/www/owncloud"

    ErrorLog ${APACHE_LOG_DIR}/owncloud-error.log
    CustomLog ${APACHE_LOG_DIR}/owncloud-access.log combined

    <Directory "/var/www/owncloud">
         Options Indexes FollowSymLinks MultiViews
         AllowOverride All
         Require all granted

         <IfModule mod_dav.c>
              Dav off
         </IfModule>

         SetEnv HOME /var/www/owncloud
         SetEnv HTTP_HOME /var/www/owncloud
     </Directory>

     <Directory "/var/www/owncloud/data/">
         # just in case if .htaccess gets disabled
         Require all denied
      </Directory>

</VirtualHost>
```

Ga naar je adres: [https://cloud.yourdomain.com/](https://cloud.yourdomain.com/)

Stel je admin account in. Verander eventueel je data folder en selecteer je database (ik kies hier voor: MySQL). En configureer ownCloud verder.

Achteraf kun je je instellingen eventueel nog veranderen: `nano /var/www/owncloud/config/config.php`

# Monitorix

Monitorix is een gratis open-source webbased monitoring tool. En creëert mooie grafieken om deze data weer te geven. Zoals CPU, memory gebruik, maar ook netwerkverkeer.

![Monitorix Web GUI](/images/2015/07/monitorix.png "Monitorix Web GUI")

Installeren: `apt-get install monitorix`

Configureren: `nano /etc/apache2/sites-available/monitorix.conf`

```conf
<VirtualHost \*:443>
     ServerName monitor.melroy.org
     DocumentRoot "/var/lib/monitorix/www"
     AddHandler cgi-script .cgi
     Alias /cgi /var/lib/monitorix/www/cgi

    <Directory "/var/lib/monitorix/www">
           Require all granted
     </Directory>
     <Directory "/var/lib/monitorix/www/cgi">
          AllowOverride None
          Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
          Require all granted
      </Directory>
</VirtualHost>
```

`nano /etc/monitorix/monitorix.conf`

```conf
title = Melroys Server
hostname = melroy-server
[...]
base_url = /
base_cgi = /cgi
```

Schakel de build-in HTTP server uit van Monitorix:

```conf
<httpd_builtin>
enabled = n
```

Zet CGI module aan in Apache webserver: `a2enmod cgi`

Herstart Apache2: `service apache2 restart`

Herstart monitorix: `service monitorix restart`

Auto-start monitorix bij opstarten: `systemctl enable monitorix`

# Monit

Monit is weer een andere gratis open-source monitoring tool voor processen, bestanden, systeem en meer. Monit is een proactief programma die andere services in de gaten houdt. Mocht er een service crashen / down gaan, dan in Monit in staat deze weer terug te brengen. Tevens stuurt Monit je een e-mail mocht er is mis zijn gegaan of als je systeem bepaalde limieten overscheid. Tot slot beschikt Monit ook over een webbased interface, waar je een duidelijk overzicht krijgt te zien van de door jouw beheerde processen. Op deze pagina kun je  ook je processen stop/start/herstarten.

![Monit web pagina](/images/2015/07/monit.png "Monit web pagina")

Installeren: `apt-get install monit`

`nano /etc/monit/monitrc`

```sh
set mailserver localhost
set httpd port 2812
use address localhost # enkel localhost heeft toegang
allow admin:WACHTWOORD # Stel je login gegevens in (verplicht)
set httpd port 2812
```

Apache2 configuren configuren voor Monit: `nano /etc/apache2/sites-available/monit.conf`:

```ini
<VirtualHost \*:443>
  ServerName monit.melroy.org
  ProxyPreserveHost       On
  # Reverse Proxy
  ProxyPass        /  http://localhost:2812/
  ProxyPassReverse /  http://localhost:2812/
</VirtualHost>
```

Eventueel kun je ook monit "standalone" gebruiken, zonder tussen komt van Apache webserver. Immers apache kan ook crashen :P. In dit geval kun je ook SSL configuren. Ziet het voorbeeld hieronder (\*.pem bestand is de server.key & server.crt gecombineerd, zie [hoofdstuk TLS/SSL](#TLSSSL_certificaat_aanmaken):

```sh
set httpd port 2812
SSL ENABLE
PEMFILE /etc/apache2/ssl/server.pem
ALLOWSELFCERTIFICATION
[...]
```

Nu begint het leukste, het instellen van de controle voor al je actieve processen (althans degene die je wilt controleren). Deze instellingen verschillen uiteraard per server.
Hiervoor verwijst ik je graag door naar de [Monit wiki pagina](https://mmonit.com/wiki/Monit/ConfigurationExamples).

Met het volgende commando, kun je checken wat monit controleerd op dit moment: `monit -t`

# Conclusie

Zoals je ziet gebruik ik persoonlijk veel eigen web diensten en een eigen webserver. Ik hou graag alles in eigen beheer en dat geeft mij de vrijheid om te doen wat ik wil en hoe ik dat wil. Uiteraard bestaan er veel gratis online diensten die soort gelijken problemen oplossen (Gmail, Github en bijvoorbeeld Dropbox). Echter vind ik het veel te leuk om het zelf te hosten.

Op [Melroy's Server website](http://server.melroy.org/) kun je al mijn web-diensten vinden.

# Overige tools

## Disk controle

We sluiten deze handleiding af met wat handige tools, tip & tricks. Smartmontools bevat verschillende applicaties voor het diagnostiseren van je harde schrijf en het uitlezen van de S.M.A.R.T. data op de schrijven.

```sh
apt-get install smartmontools
```

Hardeschrijf info: `smartctl -i /dev/sdc`

Health check: `smartctl -H /dev/sdc`

Voer een selftest uit, je hebt hierbij meerdere opties: "short", "long", "conveyance" of "select". We voeren een short-test uit (deze duurt 2 minuten). Je kunt hem _eventueel_ ook naar de voorgrond brengen met de optie `-C` erbij te zetten: `smartctrl -t -C short /dev/sdc`

Bekijk je test resultaten met: `smartctl -l selftest /dev/sdc`

Voor het volledige verslag (a van all): `smartctl -a /dev/sdc`

## Root forwarding

Verwijs alle root e-mails door naar jouw e-mailadres, voeg je e-mailadres toe aan (nieuw bestand): `nano /root/.forward`

## Monitor tool

Naast Monitorix en Monit, gebruik ik ook `htop` commando voor het interactief bheheren van applicaties. Het is een alternatief van het wat oude top commando.

```sh
apt-get install htop
```

## Netwerk tools

Misschien ken je het commando `ping` & `route` commando. Het `mtr` commando (My Traceroute) combineerd deze twee tools. Ideaal voor het achterhalen van netwerk problemen.

```sh
apt-get install mtr-tiny
```

Het standaard meegeleverde `netstat` is ook zeer krachtig. Onderstaande regel geeft bijvoorbeeld alle openstaande TCP sockets: `netstat -nat`
