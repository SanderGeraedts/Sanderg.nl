import { Link } from "gatsby";
import React from "react";
import BlockContent from "./sanity-blocks/block-content";
import styled from "styled-components";
import Image from "./Image";

const PortfolioStyles = styled.div`
  display: flex;
  margin: 1rem 0;

  .gatsby-image-wrapper {
    min-width: 250px;
  }

  @media (max-width: 650px) {
    flex-wrap: wrap;

    .gatsby-image-wrapper {
      margin: 0 auto;
    }
  }
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

  @media (max-width: 650px) {
    padding: 20px 0;
    text-align: center;
  }
`;

const PortfolioItem = ({ portfolio }) => {
  return (
    <PortfolioStyles>
      {/* <Img fixed={portfolio.logo.asset.fixed} alt={portfolio.logo.alt} /> */}
      <Image image={portfolio.logo} width={250} height={250} />

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
