import strava from "strava-v3";

async function createStravaNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  strava.config({
    access_token: process.env.STRAVA_ACCESS_TOKEN,
    client_id: process.env.STRAVA_CLIENT_ID,
    client_secret: process.env.STRAVA_CLIENT_SECRET,
  });

  const stravaClient = new strava.client(process.env.STRAVA_ACCESS_TOKEN);

  const payload = await stravaClient.athletes.stats({
    id: process.env.STRAVA_USER_ID,
  });

  const nodeMeta = {
    id: createNodeId("strava-stats"),
    parent: null,

    internal: {
      type: "StravaStats",
      mediaType: "application/json",
      contentDigest: createContentDigest(payload),
    },
  };
  actions.createNode({ ...payload, ...nodeMeta });
}

export async function sourceNodes(params) {
  // Fetch a Strava Stats and Source into Gatsby
  await Promise.all([createStravaNodes(params)]);
}

const createBlogPostPages = async (graphql, actions, reporter) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPost(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data.allSanityPost || {}).edges || [];

  postEdges.forEach((edge, index) => {
    const { id, slug = {}, publishedAt } = edge.node;
    const path = `/blog/${slug.current}/`;

    reporter.info(`Creating blog post page: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/blog-post.js"),
      context: { id },
    });
  });
};

const createSitePages = async (graphql, actions, reporter) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPage(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const pageEdges = (result.data.allSanityPage || {}).edges || [];

  pageEdges.forEach((edge) => {
    const id = edge.node.id;
    const path = edge.node.slug.current;

    reporter.info(`Creating Page: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/page.js"),
      context: { id },
    });
  });
};

const createPortfolioPages = async (graphql, actions, reporter) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allSanityPortfolio(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const portfolioEdges = (result.data.allSanityPortfolio || {}).edges || [];

  portfolioEdges.forEach((edge) => {
    const id = edge.node.id;
    const path = `/portfolio/${edge.node.slug.current}`;

    reporter.info(`Creating Portfolio Page: ${path}`);

    createPage({
      path,
      component: require.resolve("./src/templates/portfolio.js"),
      context: { id },
    });
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  await Promise.all([
    await createBlogPostPages(graphql, actions, reporter),
    await createSitePages(graphql, actions, reporter),
    await createPortfolioPages(graphql, actions, reporter),
  ]);
};
