d---
title: 'Astro, Puppeteer en Open Graph Images'
permalink: '/posts/astro-puppeteer-en-open-graph-images'
description: 'Toen ik mijn eerste post over Astro plaatste op LinkedIn, viel me op dat ik iets was vergeten. Een goede Open Graph afbeelding! Oh nee! ... oke, zo erg is het nou ook weer niet, maar netjes is iets anders. En moeilijk zou het ook niet moeten zijn. Maak een screenshot met Puppeteer, sla deze ergens op, en prop hem vervolgens in de meta-tags. Dit bleek echter makkelijker gezegd dan gedaan.'
publishDate: '2021-07-31'
layout: '../../layouts/blog-layout.astro'

---

Toen ik mijn eerste post over Astro plaatste op LinkedIn, viel me op dat ik iets was vergeten. Een goede Open Graph afbeelding! Oh nee!

... oke, zo erg is het nou ook weer niet, maar netjes is iets anders. En moeilijk zou het ook niet moeten zijn. Maak een screenshot met Puppeteer, sla deze ergens op, en prop hem vervolgens in de meta-tags. Dit bleek echter makkelijker gezegd dan gedaan.

## Globale plan

Het doel is dat er automatisch Open Graph images gegenereerd worden voor elke pagina van de site, deze bijgehouden worden bij updates, en deze ergens opgeslagen staan, zodat niet op elke page load dit gegenereerd moet worden. Klinkt simpel: Laat [Puppeteer](https://github.com/puppeteer/puppeteer) bij elke build een screenshot maken van de pagina, en upload het naar Cloudinary. Uiteindelijk heeft dit "simpele" trucje 3x op de tekentafel gelegen...

## Optie 1: Serverless functions ❌

Mijn eerste idee was om het te runnen in een serverless function. Aangezien Puppeteer standaard nogal groot is, gaat dit ver boven het limiet van een AWS Lambda functie. Gelukkig heb ik [deze blogpost](https://bitsofco.de/how-to-use-puppeteer-in-a-netlify-aws-lambda-function/) gevonden die perfect uitlegt hoe je met [puppeteer-core](https://www.npmjs.com/package/puppeteer-core) binnen het limiet van ±50MB blijft. Die blogpost linkte zelfs door naar [dit artikel](https://bitsofco.de/how-to-upload-a-screenshot-from-puppeteer-to-cloudinary/) waar in werd uitgelegd hoe je een screenshot van Puppeteer naar Cloudinary upload.

Het probleem zat hem helaas in het feit dat doordat puppeteer-core nog zo groot is, ik niet de Cloudinary SDK kon laden om de screenshot te uploaden. Wat op deze manier nog een optie geweest zou kunnen zijn is om die screenshot te uploaden in een andere functie, en de data via de eerste call, naar de upload functie te sturen. Dit vond ik te fout-gevoelig, dus ben ik terug gegaan naar de tekentafel.

## Optie 2: In de Astro build ❌

Astro heeft zijn eigen node server om de build te maken. Hierin heb je toegang tot een volledige node server, en heb je dus ook niet het 50MB limiet wat je bij een serverless function hebt. Na mijn vorige functie een beetje om te hebben geschreven, had ik een prachtig werkende Open Graph Image generator. Ik helemaal blij, dus direct begonnen met deze blogpost. En toen viel me iets op...

Voordat ik de screenshot kan maken, moet eerst de pagina gebouwd zijn. Omdat mijn vorige pagina's allemaal al eerder gebouwd waren, gaf dat geen problemen. Pas toen ik een nieuwe pagina aanmaakte, ging het mis. Dan maar verder zoeken.

## Optie 3: Heroku ✅

In optie 1 had ik geleerd dat ik een volledige node omgeving nodig heb om mijn generator te draaien. Bij optie 2 was ik erachter gekomen dat het pas geactiveerd kan worden nadat de website gedeployed is.

Dit laatste is makkelijk op te lossen. Netlify bied namelijk [Deploy Notifications](https://docs.netlify.com/site-deploys/notifications/) aan. Hiermee kan je bijvoorbeeld na een succesvolle deploy, een webhook aanroepen.

Vanaf dat punt was het "makkelijk", namelijk gewoon een kleine Node.js applicatie op [Heroku](https://heroku.com) draaien.

De code voor deze applicatie is hier te vinden: [SanderGeraedts/OG-Image-Puppeteer](https://github.com/SanderGeraedts/OG-Image-Puppeteer/blob/main/index.js)

In het kort doet deze applicatie de volgende dingen:

1. Haal de laatste commit van de master-branch op
   - Controleer of deze commit jonger dan een dag oud is, stop als dat niet zo is.
2. Bekijk de bestanden in de `src/pages`-folder die in die laatste commit zijn gewijzigd.
3. Run puppeteer op die pages.
4. Upload de bestanden naar Cloudinary.

### Problemen

Stap 1 en 2 waren zo gedaan. De [Github API](https://docs.github.com/en/rest/reference/repos) is super gedocumenteerd, en heeft geen vervelende authenticatie stap voor data die openlijk toegankelijk is ([Nee Strava, ik kijk je niet aan hoor...](https://sanderg.nl/posts/strava-api-in-de-jam)). Ook de Cloudinary SDK werkte zonder problemen. Het grootste probleem was voornamelijk Heroku in combinatie met Puppeteer.

Er waren 2 dingen die op Heroku anders werkten dan op mijn lokale machine. Als eerste gaf Heroku een error dat puppeteer niet opgestart kon worden, omdat niet de juiste buildpacks geïnstalleerd waren. Voor puppeteer is er een speciaal buildpack voor heroku gemaakt, genaamd [puppeteer-heroku-buildpack](https://github.com/jontewks/puppeteer-heroku-buildpack), maar zelfs toen het geïnstalleerd was, bleven dezelfde problemen terug komen. Op [Stackoverflow](https://stackoverflow.com/a/55090914) was gelukkig het antwoord te vinden. Het grote probleem was dat de buildpacks eerst volledig gecleard moesten worden. Toen dat gedaan was, werkte het perfect. Dat heet... het gaf een andere error.
