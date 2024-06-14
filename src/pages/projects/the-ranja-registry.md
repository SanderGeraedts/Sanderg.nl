---
title: The Ranja Registry
publishDate: 2024-06-14T17:30:42.768Z
status: Done
imageUrl: https://res.cloudinary.com/sandergnl/image/upload/ar_1:1,f_auto,q_auto,w_960,c_thumb,g_auto/v1708598868/projects/20240613_185708_fxviny.jpg
description: is een project om bij te houden hoeveel blikken drinken er nog in de kast staan. Het werkt door middel van een Raspberry Pi Pico W die via MQTT met Home Assistant communiceerd. Zodra alle flessen op zijn, krijg ik een notificatie op mijn telefoon dat we nieuwe moeten halen. Nog handiger, zodra ik bij de lokale Jumbo of Albert Heijn in de buurt ben (aka als ik boodschappen doe), krijg ik nog een melding.
layout: ../../layouts/blog-layout.astro
permalink: "/projects/the-ranja-registry"
---

"the Ranja Registry™" is een project om bij te houden hoeveel blikken drinken er nog in de kast staan. Het werkt door middel van een Raspberry Pi Pico W die via MQTT met Home Assistant communiceerd. Zodra alle flessen op zijn, krijg ik een notificatie op mijn telefoon dat we nieuwe moeten halen. Nog handiger, zodra ik bij de lokale Jumbo of Albert Heijn in de buurt ben (aka als ik boodschappen doe), krijg ik nog een melding.

![Dashboard in Home Assistant](https://res.cloudinary.com/sandergnl/image/upload/v1718311782/projects/a1d9631c-8313-426d-a0fd-b09eccf027b5.png)

In Home Assistant staat nu op mijn dashboard een counter met het aantal flessen in voorraad. 

![the Ranja Registry in action](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_960/v1708598868/projects/20240613_185732_scytup.jpg)

* Code: [Github](https://github.com/SanderGeraedts/ranja-registry/blob/main/code.py)
* Models: [Printables](https://www.printables.com/model/912200-the-ranja-registry-home-assistant-inventory-tracke)