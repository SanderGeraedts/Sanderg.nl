import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/Seo";

export const query = graphql`
  query PageTemplateQuery($id: String!) {
    post: sanityPage(id: { eq: $id }) {
      id
      mainImage {
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
  const post = data && data.post;
  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {post && <SEO title={post.title || "Untitled"} />}
      <h2>Dit is een Page</h2>
    </>
  );
};

export default PageTemplate;
