import { CMS_URL } from './globals';

const getPathFromCmsUrl = (url: string) => {
  if (!url) return '';

  let newUrl = url;
  if (newUrl.includes(CMS_URL)) {
    newUrl = newUrl.replace(CMS_URL, '');
  }

  return newUrl;
};

export default getPathFromCmsUrl;
