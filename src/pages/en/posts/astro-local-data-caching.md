---
title: 'Local data caching with Astro'
permalink: '/en/posts/astro-local-data-caching'
lang: 'en'
dutchLink: '/posts/astro-local-data-caching'
description: 'In my last blog post I talked about the new way of routing in Astro v0.19. In it I mentioned that at the moment there is still an issue with the getStaticPaths method, where it calls the function for every page that is created. This means that if you make an API call that then tells Astro to create 100 pages, this API call will be made 100x. If you have a rate-limit of, for example, 1 request per second, you fly right through it. At the time of writing, the Astro team has stated in their Discord that they are testing a fix for this, which will be released very soon, but suppose you want to start with Astro v0.19.0 now, how can you solve this?'
publishDate: '2021-08-19'
layout: '../../../layouts/blog-layout.astro'
---

In [my last blog post](/posts/astro-file-based-routing) I talked about the new way of routing in Astro v0.19. In it I mentioned that there is currently an issue with the `getStaticPaths` method, where it calls the function for every page that is created. This means that if you make an API call that then tells Astro to create 100 pages, this API call will be made 100x. If you have a rate-limit of, for example, 1 request per second, you fly right through it. At the time of writing, the Astro team has stated in their [Discord](https://astro/build/chat) that they are testing a fix for this, and it will be released very soon, but suppose you want starting with Astro v0.19.0, how can you fix it?

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

So the `getStaticPaths()` function now calls the `getProjects()` helper function every time a page is built. Let's grab this one to show why that's no longer an issue.

```javascript
import fs from 'node:fs'; // 👈 "node:" prefix is an Astro requirement for Node libs

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

If you go this way, keep in mind that you put the `.cache` folder in your `.gitignore`. Otherwise you'll end up with your builds always grabbing that file, and builds never actually update the data.

## End note

In the future, these kinds of hacks will no longer be necessary. Astro is only a few months old, so the ecosystem has yet to grow. This doesn't mean you have to wait to learn Astro, quite the contrary. At the moment the API is still so small that you can learn a large part of the tool with a number of relatively small projects. With the rapid development of Astro and the enthusiasm of the community behind it, I expect Astro to become at least as large as comparable static-site generators such as [Jekyll](https://jekyllrb.com/) and [11ty](https://www.11ty.dev/). So diving in now means not only that you have an edge over the rest, but also that Astro is growing even faster! 🙌
