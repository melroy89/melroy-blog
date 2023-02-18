---
title: Newsgroup Client
author: Melroy van den Berg
type: post
date: 2015-12-08T13:45:22+00:00
url: /2015/usenet-newsgroup-client/
featured_image: /images/2015/12/nzbget_header.png
categories:
  - Advanced
  - GNU/Linux OS
  - Handy Tools
  - Server
tags:
  - C++
  - client
  - download
  - Linux
  - newsgroups
  - nzb
  - usenet
---

![Student Stephen Daniel software that first ran the Usenet newsgroups](/images/2015/12/stephen_daniel.jpg "Student Stephen Daniel software that first ran the Usenet newsgroups (1979)")

Usenet Newsgroups is a way to communicate between people on the Internet. Newsgroup is a discussion group and despite the name not for news. Usenet Newsgroup were the most used Internet service when the World Wide Web (WWW) didn't exist yet. Newsgroup uses Network News Transfer Protocol (NNTP) for distributing the posts.

<!--more-->

While newsgroups were not created with the intention of distrusting files (such as videos), they have proven to be quite good at this. Because newsgroups are widely distributed, a file will be spread to many other servers. And because the newsgroups are widely distributed, a file uploaded will be spread to many other servers and can be downloaded by an unlimited number of users. The most important feature of a newsgroup is that the user can download from a local news server, rather than one from a more distant server with limited speed / connectivity. Newsgroup uses peer-to-peer technology. Even so, a big benefit of newsgroups is that the users doesn't need to share the files with other users in contrast with Torrents.

How to start using Newsgroups and which client should I choose? Read more!

## Usenet service provider

There exist many Usenet service providers, for example [Supernews](http://www.supernews.com/) or [Newshosting](https://www.newshosting.com/). You need to pay a fix amount per month/year and you will get incredible downloading speeds over the 100Mbps. Meaning you use full bandwidth of your Internet connection. Of-source your Internet connection must be capable to handle this speed. The connection with the server support TLS (SSL) secure connections, meaning encrypted data will be sent to your computer. Furthermore, using **NZB** files (XML format) you will get the latest content available on the Internet, like the last episode of a series. A NZB client is necessary in order to connect to the Usenet service provider and start downloading. I like NZBGet, it's written in C++ and optimized for speed.

## NZB Client

To install NZBGet under Arch Linux, execute the following command-line: `yaourt -S nzbget untar unzip`

For other distributions. Use the Linux installer which can be downloaded from [NZBGet website](http://nzbget.net/download/). Or for the hard-core people; get the stable release [source from GitHub](https://github.com/nzbget/nzbget/tree/v16.4) (v16.4).

![NZBGet Interface](/images/2015/12/nzbget-e1449578281188.jpg "NZBGet Interface")

## Configuration

Copy the config file to the correct directory: `sudo cp /usr/share/nzbget/nzbget.conf /etc/nzbget.conf`

Edit the NZBGet configuration file: `sudo nano /etc/nzget.conf`

```conf
MainDir=~/downloads

Server1.Name=Supernews
Server1.Host=news.supernews.com
Server1.Port=119
Server1.Username=your@email.com
Server1.Password=secretpass
Server1.Connections=40

ControlPort=6789
ControlUsername=nzbget
ControlPassword=password

DaemonUsername=melroy
UMask=0007
```

You can change the `ControlPort` to port 80 (root is required), default HTTP port, if you like. When you use the default port you can visit the NZBGet web-interface on: [http://localhost:6789/](http://localhost:6789/).  
Of-source change the `DaemonUsername` to your Linux user and don't forget the change the Server settings. You can leave the ControlUsername and Controlpassword empty if you want to disable authentication on the web interface.

Create the destination directory and the log file, in my case:

```sh
mkdir /home/melroy/downloads/dist
touch /home/melroy/downloads/dist/nzbget.log
```

## Up and running!

You can start NZBGet in console mode via as root: `nzbget -c /etc/nzbget.conf -s`

Or start NZBGet as daemon (server) via: `nzbget -c /etc/nzbget.conf -D`

I use [NZBIndex](http://www.nzbindex.nl/) or [NewzBin.com](https://web.newzbin.org/) for searching for files. You can use the NZBGet web interface to upload the nzb file.

Have fun using NZBGet, one of the best NZB clients out here.
