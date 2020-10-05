import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/Seo";

export const query = graphql`
  query PageTemplateQuery($id: String!) {
    page: sanityPage(id: { eq: $id }) {
      id
      mainImage {
        ...GatsbySanityImageHotspot
      }
      title
      slug {
        current
      }
      _rawBody
    }
  }
`;

const PageTemplate = (props) => {
  const { data, errors } = props;
  const page = data && data.page;
  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {page && <SEO title={page.title || "Untitled"} />}
      <h2>Dit is een Page</h2>
    </>
  );
};

export default PageTemplate;
