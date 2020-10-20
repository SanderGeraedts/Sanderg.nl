import React from "react";
import Wrapper from "../components/Wrapper";
import BlockContent from "../components/sanity-blocks/block-content";
import HeroImage from "../components/HeroImage";

const BlogPage = ({ blog }) => {
  return (
    <>
      <HeroImage image={blog.mainImage}>
        <h1>{blog.title}</h1>
      </HeroImage>
      <Wrapper>
        <BlockContent blocks={blog._rawBody} />
      </Wrapper>
    </>
  );
};

export default BlogPage;
