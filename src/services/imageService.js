const sharp = require('sharp');

async function optimizeImage(buffer, mimeType, method, options = {}) {
  try {
    const isGif = mimeType === 'image/gif';
    // Strip metadata natively on input buffer initialization
    let instance = sharp(buffer, { failOn: 'none', animated: isGif }).withMetadata(false);
    const isExtreme = method === 'extreme';
    let outMime = mimeType;

    // Intelligent Dynamic Resizing
    if (options.width || options.height) {
      const width = options.width ? parseInt(options.width, 10) : undefined;
      const height = options.height ? parseInt(options.height, 10) : undefined;
      if ((width && !isNaN(width)) || (height && !isNaN(height))) {
        instance = instance.resize({
          width,
          height,
          fit: options.fit || 'contain', // cover or contain are standard
        });
      }
    }

    if (isExtreme) {
      if (mimeType === 'image/png') {
        // Extreme PNG: Retain PNG format, reduce to 8-bit palette, extreme compression
        instance = instance.png({ palette: true, colors: 256, quality: 40, compressionLevel: 9 });
      } else if (mimeType === 'image/avif') {
        instance = instance.avif({ quality: 40, effort: 6 });
      } else {
        // Extreme ALL OTHERS: Force WebP, size & speed first, lower chroma subsampling
        instance = instance.webp({ quality: 40, smartSubsample: true, effort: 6 });
        outMime = 'image/webp';
      }
    } else {
      // Quality Method: Visually lossless, quality 80, optimize coding tables
      if (mimeType === 'image/jpeg') {
        instance = instance.jpeg({ quality: 80, optimizeCoding: true, mozjpeg: true });
      } else if (mimeType === 'image/png') {
        instance = instance.png({ quality: 80, palette: false });
      } else if (mimeType === 'image/avif') {
        instance = instance.avif({ quality: 80 });
      } else if (mimeType === 'image/webp') {
        instance = instance.webp({ quality: 80 });
      } else if (isGif) {
        // Optimize GIF frame via conversion to WebP animated
        instance = instance.webp({ quality: 80 });
        outMime = 'image/webp';
      } else {
        // Fallback to WebP for unmatched formats (like TIFF/BMP)
        instance = instance.webp({ quality: 80 });
        outMime = 'image/webp';
      }
    }

    const optimizedBuffer = await instance.toBuffer();
    return { buffer: optimizedBuffer, outMime };
  } catch (error) {
    throw new Error(`Image optimization failed: ${error.message}`);
  }
}

module.exports = { optimizeImage };