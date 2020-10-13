import React from "react";
import styled from "styled-components";
import Tool from "./Tool";

const ToolListStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
`;

const ToolList = ({ tools }) => {
  return (
    <ToolListStyles>
      {tools.map((tool) => (
        <Tool tool={tool} />
      ))}
    </ToolListStyles>
  );
};

export default ToolList;
