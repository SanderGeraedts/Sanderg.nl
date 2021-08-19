---
title: 'Astro Showcase, het genereren van de previews'
permalink: '/posts/astro-showcase-previews-genereren'
englishLink: '/en/posts/astro-showcase-generate-previews'
description: 'De laatste paar posts stonden in het teken van verschillende problemen waar ik tegen aangelopen ben tijdens het maken van de Astro Showcase site. Een van de die ikzelf coolste features vind, is de preview afbeelding bij elk project. Hoe dat werkt, leg ik in deze post uit. 😉'
publishDate: '2021-08-19 18:00'
layout: '../../layouts/blog-layout.astro'
---

De [laatste](/posts/astro-file-based-routing) [paar](/posts/astro-local-data-caching) posts stonden in het teken van verschillende problemen waar ik tegen aangelopen ben tijdens het maken van de [Astro Showcase](https://astro-showcase.netlify.app) site. Een van de die ikzelf coolste features vind, is de preview afbeelding bij elk project. Hoe dat werkt, leg ik in deze post uit. 😉

![Screenshot van de Astro Showcase site](https://res.cloudinary.com/sandergnl/image/upload/c_scale,f_auto,q_auto,w_1024/astro-showcase_irzief.png)

## Verschillende iteraties

Zoals met de meeste dingen, is deze feature in verschillende iteraties gebouwd. <span class="tooltip" title="Too long; didn't read">TL:DR</span>? Het volledige [get-og-images.js](https://github.com/SanderGeraedts/Astro-Showcase/blob/main/src/helpers/get-og-image.js)-bestand is net als de rest van de code te vinden op Github.

### Versie 1: Open Graph Images

De eerste versie was relatief simpel. "Fetch de HTML, check of er een OG-image is gedefineerd en gebruik die. Als die niet bestaat, gebruik een placeholder."

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

Dit werkte zonder al te veel problemen, alleen werkte ik dat zo'n 90% van de sites geen open-graph image hadden. En mensen in de [Discord](https://astro.build/chat) schoppen om een afbeelding up te loaden gaat ook maar zo ver (Hi Sarah) 😉.

### Versie 2: screenshot.11ty.dev

Als jullie mijn [Astro, Puppeteer en Open Graph Images](/posts/astro-puppeteer-en-open-graph-images) herinneren, kunnen jullie je wel voorstellen hoe chagrijnig ik was toen ik er achter kwam dat na al die moeite het veel eenvoudiger kan met 11ty's [Screenshot API](https://github.com/11ty/api-screenshot). Anyway, laten we vorige code eens uitbreiden met 11ty's Screenshot API.

```javascript
// src/helpers/get-og-image.js

export default async (homepage) => {
  // Fetch given homepage

  // ...

  // else, return screenshot url
  return `https://v1.screenshot.11ty.dev/${encodeURIComponent(homepage)}/opengraph`;
};
```

Hierdoor werd voor elk project **on client load** een screenshot gegenereerd... Yep, page speed ging de prullenbak in.

### Versie 3: ~~Local Caching~~ Cloudinary

Om de page speed te herstellen (en geen boze berichten van [Zach Leatherman](https://www.zachleat.com/) te krijgen dat ik zijn API aan het spammen ben), heb ik besloten om de images alleen tijdens de build te laten genereren. Eerst dacht ik, "Laat ik het op dezelfde manier proberen als mijn [get-projects.js](/posts/astro-local-data-caching)". Toen ik om 02:34 's nachts opkeek en het nog steeds niet werkend had, besefte ik me dat de free tier van [Cloudinary](https://cloudinary.com/) niet zo krap is dat ik de afbeeldingen niet die kant op kan gooien.

Omdat het [hele bestand](https://github.com/SanderGeraedts/Astro-Showcase/blob/main/src/helpers/get-og-image.js) nogal lang is, laten we het opdelen in kleinere stukken.

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

Als eerste de Cloudinary library config. Aangezien Astro verplicht dat je de `import` syntax gebruikt, werkt het ietsje anders dan de [Cloudinary Docs](https://cloudinary.com/documentation/node_integration#installation_and_setup) zeggen. Daarin staat namelijk dat je `v2` moet gebruiken. Met de `import` syntax heeft `cl.v2` alleen geen `config()`-methode, dus die pakken we direct van de import.

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

In dit stuk staat zo ongeveer de hele lociga van de functie beschreven.

1. Kijk of de pagina een Open Graph Image heeft
   - Zo ja, geef deze terug
   - Zo nee, doe dan:
     1. Kijk of Cloudinary een afbeelding heeft en of die niet ouder dan een dag is.
        - Afbeelding bestaat en is niet te oud? Geef deze terug en exit de flow.
        - Afbeelding bestaat, maar is te oud? Verwijder deze en ga verder.
     2. Maak screenshot
     3. Upload screenshot
     4. Geef Astro het cloudinary url

Laten we het nu even hebben over de `getScreenshot()` en de `uploadScreenshot()` functies.

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

Met deze 2 functies kunnen we dus de screenshot maken, en uploaden.

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

En als laatste de `checkImage()` en `destroyImage()` functies. Cloudinary geeft helaas geen "last_updated" waarde terug, dus om toch te kunnen checken wanneer de file voor het laatst geüpdatet is, verwijderen we het bestand, en upload het daarna direct.

## All together now

Ik hoop dat het allemaal duidelijk was, maar mocht je gewoon de hele code willen om het beter te begrijpen, staat die hieronder.

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
