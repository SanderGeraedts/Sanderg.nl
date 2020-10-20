import React from "react";
import styled from "styled-components";
import SEO from "../components/Seo";
import Title from "../components/Title";
import Wrapper from "../components/Wrapper";

const ListStyles = styled.ul`
  li {
    line-height: 1.5rem;
  }
`;

const ContactPage = () => {
  return (
    <>
      <SEO title="Contact" />
      <Wrapper>
        <Title
          header="h1"
          subtext="Voor contact ben ik te bereiken op de volgende manieren."
        >
          Contact
        </Title>
        <ListStyles>
          <li>
            E-mail: <a href="mailto:hallo@sanderg.nl">hallo@sanderg.nl</a>
          </li>
          <li>
            LinkedIn:{" "}
            <a href="https://linkedin.com/in/sander-geraedts">
              /in/sander-geraedts
            </a>
          </li>
        </ListStyles>
      </Wrapper>
    </>
  );
};

export default ContactPage;
