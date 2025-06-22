import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { BlogPostsSectionModel } from '../../models/customPostTypes/BlogPostModel';
import BLOG_POSTS_SECTION_GQL from '../../gqls/blogPostsSectionGql';

export const GET_BLOG_POSTS_SECTION = gql`
  query GET_BLOG_POSTS_SECTION {
    globals {
      globalContent {
        blogPostsSection {
         ${BLOG_POSTS_SECTION_GQL}
        }
      }
    }
  }
`;

interface Response {
  globals: {
    globalContent: { blogPostsSection: BlogPostsSectionModel };
  };
}

const getBlogPostsSection = async () => {
  const { data } = await client.query<Response>({
    query: GET_BLOG_POSTS_SECTION,
  });
  return data.globals.globalContent.blogPostsSection;
};

export default getBlogPostsSection;
