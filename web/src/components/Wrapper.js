import React from "react";
import styled from "styled-components";

const WrapperStyles = styled.div`
  margin: 0 auto;
  max-width: var(--size-width-lg);
  padding: 0 20px;
`;

const Wrapper = ({ children }) => {
  return <WrapperStyles>{children}</WrapperStyles>;
};

export default Wrapper;
