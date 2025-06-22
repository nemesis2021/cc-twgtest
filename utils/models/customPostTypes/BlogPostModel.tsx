import { CategoriesModel } from '../CategoryModel';
import { FlexibleBlocksModel } from '../FlexibleBlocksModel';
import { ImageModel } from '../ImageModel';
import { LinkModel } from '../LinkModel';
import { SeoSectionModel } from '../sections/SeoSectionModel';

export interface BlogPostPartialModel {
  id: string;
  slug: string;
  title: string;
  categories: CategoriesModel;
  blogPostType: {
    thumbnail: ImageModel;
    shortDescription: string;
  };
}

export interface BlogPostsSectionModel {
  heading: string;
  link: LinkModel;
  blogPosts: {
    nodes: BlogPostPartialModel[];
  };
}

export interface BlogPostModel {
  id: string;
  slug: string;
  title: string;
  blogPostType: {
    heading?: string;
    flexibleBlocks: FlexibleBlocksModel;
    seoSection: SeoSectionModel;
    featuredBlogPostsSection: BlogPostsSectionModel;
  };
}
