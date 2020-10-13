import { graphql } from "gatsby";
import React from "react";
import Title from "../components/Title";
import Wrapper from "../components/Wrapper";
import PortfolioItem from "../components/PortfolioItem";
import SEO from "../components/Seo";

const PortfoliosPage = ({ data }) => {
  const portfolios = data.portfolios.nodes;

  return (
    <>
      <SEO title="Portfolio" />
      <Wrapper>
        <Title header="h1" subtext="Een selectie van mijn meest recente werk.">
          Mijn werk
        </Title>
        {portfolios.map((portfolio) => (
          <PortfolioItem portfolio={portfolio} />
        ))}
      </Wrapper>
    </>
  );
};

export const query = graphql`
  query {
    portfolios: allSanityPortfolio(sort: { fields: publishedAt, order: DESC }) {
      nodes {
        title
        slug {
          current
        }
        id
        logo {
          ...GatsbySanityImageHotspot
        }
        _rawExcerpt
      }
    }
  }
`;

export default PortfoliosPage;
