import { graphql } from "gatsby";
import React from "react";
import Title from "../components/Title";
import Wrapper from "../components/Wrapper";
import PortfolioItem from "../components/PortfolioItem";

const PortfoliosPage = ({ data }) => {
  const portfolios = data.portfolios.nodes;

  return (
    <Wrapper>
      <Title header="h1" subtext="Een selectie van mijn meest recente werk.">
        Mijn werk
      </Title>
      {portfolios.map((portfolio) => (
        <PortfolioItem portfolio={portfolio} />
      ))}
    </Wrapper>
  );
};

export const query = graphql`
  query {
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 700) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    portfolios: allSanityPortfolio(sort: { fields: publishedAt, order: DESC }) {
      nodes {
        title
        slug {
          current
        }
        id
        logo {
          alt
          asset {
            fixed(height: 250, width: 250) {
              ...GatsbySanityImageFixed
            }
          }
        }
        _rawExcerpt
      }
    }
  }
`;

export default PortfoliosPage;