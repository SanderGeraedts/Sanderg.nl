---
title: 'Strava API in de JAMStack'
description: 'Op de homepage staat hoeveel kilometer ik heb hardgelopen volgens mijn Strava account. In deze post leg ik uit hoe ik dit gemaakt heb zonder "echte backend".'
publishDate: '2021-07-20'
layout: '../../layouts/blog-layout.astro'
---

Op de homepage staat hoeveel kilometer ik heb hardgelopen volgens mijn Strava account. In deze post leg ik uit hoe ik dit gemaakt heb zonder "echte backend".

## Doel

Zoals in mijn intro staat, ben ik een enorme liefhebber van hardlopen, en als verlenging daarvan, de app Strava. Voor de mensen die Strava niet kennen, in het kort is het een 'activity tracker meets social network'. Een soort Facebook voor sporters. Toen ik zag dat er een openbare [Strava API](https://developers.strava.com/) was, wou ik daar iets mee doen. Vandaar mijn kilometer-teller op de homepage.

## Problemen

Authenticatie voor de Strava API werkt via Oauth. Dat houdt in dat de gebruiker eerst moet inloggen om toegang te geven aan de applicatie. Nu wil ik alleen zelf inloggen, dus kon ik de eerste stappen handmatig doen. Dit stond niet duidelijk in de documentatie, maar gelukkig heeft een aardige vreemde de stappen opgeschreven in een [handige uitleg](https://github.com/franchyze923/Code_From_Tutorials/blob/master/Strava_Api/request_links.txt). Het grootste probleem kwam met de authenticatie tokens.

Deze website wordt volledig statisch gebouwd en gehost op [Netlify](https://www.netlify.com/). Ik heb dus geen backend met een database om de tokens op te slaan en bij te werken als ze te oud zijn.

## Oplossing

### Strava API

### Serverless Functions

### Fauna DB
