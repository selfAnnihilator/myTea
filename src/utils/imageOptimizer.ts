// utils/imageOptimizer.ts
/**
 * Optimizes image URLs for better performance
 * 
 * This utility provides several strategies for image optimization:
 * 1. Using a CDN service like Cloudinary or Imgix (recommended for production)
 * 2. Simple resizing by modifying URL parameters
 * 3. Using Vercel's built-in image optimization (if deployed on Vercel)
 */

// Configuration
const USE_CLOUDINARY = false; // Set to true if using Cloudinary
const USE_IMGIX = false; // Set to true if using Imgix
const CLOUDINARY_CLOUD_NAME = 'your-cloud-name'; // Replace with your Cloudinary cloud name
const IMGIX_DOMAIN = 'your-domain.imgix.net'; // Replace with your Imgix domain

/**
 * Optimizes an image URL based on the selected strategy
 * @param url - The original image URL
 * @param width - Desired width in pixels
 * @param height - Desired height in pixels
 * @param quality - Image quality (1-100)
 * @returns Optimized image URL
 */
export function optimizeImageUrl(
  url: string, 
  width: number = 600, 
  height: number = 400, 
  quality: number = 75
): string {
  // Validate input
  if (!url || typeof url !== 'string') {
    return url;
  }
  
  // If using Cloudinary
  if (USE_CLOUDINARY && CLOUDINARY_CLOUD_NAME) {
    return optimizeWithCloudinary(url, width, height, quality);
  }
  
  // If using Imgix
  if (USE_IMGIX && IMGIX_DOMAIN) {
    return optimizeWithImgix(url, width, height, quality);
  }
  
  // If deployed on Vercel, we can use Vercel's image optimization
  // This would require using the 'next/image' equivalent or Vercel's image component
  // For now, we'll do simple URL parameter optimization
  
  // Simple optimization by adding common image parameters
  return simpleUrlOptimization(url, width, height, quality);
}

/**
 * Optimizes image using Cloudinary
 */
function optimizeWithCloudinary(
  url: string, 
  width: number, 
  height: number, 
  quality: number
): string {
  try {
    // Extract the public ID from the URL
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const publicId = pathname.substring(pathname.lastIndexOf('/') + 1);
    
    // Build Cloudinary URL
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/w_${width},h_${height},q_${quality},c_fill/${encodeURIComponent(url)}`;
  } catch (error) {
    console.warn('Failed to optimize image with Cloudinary, falling back to original URL', error);
    return url;
  }
}

/**
 * Optimizes image using Imgix
 */
function optimizeWithImgix(
  url: string, 
  width: number, 
  height: number, 
  quality: number
): string {
  try {
    // Build Imgix URL
    const urlObj = new URL(url);
    const imgixUrl = new URL(`https://${IMGIX_DOMAIN}${urlObj.pathname}`);
    
    // Add parameters
    imgixUrl.searchParams.set('w', width.toString());
    imgixUrl.searchParams.set('h', height.toString());
    imgixUrl.searchParams.set('q', quality.toString());
    imgixUrl.searchParams.set('fit', 'crop');
    imgixUrl.searchParams.set('auto', 'format');
    
    return imgixUrl.toString();
  } catch (error) {
    console.warn('Failed to optimize image with Imgix, falling back to original URL', error);
    return url;
  }
}

/**
 * Simple URL parameter optimization
 * Works with many image services that support URL parameters
 */
function simpleUrlOptimization(
  url: string, 
  width: number, 
  height: number, 
  quality: number
): string {
  try {
    const urlObj = new URL(url);
    
    // Common parameters for image optimization
    // Note: These may not work with all image services, but many support them
    urlObj.searchParams.set('w', width.toString());
    urlObj.searchParams.set('h', height.toString());
    urlObj.searchParams.set('q', quality.toString());
    
    return urlObj.toString();
  } catch (error) {
    // If URL parsing fails, return original URL
    console.warn('Failed to optimize image URL, returning original', error);
    return url;
  }
}

/**
 * Preloads an image to improve perceived performance
 * @param url - Image URL to preload
 * @returns Promise that resolves when image is loaded
 */
export function preloadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Returns a placeholder image URL while the real image loads
 * @param width - Width of placeholder
 * @param height - Height of placeholder
 * @returns Placeholder image URL
 */
export function getPlaceholderImage(width: number = 600, height: number = 400): string {
  // Using a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" font-family="Arial" font-size="20" fill="#999" text-anchor="middle" dominant-baseline="middle">
        Loading...
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export default {
  optimizeImageUrl,
  preloadImage,
  getPlaceholderImage
};