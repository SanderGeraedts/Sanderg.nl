import React from "react";
import Header from "./Header";
import { RiGithubLine, RiInstagramLine, RiLinkedinFill } from "react-icons/ri";
import Wrapper from "./Wrapper";
import GlobalStyles from "../styles/GlobalStyles";
import SEO from "./Seo";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--col-gray);

  a {
    color: var(--col-gray);
    font-size: 1.5rem;
    margin: 0 20px;
  }
`;

const Layout = ({ children, siteTitle, description, keywords }) => (
  <>
    <GlobalStyles />
    <SEO title={siteTitle} description={description} keywords={keywords} />
    <Wrapper>
      <Header siteTitle={siteTitle} />
    </Wrapper>
    <div>{children}</div>
    <Wrapper>
      <Footer>
        <a href="https://github.com/SanderGeraedts">
          <RiGithubLine />
        </a>
        |
        <a href="https://www.instagram.com/luna_the_hufflepuff_retriever/">
          <RiInstagramLine />
        </a>
        |
        <a href="https://www.linkedin.com/in/sander-geraedts/">
          <RiLinkedinFill />
        </a>
      </Footer>
    </Wrapper>
  </>
);

export default Layout;
