import React from "react";
import styled from "styled-components";
import Wrapper from "../components/Wrapper";
import Img from "gatsby-image";
import { graphql, Link } from "gatsby";
import Title from "../components/Title";
import Image from "../components/Image";

const HeroStyles = styled.div`
  position: relative;
  max-height: 80vh;
  overflow: hidden;

  .gatsby-image-wrapper {
    opacity: 0.4;
  }
`;

const IntroStyles = styled.div`
  max-width: 500px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 25px 25px 0 0;
  padding: 20px;
  position: absolute;
  bottom: 0;

  p {
    font-size: 1.3rem;
    margin: 0.5rem 0;
  }

  @media (max-width: 500px) {
    max-width: calc(100% - 60px);
  }
`;

const PortfolioStyles = styled.div`
  margin: 40px 0;

  h2 {
    margin: 20px 0;
  }
  .portfolios {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
  }

  .portfolio {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-weight: var(--fw-semi-bold);
    color: var(--col-gray);
    text-decoration: none;

    span {
      margin: 20px 0;
      font-size: 1.5rem;
    }
  }
`;

const IndexPage = ({ data }) => {
  const portfolios = data.portfolios.nodes;

  return (
    <>
      <HeroStyles>
        <Img
          fluid={data.file.childImageSharp.fluid}
          alt="close-up van Sander Geraedts die zijn medaille voor de Halve Marathon van Eindhoven omhoog houdt"
        />
        <Wrapper>
          <IntroStyles>
            <h1>Hey, ik ben Sander</h1>
            <p>
              Front-end Developer bij <a href="https://sogeti.nl/">Sogeti</a>,
              hardloper, en baasje van de veel te schattige{" "}
              {new Date() > new Date("2021-02-13")
                ? "golden retriever"
                : "puppy"}{" "}
              <a href="https://www.instagram.com/luna_the_hufflepuff_retriever/">
                Luna
              </a>
              .
            </p>
          </IntroStyles>
        </Wrapper>
      </HeroStyles>
      <Wrapper>
        <PortfolioStyles>
          <Title subtext="Een selectie van mijn meest recente werk.">
            Mijn werk
          </Title>
          <div className="portfolios">
            {portfolios.map((portfolio) => (
              <Link
                className="portfolio"
                key={portfolio.id}
                to={`/portfolio/${portfolio.slug.current}`}
              >
                <Image image={portfolio.logo} width={200} height={200} />
                <span>{portfolio.title}</span>
              </Link>
            ))}
          </div>
        </PortfolioStyles>
      </Wrapper>
    </>
  );
};

export const query = graphql`
  fragment GatsbySanityImageHotspot on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
    alt
  }

  query {
    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fluid(maxHeight: 700) {
          ...GatsbyImageSharpFluid
        }
      }
    }

    portfolios: allSanityPortfolio(
      limit: 3
      sort: { fields: publishedAt, order: DESC }
      filter: { featured: { eq: true } }
    ) {
      nodes {
        title
        slug {
          current
        }
        id
        logo {
          ...GatsbySanityImageHotspot
        }
      }
    }
  }
`;

export default IndexPage;
