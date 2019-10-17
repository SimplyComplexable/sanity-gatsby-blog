import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import { imageUrlFor } from "../lib/image-url";
import { buildImageObj } from "../lib/helpers";

interface Meta {
  name: string;
  content: string;
}

interface Props {
  description?: string;
  lang?: string;
  meta?: Array<Meta>;
  keywords?: Array<string>;
  title: string;
  image?: {
    asset: string;
  };
}

const SEO = ({ description, lang = "en", meta = [], keywords = [], title, image }: Props) => (
  <StaticQuery
    query={detailsQuery}
    render={data => {
      const metaDescription = description || (data.site && data.site.description) || "";
      const siteTitle = (data.site && data.site.title) || "";
      const siteAuthor = (data.site && data.site.author && data.site.author.name) || "";
      const metaImage =
        image && image.asset
          ? imageUrlFor(buildImageObj(image))
              .width(1200)
              .url()
          : "";

      return (
        <Helmet
          htmlAttributes={{ lang }}
          title={title}
          titleTemplate={title === siteTitle ? "%s" : `%s | ${siteTitle}`}
          meta={[
            {
              name: "description",
              content: metaDescription
            },
            {
              property: "og:title",
              content: title
            },
            {
              property: "og:description",
              content: metaDescription
            },
            {
              property: "og:type",
              content: "website"
            },
            {
              property: "og:image",
              content: metaImage
            },
            {
              name: "twitter:card",
              content: "summary"
            },
            {
              name: "twitter:creator",
              content: siteAuthor
            },
            {
              name: "twitter:title",
              content: title
            },
            {
              name: "twitter:description",
              content: metaDescription
            }
          ]
            .concat(
              keywords && keywords.length > 0
                ? {
                    name: "keywords",
                    content: keywords.join(", ")
                  }
                : []
            )
            .concat(meta)}
        />
      );
    }}
  />
);

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
      author {
        name
      }
    }
  }
`;
