/**
 * Resolves public asset paths for media files (images, videos) located in the public/ folder.
 * These files are copied directly to the build output and served from the site root.
 * 
 * Adds a timestamp query parameter to bust browser cache during development.
 *
 * @param path - The path relative to the public folder (e.g., "videos/showreel-6.mp4")
 * @returns The absolute path from the site root with cache-bust param (e.g., "/videos/showreel-6.mp4?t=1234567890")
 */
export const withBase = (path: string): string => {
  // Clean the path to ensure no leading slashes
  const cleanPath = path.replace(/^\/+/, "");
  
  // Add cache-busting timestamp in development mode
  if (import.meta.env.DEV) {
    const timestamp = Date.now();
    const result = `/${cleanPath}?t=${timestamp}`;
    console.log(`[withBase] Resolved: "${path}" → "${result}"`);
    return result;
  }
  
  return `/${cleanPath}`;
};

/**
 * For imported assets from src/assets - use Vite's asset URL handling.
 * Import the asset and pass it through this function.
 */
export const getAssetUrl = (assetPath: string): string => {
  return assetPath;
};
