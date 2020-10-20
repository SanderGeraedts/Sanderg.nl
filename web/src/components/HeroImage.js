import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import Wrapper from "./Wrapper";

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

const HeroImage = ({ image, children }) => {
  return (
    <HeroStyles>
      {image && <Img fluid={image.asset.fluid} alt={image.alt} />}
      <Wrapper>
        <div className={image ? "title" : ""}>{children}</div>
      </Wrapper>
    </HeroStyles>
  );
};

export default HeroImage;
