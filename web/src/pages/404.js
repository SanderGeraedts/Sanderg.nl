import React from "react";
import SEO from "../components/Seo";
import Wrapper from "../components/Wrapper";

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Wrapper>
      <h1>Not found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Wrapper>
  </>
);

export default NotFoundPage;
