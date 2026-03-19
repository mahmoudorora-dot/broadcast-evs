/**
 * Resolves public asset paths for media files (images, videos) located in the public/ folder.
 * These files are copied directly to the build output and served from the site root.
 *
 * @param path - The path relative to the public folder (e.g., "videos/showreel-6.mp4")
 * @returns The absolute path from the site root (e.g., "/videos/showreel-6.mp4")
 */
export const withBase = (path: string): string => {
  // Clean the path to ensure no leading slashes
  const cleanPath = path.replace(/^\/+/, "");
  return `/${cleanPath}`;
};

/**
 * For imported assets from src/assets - use Vite's asset URL handling.
 * Import the asset and pass it through this function.
 */
export const getAssetUrl = (assetPath: string): string => {
  return assetPath;
};
