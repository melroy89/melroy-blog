---
title: Server Hardening
author: Melroy van den Berg
type: post
date: 2023-02-23T16:14:37+01:00
toc: true
url: /2023/server-hardening/
featured_image: /images/2023/02/server-security.jpg
categories:
  - Server
  - Hardening
  - Intermediate
  - Security
  - GNU/Linux OS
tags:
  - hardening
  - security
  - benchmark
  - Docker Compose
  - RSyslog
  - Linux
  - GNU
  - Bash
  - terminal
  - Docker
---

## Introduction

Security of a system is often overlooked or not considered important enough. Some might think not about the possible consequences, which might result in a hacked or compromised server. Maybe sensitive data gets stolen or encrypted with major consequences.

A collection of _tools, techniques and best pratices_ can help to reduce such vulnerabilities. This process is called **system hardening**.

We have seen quote a lot of hacks and data breaches over the past years across different big companies, including but not limited to: PayPal, LastPast, T-Mobile, MailChimp, Netflix, Dropbox, OpenSea, Twitter...

![LastPass was hacked](/images/2023/02/lastpass-hacked.webp)

---

As stated earlier, the consequences of a poorly secured system can be disastrous. Our system can be compromised, so it's wise to validate the security of your own Linux system and server.

I split this article in three sections, first hardening tools, then some best pratices on the **host OS** level and next we focus on several **Docker** security improvements. Let's first start with some toolings:

## Hardening Tools

There exists _many_ different hardening tools, which will help you identify best practices or other possible vulnerabilities that requires your attention.

Those hardening tools will check your system on most common pitfalls or misconfigurations, which should help you to what needs to be changed.

We will focus on the _two_ tools listed below. And since both tools will give a lot of improvement proposals, we can't cover all those suggestions the tool reports back in this article.  
However, this article will definitely give you a head start.

### Docker Bench for Security {#docker-bench-security}

Clone and run the Docker Bench Security script:

```sh
git clone https://github.com/docker/docker-bench-security.git
cd docker-bench-security
sudo ./docker-bench-security.sh
```

### Lynis

Install Lynis using

```sh
cd /opt
sudo wget https://downloads.cisofy.com/lynis/lynis-3.0.8.tar.gz
sudo tar -xf lynis-3.0.8.tar.gz
cd lynis
```

