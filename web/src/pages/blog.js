import React from "react";
import { graphql, Link } from "gatsby";
import { mapEdgesToNodes } from "../lib/helpers";
import Wrapper from "../components/Wrapper";
import GraphQLErrorList from "../components/sanity-blocks/graphql-error-list";
import SEO from "../components/Seo";
import { format } from "date-fns";

export const query = graphql`
  query BlogPageQuery {
    posts: allSanityPost(
      limit: 12
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const BlogPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return <GraphQLErrorList errors={errors} />;
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);

  return (
    <>
      <SEO title="Blog" />
      <Wrapper>
        <h1>Blog</h1>
        {postNodes &&
          postNodes.length > 0 &&
          postNodes.map((post) => {
            const dateSegment = format(post.publishedAt, "YYYY/MM");
            return (
              <li>
                <Link to={`/nieuws/${dateSegment}/${post.slug.current}`}>
                  {post.title}
                </Link>
              </li>
            );
          })}
      </Wrapper>
    </>
  );
};

export default BlogPage;
