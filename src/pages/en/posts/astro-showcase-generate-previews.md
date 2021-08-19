---
title: 'Astro Showcase, het genereren van de previews'
permalink: '/en/posts/astro-showcase-generate-previews'
lang: 'en'
dutchLink: '/posts/astro-showcase-previews-genereren'
description: 'The last few posts have been about several issues I encountered while creating the Astro Showcase site. One of the coolest features I think is the preview image for each project. How that works, I explain in this post.😉'
publishDate: '2021-08-19 18:00'
layout: '../../../layouts/blog-layout.astro'
---

The [last](/posts/astro-file-based-routing) [pair](/posts/astro-local-data-caching) of posts were all about several issues I ran into while creating the [Astro Showcase](https://astro-showcase.netlify.app) site. One of the coolest features I think is the preview image for each project. How that works, I explain in this post. 😉

![Screenshot of the Astro Showcase site](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/astro-showcase_irzief.png)

## Multiple iterations

As with most things, this feature has been built in several iterations. <span class="tooltip" title="Too long; didn't read">TL:DR</span>? The full [get-og-images.js](https://github.com/SanderGeraedts/Astro-Showcase/blob/main/src/helpers/get-og-image.js) file is like the rest of find the code on Github.

### Version 1: Open Graph Images

The first version was relatively simple. "Fetch the HTML, check if an OG image is defined and use it. If it doesn't exist, use a placeholder."

```javascript
// src/helpers/get-og-image.js

import * as cheerio from 'cheerio'; // 👈 HTML parser

export default async (homepage) => {
  // Fetch given homepage
  const data = await fetch(homepage).catch((err) => console.log(`Page: ${homepage} is down`));

  if (data) {
    // Get HTML from response
    const html = await data.text();

    // Load HTML into cheerio
    const $ = cheerio.load(html);

    // Get Image url
    const imageUrl = $('meta[property="og:image"]').attr('content') || $('meta[property="og:image:url"]').attr('content');

    // If image is found, return absolute path
    if (imageUrl) {
      return imageUrl.startsWith('http') ? imageUrl : homepage + imageUrl;
    }
  }

  // else, return the placeholder
  return '/assets/images/placeholder.png';
};
```

This worked without too many problems, except that 90% of the sites didn't have an open-graph image. And kicking people in the [Discord](https://astro.build/chat) to upload an image only goes so far (Hi Sarah) 😉.

### Version 2: screenshot.11ty.dev

If you remember my [Astro, Puppeteer, and Open Graph Images](/posts/astro-puppeteer-and-open-graph-images), you can imagine how grumpy I was when I found out that after all that effort, the much easier with 11ty's [Screenshot API](https://github.com/11ty/api-screenshot). Anyway, let's extend previous code with 11ty's Screenshot API.

```javascript
// src/helpers/get-og-image.js

export default async (homepage) => {
  // Fetch given homepage

  // ...

  // else, return screenshot url
  return `https://v1.screenshot.11ty.dev/${encodeURIComponent(homepage)}/opengraph`;
};
```

This generated a screenshot for every project **on client load**... Yep, page speed went into the trash.

### Version 3: ~~Local Caching~~ Cloudinary

To restore the page speed (and not get angry messages from [Zach Leatherman](https://www.zachleat.com/) that I'm spamming his API), I decided to only use the images during the build to generate. At first I thought, "Let me try the same as my [get-projects.js](/posts/astro-local-data-caching)". When I looked up at 2:34 AM and it still didn't work, I realized that the free tier of [Cloudinary](https://cloudinary.com/) is not so tight that I can't see the images that way can throw up.

Since the [entire file](https://github.com/SanderGeraedts/Astro-Showcase/blob/main/src/helpers/get-og-image.js) is quite long, let's break it down into smaller chunks.

```javascript
// src/helpers/get-og-image.js

import * as cl from 'cloudinary';
// Other imports...

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

const cloudinary = cl.v2;

cl.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
```

First the Cloudinary library config. Since Astro requires you to use the `import` syntax, it works slightly differently than what the [Cloudinary Docs](https://cloudinary.com/documentation/node_integration#installation_and_setup) say. It says that you have to use `v2`. The problem is that with the `import` syntax `cl.v2` has no `config()` method, so we take that directly from the import.

```javascript
// src/helpers/get-og-image.js

export default async (homepage, cloudinaryOptions = 'c_fit,h_235,w_448') => {
  // ...

  if (imageUrl) {
    return imageUrl.startsWith('http') ? imageUrl : homepage + imageUrl;
  } else {
    // Removes http[s]:// and all /'s
    const filename = url.replace(/(^\w+:|^)\/\//, '').replaceAll('/', '');

    // Checks if the image exists on cloudinary
    const image = await checkImage(filename);

    // creates cloudinary url
    const cloudinaryUrl = `https://res.cloudinary.com/sandergnl/image/upload/${cloudinaryOptions},q_auto,f_auto/astro-showcase/${filename}.jpg`;

    // If the image does not exist, upload it.
    // If the image does exist, but is older than 1 day
    // remove it and reupload it (to reset the created_at date)
    // If the image does exist, but is younger than 1 day, return the url
    if (image) {
      const createdTime = new Date(image.created_at).getTime();
      const currentTime = new Date().getTime();

      // Check if the image is older than 1 day
      if (currentTime - createdTime > 24 * 60 * 60 * 1000) {
        await destroyImage(filename);
      } else {
        // else, just return the cloudinaryUrl
        return cloudinaryUrl;
      }
    }

    // Get Screenshot Buffer
    const buffer = await getScreenshot(homepage);

    // Upload said buffer
    await uploadScreenshot(buffer, filename);

    // return the URL so Astro can build the page
    return cloudinaryUrl;
  }
};
```

This section describes just about the entire logic of the function.

1. See if the page has an Open Graph Image
   - If yes, return it
   - If not, do:
     1. Check that Cloudinary has an image and that it is not older than a day.
        - Image exists and is not too old? Give it back and exit the flow.
        - Image exists, but is too old? Remove it and continue.
     2. Take screenshot
     3. Upload screenshot
     4. Give Astro the cloudinary url

Now let's talk about the `getScreenshot()` and the `uploadScreenshot()` functions.

```javascript
// /src/helpers/get-og-image.js

/**
 * Calls the 11ty screenshot API to take a screenshot of the given homepage
 *
 * @param {string} homepage
 * @returns Buffer
 */
const getScreenshot = async (homepage) => {
  const response = await fetch(`https://v1.screenshot.11ty.dev/${encodeURIComponent(homepage)}/opengraph`);

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

/**
 * Upload Image Buffer to Cloudinary
 *
 * @param {Buffer} screenshot
 * @param {string} filename
 * @returns Promise<Result>
 */
const uploadScreenshot = (screenshot, filename) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: 'astro-showcase',
      public_id: filename,
      overwrite: true,
    };
    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) reject(error);

        resolve(result);
      })
      .end(screenshot);
    console.log(`Upload of ${filename} complete!`);
  });
};
```

With these 2 functions we can make the screenshot and upload it.

```javascript
// /src/helpers/get-og-image.js