Or [download Lynx from here](https://cisofy.com/downloads/lynis/).

To perform a local security system scan, execute now:

```sh
sudo ./lynis audit system
```

![Lynis](/images/2023/02/lynis.png "Lynis audit run")

## Host Machine

We will first cover the best practices about hardening the Linux host machine.

### Enforce secure passwords

We want to enforce secure passwords to users, so it's harder to brute force passwords. For that, we first need to install: `sudo apt install libpam-cracklib`

Under Debian based systems we edit the file: `/etc/pam.d/common-password`.

Finally, we add the following line to the top of the file (at least _above_ the existing line: `password [success=1 default=ignore]pam_unix.so`):

```ini
password requisite pam_cracklib.so retry=3 minlen=15 difok=3 ucredit=-1 lcredit=-1 dcredit=-1 ocredit=-1
```

### Disable su

The `sudo` group under Linux group giving users access to execute commands as the `root` user. I don't like the fact that users who are part of the `sudo` group can run the `su` or `sudo -l` commands to actually become the `root` user.

Let disable that by editing `/etc/pam.d/su` file:

```conf
# DISALLOW su command, my commenting this line below:
#auth       sufficient pam_rootok.so
```

Within the same configuration file, we can also do some fancy PAM stuff. For example let's say the user `melroy` still want to be able to switch to another user called `demo`:

```conf
# Allow melroy user to switch to another user (demo)
auth  [success=ignore default=1] pam_succeed_if.so user = demo
auth  sufficient                 pam_succeed_if.so use_uid user = melroy
```

### Sudoers file

I just would like to share an alternative approach for the `sudo` / `su` groups as well.

Let's say you want to give a user "apt" execution rights but nothing else that requires the `sudo` command.

You can edit the `/etc/sudoers` file and add the following line for a user "demo":

```conf
demo ALL=(root) /usr/bin/apt update, /usr/bin/apt install *, /usr/bin/apt upgrade, /usr/bin/apt-get update, /usr/bin/apt-get install *, /usr/bin/apt-get upgrade
```

Then you do **NOT** need to add the demo user to the `sudo` group. While this `demo` user is allowed to execute `apt` commands and nothing else.

### Create separate user

If you didn't already, let's create a separate user on our server, which will be the replacement of the `root` user.

Creating a new user, via: `useradd -m <user> -s /bin/bash`  
Set password for user: `passwd <user>`  
Add user to sudo group: `usermod -aG sudo <user>`

And maybe you want to add the `docker` group to the user? If so, execute: `usermod -aG docker <user>`

### Disable root user

Disabling the `root` user prevents unauthorized access with unlimited privileges.

Disabling the root shell login: `sudo chsh -s /usr/sbin/nologin root`

Next, we disable root user on the machine (remove password and lock the user):  
`sudo passwd --delete --lock root`

### SSH Daemon

The default [OpenSSH daemon](https://linux.die.net/man/8/sshd), also known as sshd, configuration is rather unsafe. Let's **not** use password authentication for example.
Instead we will use our local SSH key pair for authorization towards the SSH serer.

First, we generate new SSH key on your **local machine**, if you didn't have this already: `ssh-keygen`

Next, we will copy the SSH _public key_ to your server using the following command: `ssh-copy-id <user>@<server-ip>`

We are now ready to change the server SSH daemon config. We will edit the config file `/etc/ssh/sshd_config`:

```ssh-config
LoginGraceTime 2m
PermitRootLogin no
MaxAuthTries 2
PubkeyAuthentication yes
PasswordAuthentication no
DisableForwarding yes
X11Forwarding no
DebianBanner no
ClientAliveCountMax 2
```

This snippet will not only disable password authentication and enable public key authentication.

But also disable root login (very important!). And we will [disable TCP and X11 forwarding](https://man.openbsd.org/sshd_config#DisableForwarding) as well as lower the amount of retries and alive connections. Last but not least disabling any banner message (for Debian based systems).

Now let's restart the daemon: `sudo systemctl restart sshd`

### Allow / Deny

We can leverage the [allow and deny hosts files](https://linux.die.net/man/5/hosts.allow) under Linux to even block all access to the sshd service and only allow incoming connections from your local IP network. The example below is only about sshd, but other services can be restricted as well in similar fashion.

To allow SSH on the local network only, edit the `/etc/hosts.allow` and add the following:

```txt
sshd: 192.168.1.\*
```

And then edit: `/etc/hosts.deny`:

```txt
sshd : ALL
```

### Enable syslog messages via TCP - RSyslogd {#rsyslogd}

Rsyslogd is a powerful logging daemon, most likely present and enabled by default on your installation.

Let's enable TCP port (port `514`) in rsyslogd. So rsyslog allows incoming requests on `localhost:514`, so other applications can log towards RSyslogd. Which can be used by Docker daemon, [see later](#docker-daemon).

Uncommit the following two lines in `/etc/rsyslog.conf`:

```ini
module(load="imtcp")
input(type="imtcp" port="514")
```

Then restart the service: `sudo systemctl restart rsyslog.service`

### Linux Audit Daemon - Auditd

We can use auditd if let's say the system was compromised, then we can can track back and see how its system was compromised.

Install auditd: `sudo apt install auditd`

The main config file is located in: `/etc/audit/rules.d/audit.rules`. Here an example of my `audit.rules` file:

```conf
# Delete all previous rules
-D

# Increase the buffers to survive stress events.
# Make this bigger for busy systems
-b 48192

# This determine how long to wait in burst of events
--backlog_wait_time 60000

# Set failure mode to print a failure message
-f 1

# Set rate limit (messages per second)
-r 100

# Add Docker to the audit
-w /usr/bin/dockerd -p rwxa -k docker
-w /run/containerd -p rwxa -k docker
-w /var/lib/docker -p rwxa -k docker
-w /etc/docker -p rwxa -k docker
-w /lib/systemd/system/docker.service -p rwxa -k docker
-w /lib/systemd/system/docker.socket -p rwxa -k docker
-w /etc/default/docker -p rwxa -k docker
-w /etc/docker/daemon.json -p rwxa -k docker
-w /etc/containerd/config.toml -p rwxa -k docker
-w /usr/bin/containerd -p wa -k docker
-w /usr/bin/containerd-shim -p wa -k docker
-w /usr/bin/containerd-shim-runc-v1 -p wa -k docker
-w /usr/bin/containerd-shim-runc-v2 -p wa -k docker
-w /usr/bin/runc -p wa -k docker
```

_**Note:** The audit roles above are on purpose only focusing on Docker. Be free to extend your `audit.rules` file with [more rules](https://raw.githubusercontent.com/Neo23x0/auditd/master/audit.rules)._

### Sudoers.d folder

Permissions for directory `/etc/sudoers.d` where not strict enough according to Lynis, execute:

```sh
sudo chmod 750 /etc/sudoers.d
```

### Kernel hardening

I extended my `/etc/sysctl.d/10-kernel-hardening.conf` config with the following additional kernel configs:

```conf
dev.tty.ldisc_autoload = 0
fs.protected_fifos = 2
fs.suid_dumpable = 0
kernel.kptr_restrict = 2
kernel.modules_disabled = 1
kernel.perf_event_paranoid = 3
kernel.sysrq = 0
kernel.unprivileged_bpf_disabled = 1
net.core.bpf_jit_harden = 2
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.log_martians = 1
net.ipv4.conf.all.send_redirects = 0
net.ipv4.conf.default.accept_redirects = 0
net.ipv4.conf.default.log_martians = 1
net.ipv6.conf.all.accept_redirects = 0
net.ipv6.conf.default.accept_redirects = 0
```

_**Important note:** `net.ipv4.conf.all.forwarding` needs to be set to: `1`, if you disable IP forwarding then Docker containers would be unable to route the packages. Thus you will not be able to access the Internet from Docker. Unless that is really what you want._

And I updated the following two lines in `/etc/sysctl.d/10-network-security.conf`:

```conf
net.ipv4.conf.default.rp_filter = 1
net.ipv4.conf.all.rp_filter = 1
```

Reload the sysctl configs without rebooting: `sudo sysctl --system`

See [more kernel tuning snippet](https://gitlab.melroy.org/-/snippets/609).

I love to go into details about each kernel option, but then this article would be way too long.

## Docker

Now let's move to our Docker setup. Docker Engine is used for running isolated containers, but unlike VMs Docker can reuse the OS kernel resources. The following sections are based on the audit results performed by the [Docker Bench for Security script](#docker-bench-security).

![Docker Engine Architecture](/images/2023/02/docker-engine-architecture.jpg)

### Introducing Docker daemon config {#docker-daemon}

We will create or edit the default Docker daemon configuration file `/etc/docker/daemon.json`, with the following content:

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

_**Note:** We will use the [rsyslogd configuration above](#rsyslogd) for logging._

Let's explain that is happening. I disable experimental features, so I set `experimental` option to `false`.
The `icc` option to `false` will disable inter-container communication (on the default bridge network). `userns-remap` option will use Linux namespaces to map to separate user (the `dockremap` user and group is created and used for this purpose).

We set the default `storage-driver` option to `overlay2` (which should be the default).

We increase some default ulimits for Docker, thus we increase the maximum number of open files/file descriptors. You might want to increase the `nofile` soft and hard limits in `/etc/security/limits.conf` configuration file as well:

```conf
root             soft    nofile          500000
root             hard    nofile          500000
```

We want to keep `live-restore` to `false`, since this might trigger a bug to appear 😢. Since I noticed that `host.docker.internal` host mapping doesn't seems to work when I enabled live restore, see also [this GitHub issue](https://github.com/moby/moby/pull/42785).

We don't want to use the default userland proxy, we want to use hairpin NAT for for forwarding when Docker ports are exposed. For that we set `userland-proxy` option to `false` once again.

Next, we want to **prevent** a Docker container processes from gaining additional privileges, so we set `no-new-privileges` option to `true`.

Read more about: [the Docker Daemon config](https://docs.docker.com/engine/reference/commandline/dockerd/#daemon-configuration-file).

**Did you know?**

> Docker containers are running with several [Linux kernel capabilities](https://man7.org/linux/man-pages/man7/capabilities.7.html) enabled by default. You can disable the Linux capabilities using the option during container start-up: `--cap-drop=all`.
>
> Once you disabled all capabilities, you might want to enable the Linux capabilities using: `--cap-add` flag, for the Linux capabilities you really need on that container. Here is an example:
>
> ```sh
> docker run -d --cap-drop=all --cap-add=setuid --cap-add=setgid
> ```

### Docker containers not running as root-user

Next, we want to prevent running a container as a root user. We can leverage the **`Dockerfile`** you will be able to create a **new** user and then switch to this new user by using the `USER` option. If you want to have write access to the files, you can copy the files via `--chown=` flag as well. Here is an example:

```Dockerfile
RUN useradd -ms /bin/bash worker

WORKDIR /home/worker

COPY --chown=worker:worker requirements.txt ./
RUN pip3 install --user --no-cache-dir -r requirements.txt

COPY --chown=worker:worker . .

USER worker
```

Do don't need to copy the files with `--chown`, if the user does not need to have write access to the files, as long as you place `USER <username>` in this case at the bottom of the `Dockerfile`.

**Did you know?**

> The official [NodeJS Docker image](https://hub.docker.com/_/node/) has already a user called "node", which you can use and set after you copied the files to the Docker image:
>
> ```Dockerfile
> USER node
> ```

---

In the case you don't want to change or adapt a Dockerfile, you can also specify a user or user id (UID) in a **[Docker compose file](https://docs.docker.com/compose/compose-file/)**. Using the YAML format: `user: <username | user-id>`, like below:

```yml
services:
  db:
    restart: always
    image: postgres:15-alpine
    user: postgres
```

### Bind network port only to the localhost interface

By default Docker port mapping will be mapped to all interfaces (`0.0.0.0`). However, it's a good practice to add Nginx in front of the service, which allows you to add a SSL/TLS certificate as well as load balancing.

In the case you have a reverse proxy, like Nginx, in front of your Docker containers, you only want to map the Docker ports to localhost (`127.0.0.1`). This can easily done by changing your Docker compose file (or `docker run` command line). An example of Docker compose, change from:

```yaml
ports:
  - "8080:8080"
```

To only listen on `localhost` / `127.0.0.1`:

```yaml
ports:
  - "127.0.0.1:8080:8080"
```

Then within Nginx config you will proxy the incoming web requests from a specific (sub) domain name to `127.0.0.1:8080`. Example snippet for Nginx:

```ini
location / {
   proxy_pass http://127.0.0.1:8080;
}
```

Of course these are just examples, your actually Nginx config might differ.

### Set Docker container Limits

Using Docker Compose v3.8 . Example `compose.yaml` file:

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

I use the `docker stats` command to see what the current memory usage is, and estimate what the maximum might be for each container.

![Docker stats terminal output](/images/2023/02/docker_stats.jpg "Docker stats output")

If you do **NOT** want to use [Docker swarm](https://docs.docker.com/engine/swarm/) that comes with Compose v3, use the `--compatibility` flag to start the container: `docker compose --compatibility up -d`.

### Docker Restart Policy

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

You are now free to combine the `deploy.resources`, from the previous paragraph, together with this `deploy.restart_policy` section in YAML.

### Docker write only file system

Docker Bench for Security will also warn you when your Docker filesystem is writable, which is a bad practice. It's not always easy to solve, since some applications might need to write to disk.

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

## Conclusion

I hope you have come to understand the importance of good security.  
I also hope that I managed to get you excited to also delve into your own (server) security.

Don't forget to run the [security benchmarking tools](#hardening-tools) during hardening process to discover remaining vulnerability and validate that your hardening actions are indeed improving the benchmark scores. And execute a regular audit to ensure no new vulnerabilities are introduced.

While we've covered quite a bit in this article, it shouldn't be the end. But rather _the start_ of further hardening your server. Other topics might include: Automatically install security patches and keep your software up-to-date, enable a firewall and limit the incoming and outgoing network traffic, securing DNS traffic, creating alerting on Auditd or RSyslog, securing other services like Postfix, Nginx or rpcbind to name a few topics.
