---
title: "Astro's nieuwe routing, een Showcase"
permalink: '/posts/astro-file-based-routing'
description: 'Ik heb nu zo hier en daar over Astro geblogd, en Astro heeft in de tussentijd ook niet stil gezeten. Astro v.0.19 is op moment van schrijven namelijk net live gegaan! In deze nieuwe update zit onder andere een nieuw routing systeem, gebaseerd op hoe Next.js werkt. (Wat er nog meer is geüpdate is, vind je in de Astro 0.19-blogpost).'
publishDate: '2021-08-18'
layout: '../../layouts/blog-layout.astro'
---

Ik heb nu zo [hier](/posts/astro) en [daar](/astro-puppeteer-en-open-graph-images) over Astro geblogd, en Astro heeft in de tussentijd ook niet stil gezeten. Astro `v.0.19` is op moment van schrijven namelijk net live gegaan! In deze nieuwe update zit onder andere een nieuw routing systeem, gebaseerd op hoe Next.js werkt. (Wat er nog meer is geüpdate is, vind je in de [Astro 0.19](https://astro.build/blog/astro-019)-blogpost).

Om me voor te bereiden op deze update, heb ik een "klein" projectje gemaakt om onder andere de nieuwe routing uit te proberen. [Astro Showcase](https://astro-showcase.netlify.app/) is een site waar alle Astro projecten die de [Github Search API](https://docs.github.com/en/rest/reference/search#search-repositories) kan vinden (en een url hebben ingevoerd op github).

![Screenshot van de Astro Showcase site](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/astro-showcase_irzief.png)

Om dit te maken heb ik uit eindelijk een berg van verschillende technieken gebruikt, maar hier ga ik later in andere blogposts dieper op in. Voor nu wil ik het hebben over de project-pagina.

![Screenshot van de project pagina](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto/project-page.png)

## Dynamic File-based Routing

Als je met Astro normaal gesproken een pagina wilt toevoegen, moet je een `.astro`- of `.md`- bestand in je `src/pages`-folder plaatsen. Echter, om voor 100 repos een bestand aan te maken werkt niet. Daarom heb je dynamic routing nodig. Met het nieuwe systeem werkt dat door middel van blokhaken om de naam te zetten. Dus in mijn geval zou dat dan `[project].astro` zijn. Stel ik heb een lijst met 4 projecten zoals:

- project-1
- project-2
- project-3
- project-4

zou dit voor elk project in die lijst een pagina maken met dat als "slug". Dus:

- /project-1
- /project-2
- /project-3
- /project-4

Ik had het idee om in de toekomst nog een pagina te maken voor alle repo's van een gebruiken, dus ik heb ervoor gekozen om de urls als volgt op te bouwen:

- /sarah11918/astro-elsa/
- /achamorro-dev/astro-pokedex/
- /davideast/site/
- /rebelchris/astro-portfolio/

Om dit te doen, moest ik gebruik maken van de [Rest Parameter syntax](https://docs.astro.build/core-concepts/routing), dus niet `[project].astro`, maar `[...project].astro`.

## GetStaticPaths()

Omdat Astro alleen iets doet op build-time, gaat alleen een `[...projects].astro` bestand aanmaken niks doen. We moeten Astro eerst vertellen welke pagina's er gebouwd moeten worden. Laten we de code er eens bij pakken.

```astro
// src/pages/[...project].astro

---
import { getOgImage, getProjects } from '../helpers'; // 👈 helpers functies
// Other imports go here...

// Deze functie is om aan te geven
// welke pagina's gebouwd moeten worden.
export async function getStaticPaths() {

    // De getProjects functie gaan we in een andere blogpost behandelen,
    // voor nu ga er maar van uit dat dit een lijst met projecten terug geeft.
    const projects = await getProjects();

    // Return een lijst met in de params alle query params, in ons geval alleen
    // project, en de props die de pagina nodig heeft.
    return projects.map((project) => ({
            params: { project: project.full_name }, // full_name -> "user/repo"
            props: { data: project }
        });
    );
}

// Dit is de data die per pagina beschikbaar is.
const { project } = Astro.request.params;
const { data } = Astro.props;

// De getOgImage functie gaan we ook in een latere blogpost behandelen. 😉
const image = await getOgImage(data.homepage, 'c_fit,h_353,w_672');
---

// HTML goes here...
```

In principe kunnen we deze code in 2 delen zien. het `getStaticPaths()`-gedeelte, die Astro verteld welke pagina's er gemaakt moeten worden, en de rest, die voor de specifieke pagina's geldt. Wil je meer weten over de [nieuwe routing](https://docs.astro.build/core-concepts/routing) of de [getStaticsPaths()](https://docs.astro.build/reference/api-reference)-methode, kan ik alleen maar de docs aanraden.

### Een issue met getStaticPaths()

In de versie waarmee Astro Showcase is gemaakt, `v0.19.0-next.2`, zat een issue waardoor de `getStaticPaths()`-methode voor elke pagina werd aangeroepen. Dit betekent dat als je een API-call maakt die vervolgens 100 pagina's gaat aanmaken, dat in zeer korte tijd 100 API-calls gemaakt worden. Dit zorgde er voor dat ik direct door het rate limit van de Github API schoot. Ik heb dit opgelost door de file lokaal op te slaan na het eerste request. Hoe dit exact werkt, leg ik in een andere blogpost uit. Als deze nog niet gepubliceerd is, hou deze website of mijn [LinkedIn](https://www.linkedin.com/in/sander-geraedts/) in de gaten! 😉

**EDIT:** een van de core contributors in het Astro team, [Fred Schott](https://twitter.com/fredkschott), heeft op de [Discord](https://astro.build/chat) laten weten dat hij dit heeft opgepakt en er binnen een paar dagen een fix voor zal hebben. Verwacht dit in `v0.19.1`.
