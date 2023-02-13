---
title: Server Hardening
author: Melroy van den Berg
type: post
date: -001-11-30T00:00:00+00:00
toc: true
url: /2023/server-hardening/
draft: true
categories:
  - Server
  - Hardening
  - GNU/Linux OS
tags:
  - hardening
  - security
  - Linux
  - GNU
  - bash
  - terminal
---

## Introduction

## Harding Host Tools

### Lynix

https://cisofy.com/downloads/lynis/

```sh
cd /opt
sudo wget https://downloads.cisofy.com/lynis/lynis-3.0.8.tar.gz
sudo tar -xf lynis-3.0.8.tar.gz
cd lynis
sudo ./lynis audit system
```

### Docker Bench for Security

Clone and run the Docker Bench Security script:

```sh
git clone https://github.com/docker/docker-bench-security.git
cd docker-bench-security
sudo ./docker-bench-security.sh
```

## Host Machine

### Enforce secure passwords

`sudo apt install libpam-cracklib`

Under Ubuntu we edit: `/etc/pam.d/common-password`

Add the following line to the top of the file (at least _above_ the existing line: `password [success=1 default=ignore]pam_unix.so`):

```ini
password requisite pam_cracklib.so retry=3 minlen=15 difok=3 ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1
```

### Create seperate user

Create a new user: `useradd -m <user> -s /bin/bash`

Set password for user: `passwd <user>`

Add user to sudo group: `usermod -aG sudo <user>`

And maybe Docker for example?: `usermod -aG docker <user>`

#### Disable root

Disable root shell login: `sudo chsh -s /usr/sbin/nologin root`

And disable root user (remove password and lock user): `sudo passwd --delete --lock root`

### SSH Daemon

#### Locally (on your local machine, not the server)

Generate a SSH key, if you didn't have this already: `ssh-keygen`

Copy SSH public key to the Server now: `ssh-copy-id <user>@<server-ip>`

#### Change sshd settings

Edit: `/etc/ssh/sshd_config` file:

```ssh-config
LoginGraceTime 2m
PermitRootLogin no
MaxAuthTries 2
PubkeyAuthentication yes
PasswordAuthentication no
DisableForwarding yes
X11Forwarding no
PrintMotd no
ClientAliveCountMax 2
```

---

sudo systemctl restart sshd

### Allow/deny

Edit `/etc/hosts.allow`:

```text
sshd: 192.168.1.\*
And: /etc/hosts.deny:
sshd : ALL
```

### Enable syslog messages via TCP - RSyslogd

Enable RSyslog TCP port (514). Uncommit the following two lines in /etc/rsyslog.conf:

```ini
module(load="imtcp")
input(type="imtcp" port="514")
```

Then restart the service: `sudo systemctl restart rsyslog.service`

## Docker

Now let's move to our Docker setup.

### Edit default Docker daemon configs

Be sure you enable syslog messages via TCP in RSyslog, see above.

Next, create or edit the following /etc/docker/daemon.json file:

```json
{
  "experimental": false,
  "icc": false,
  "userns-remap": "default",
  "log-driver": "syslog",
  "log-opts": {
    "syslog-address": "tcp://127.0.0.1:514"
  },
  "storage-driver": "overlay2",
  "default-ulimits": {
    "nofile": {
      "Hard": 64000,
      "Name": "nofile",
      "Soft": 64000
    }
  },
  "userland-proxy": false,
  "no-new-privileges": true
}
```

I want to disable experimental features so I set experimental to false.
Icc to false will disable inter-container communication (on the default bridge network). userns-remap will use Linux namespaces to map to seperate user (the dockremap user).
We set the default storage driver to overlay2, just to be sure. We increase some default ulimits for Docker.

We want to keep live-restore to false ("live-restore": false), otherwise I noticed we got host.docker.internal host mapping doesn't seems to work: https://github.com/moby/moby/pull/42785

We don't want to use the default userland proxy, we want to use hairpin NAT.

Next, we want to prevent your container processes from gaining additional privileges, so we set no-new-privileges to true.
Additionally, you could also drop all Linux capabilities (https://man7.org/linux/man-pages/man7/capabilities.7.html) using: cap-drop=all. And maybe only enable the Linux capabilities you really need for that container (if any).

Docs: https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file

### Docker containers not running as root-user

When you are leveraging the `Dockerfile`, you are able to create a **new** user and then switch to this new user by using the `USER` option. If you want to have write access to the files, you can copy the files via `--chown=` flag as well. Here is an example:

```Dockerfile
RUN useradd -ms /bin/bash worker

WORKDIR /home/worker

COPY --chown=worker:worker requirements.txt ./
RUN pip3 install --user --no-cache-dir -r requirements.txt

COPY --chown=worker:worker . .

USER worker
```

Do don't need to copy the files with `--chown`, if the user does not need to write the files, as long as you place `USER <username>` in this case at the bottom of the Dockerfile. When you set `USER <username>` also depends on the folder permissions and what you want to achieve.

**Did you know?**

> The NodeJS Docker images has already a user called `node`, which you can use and set after you copies the files to the Docker image:
>
> ```Dockerfile
> USER node
> ```

---

In the case you don't want to change or adapt a Dockerfile, you can also specify a user or user id (UID) in a Docker compose file. Using the YAML format: `user: <username | user-id>`, like below:

```yml
services:
  db:
    restart: always
    image: postgres:15-alpine
    user: postgres
```

### Bind network port only to the localhost interface

By default port mapping will be mapped to all interfaces (0.0.0.0). However, it's a good pratice to add Nginx in front of the service, which could also add SSL/TLS certs as well as load balancing. In that case we should say to Docker to only map the ports to localhost (127.0.0.1), like so in your Docker compose file. So from:

```yaml
ports:
  - "8080:8080"
```

To only listen on localhost:

```yaml
ports:
  - "127.0.0.1:8080:8080"
```

Within Nginx you can then forward the incoming web request from a domain name to 127.0.0.1:8080. Example snippet for Nginx (just an example; depends on your app):

```ini
location / {
   proxy_pass http://127.0.0.1:8080;
}
```

### Set Docker container limits

Using Docker compose v3.8 (eg. `compose.yaml` file):

```yaml
version: "3.8"
services:
  sevice-name:
    image: ...
    deploy:
      resources:
        limits:
          cpus: "1.5"
          memory: 400M
```

I use `docker stats` to check what the current memory usage is and estimate what the maximum may be for each container.

If you don't want to use Docker swam you can start Docker compose v3 with the deploy settings above using: `docker compose --compatibility up -d`.

### Docker restart policy

You actually do not want to use the obsolete `restart` statement anymore. So let's move to `restart_policy` with a max attepts of 5 with the `on-failure` condition.

```yaml
version: "3.8"
services:
  sevice-name:
    image: ...
    deploy:
      restart_policy:
        condition: on-failure
        delay: 5s
        max_attempts: 5
        window: 120s
```

Of course you can now combine the `deploy.resources`, from the previous paragraph, together with this `deploy.restart_policy` section in YAML.

### Docker write only file system

Docker Bench for Security will also warn you when your Docker filesystem is writable, which is a bad pratice. It's not always easy to solve, since some applications might need to write to disk.

In Docker compose you can create a read-only filesystem using the `read_only: true` option:

```yaml
services:
  sevice-name:
    image: ...
    read_only: true
    volumes:
      - /data:/app/data_folder
    tmpfs:
      - /run:mode=1777,uid=1000,gid=1000
```

Since everything is now read-only, you might to create volume mounts (or binds) to your host which will be writable. And/or create a tmpfs.
