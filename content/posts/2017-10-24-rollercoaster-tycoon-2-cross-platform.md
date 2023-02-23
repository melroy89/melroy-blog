---
title: RollerCoaster Tycoon 2 – Cross-platform
author: Melroy van den Berg
type: post
date: 2017-10-24T14:44:16+01:00
url: /2017/rollercoaster-tycoon-2-cross-platform/
featured_image: /images/2017/10/openrct_frontcover.jpg
enclosure:
  - |
    /images/2017/10/C2fMnts.mp4
    2539069
    video/mp4
categories:
  - Gaming
  - GNU/Linux OS
  - Intermediate
  - Networking
  - Windows OS
tags:
  - assembly
  - cheats
  - Chris Sawyer
  - cross-platform
  - free
  - hacks
  - multiplayer
  - OpenRCT
  - OpenRCT2
  - opensource
  - reimplementation
  - Rollercoaster
  - Rollercoaster Tycoon 2
  - transport tycoon
---

I was triggered by a name 'OpenRCT2' on the web. I was wondering if that was a game just like [0 A.D.](https://play0ad.com/) (an open-source re-implementation of Age of Empires). And yep it was, **OpenRCT2** stands for "Open-source RollerCoaster Tycoon II".

I was thrilled when I discovered about OpenRCT2. It's a re-implementation of the classic hit game called RollerCoaster Tycoon 2 from Infogrames (Atari). Only in US; Rollercoast Tycoon 2 sold 940,000 copies and earned $21.6 million by August 2006.

![](/images/2017/10/roller_coaster_tycoon_2.png)

## Background

For the people who don't know RollerCoaster at all, it's a construction and simulation game that simulates amusement park, creating roller-coasters and much more&#8230; It's a awesome game!

![](/images/2017/10/chris-sawyer.jpg)

The RolleCoaster Tycoon is created by _Chris Sawyer_ and he programmed the game almost entirely in x86 **assembler** / machine code language (yeah really!), which is very impressive since it's not a high-level language at all. And a small amount of C language code to interface to MS Windows and DirectX (Microsoft videocard API).

![](/images/2017/10/Rollercoaster_Tycoon_logo.png)

Chris first created [Transport Tycoon](http://www.transporttycoon.com/) in 1994, this was not a great success in comparison with RollerCoaster Tycoon. After that he created a sequel called [RollerCoaster Tycoon](http://www.chrissawyergames.com/info.htm) in 1999, followed by **RollerCoaster Tycoon II** in the year 2002.

![](/images/2017/10/openrct.png)

In 2014 an open-source project [OpenRCT2](https://openrct2.org/) was started by Ted IntelOrca John to enhance the gameplay, fix bugs and add new features. This was done by reverse engineering the original RollerCoaster Tycoon II game in Assembly and port it to C code.  
Which makes it easier to read, create bug fixes and more importantly it allows the developers to cross-compile the C code to other platforms, including **GNU/Linux** (w00t!), Mac OS X and of-course Windows itself (originally the game only ran under Windows).

Meaning you can now play RollerCoaster Tycoon 2 natively under GNU/Linux, with tons of new features like **multiplayer**, cheats, [easter-eggs](https://github.com/OpenRCT2/OpenRCT2/wiki/Easter-Eggs), reduced limitation like **bigger** and **more complex parks** and other improvements!

Some parts of the game just kept assembly since there is no need to port the code to the C programming language. OpenRCT Android port is in development.

## OpenRCT2

In order to run OpenRCT2 you just [download OpenRCT2](https://openrct2.org/downloads) for **free** for your platform. Then you actually need to the original copy of the game (gugh you can find that yourself[&#8230;](https://1337x.to/torrent/1015897/Rollercoaster-Tycoon-2-GOG-com/)).  
Under Linux I just installed the original Rollercoaster Tycoon II game via wine 2.0.3 without problems. Whenever you start OpenRCT2 just point to your installation directory and done! In my case under Wine: `/home/melroy/.wine/drive_c/Program Files (x86)/Infogrames Interactive/RollerCoaster Tycoon 2`

OpenRCT2 runs great under my Linux Mint 18 installation. OpenRCT2 makes it possible to just run this game with a 1920x1080p resolution fullscreen no problems. Wauw! Since OpenRCT2 version 0.0.5 the original RCT2.EXE is no longer required. Some of the features OpenRCT2 introduces which was not part of the original game are:

- User Interface theming;
- 64-bit support
- Improved AI (path finding, etc.)
- Fast-forwarding gameplay;
- Multiplayer support;
- Multilingual. Improved translations (euros and Dutch language);
- OpenGL hardware rendering (meaning Linux support);
- Various fixes and improvements for bugs in the original game;
- Native support for Linux and macOS;
- Added hacks and cheats (like launch speeds up to 410 km/h hihi);
- Adding a [console](https://github.com/OpenRCT2/OpenRCT2/wiki/Console);
- Auto-saving and giant screenshots.

![](/images/2017/10/openrct2.png)

## Conclusion

Just [download OpenRCT2](https://openrct2.org/downloads) and try it out yourself! It is really a good game, and the port to **Linux** is neat. And together with fixing ton of bugs and introducing extra features makes playing RollerCoaster via OpenRCT2 only better. OpenRCT2 is also busy with new _experimental_ features like night mode and **dynamic lighting** (see video below).

Rollercoast Tycoon series are still classics from the past and has been revived by OpenRCT2! Ps. Also try [0 A.D. game](https://play0ad.com/download/) if you like awesome games.

{{< youtube jYBayELQsSw  >}}
