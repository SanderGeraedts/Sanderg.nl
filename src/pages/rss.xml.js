import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function get(context) {
  return rss({
    // `<title>` field in output xml
    title: "SanderG's Blog",
    // `<description>` field in output xml
    description: "My stumbles in the field of making and development",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: await pagesGlobToRssItems(import.meta.glob("./posts/*.{md,mdx}")),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
