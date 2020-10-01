import { graphql, StaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/Layout";

import "normalize.css";

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
  }
`;

function LayoutContainer(props) {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        return (
          <Layout
            {...props}
            siteTitle={data.site.title}
            description={data.site.description}
            keywords={data.site.keywords}
          />
        );
      }}
    />
  );
}

export default LayoutContainer;
