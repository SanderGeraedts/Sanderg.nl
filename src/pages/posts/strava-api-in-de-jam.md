---
title: 'Strava API in de JAMStack'
description: 'Op de homepage staat hoeveel kilometer ik heb hardgelopen volgens mijn Strava account. In deze post leg ik uit hoe ik dit gemaakt heb zonder "echte backend".'
publishDate: '2021-07-20'
layout: '../../layouts/blog-layout.astro'
---

Op de homepage staat hoeveel kilometer ik heb hardgelopen volgens mijn Strava account. In deze post leg ik uit hoe ik dit gemaakt heb zonder "echte backend".

## Doel

Zoals in mijn intro staat, ben ik een enorme liefhebber van hardlopen, en als verlenging daarvan, de app Strava. Voor de mensen die Strava niet kennen, in het kort is het een 'activity tracker meets social network'. Een soort Facebook voor sporters. Toen ik zag dat er een openbare [Strava API](https://developers.strava.com/) was, wou ik daar iets mee te maken. Afgelopen weekend heb ik eindelijk de tijd genomen om dit te doen. Vandaar mijn kilometer-teller op de homepage.

## Problemen

Authenticatie voor de Strava API werkt via Oauth. Dat houdt in dat de gebruiker eerst moet inloggen om toegang te geven aan de applicatie. Nu wil ik alleen zelf inloggen, dus kon ik de eerste stappen handmatig doen. Dit stond niet duidelijk in de documentatie, maar gelukkig heeft een aardige vreemde de stappen opgeschreven in een [handige uitleg](https://github.com/franchyze923/Code_From_Tutorials/blob/master/Strava_Api/request_links.txt). Het grootste probleem kwam met de authenticatie tokens.

Deze website wordt volledig statisch gebouwd en gehost op [Netlify](https://www.netlify.com/). Ik heb dus geen backend met een database om de tokens op te slaan en bij te werken als ze te oud zijn.

## Oplossing

Dit heb ik opgelost met een serverless function en gebruik maken van FaunaDB voor de opslag. De code is hier te vinden in [functions/strava.js](https://github.com/SanderGeraedts/Sanderg.nl/blob/master/functions/strava.js) van de [git repo](https://github.com/SanderGeraedts/Sanderg.nl). Tijdens elke build van dit project wordt deze serverless functie aangeroepen. Ik heb er voor gekozen om dit op build te doen en niet elke keer als iemand de pagina bezoekt om de volgende redenen:

- Snelheid. Het is weer een extra call waar de gebruiker op moet wachten.
- Veiligheid. Als de website op eens duizenden bezoekers krijgt, wil ik niet dat voor elke bezoeker een API call gemaakt wordt, waardoor ik mogelijk verbannen wordt van de Strava API.

Als probleem heeft dit wel dat de kilometer-stand alleen 1x per build wordt bijgewerkt, dus kan het een beetje achterlopen. Dit zou vervelend zijn als de site maanden niet herbouwd wordt, maar als die 1x per dag herbouwd wordt, is dat geen probleem.

### Zapier

Aangezien ik geen zin heb om elke keer als ik ben wezen hardlopen de site te rebuilden, ben ik gaan zoeken naar een scheduled rebuild van Netlify. Helaas was dat er (nog) niet, maar is het wel mogelijk om een build vanaf een webhook te starten. In het ergste geval zou ik dus een cronjob op mijn [Synology NAS](/uses) aan kunnen zetten, maar ik vond een makkelijkere oplossing. In [deze blogpost](https://flaviocopes.com/netlify-auto-deploy/) legt Flavio Copes uit hoe hij met Zapier exact dit probleem heeft opgelost. Nu wordt dus elke dag mijn site gerebuild, waardoor mijn kilometer-stand hooguit een dag achterloopt. En als ik echt ijdel ben na een lange run, kan ik het altijd nog handmatig aanzetten. 😉

## Conclusie

Op de vraag "Was het de moeite waard om je kilometer-stand op je website te hebben?" kan ik volmondig "Nee!" antwoorden. Het ging me niet om te laten zien hoeveel ik heb gelopen (, of zoals m'n vrienden zeiden "opscheppen met hoeveel je hebt gelopen"), maar om te spelen met serverless functions en data storage in een JAMStack omgeving. Ik heb hier enorm veel van geleerd, en ik hoop door deze blog dat jullie als lezer ook wat hebben opgepikt. Wil je er meer over weten, hieronder heb ik wat links verzameld die misschien nuttig zijn:

- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [FaunaDB Javascript](https://docs.fauna.com/fauna/current/drivers/javascript) (Voor installatie van de library)
- [FaunaDB Docs](https://docs.fauna.com/fauna/current/cookbook/?lang=javascript) (Voor het gebruik van de library)
- [Mijn serverless function](https://github.com/SanderGeraedts/Sanderg.nl/blob/master/functions/strava.js)

Daarnaast kan je mij ook altijd een berichtje sturen. Veel succes!
