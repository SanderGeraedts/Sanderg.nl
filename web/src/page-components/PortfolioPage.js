import React from "react";
import Wrapper from "../components/Wrapper";
import Title from "../components/Title";
import BlockContent from "../components/sanity-blocks/block-content";
import HeroImage from "../components/HeroImage";

const PortfolioPage = ({ portfolio }) => {
  return (
    <>
      <HeroImage image={portfolio.mainImage}>
        <Title header="h1">{portfolio.title}</Title>
      </HeroImage>
      <Wrapper>
        <BlockContent blocks={portfolio._rawBody} />
      </Wrapper>
    </>
  );
};

export default PortfolioPage;
