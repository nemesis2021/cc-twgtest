export interface ImageModel {
  node: { altText: string; sourceUrl: string };
}

export interface ImageModelWithoutNode {
  altText: string;
  sourceUrl: string;
}

export interface GalleryModel {
  nodes: ImageModelWithoutNode[];
}

export interface ImageWithMediaDetailsModel {
  node: {
    altText: string;
    sourceUrl: string;
    mediaDetails?: {
      height?: number;
      width?: number;
    };
  };
}
