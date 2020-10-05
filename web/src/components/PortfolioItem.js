import { Link } from "gatsby";
import React from "react";
import Img from "gatsby-image";
import BlockContent from "./sanity-blocks/block-content";
import styled from "styled-components";

const PortfolioStyles = styled.div`
  display: flex;
  margin: 1rem 0;
`;

const PortfolioTextStyles = styled.div`
  padding: 0 20px;

  a {
    color: var(--col-black);
    text-decoration-color: var(--col-pink);
  }

  p {
    margin-top: 0.5rem;
  }
`;

const PortfolioItem = ({ portfolio }) => {
  return (
    <PortfolioStyles>
      <Img fixed={portfolio.logo.asset.fixed} alt={portfolio.logo.alt} />

      <PortfolioTextStyles>
        <h2>
          <Link to={`/portfolio/${portfolio.slug.current}`}>
            {portfolio.title}
          </Link>
        </h2>
        {portfolio._rawExcerpt && (
          <BlockContent blocks={portfolio._rawExcerpt} />
        )}
      </PortfolioTextStyles>
    </PortfolioStyles>
  );
};

export default PortfolioItem;
