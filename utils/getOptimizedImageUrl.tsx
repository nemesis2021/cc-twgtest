function getOptimizedImageUrl(url: string, width = 1920, quality = 75) {
  return `/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=${quality}`;
}

export default getOptimizedImageUrl;
