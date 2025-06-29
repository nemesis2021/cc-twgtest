// this file is conditionally added/removed to next-env.d.ts
// if the static image import handling is enabled

declare module '*.png' {
  const content: import('../dist/client/image').StaticImageData;

  export default content;
}

declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module '*.jpg' {
  const content: import('../dist/client/image').StaticImageData;

  export default content;
}

declare module '*.jpeg' {
  const content: import('../dist/client/image').StaticImageData;

  export default content;
}

declare module '*.gif' {
  const content: import('../dist/client/image').StaticImageData;

  export default content;
}

declare module '*.webp' {
  const content: import('../dist/client/image').StaticImageData;

  export default content;
}

declare module '*.avif' {
  const content: import('../dist/client/image').StaticImageData;

  export default content;
}

declare module '*.ico' {
  const content: import('../dist/client/image').StaticImageData;

  export default content;
}

declare module '*.bmp' {
  const content: import('../dist/client/image').StaticImageData;

  export default content;
}

declare module '@react-three/drei' {
  export {
    View,
    PerspectiveCamera,
    Preload,
    Environment,
    Float,
    useGLTF,
    Center,
    OrthographicCamera,
  } from '@react-three/drei';

  interface ViewProps {
    track?: string;
  }
}