/**
 * Checks if the image exists on Cloudinary
 *
 * @param {string} filename
 * @returns image Object or undefined
 */
const checkImage = (filename) => {
  return new Promise((resolve) => {
    cloudinary.api.resource(`astro-showcase/${filename}`, (error, result) => {
      if (error && error.http_code === 404) {
        resolve(undefined);
      }

      resolve(result);
    });
  });
};

/**
 * Removes the file from Cloudinary
 *
 * @param {string} filename
 * @returns
 */
const destroyImage = (filename) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(`astro-showcase/${filename}`, (error, result) => {
      resolve(result);
    });
  });
};
```

And finally the `checkImage()` and `destroyImage()` functions. Unfortunately Cloudinary does not return a "last_updated" value, so to be able to check when the file was last updated, we delete the file, and then upload it immediately.

## All together now

I hope it was all clear, but if you just want the whole code to better understand it, it's down below.

- [Github](https://github.com/SanderGeraedts/Astro-Showcase)
- [get-og-image.js](https://github.com/SanderGeraedts/Astro-Showcase/blob/main/src/helpers/get-og-image.js)
- [Astro Showcase](https://astro-showcase.netlify.app/)
- [Astro Docs](https://docs.astro.build)

```javascript
// src/helpers/get-og-image.js

