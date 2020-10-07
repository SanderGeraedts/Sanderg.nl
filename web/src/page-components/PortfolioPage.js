import React from "react";
import Img from "gatsby-image";
import Wrapper from "../components/Wrapper";
import Title from "../components/Title";
import BlockContent from "../components/sanity-blocks/block-content";
import styled from "styled-components";

const HeroStyles = styled.div`
  position: relative;
  max-height: 60vh;
  overflow: hidden;

  .gatsby-image-wrapper {
    opacity: 0.4;
  }

  .title {
    z-index: 10;
    position: absolute;
    bottom: 0;
    background: rgba(255, 255, 255, 0.75);
    border-radius: 25px 25px 0 0;
    padding: 0 30px;
  }
`;

const PortfolioPage = ({ portfolio }) => {
  return (
    <>
      <HeroStyles>
        {portfolio.mainImage && (
          <Img
            fluid={portfolio.mainImage.asset.fluid}
            alt={portfolio.mainImage.alt}
          />
        )}
        <Wrapper>
          <div className="title">
            <Title header="h1">{portfolio.title}</Title>
          </div>
        </Wrapper>
      </HeroStyles>
      <Wrapper>
        <BlockContent blocks={portfolio._rawBody} />
      </Wrapper>
    </>
  );
};

export default PortfolioPage;
