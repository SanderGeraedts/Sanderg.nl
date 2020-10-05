import React from "react";
import styled from "styled-components";

const TitleStyles = styled.div`
  margin: 20px 0 40px 0;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    display: inline;
    border-bottom: 0.4rem solid var(--col-pink);
  }
`;

const Title = ({ header, children, subtext }) => {
  let title;

  switch (header) {
    case "h1":
      title = <h1>{children}</h1>;
      break;
    case "h2":
      title = <h2>{children}</h2>;
      break;
    case "h3":
      title = <h3>{children}</h3>;
      break;
    case "h4":
      title = <h4>{children}</h4>;
      break;
    case "h5":
      title = <h5>{children}</h5>;
      break;
    case "h6":
      title = <h6>{children}</h6>;
      break;
    default:
      title = <h2>{children}</h2>;
      break;
  }

  return (
    <TitleStyles className="title">
      {title}
      <p>{subtext}</p>
    </TitleStyles>
  );
};

export default Title;
