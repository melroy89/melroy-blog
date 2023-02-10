---
title: Let’s Encrypt – Is your website secure?
author: Melroy van den Berg
type: post
date: 2016-12-22T12:46:22+00:00
toc: true
url: /2016/lets-encrypt/
featured_image: /images/2016/03/header.jpg
categories:
  - GNU/Linux OS
  - Handy Tools
  - Networking
  - Security
tags:
  - CA
  - certificate
  - CSR
  - Debian
  - Encrypt
  - free
  - "Let's Encrypt"
  - open-source
  - server
  - SSL
  - TLS
---

![Let's Encrypt logo](/images/2016/03/letsencrypt_logo-1.png)

I was searching for a good and **free** TLS certificate which is signed by a trusted Certificate Authority (CA). A CA is an organization for issuing digital certificates. You need to have a Certificate Authority when you want to use HTTPS, secure HTTP web server connections. You know; when you visit a secure web-page (https://) and you will see a green lock-icon in your web-browser. This icon indicates that you have an encrypted connection with this website.

In this article I will explain how TLS certification requests normally works and how **Let's Encrypt** works. Let's Encrypt is a Certificate Authority, who provides **free** and trusted domain certificates. Eventually, I explain how to setup Let's Encrypt yourself using Nginx webserver.

<!--more-->

## How Certificate Requests works

In order to have a secure connection, you need a certificate (which consists of public/private keys). To get this certificate, you normally create a Certificate Signing Request (CSR). This CSR needs to be signed by a Certificate Authority. On the world there exist only a couple of "trusted" certificate authorities. These root-certificates are finally trusted by your webbrowser. Too bad most of the Certificate Authorities costs money (about 18 euros per year for 1 domain). Yep, you need to pay for them.

![Requesting a SSL Certificate](/images/2016/03/ssl.png "Requesting a TLS Certificate")

Another option is to create a so called S*elf-signed certificate*. On that moment you still need to create a private key and a certificate signing request (CSR). But instead you will sign your CSR yourself using your own private key! This is still very secure, and you still have a secure connection. Why not use it? Well, there is one down-side. Visitors who visit your webserver which uses a self-signed certificate, will get a big warning &#8220;_Your connection is not private_&#8221; or something similar. Your visitors will almost never continue and they are gone&#8230;

![Warning you get when using Self-signed Certificate](/images/2016/03/untrusted_cert.png "Warning you get when using Self-signed Certificate")

## Let's Encrypt

On April 12, 2016 Let's Encypt left Beta. Let's Encrypt makes it possible to create a trusted certificate, which is trusted by all major web-browsers. The big pro is that Let's Encrypt is totally 100% **FREE** to use! Let's Encrypt is a fully automated and [open-source](https://github.com/letsencrypt) certificate authority. Free automated certificate authorities are the future of secure server connections.

![Let's Encrypt](/images/2016/03/letsencrypt.png "Let's Encrypt High-level overview")

The (Nginx) server can request a certificate from Let's Encrypt, which is free but limited up to [100 certificates per domains](https://community.letsencrypt.org/t/rate-limits-for-lets-encrypt/6769). There is **NO** limit to the number of certificates that can be issued to different domains. The end-use can use the secure TLS/SSL connection between his computer and the webserver. Renewing is needed because the Let's Encrypt certificates are only a few tens of days valid (90 days at the moment). In the future a nginx plugin can make this even easier.

Furthermore Let's Encrypt is one of the [Linux Foundation Collaborative Projects](http://collabprojects.linuxfoundation.org/). Big names as Cisco, Google, IBM, Intel, Qualcomm, Samsung and others are also part of the Linux Foundation Collaborative Projects.

> Let's Encrypt is created by the Internet Security Research Group (ISRG). ISRG is a California public benefit corporation.

### Installation

I'm running a Debian Jessie webserver myself. You could clone the [Github repository](http://git clone https://github.com/certbot/certbot) and use the `certbot-auto` command. Or install the latest `certbot` via Jessie backports. I choose to use the certbot package from the Jessie [Backports](https://wiki.debian.org/Backports).

> Not long ago the package has been renamed from letsencypt to certbot. We will use the certbot package.

First enable the Backports repository in the sources.list (`sudo nano /etc/apt/sources.list`), add the following line: `deb http://ftp.debian.org/debian jessie-backports main`

Then install the `certbot` package:

```
sudo apt-get update
sudo apt-get install certbot -t jessie-backports
```

Too bad Let's Encrypt doesn't support wildcard certificates. Instead you need to request a new certificate for every domain & **sub**-domain. Let's begin with setting-up my [Server webpage](https://server.melroy.org). First we need to be sure the `.well-know` directory is publicly available, needed for the webroot plugin.

> Let's Encrypt does also provide other alternatives besides Webroot plugin like Standalone Plugin and Apache plugin. More about that later.

I will edit my Nginx site configuration file first: /etc/nginx/sites-enabled/server.melroy.org. Within the server block I added:

```conf
server {
        [...]
        # Let's Encrypt Webroot plugin
        location ~/.well-known {
                allow all;
                default_type text/plain;
        }
}
```

Reload the Nginx configuration: `sudo service nginx reload`

### Webroot plugin

Be sure the current website is not configured to use self-signed certificates, otherwise the verification will fail at this point. Then I finally use the `certbot certonly --webroot` command to obtain a new certificate:

```sh
sudo certbot certonly --webroot -w /var/www/server.melroy.org/html/ -d server.melroy.org
```

_**TIP:**_ There is currently a **limit of 20 certificate** **requests/week**. You can combine multiple domains together and this will act as 1 certificate request. This certificate can be used for multiple-domains. To do so, you can do the same request as above with more domains:

```sh
sudo certbot certonly --webroot -w /var/www/html -d www.melroy.org -d melroy.org -w /var/www/other -d other.melroy.net -d another.other.melroy.net
```

In the example above you would obtain a single certificate for all of those domain names (4 in total), using the `/var/www/html` webroot directory for the first two domains, and `/var/www/other` for the second two domains.

### Standalone plugin

**_Or_** you could use the `--standalone` parameter, when your systems has _no_ webserver, or when direct integration with the local webserver is not supported or not desired (port 80/443 should be available when using `--standalone`flag). Then do the following:

```sh
sudo certbot certonly --standalone -d server.melroy.org
```

### Webserver Plugins

If you are using Apache, you could use the [Apache plugin](https://certbot.eff.org/#debianjessie-apache). Nginx server is not yet supported via the plugin system, that is why I used Webroot plugin in this tutorial.

### Configure

Either way, when the request is successfully a certificate chain file will be created, in my case: `/etc/letsencrypt/live/server.melroy.org/fullchain.pem`

A chain consists of multiple certificates which are literally "chained together". The list of the files in /etc/letsencrypt/live/server.melroy.org are:

- **cert.pem:** Your domain's certificate
- **chain.pem:** The Let's Encrypt chain certificate
- **fullchain.pem:** `cert.pem` and `chain.pem` combined
- **privkey.pem:** Your certificate's private key

We will use the `fullchain.pem` as the **certificate file**, and `privkey.pem` as the **certificate key file** for the Nginx server.

**Be-aware:** 1024-bit keys are [unsafe to use](http://www.computerworld.com/article/2877654/the-end-for-1024-bit-ssl-certificates-is-near-as-mozilla-kills-a-few-more.htm).

That is why I want to further improve the security by creating a strong Diffie-Hellman Group, which determines the strength of the key exchange (2048-bit in this case). This can take a while: `sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048`

When this is done, we continue. We will change the Nginx site configuration, in my case: /etc/nginx/sites-available/server.melroy.org:

```conf
# Redirect ALL HTTP traffic to HTTPS
server {
        listen 80 default_server;
        server_tokens off;
        return 301 https://$host$request_uri;
}

# HTTPS block
server {
        listen 443 ssl default_server;
        server_name server.melroy.org;
        # Don't show version number
        server_tokens off;

        # TLS Certificates
        ssl_certificate /etc/letsencrypt/live/server.melroy.org/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/server.melroy.org/privkey.pem;
        # Increase security (using the Diffie-Hellman Group file)
        ssl_dhparam /etc/ssl/certs/dhparam.pem;

        ssl_protocols TLSv1.2;
        ssl_ciphers 'ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256';
        ssl_prefer_server_ciphers on;

        ssl_session_timeout 1d;
        ssl_session_cache shared:SSL:10m;
        ssl_stapling on;
        ssl_stapling_verify on;
        add_header Strict-Transport-Security max-age=15768000;
       
        # Let's Encrypt Webroot plugin
        location ~/.well-known {
                allow all;
        }
}
```

The orange part I changed to configure Let's Encrypt in Nginx webserver. If backwards compatibility is necessary (for Windows XP for example), use the following instead:

```conf
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:ECDHE-RSA-AES128-GCM-SHA256:AES256+EECDH:DHE-RSA-AES128-GCM-SHA256:AES256+EDH:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4";
```

However, I'm using the recommended cipher suite from [Mozilla](https://wiki.mozilla.org/Security/Server_Side_TLS).

Now we restart the server: `sudo service nginx reload`

When you visit your own website and open the server certificate, you should verify if the Common Name (CN) is equal to &#8220;Let's Encrypt Authority X1&#8221;.

![Let's Encrypt Certificate](/images/2016/03/melroys_certificate.png "Let's Encrypt Certificate in Firefox")

Now we can **verify** if the website is secure enough go to [Qualys SSL Labs SSL Server Test](https://www.ssllabs.com/ssltest/analyze.html) and enter your domain name. You should get a A+ rating, like below.

![server.melroy has A+ rating](/images/2016/03/melroy_a.png)

[server.melroy.org](https://server.melroy.org) has A+ rating!

### Renewal

Latest Let's Encrypt releases contain fully automated renew conjobs. So you don'y need to do anything yourself.

If you really want, you could trigger a renewal manually using the command: `certbot renew` (but again, is not required anymore).

### Conclusion

Well, that's it! Your webserver is now using a very safe TLS secure connection by using Let's Encrypt Certificates. All free and [open-source](https://github.com/letsencrypt/letsencrypt).

Good luck!

### Some tips

Check Nginx configuration for any errors/warnings by executing: `sudo nginx -t`

Let's Encrypt log is: `/var/log/letsencrypt/letsencrypt.log`

## Did you know&#8230;

- that TLS is the successor of SSL? Despite the fact that term "SSL' is more well-known, TLS  should be used by now. All SSL versions are broken and insecure.
- that TLS (v1.0 1999) has been revised twice? TLS v1.1 (2006) and TLS v1.2 (2008).
- a quantum computer with 1,000 qubits could easily crack encryption keys? So in the future the certificate we use today aren't so safe anymore, even if you are using 2048 or 4096 bit keys.  
  That is why you need to think TODAY about how to protect the data in the future. Especially since the  NSA can record your data today, and crack it over a few years.
- that NSA created backdoors in hardware like CPU and encryption chips? When the hardware can't be trusted, your are doomed. The software can encrypt the data very securely, however the hardware may send the non-encrypted data over the Internet (let's say to NSA) before it's encrypted. Data is in RAM isn't encrypted. The worst of all, you just don't know if you hardware contains any backdoors.
- that NSA created yet another backdoor in cryptography? NSA build a backdoor in the system's random generator. Some tools like OpenSSL used the system's random generator. Which is a good approach if the system really returns a good random number. Unfortunately, the NSA interfered with this. Meaning you won't get a "random number' which is _really_ random. Now, the system's random generator is not fully trusted anymore. That's why OpenSSL also uses its own random generator in software.
- that in Holland almost 20% of the local authorities (Gemeenten) still uses the very insecure SSLv2? Whereby personal data is almost literally open for the public. {{< super "[1](http://tweakers.net/nieuws/108985/autoriteit-persoonsgegevens-gebruik-sslv2-kan-in-strijd-zijn-met-de-wet.html)" >}}
