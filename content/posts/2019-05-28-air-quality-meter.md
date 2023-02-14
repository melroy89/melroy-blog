---
title: Air quality meter
author: Melroy van den Berg
type: post
date: 2019-05-28T10:43:16+00:00
modal: true
url: /2019/air-quality-meter/
featured_image: /images/2019/05/aircraft_pollution.jpg
categories:
  - Advanced
  - Hardware
  - IoT
  - Server
tags:
  - air
  - analyser
  - BME280
  - CO2
  - fine dust
  - gas
  - health
  - humidity
  - logic
  - meter
  - MH-Z19B
  - open-source
  - particles
  - PMSA003
  - pollution
  - quality
  - sensor
  - SGP30
  - smok
  - temperature
  - TVOC
---

![](/images/2019/04/location_airport_eindhoven.png "Current co-location")

Lately, I moved buildings for my work towards a building which is very close by Eindhoven Airport. Only 430 meters to be precise.

The air-planes and kerosene smell triggered me about the health risks, and air quality inside the building as well as at home. The fact is that we have more and more cars/trucks within the residential areas (too bad still running on fossil fuel). Meaning our health is at risk, and apparently nobody cares. My idea was measuring is knowing, so lets start measuring!

## Bills of Material

I want to measure the indoor air quality. But what is air quality? What to measure? And how..?

After some research, I came up with several indicators I think are important for the air we are all breathing and easy enough to measure via sensors. But besides air quality also comfort and energy efficiency could be taken along. The current list is as follows:

- Temperature, humidity and pressure;
- CO2 concentrations;
- Total Volatile Organic Compounds (TVOC) gas concentrations;
- Amount of fine dust / particulate matter.

We need to measure those physical data by some measurement device, often called sensors. I will use the following sensors for now:

- BME280 - Temperature, relative humidity and pressure sensor
- MH-Z19B - CO2 meter
- SGP30 - TVOC sensor
- PMSA003 - Fine dust sensor

![](/images/2019/05/IMG_5388.jpg "My prototype setup")

Maybe in the future I can think about adding more sensors. The sensors we have now need to be attached to some board with the proper IO pins to read-out the data and to power the sensors as well.

I'll use a single board computer: BeagleBone Black (I had this still laying around). Its quite similar to a Raspberry Pi or Arduino, but quite powerful and has tons of IO! See image below:

![](/images/2019/05/bb_pcb.png "BeagleBone Black PCB Design")

## Prototyping

I ordered all required sensors (mainly from AliExpress) and tried to attach the sensors one by one to the BeagleBone Black. Two sensors are using I{{< sub "2" >}}C protocol to communicate while the other two sensors use serial TTL (UART) protocol. The BeagleBone black has plenty of IO to cope with request. Also some sensors require 5V to run, while others only need 3V3.

![](/images/2019/05/photo_2019-05-28_00-43-24.jpg "Debug messages of the CO{{< sub "2" >}} sensor in terminal")

I took the Agile approach, and tried to implement one sensor at a time from begin to end, to have a working system all the time. And increase the amount of sensors + code + tests together. Meaning I started with the first device what came in, and gradually added to others as well.

### Current state

Current state of the project is that I'm able to do read-outs from all the sensors mentioned above. I'm using the [Linux device tree](https://elinux.org/Device_Tree_Reference) to mount the sensors as a device file in the `/dev` folder. And using C++ to configure/init and read-out the data from the sensors. I'm using [cmake](https://cmake.org/) cross-platform tool for pre-build and [Ninja](https://ninja-build.org/) for the build system, which makes building and testing my code a breeze!

I took some time to get some special commands working, for example: the Fine dust sensor (PMSA003) has a stand-by mode and active/passive mode. The datasheet documentation was not always clear how long it took to get a device out of stand-by and in which state it started when you bring the sensor out of stand-by mode.

Luckily, I have a logic analyzer. A hardware device that can help you debug data lines (incl. protocols) between the sensor and the BeagleBone black. I used a [Saleae logic analyser clone](https://www.ebay.com/bhp/usb-logic-analyzer) from China to debug my problems. You can attach this logic analyser to your computer, once you have firmware installed and I used a free open-source program called [Sigrok](https://sigrok.org/) to plot all the data visually (using PulseView). The screenshot below shows you the data on the line (zero's and ones), the corresponding byte representation together with the protocol pieces (I{{< sub "2" >}}C in this case):

![](/images/2019/05/i2c_protocol_pulseview.png "PulseView I{{< sub "2" >}}C protocol analyser")

The logic analyser helped me in this case to debug the conflict between active mode (=sensor is pushing data on the line periodically) and passive mode (=the host need to request for data) during start-up of the PMSA003 sensor. Where it could take some time before the sensor acts on the requests.

### Final Goal

The end goal is to create an easy to use device from the user perspective, properly with some kind of screen or webpage interaction/mobile app.

My personal goal is to also log the data into a database, and keep track of the air quality over a longer period of time. And plot those graphs by using [Grafana](https://grafana.com/).

AIR Quality meter is open-source for the public, you find [AIR Quality project](https://gitlab.melroy.org/melroy/air-quality-meter) on my Gitlab server. If you like you can help developer the project further, add new sensors/add a screen interface or help with the code and/or testcases.

![](/images/2019/05/grafana-graph.png "Grafana")
