import { gql } from '@apollo/client';
import client from '../../apolloClient';
import getContentBlocksGql from '../../gqls/flexibleBlocksGql';
import { BlogPostModel } from '../../models/customPostTypes/BlogPostModel';
import SEO_SECTION_GQL from '../../gqls/seoSectionGql';
import BLOG_POSTS_SECTION_GQL from '../../gqls/blogPostsSectionGql';

export const BLOG_POST_PREFIX = 'BlogPostTypeFlexibleBlocksFlexibleBlock';

const GET_BLOG_POST = gql`
  query GET_BLOG_POST($id: ID!) {
    post(id: $id, idType: SLUG) {
      id
      slug
      blogPostType {
        heading
        flexibleBlocks {
          ${getContentBlocksGql(BLOG_POST_PREFIX)}
        }
        featuredBlogPostsSection {
         ${BLOG_POSTS_SECTION_GQL}
        }
        seoSection {
          ${SEO_SECTION_GQL}
        }
      }
    }
  }
`;

interface Input {
  id: string;
}

interface Response {
  post: BlogPostModel;
}

const getBlogPost = async (input: Input) => {
  const { data } = await client.query<Response, Input>({
    query: GET_BLOG_POST,
    variables: input,
  });

  return data.post;
};

export default getBlogPost;
