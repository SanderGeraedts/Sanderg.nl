---
title: 'Dark mode, een test voor je design system'
permalink: '/posts/dark-mode-als-design-test'
description: 'Dark themes zijn de laatste jaren helemaal in. En niet zo gek ook niet. Het bespaart stroom op bepaalde schermen, het is vaak rustiger voor de ogen, en dankzij CSS variabels en nieuwe media queries, is het makkelijker dan ooit om het te implementeren. En doordat het zo makkelijk is, is het een goede manier om je design systeem onder de loop te nemen. Werkt het systeem nog als je naar dark mode gaat?'
publishDate: '2021-08-04'
layout: '../../layouts/blog-layout.astro'
---

Dark themes zijn de laatste jaren helemaal in. En niet zo gek ook niet. Het bespaart stroom op bepaalde schermen, het is vaak rustiger voor de ogen, en dankzij CSS variabels en nieuwe media queries, is het makkelijker dan ooit om het te implementeren. En doordat het zo makkelijk is, is het een goede manier om je design systeem onder de loop te nemen. Werkt het systeem nog als je naar dark mode gaat?

## Waarom dark mode?

Dark mode is voor mij net zo belangrijk als voor sommige mensen de `prefers-reduced-motion`-flag is. Ik heb namelijk last van een vorm van [lichtschuwheid](https://nl.wikipedia.org/wiki/Fotofobie) waardoor ik soms niet goed tegen fellicht kan. Als een site dan een dark mode heeft, is dat voor mij op zulke momenten een hele prettige verrassing. Als developer / designer weet je niet hoe de gebruiker zich voelt op het moment dat die je website gebruikt, maar als een gebruiker vanuit zijn OS aangeeft dat die een donkere versie wilt, kan je hier op inspelen.

# Hoe dark mode?

De kleuren van deze website zijn <s>volledig</s> bijna volledig opgebouwd met [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). Dit betekende dat (bijna) het enige wat ik moest doen, was 1 [`prefers-color-scheme: dark`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)-media query te schrijven, en daar de nieuwe kleuren in plaatsen. Al met al heeft dit me niet meer dan een paar minuten googlen gekost.

Ik zeg bijna volledig, want 2 CSS regels hadden dat niet. De achtergrond van de intro tekst op de homepage was een RGBA-waarde die ik niet mee heb genomen in mijn variabelen, en de achtergrond kleur van `deze code`-blocks, omdat dat even een snel achterafje was. Dit was gelukkig snel gevonden door even een paar seconden door de website heen te klikken.

## Maar wat heeft dit met design systems te maken?

Met deze kleine site had ik al 2 plekken gevonden waar ik niet de standaard kleuren had gebruikt. Nu is dit voor een site met een paar pagina's van deze grote geen ramp, maar als je site duizenden verschillende pagina's heeft, is dat wat anders. Op het moment van schrijven zit ik in opdracht bij ABN AMRO, waar ze gebruik maken van een geweldig design system. Als Frontend developer heeft dit systeem mij al zo veel tijd bespaart door de prebuilt components en alle helper classes. Echter, ik denk niet dat als ABN van de een op de andere dag zou zeggen "Mensen, we voegen even een dark mode toe!", dat dit zonder problemen / rework zou gaan. Daar voor zijn er gewoon te veel applicaties en te veel custom code.

Een dark theme laat daardoor heel mooi zien waar men zich aan het design systeem heeft gehouden, en waar niet.

## PS: Nu we het toch over dark mode hebben...

Wist je dat SVG ook gebruik kan maken van de `prefers-color-scheme: dark`-media query? Aangezien mijn favicon ook een SVG is, heb ik er een `style`-tag met de media query aan toegevoegd. Nu als je de pagina reload nadat je tussen light en dark mode heb geswitcht (op browser/OS-level, that is...), zie je een color-scheme-friendly favicon! Dit gaf me stiekem een beetje te veel vreugde. SVG's zijn cool.
