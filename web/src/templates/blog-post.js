import React from "react";
import { graphql } from "gatsby";
import SEO from "../components/Seo";
import Wrapper from "../components/Wrapper";
import BlogPage from "../page-components/BlogPage";

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    blog: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      mainImage {
        alt
        asset {
          fluid(maxWidth: 2000) {
            ...GatsbySanityImageFluid
          }
        }
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
  const blog = data && data.blog;
  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {blog && <SEO title={blog.title} />}
      <Wrapper>
        <BlogPage blog={blog} />
      </Wrapper>
    </>
  );
};

export default BlogPostTemplate;
