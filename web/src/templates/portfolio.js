import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/Seo";
import PortfolioPage from "../page-components/PortfolioPage";

export const query = graphql`
  query PortfolioTemplateQuery($id: String!) {
    portfolio: sanityPortfolio(id: { eq: $id }) {
      id
      publishedAt
      mainImage {
        alt
        asset {
          fluid(maxWidth: 2000) {
            ...GatsbySanityImageFluid
          }
        }
      }
      title
      slug {
        current
      }
      _rawBody
    }
  }
`;

const PortfolioTemplate = (props) => {
  const { data, errors } = props;
  const portfolio = data && data.portfolio;
  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {portfolio && (
        <>
          <SEO title={`${portfolio.title} | Sanderg.nl` || "Sanderg.nl"} />
          <PortfolioPage portfolio={portfolio} />
        </>
      )}
    </>
  );
};

export default PortfolioTemplate;
