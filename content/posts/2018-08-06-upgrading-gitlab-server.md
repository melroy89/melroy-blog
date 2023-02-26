---
title: Upgrading GitLab server
author: Melroy van den Berg
type: post
date: 2018-08-06T15:30:44+01:00
url: /2018/upgrading-gitlab-server/
featured_image: /images/2015/12/gitlab_header.png
images:
  - /images/2015/12/gitlab_header.png
categories:
  - Advanced
  - GNU/Linux OS
  - Handy Tools
  - Server
tags:
  - archive
  - CI/CD
  - Debian
  - GitLab
  - issues
  - kanban
  - Mattermost
  - Omnibus
  - release
  - storage
  - ticking
  - Upgrading
---

![GitLab logo](/images/2015/12/gitlab_logo.png)

I got a running **GitLab** server on my Debian Jessie server. GitLab Community Edition is an open-source git repository manager, but also supports code reviews, wiki's, issue tracking and much more! GitLab is very similar to Github in a way, however you have full control of the server. You are running your own git server.

Normally Github will do all the system administration, upgrades and such for you. They make sure your code is safe and saved no matter what. Since I use GitLab, I need to take care of my own server. What you definitively not want is; to lose all your precious data!

## Back-up

I have setup my GitLab via [Omnibus installation](https://about.gitlab.com/downloads/#debian8). Not long ago [GitLab 11.1.4 ](https://about.gitlab.com/2018/07/31/gitlab-11-1-4-released/)was released, which is again a big stable milestone release. I **don't trust** the upgrade scripts they provide (no offense), so lets make a full-blown backup by running.

[**UPDATE:** 20 Oct 2022] Run the following command on GitLab **v12.2 or higher:** `sudo gitlab-backup create`

Or the following command on GitLab **v12.1 and earlier**: `sudo gitlab-rake gitlab:backup:create`

Back-ups are stored in `/var/opt/gitlab/backup`. When you changed your location in your  `/etc/gitlab/gitlab.rb` configuration file (see `gitlab_rails['backup_path']`), the backup will be stored there. Be sure you also make backups to another server / computer. Even better: another location out-side your home or where the server is hosted. The back will backup all your repositories, wikis, database and uploads (images). The back-up doesn't back-up your configuration files. So be aware of that! Your GitLab configs can be found in the `/etc/gitlab` folder.

![Let's start upgrading](/images/2015/12/gitlab_text.png "Let's start upgrading")

## Upgrade

When use use the Omnibus setup, a new `gitlab_gitlab-ce.list` file is part of our `/etc/apt/sources.list.d/` directory. Meaning APT knows where to get the latest GitLab deb package.  
To upgrade  your GitLab to the latest version, just run:

```sh
sudo apt-get update
sudo apt-get upgrade
```

Or if you only want to upgrade GitLab run: `sudo apt-get install gitlab-ce`

If you are running CentOS instead of Debian run: `sudo yum install gitlab-ce`

![](/images/2015/12/Schermafdruk-van-2018-08-06-16-18-50.png)

When the server doesn't works (correctly), try restarting the server after an upgrade: `sudo gitlab-ctl restart`

You can also check the logging if you are interested or for debugging purposes: `sudo gitlab-ctl tail

Also check if all services are up: `sudo gitlab-ctl status`

And finally to a configuration check: `sudo gitlab-rake gitlab:check SANITIZE=true`

Good luck upgrading and have fun using GitLab!

## Major updates - Warning

When you are using omnibus installation, be sure you are prepared for major version updates (eg. like depreciated settings in your `/etc/gitlab/gitlab.rb` file).

Therefore check always the [updating guide online](https://docs.gitlab.com/omnibus/update/)!