import * as cheerio from 'cheerio';
import getUrl from './get-url.js';
import * as cl from 'cloudinary';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

const cloudinary = cl.v2;

cl.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

/**
 * Calls the 11ty screenshot API to take a screenshot of the given homepage
 *
 * @param {string} homepage
 * @returns Buffer
 */
const getScreenshot = async (homepage) => {
  const response = await fetch(`https://v1.screenshot.11ty.dev/${encodeURIComponent(homepage)}/opengraph`);

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
};

/**
 * Upload Image Buffer to Cloudinary
 *
 * @param {Buffer} screenshot
 * @param {string} filename
 * @returns Promise<Result>
 */
const uploadScreenshot = (screenshot, filename) => {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: 'astro-showcase',
      public_id: filename,
      overwrite: true,
    };
    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(screenshot);
    console.log(`Upload of ${filename} complete!`);
  });
};

/**
 * Checks if the image exists on Cloudinary
 *
 * @param {string} filename
 * @returns image Object or undefined
 */
const checkImage = (filename) => {
  return new Promise((resolve) => {
    cloudinary.api.resource(`astro-showcase/${filename}`, (error, result) => {
      if (error && error.http_code === 404) {
        resolve(undefined);
      }

      resolve(result);
    });
  });
};

/**
 * Removes the file from Cloudinary
 *
 * @param {string} filename
 * @returns
 */
const destroyImage = (filename) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(`astro-showcase/${filename}`, (error, result) => {
      resolve(result);
    });
  });
};

export default async (url, cloudinaryOptions = 'c_fit,h_235,w_448') => {
  const homepage = getUrl(url);

  const data = await fetch(homepage).catch((err) => console.log(`Page: ${homepage} is down`));

  let imageUrl;

  if (data) {
    const html = await data.text();
    const $ = cheerio.load(html);
    imageUrl = $('meta[property="og:image"]').attr('content') || $('meta[property="og:image:url"]').attr('content');
  }

  if (imageUrl) {
    return imageUrl.startsWith('http') ? imageUrl : homepage + imageUrl;
  } else {
    const filename = url.replace(/(^\w+:|^)\/\//, '').replaceAll('/', '');
    const image = await checkImage(filename);
    const cloudinaryUrl = `https://res.cloudinary.com/sandergnl/image/upload/${cloudinaryOptions},q_auto,f_auto/astro-showcase/${filename}.jpg`;

    // If the image does not exist, upload it.
    // If the image does exist, but is older than 1 day
    // remove it and reupload it (to reset the created_at date)
    // If the image does exist, but is younger than 1 day, return the url
    if (image) {
      const createdTime = new Date(image.created_at).getTime();
      const currentTime = new Date().getTime();

      // Check if the image is older than 1 day
      if (currentTime - createdTime > 24 * 60 * 60 * 1000) {
        await destroyImage(filename);
      } else {
        // else, just return the cloudinaryUrl
        return cloudinaryUrl;
      }
    }
    const buffer = await getScreenshot(homepage);
    await uploadScreenshot(buffer, filename);

    return cloudinaryUrl;
  }
};
```

```javascript
// src/helpers/get-url.js
export default (url) => {
  if (!url) {
    return url;
  }

  return url.startsWith('http') ? url : `https://${url}`;
};
```
