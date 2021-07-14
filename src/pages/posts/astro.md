---
title: 'Astro, mijn bevindingen na 1 site'
description: 'Toen ik Chris Coyier in zo''n 3 afleveringen van de ShopTalk Show hoorde praten over Astro, dacht ik: "Ik zal het maar eens uitproberen". Als eerste heb ik een klein demo projectje aangemaakt, maar om het echt uit proberen, moest je toch iets "echters" proberen. Daarom heb ik besloten mijn site te herschrijven naar Astro.'
publishDate: 'Tuesday, July 6 2021'
layout: '../../layouts/blog-layout.astro'
---

# Astro, mijn bevindingen na 1 site

Toen ik Chris Coyier in zo'n 3 afleveringen van de [ShopTalk Show](https://shoptalkshow.com/) hoorde praten over hoe cool hij Astro vond, dacht ik: "Ik zal het maar eens uitproberen". Als eerste heb ik een klein demo projectje aangemaakt, maar om het echt uit proberen, moest je toch iets _"echters"_ proberen. Daarom heb ik besloten mijn site te herschrijven naar Astro.

## Wat is Astro?

Astro is een static site builder met als key selling point dat het alleen de Javascript stuurt die nodig is voor interactie, dus bijvoorbeeld een onClick-handler om een hamburger-menu te openen. Als je deze website bijvoorbeeld kijkt, zie je dat er geen enkele javascript-file wordt geladen _(als dat toch zo is, komt het waarschijnlijk omdat ik iets heb veranderd en deze post niet heb geüpdatet)_. Voor een betere uitleg kan ik alleen maar naar [de blog van het Astro Team](https://astro.build/blog/introducing-astro) verwijzen.

## Waarom rebuilden in Astro?

De vorige versie van mijn site was gemaakt met [Gatsby](https://www.gatsbyjs.com/) en [Sanity](https://www.sanity.io/). En hoewel ik Gatsby en Sanity hele goede tools vind, het was een beetje overkill voor de website. Toen ik de website heb gebouwd, kwam ik net uit een opdracht waar ik dagelijks met React werk, waardoor Gatsby een goede optie was. Ook was mijn idee dat als ik toevallig een typo op mijn site zag, ik met Sanity het makkelijker op mijn telefoon koon updaten.

Nu werk ik al weer bijna een jaar dagelijks met Vue, dus als ik dan eens in de zo veel weken iets met mijn site wou doen, zorgde de moeite van het inkomen in de stack ervoor dat de zin snel verdween. Ook elke keer moeten uitzoeken hoe ik Sanity ookalweer had ingesteld, hielp niet met het up-to-date houden van mijn site.

In comes Astro, met de belofte om een Javascript / components gebaseerde static site generator te bieden waar markdown files op de eerste plaats komen. Gezien ik niet vaak iets schrijf, is een markdown-based blog ideaal, omdat markdown in elk framework wel support wordt. Mocht het zijn dat over een paar jaar Astro outdated is, zit ik er niet aan vast omdat mijn content erin zit.

Daarnaast, laten we wel eerlijk zijn, new shiny toy syndrome heeft ook zijn rol gespeeld in de keuze...

Anyway, nu mijn site om is gebouwd, hoe vond ik het om met Astro te werken?

## The Good

- Portable
- Unobtrusive syntax
- Support voor veel frameworks
- md support

## The Bad

- Nog weinig documentatie
- Rare caching issues?

## The Ugly

- Syntax highlighting / formatting is bleh
