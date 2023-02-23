---
title: Linux server opzetten
author: Melroy van den Berg
type: post
date: -001-11-30T00:00:00+01:00
draft: true
url: /?p=774
categories:
  - Intermediate
  - Windows OS
---

Installing mysql, php, blabla

Add '#' before this line in `/etc/mysql/my.cnf`:

```
bind-address    = 255.112.324.12
```

Accept all connections from the mysql user, via:

If you want to add new database called foo for user bar and remote IP `162.54.10.20` then you need to type following commands at mysql> prompt:

```sh
mysql> CREATE DATABASE foo;
mysql> GRANT ALL ON foo.* TO bar@'162.54.10.20&#8242; IDENTIFIED BY 'PASSWORD';
```

Grant access to existing database

Let us assume that you are always making connection from remote IP called 162.54.10.20 for database called webdb for user webadmin then you need to grant access to this IP address. At mysql> prompt type following command for existing database:

```sh
mysql> update db set Host='162.54.10.20&#8242; where Db='webdb';
mysql> update user set Host='162.54.10.20&#8242; where user='webadmin';
```
