/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

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
