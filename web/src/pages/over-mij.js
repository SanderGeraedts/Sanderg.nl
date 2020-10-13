import React from "react";
import { graphql, Link } from "gatsby";
import Img from "gatsby-image";
import { mapEdgesToNodes } from "../lib/helpers";
import Wrapper from "../components/Wrapper";
import GraphQLErrorList from "../components/sanity-blocks/graphql-error-list";
import SEO from "../components/Seo";
import Title from "../components/Title";
import styled from "styled-components";
import ToolList from "../components/ToolList";

const IntroStyles = styled.div`
  display: flex;
  gap: 2rem;

  .content p:first-child {
    margin-top: 0;
  }

  .gatsby-image-wrapper {
    min-width: 300px;
    border-radius: 25px;
  }

  @media (max-width: 750px) {
    flex-wrap: wrap;
    justify-content: center;

    .gatsby-image-wrapper {
      order: -1;
    }
  }
`;

const OverMijPage = (props) => {
  const {
    data: { stravaStats, file, tools },
    errors,
  } = props;

  const distanceKms =
    Math.floor(stravaStats.all_run_totals.distance / 100) / 10;

  const totalTime = {
    hours: Math.floor(stravaStats.all_run_totals.moving_time / 3600),
    minutes: Math.floor((stravaStats.all_run_totals.moving_time % 3600) / 60),
    seconds: Math.floor(stravaStats.all_run_totals.moving_time % 60),
  };

  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  return (
    <>
      <SEO title="Over mij" />
      <Wrapper>
        <Title header="h1" subtext="Een korte introductie over mezelf.">
          Over Mij
        </Title>
        <IntroStyles>
          <div className="content">
            <p>
              Hey, mijn naam is Sander Geraedts. Ik ben een Front-end Developer
              uit Veendam en werk op dit moment voor{" "}
              <a href="https://abnamro.nl/">ABN AMRO</a> , in opdracht van{" "}
              <a href="https://sogeti.nl/">Sogeti</a>.
            </p>
            <p>
              In mijn vrije tijd ben ik bezig om het quidditch team, de
              Groningen Griffins, op te zetten. Meer hierover kan je op mijn{" "}
              <Link to="/portfolio/groningen-griffins">portfolio</Link> hierover
              vinden. Daarnaast hou ik enorm van hardlopen. Volgens mijn{" "}
              <a href="https://www.strava.com/athletes/43070778">
                Strava profiel
              </a>{" "}
              heb ik ongeveer {distanceKms} km gelopen, in bij elkaar{" "}
              {totalTime.hours} uur, {totalTime.minutes} minuten en{" "}
              {totalTime.seconds} seconden. Wil je weten hoe ik dit weet? Dat
              kan je lezen in deze{" "}
              <Link to="/blog/dynamische-data-met-netlify-functions-in-gatsby/">
                blog
              </Link>
              .
            </p>
          </div>
          <Img
            fixed={file.childImageSharp.fixed}
            alt="close-up van Sander Geraedts die zijn medaille voor de Halve Marathon van Eindhoven omhoog houdt"
          />
        </IntroStyles>
        <h2>Tools</h2>
        <p>Ik heb onder andere met de volgende tools gewerkt:</p>
        <ToolList tools={tools.nodes} />
      </Wrapper>
    </>
  );
};

export const query = graphql`
  query {
    stravaStats {
      all_run_totals {
        distance
        moving_time
        count
      }
    }

    file(relativePath: { eq: "avatar.jpg" }) {
      childImageSharp {
        fixed(height: 300, width: 300) {
          ...GatsbyImageSharpFixed
        }
      }
    }

    tools: allSanityTool(sort: { fields: profiency, order: DESC }) {
      nodes {
        title
        profiency
        logo {
          alt
          asset {
            fixed(height: 150, width: 150) {
              ...GatsbySanityImageFixed
            }
          }
        }
      }
    }
  }
`;

export default OverMijPage;
