import React from "react";
import styled from "styled-components";

const WrapperStyles = styled.div`
  margin: 0 auto;
  max-width: var(--size-width-lg, 1200px);
  padding: 0 10px;
`;

const Wrapper = ({ children }) => {
  return <WrapperStyles>{children}</WrapperStyles>;
};

export default Wrapper;
