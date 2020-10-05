import React from "react";
import Img from "gatsby-image";
import Wrapper from "../components/Wrapper";
import Title from "../components/Title";
import BlockContent from "../components/sanity-blocks/block-content";

const PortfolioPage = ({ portfolio }) => {
  return (
    <>
      {portfolio.mainImage && (
        <Img
          fluid={portfolio.mainImage.asset.fluid}
          alt={portfolio.mainImage.alt}
          objectPosition="50% 0"
        />
      )}
      <Wrapper>
        <Title header="h1">{portfolio.title}</Title>
        <BlockContent blocks={portfolio._rawBody} />
      </Wrapper>
    </>
  );
};

export default PortfolioPage;
