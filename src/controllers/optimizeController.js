const { optimizeText } = require('../services/textService');
const { optimizeImage } = require('../services/imageService');
const { optimizeMediaStream, extractVideoThumbnail } = require('../services/mediaService');

const TEXT_MIMES = ['application/javascript', 'text/javascript', 'text/css', 'application/json', 'text/html', 'image/svg+xml'];
const IMAGE_MIMES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
const MEDIA_MIMES = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'video/mp4'];

async function optimizeFile(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded in the "file" field.' });
    }

    const method = req.body.method === 'extreme' ? 'extreme' : 'quality';
    const mimeType = req.file.mimetype;
    const fileBuffer = req.file.buffer;

    // Parse Resizing & Options (allow both query parameters and body)
    const width = req.query.width || req.body.width;
    const height = req.query.height || req.body.height;
    const fit = req.query.fit || req.body.fit;
    const faststart = req.query.faststart === 'true' || req.body.faststart === 'true';
    const thumbnail = req.query.thumbnail === 'true' || req.body.thumbnail === 'true';

    // Extract Video Thumbnail
    if (thumbnail && mimeType.startsWith('video/')) {
      const { buffer, outMime } = await extractVideoThumbnail(fileBuffer);
      res.setHeader('Content-Type', outMime);
      res.setHeader('Content-Length', buffer.length);
      return res.send(buffer);
    }

    // 1. TEXT / CODE
    if (TEXT_MIMES.includes(mimeType)) {
      const { buffer, outMime } = await optimizeText(fileBuffer, mimeType, method);
      res.setHeader('Content-Type', outMime);
      res.setHeader('Content-Length', buffer.length);
      return res.send(buffer);
    }

    // 2. IMAGES
    if (IMAGE_MIMES.includes(mimeType)) {
      const options = { width, height, fit };
      const { buffer, outMime } = await optimizeImage(fileBuffer, mimeType, method, options);
      res.setHeader('Content-Type', outMime);
      res.setHeader('Content-Length', buffer.length);
      return res.send(buffer);
    }

    // 3. AUDIO / VIDEO (Handles Stream Piping)
    if (MEDIA_MIMES.includes(mimeType)) {
      const { stream, outMime } = optimizeMediaStream(fileBuffer, mimeType, method, { faststart });
      res.setHeader('Content-Type', outMime);
      res.setHeader('Transfer-Encoding', 'chunked'); // Required for streaming processed video

      stream.on('error', (err) => {
        if (!res.headersSent) {
          next(err);
        } else {
          res.end(); // If it errors mid-stream, safely terminate the HTTP connection
        }
      });

      // Pipe output stream identically into response stream instantly
      return stream.pipe(res);
    }

    // 4. FALLBACK
    return res.status(400).json({
      error: 'Unsupported file type. Supported: JS, CSS, JSON, HTML, SVG, JPG, PNG, WebP, AVIF, GIF, MP3, WAV, MP4.',
    });

  } catch (error) {
    next(error);
  }
}

module.exports = { optimizeFile };