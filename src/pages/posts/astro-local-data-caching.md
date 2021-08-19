---
title: 'Local data caching met Astro'
permalink: '/posts/astro-local-data-caching'
englishLink: '/en/posts/astro-local-data-caching'
description: "In mijn laatste blogpost heb ik het gehad over de nieuwe manier van routing in Astro v0.19. Hierin vertelde ik dat er op dit moment nog een issue is met de getStaticPaths-methode, waar die voor elke pagina die gemaakt wordt de functie aanroept. Dit houdt in dat als je een API call maakt die vervolgens Astro vertelt om 100 pagina's aan te maken, deze API call 100x gemaakt wordt. Als je een rate-limit hebt van bijvoorbeeld 1 request per seconde, vlieg je daar direct doorheen. Op het moment van schrijven heeft het Astro team in hun Discord laten weten dat ze hier een fix voor aan het testen zijn, en die zeer snel uitgebracht wordt, maar stel je wilt nu beginnen met Astro v0.19.0, hoe kan je dit oplossen?"
publishDate: '2021-08-19'
layout: '../../layouts/blog-layout.astro'
---

In [mijn laatste blogpost](/posts/astro-file-based-routing) heb ik het gehad over de nieuwe manier van routing in Astro v0.19. Hierin vertelde ik dat er op dit moment nog een issue is met de `getStaticPaths`-methode, waar die voor elke pagina die gemaakt wordt de functie aanroept. Dit houdt in dat als je een API call maakt die vervolgens Astro vertelt om 100 pagina's aan te maken, deze API call 100x gemaakt wordt. Als je een rate-limit hebt van bijvoorbeeld 1 request per seconde, vlieg je daar direct doorheen. Op het moment van schrijven heeft het Astro team in hun [Discord](https://astro/build/chat) laten weten dat ze hier een fix voor aan het testen zijn, en die zeer snel uitgebracht wordt, maar stel je wilt nu beginnen met Astro v0.19.0, hoe kan je dit oplossen?

## Local caching

Voor de [Astro Showcase](https://astro-showcase.netlify.app/) heb ik het op de volgende manier opgelost

1.  Kijk of er een bestand genaamd `.local.json` bestaat
    - Zo ja, return de data uit dit bestand.
    - Zo nee, dan:
      1.  Roep de API aan.
      2.  Filter de niet belangrijke data weg.
      3.  Schrijf de data naar `.local.json`.

Dit werkt in de code als volgt:

```astro
// src/pages/[...project].astro
---
import { getProjects } from '../helpers';

export async function getStaticPaths() {
    const projects = await getProjects();

    return projects.map((project) => ({
            params: { project: project.full_name },
            props: { data: project }
        })
    );
}
const { project } = Astro.request.params;
const { data } = Astro.props;
---
// HTML goes here...
```

De `getStaticPaths()`-functie roept nu dus voor elke keer dat een pagina gebouwd wordt de `getProjects()`-helper functie aan. Laten we deze erbij pakken om te laten zien waarom dat nu geen probleem meer is.

```javascript
import fs from 'node:fs'; // 👈 "node:" prefix is vanuit Astro vereist voor Node libs

export default async () => {
  const cache = './public/.cache';

  if (!fs.existsSync(cache)) {
    fs.mkdirSync(cache, { recursive: true });
  }

  // Check if "caching" file exists
  if (fs.existsSync('./public/.cache/local.json')) {
    // Read data from file
    const raw = fs.readFileSync('./public/.cache/local.json');
    return JSON.parse(raw);
  } else {
    // Make API call and write to file
    const response = await fetch('https://api.github.com/search/repositories?q=language:Astro&per_page=100');
    const data = await response.json();

    // Filter out null homepages and homepages linking to localhost or astro tickets
    const projects = data.items.filter(
      (project) => project.homepage && !project.homepage.includes('localhost') && !project.homepage.includes('github.com/snowpack/astro/issues') && !project.name.includes('issue')
    );

    // Write projects to "caching" file
    fs.writeFileSync('./public/.cache/local.json', JSON.stringify(projects));

    return projects;
  }
};
```

Als je voor deze manier gaat, hou er rekening mee dat je de `.cache`-folder in je `.gitignore` zet. Anders krijg je dat je builds altijd dat bestand pakken, en bij builds nooit de data daadwerkelijk wordt geüpdatet.

## Conclusie

In de toekomst zullen dit soort hacks niet meer nodig zijn. Astro is pas een paar maanden oud, dus het ecosysteem moet nog groeien. Dit betekent niet dat je moet wachten om Astro te leren, in tegen deel zelfs. Op dit moment is de API nog zo klein, dat je met een aantal relatief kleine projecten een groot gedeelte van de tool kan leren. Met de snelle ontwikkeling van Astro en het enthousiasme van de community er achter, verwacht ik dat Astro minimaal zo groot gaat worden als vergelijkbare static-site generators als bijvoorbeeld [Jekyll](https://jekyllrb.com/) en [11ty](https://www.11ty.dev/). Er nu in duiken betekent dus niet alleen dat je een voorsprong hebt op de rest, maar ook dat Astro nog sneller groeit! 🙌
