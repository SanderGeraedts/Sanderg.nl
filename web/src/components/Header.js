import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import Logo from "./Logo";

const HeaderStyles = styled.nav`
  ul {
    display: flex;
    list-style: none;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  a {
    color: var(--col-black);
    text-decoration: none;
    font-weight: var(--fw-semi-bold);
  }
`;

const Header = () => (
  <HeaderStyles>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/over-mij/">Over mij</Link>
      </li>
      <li>
        <Logo />
      </li>
      <li>
        <Link to="/portfolio/">Portfolio</Link>
      </li>
      <li>
        <Link to="/contact/">Contact</Link>
      </li>
    </ul>
  </HeaderStyles>
);

export default Header;
