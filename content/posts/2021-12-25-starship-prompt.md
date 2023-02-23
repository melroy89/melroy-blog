---
title: Starship Prompt
author: Melroy van den Berg
type: post
date: 2021-12-24T23:26:37+01:00
url: /2021/starship-prompt/
featured_image: /images/2021/12/starship.jpg
categories:
  - Beginner
  - GNU/Linux OS
  - Handy Tools
  - Programming
tags:
  - guide
  - how-to
  - Linux
  - prompt
  - Startship
  - Bash
  - terminal
---

![](/images/2021/12/starship_logo.png)

I would like to share a nice 'secret'. I want to introduce you to the Starship prompt!
This is a getting started guide for Starship. I'm using Starship every day.

[Starship Prompt](https://starship.rs/), _not to be confused with_ the Starship from SpaceX 😆, is a cross-shell prompt written in Rust. The prompt works in any common shell you may already use under GNU/Linux, like Bash.

In fact, Starship prompt works under any shell under any operating system.

## Why?

Why would you want to use Starship prompt in the first place? Let's say you are already using Bash.

Well.. If you are a software engineer like myself. Starship is very useful. It extends your terminal with additional features. It's not a replacement of Bash, instead Starship is more an addition.

Starship will display additional information of many of your projects, like Git, Java, PHP, Ruby, Rust, Scala, JavaScript / NodeJS, Python, CMake, &#8230; and many more. They call it **modules** within Starship.  
For example Starship will show you information about when you enter a git repository using the **Git** **modules**.

Starship shows you the _current_ **git branch** that is checked-out and the latest **git tag**. It also shows you in the terminal if you have any _uncommitted changes_ left to commit. As well as if there are git commits that _still_ need to be pushed, using the git status module.

![](/images/2021/12/bracketed-segments-before.png "Starship in action")

## Getting started

Download and install the [Startship prompt](https://starship.rs/guide/#%F0%9F%9A%80-installation) with the terminal via:

```sh
curl -sS https://starship.rs/install.sh | sh
```

Now add Starship to your favorite shell (example below is for the Bash shell).  
Add the following line to the end of the `~/.bashrc` file:

```sh
eval "$(starship init bash)"
```

Now, close your terminal and reopen a new terminal window. And Voilà!

**You are running Starship!**

**_Note:_** If you are running into font / icon issues, [try installing a nerd font](https://www.nerdfonts.com/), to be sure you have all the icons available within the terminal.

## Configuration

The default configuration is actually pretty good already. That being said, Starship offers a ton of [configuration options](https://starship.rs/config/) to customize your experience. So again, the following section is optionally.

Did you know:

> There are general configuration settings for Starship, but almost each Starship module has [additional configuration options](https://starship.rs/config/) available.

If you want to adapt the Starship configuration, create a new file: `~/.config/starship.toml`.

The content of this file is up to you. Again, see the [configuration web page](https://starship.rs/config/) fore more info. An example of the content of `starship.toml`:

```toml
# Increase Starship command scan & duration time-outs
scan_timeout = 80
command_timeout = 1000

# Do not add new line
add_newline = false

# Do not truncate the directory listing
[directory]
truncation_length = 0

# Show even very fast command executions in terminal (in ms)
[cmd_duration]
min_time = 5
show_milliseconds = true
```

Restarting your terminal should apply the new changes.

**_Hint:_** Check-out my [my dotfiles](https://gitlab.melroy.org/melroy/dotfiles) repository as well. This git repository contains more files besides my `startship.toml` file.
