import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

const ToolStyles = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Tool = ({ tool }) => {
  return (
    <ToolStyles>
      <Img fixed={tool.logo.asset.fixed} alt={tool.logo.alt} />
      <p>{tool.title}</p>
    </ToolStyles>
  );
};

export default Tool;
