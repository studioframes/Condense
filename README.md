![logo](https://github.com/user-attachments/assets/a0d89a33-d9f0-42c1-8bca-a6d7cf81551c)

[![npm](https://img.shields.io/npm/v/@studioframes/condense?logo=npm&colorA=006AFF&colorB=000000)](https://www.npmjs.com/package/@studioframes/condense)
[![downloads](https://img.shields.io/npm/dt/@studioframes/condense?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAqklEQVR4AeSTUQ6AIAxD1XtwVz0rB9E1UUJiB4Xoh2KyuEDXpw0s08vPIIAY485KSXeQiJQoPM1PI7ITs1qlk+P9fq6xfmU6GlEIAeKNDThr2zlz26YAqM4BBeKaw8cFYFOAFM3hUQRAUIBUzTFfBUBEIJI5ZiUAhBlENsecDIAYEBR6tZoAqmmuowC7NOmStfS58dVTwLX5xJsCLOe5p9gHUQAT9q59H3AAAAD//0447coAAAAGSURBVAMAqW98MRfehzwAAAAASUVORK5CYII=&labelColor=006AFF&color=000000)](https://www.npmjs.com/package/@studioframes/condense)
[![size](https://img.shields.io/bundlephobia/minzip/@studioframes/condense?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABlUlEQVR4AcRUu0rFQBA14X6DEPK4pFFEBLUQsdJGLOzVQizs/CEbG7Hw/oBYaiMW4qMS4YKRPP4iJJ4RZ9mMGzf3Xh9hD5uZObNnZtjEnfrl5/8FiqJYzrLsDagFXpMkWbQNoLUDHLYO1FVV3eOQPiBX3Ov1HomDItZkkG2jQJ7n5yBcAZ0WiriB0ImJ/EUAxMu6rndNZIvvME3TgeQ0BDDTVRC2gLGW4zg7GNesntwQwExv9aB8D8PQIUi/bmNcL7qtBNDeph6Y5B1jXuB8JYD2ztjZtiPx46q2xTX/Kb8rATimgZ9aS3yQLsC+1p3mT2glGAIjCRjyra4/FRhay+lOeGaq6gC36ICdk+6u6+7zGUogCIJvPzJO6LL7vv/APCVADnShrhfZEl2+g7Is5/S8hgC6eELwAhhrocBBHMfmXwWfiHu+TUS2u+7IOUaBe5Lf6ICDn8QNtm07fu8ryDky8YwCREQn14BDyaguJZ/AEH/feeJEUXQnYspsFWAGJaO6Ph0kMON5nrrvzJe7VUAmjGq/AwAA//8pb4RQAAAABklEQVQDANrLhTF1WycGAAAAAElFTkSuQmCC&label=size&colorA=006AFF&colorB=000000)](https://bundlephobia.com/package/@studioframes/condense)

A high-performance, completely stateless file optimization and minification engine for Node.js. Condense handles images, video, audio, and code natively in-memory (RAM) using Buffers and Streams, completely bypassing the local server disk.

It can be run as a standalone API server via CLI, mounted inside an existing Express application as a router, or used directly in your codebase via programmatic utility functions.

## Features
- **Zero Disk I/O:** Fully streaming and buffer-based architecture to minimize memory overhead.
- **Granular Bypass Rules:** Add `data-condense-ignore` to any HTML tag (or `/* condense-ignore */` in JS/CSS) to prevent minification on a per-element or per-file basis.
- **Multi-Format Pipeline:** 
  - Code & Markup: JS, CSS, JSON, HTML
  - Media: MP4, MP3, WAV
  - Images: JPG, PNG, WebP

## Prerequisites
Media optimization now bundles FFmpeg directly inside the package using `ffmpeg-static`, so you do not need to install `ffmpeg` globally for media workflows.

If you are running on an unusual platform not supported by `ffmpeg-static`, you may still need a system FFmpeg installed.

## Installation

```bash
npm install @studioframes/condense
```


## Usage

### Option A: Standalone CLI Server
Run a dedicated Condense microservice directly from your terminal:

```bash
npx @studioframes/condense
```
*Defaults to port `3000`. You can configure the port using the `PORT` environment variable:*
```bash
PORT=8080 npx @studioframes/condense
```

### Option B: Express Middleware / Sub-App
Mount Condense directly onto an existing Express application router:

```javascript
const express = require('express');
const { condenseApp } = require('@studioframes/condense');

const app = express();

// Mount all optimization routes under a specific path
app.use('/v1', condenseApp);

app.listen(8080, () => {
    console.log('App running. POST files to http://localhost:8080/v1/optimize');
});
```

### Option C: Programmatic Helper SDK
Import the low-level processing functions to optimize Buffers directly inside your codebase without HTTP routing:

```javascript
const { optimizeImage, optimizeText, optimizeMediaStream } = require('@studioframes/condense');

// 1. Optimize an Image Buffer (returns Buffer)
const { buffer: imgBuffer, outMime: imgMime } = await optimizeImage(rawImageBuffer, 'image/png', 'extreme');

// 2. Optimize an HTML / CSS / JS Buffer (returns Buffer)
const { buffer: textBuffer, outMime: textMime } = await optimizeText(rawHtmlBuffer, 'text/html', 'quality');

// 3. Optimize Audio / Video (returns PassThrough Stream)
const { stream, outMime: mediaMime } = optimizeMediaStream(rawVideoBuffer, 'video/mp4', 'quality');
```



## Granular Ignorance (Opt-Outs)

Condense supports local directives so that specific code segments are not modified during minification.

### In HTML Documents
Add the `data-condense-ignore` attribute to any tag (or the root `<html>` tag to ignore the whole file). Condense protects that tag and all its nested children:

```html
<!-- This div, the image, and the text will be returned exactly as-is -->
<div data-condense-ignore class="uncompressed-layout">
    <p>   Some formatted    text here.   </p>
    <img src="large-photo.jpg">
</div>

<!-- This will be compressed normally -->
<p>This paragraph gets minified.</p>
```

### In CSS & JavaScript
Add the `/* condense-ignore */` comment anywhere inside your JS or CSS file to bypass minification entirely:

```javascript
/* condense-ignore */
function legacyCode() {
    // This file will not be altered
    var x =   10; 
}
```

## API Endpoint Reference (For Options A & B)

### `POST /optimize`
Optimizes an uploaded file in-memory.

**Payload (Multipart Form-Data):**
- `file`: The binary file (Max 50MB)
- `method`: `quality` (visually lossless, default) or `extreme` (aggressive size reduction)

**Example Request:**
```bash
curl -X POST http://localhost:3000/v1/optimize \
  -F "file=@./photo.png" \
  -F "method=extreme" \
  --output photo-condensed.webp
```
