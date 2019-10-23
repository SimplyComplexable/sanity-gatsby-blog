import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import BlogPostPreviewList from "../components/blog-post-preview-list";
import Container from "../components/container";
import SEO from "../components/seo";
import Layout from "../containers/layout";

export const query = graphql`
  fragment SanityImage on SanityMainImage {
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
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    posts: allSanityPost(
      limit: 3
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
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

interface Data<T> {
  edges: Array<{
    nodes: Array<T>;
  }>;
}

interface Image {
  crop: {
    _key: string;
    _type: string;
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  hotspot: {
    _key: string;
    _type: string;
    x: number;
    y: number;
    height: number;
    width: number;
  };
  asset: {
    _id: string;
  };
}

interface Post {
  isInList: boolean;
  publishedAt: string;
  slug: string;
  mainImage: Image;
  title: string;
  _rawExcerpt: string;
}

interface Props {
  data: {
    site: {
      title: string;
      description: string;
      keywords: Array<string>;
    };
    posts: Data<Post>;
  };
  errors?: {};
}

const HomePage = ({
  data: {
    site: { title, description, keywords },
    posts
  }
}: Props) => {

  const postNodes = mapEdgesToNodes(posts)
    .filter(filterOutDocsWithoutSlugs)
    .filter(filterOutDocsPublishedInTheFuture);

  return (
    <Layout>
      <SEO title={title} description={description} keywords={keywords} />
      <Container>
        <h1>Welcome to {title}</h1>
        {postNodes && (
          <BlogPostPreviewList
            title="Latest blog posts"
            nodes={postNodes}
            browseMoreHref="/archive/"
          />
        )}
      </Container>
    </Layout>
  );
};

export default HomePage;
