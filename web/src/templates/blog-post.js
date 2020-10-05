import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/Seo";

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
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

const BlogPostTemplate = (props) => {
  const { data, errors } = props;
  const post = data && data.post;
  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {post && <SEO title={`${post.title} | Sanderg.nl` || "Sanderg.nl"} />}
      <h2>Dit is een BlogPost</h2>
    </>
  );
};

export default BlogPostTemplate;
