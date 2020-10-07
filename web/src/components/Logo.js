import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

const LogoStyles = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 440px;
  max-width: 500px;

  h1 {
    font-size: 2rem;
    margin: 0;
  }

  a {
    color: var(--col-black);
    text-decoration: none;
  }

  .divider {
    width: 100%;
    height: 5px;
    background: var(--col-pink);
  }

  p {
    margin: 0 10px;
    color: var(--col-gray);
  }

  @media (max-width: 460px) {
    min-width: initial;
    width: auto;
    padding: 10px 20px 0 20px;
  }

  @media (max-width: 400px) {
    padding: 5px 5px 0 5px;
  }
`;

const Logo = () => {
  return (
    <LogoStyles>
      <h1>
        <Link to="/">Sander Geraedts</Link>
      </h1>
      <div className="divider"></div>
      <p>Frontend nerd met een passie voor design</p>
    </LogoStyles>
  );
};

export default Logo;
