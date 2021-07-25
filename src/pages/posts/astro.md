---
title: 'Astro, mijn bevindingen na 1 site'
permalink: 'https://sanderg.nl/posts/astro'
description: 'Toen ik Chris Coyier in zo''n 3 afleveringen van de ShopTalk Show hoorde praten over Astro, dacht ik: "Ik zal het maar eens uitproberen". Als eerste heb ik een klein demo projectje aangemaakt, maar om het echt uit proberen, moest je toch iets "echters" proberen. Daarom heb ik besloten mijn site te herschrijven naar Astro.'
publishDate: '2021-07-15'
layout: '../../layouts/blog-layout.astro'
---

Toen ik Chris Coyier in zo'n 3 afleveringen van de [ShopTalk Show](https://shoptalkshow.com/) hoorde praten over hoe cool hij Astro vond, dacht ik: "Ik zal het maar eens uitproberen". Als eerste heb ik een klein demo projectje aangemaakt, maar om het echt uit proberen, moest je toch iets _"echters"_ proberen. Daarom heb ik besloten mijn site te herschrijven naar Astro.

## Wat is Astro?

Astro is een static site builder van het team achter Snowpack, met als key selling point dat het alleen de Javascript stuurt die nodig is voor interactie, dus bijvoorbeeld een onClick-handler om een hamburger-menu te openen. Als je deze website bijvoorbeeld kijkt, zie je dat er geen enkele javascript-file wordt geladen _(als dat toch zo is, komt het waarschijnlijk omdat ik iets heb veranderd en deze post niet heb geüpdatet)_. Voor een betere uitleg kan ik alleen maar naar [de blog van het Astro Team](https://astro.build/blog/introducing-astro) verwijzen.

## Waarom rebuilden in Astro?

De vorige versie van mijn site was gemaakt met [Gatsby](https://www.gatsbyjs.com/) en [Sanity](https://www.sanity.io/). En hoewel ik Gatsby en Sanity hele goede tools vind, het was een beetje overkill voor de website. Toen ik de website heb gebouwd, kwam ik net uit een opdracht waar ik dagelijks met React werk, waardoor Gatsby een goede optie was. Ook was mijn idee dat als ik toevallig een typo op mijn site zag, ik met Sanity het makkelijker op mijn telefoon koon updaten.

Nu werk ik al weer bijna een jaar dagelijks met Vue, dus als ik dan eens in de zo veel weken iets met mijn site wou doen, zorgde de moeite van het inkomen in de stack ervoor dat de zin snel verdween. Ook elke keer moeten uitzoeken hoe ik Sanity ookalweer had ingesteld, hielp niet met het up-to-date houden van mijn site.

In comes Astro, met de belofte om een Javascript / components gebaseerde static site generator te bieden waar markdown files op de eerste plaats komen. Gezien ik niet vaak iets schrijf, is een markdown-based blog ideaal, omdat markdown in elk framework wel support wordt. Mocht het zijn dat over een paar jaar Astro outdated is, zit ik er niet aan vast omdat mijn content erin zit.

Daarnaast, laten we wel eerlijk zijn, new shiny toy syndrome heeft ook zijn rol gespeeld in de keuze...

Anyway, nu mijn site om is gebouwd, hoe vond ik het om met Astro te werken?

## The Good

Een van de fijnste punten van Astro, vind ik hoe leesbaar de code is. Er is heel weinig boilerplate code nodig om een pagina of component te maken. In elke `.astro`-file heb je een JS-gedeelte, stukje HTML (+ wat componenten) en wat CSS. Alleen voor het openbaar maken van attributen voor components en het ophalen van data ben ik in deze site echt Astro specifieke code tegen gekomen. Hierdoor heb ik mijn site in zo'n 3 avondjes werk om kunnen schrijven, zonder enige Astro kennis van te voren te hebben.

### Markdown

Daarnaast is de Markdown-support echt geweldig. Zet een `.md`-file in de `/src/pages`-folder, en je hebt een pagina die met Markdown gebouwd wordt. Daarnaast kan je ook in je `.astro`-files gebruik maken van een `<Markdown>`-tag, waardoor je Markdown kan schrijven, maar alsnog gebruik kan maken van je eigen components (vergelijkbaar als MDX). Hierdoor is je content wel minder makkelijk te exporteren naar een ander systeem, maar in sommige gevallen kan dit het waard zijn. Zelf heb ik dit niet nodig gehad, dus zijn mijn markdown files ook echt markdown.

### De Frameworks

Een van Astro's taglines is "BYOF, Bring your own framework". Ze hebben support voor React, Svelte, Vue en Preact, maar ze hebben ook documentatie om renderers te bouwen voor andere frameworks. Ik heb zelf alleen de standaard Astro "Templating" gebruikt, dus het enige wat ik hier over kan zeggen is cool, cool, cool.

### De voorbeelden

Op de [github pagina](https://github.com/snowpackjs/astro) staan heel veel voorbeelden hoe je een site met Astro kan maken. En deze voorbeelden zijn ook echt top uitgewerkt. Niet alleen hebben ze de standaard "starter"-, "blog"-, "portfolio"-voorbeelden, maar ze hebben ook voorbeelden met allerlei frameworks en verschillende setups. Om deze site te bouwen heb ik veel gebruik gemaakt van de voorbeeldcode op die pagina.

## The Bad

Hoewel ik Astro echt een gave tool vind, het zit nog echt in een early beta-fase. Op moment van schrijven bouw ik deze site met `astro v0.16.1`, dus hier en daar zijn nog wat kinks uit te werken.

### Documentatie

Zoals ik net zei dat ik de voorbeeldcode veel heb gebruikt bij het bouwen van deze site, komt dat voornamelijk omdat de documentatie nog niet echt goed is uitgewerkt. Doordat de voorbeelden zo excellent zijn, is dit geen ramp, maar het is wel een ding om rekening mee te houden. Ik ga er wel van uit dat dit snel zal verbeteren als ze meer naar een v1.0 gaan.

### Bugs

Doordat het nog een early beta is, kunnen er bugs optreden. Zo af en toe heb ik issues gehad met CSS die niet wou laden, maar meestal was een reboot van de server genoeg om dat probleem op te lossen. Een hardnekkige bug die ik wel ben tegen gekomen, is dat ik op deze site niet de route `/blog` kan gebruiken. in mijn `pages`-folder had ik een folder genaamd `/blog` met een aantal markdown-files. Daarnaast had ik in de `pages`-folder een bestand genaamd `blog.astro`. Dit zou ervoor moeten zorgen dat `/blog` wordt gemaakt door `pages/blog.astro` en de paginas daaronder door `pages/blog/<markdown>.md`. Echter gaf de blog pagina (de verzamelpagina) een 404, terwijl de pagina's daaronder wel werkte.

Het grappige is dat toen ik dit in een ander project deed, het gewoon werkte. Ook toen ik in dit project `/blog` veranderde naar `/posts`, werkte alles gewoon prima. Het zal dus waarschijnlijk een hardnekkig caching issue zijn. Als ik de oplossing vindt, zal ik het hier posten (als ik er aan denk).

## The Ugly

Als laatste heb ik nog een "verwend kind"-punt in te brengen. In mijn dagelijks werk maak ik gebruik van een combinatie van ESLint en Prettier om mijn lelijke input mooi te formateren. Omdat Astro nog zo jong is, werkt dit er helaas niet voor. 😢

Dit betekent dus dat ik hier en daar wat tijd kwijt was met het handmatig formatten van mijn code. Dit is natuurlijk geen ramp, maar het was wel vervelend.

Aangezien er al een plugin voor VS Code uit is gebruikt door het Astro team, denk ik dat het hooguit een kwestie van tijd is, voordat auto-formatting in VS Code ook goed werkt met Astro (als iemand die dit leest graag dat wilt toevoegen, hier is de [github-repo](https://github.com/snowpackjs/astro/tree/main/tools/vscode) 😉).

## Conclusie

Al met al vind ik Astro echt een goede builder. Ik zou er nog niet je grote entreprise applicaties naar omschrijven, maar met een persoonlijke blog zoals deze, heb ik geen grote problemen ondervonden. Dus <span title="Too long, didn't read">TL;DR</span>: Astro is cool, ga het uitproberen!
