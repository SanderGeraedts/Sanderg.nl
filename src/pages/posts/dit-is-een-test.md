---
title: Dit is een test
permalink: /posts/dit-is-een-test
description: Test om te kijken hoe Netlify CMS werkt. Wordt zo verwijderd.
publishDate: 2021-08-28T10:31:52.571Z
layout: ../../layouts/blog-layout.astro
---
Test test etst

## Local caching

For the [Astro Showcase](https://astro-showcase.netlify.app/) I solved it in the following way

1.  Check if a file called`.local.json` exists
    - if so, return the data in this file.
    - if not, then:
      1.  Call the API.
      2.  Filter the unimportant data.
      3.  Write the filtered data to `.local.json`.

This works in the code as follows:

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