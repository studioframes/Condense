# Condense v0.1.0

## Release Summary

We are pleased to announce the official initial release of `@studioframes/condense` (v0.1.0). This release introduces a high-performance, completely stateless file optimization and minification engine for Node.js. Designed for high-throughput and cloud-native architectures, Condense handles images, video, audio, and code assets entirely in-memory using native Buffers and Streams, completely eliminating local server disk dependency.

## Key Features and Capabilities

### 1. Zero Disk I/O Operations

* Implements a fully streaming and buffer-based processing architecture.
* Bypasses the local filesystem entirely to mitigate performance bottlenecks, asset leakage risks, and storage limits on ephemeral cloud environments (e.g., AWS Lambda, Google Cloud Functions).

### 2. Multi-Format Processing Pipeline

* **Markup & Scripting:** Efficient minification engines for HTML, CSS, JavaScript, and JSON.
* **Digital Imaging:** Lossless and lossy encoding pipelines for JPEG, PNG, and WebP, powered internally by Sharp.
* **Audio & Video:** Streaming optimization for MP4, MP3, and WAV assets utilizing embedded, platform-agnostic `ffmpeg-static` binaries.

### 3. Flexible Integration Architectures

* **Standalone CLI Microservice:** Can be initialized instantaneously as an independent service via `npx`.
* **Express Router Component:** Connects cleanly into existing Express frameworks as an isolated middleware routing hierarchy.
* **Programmatic SDK:** Exposes decoupled, low-level operational functions (`optimizeImage`, `optimizeText`, `optimizeMediaStream`) for micro-managed buffer workflows within specialized codebases.

### 4. Code-Level Processing Directives (Opt-Outs)

* Incorporates custom local attributes (`data-condense-ignore`) inside HTML elements to exclude targeted zones or entire files from the parsing lifecycle.
* Supports inline macro comments (`/* condense-ignore */`) to block the asset minification pass inside raw JavaScript and CSS modules.

## Supply Chain Security Posture

This package has been hardened from its initial release against software supply chain vectors:

* **Trusted Publishing (OIDC):** Package publication is completely tokenless. Handshakes are executed cryptographically using OpenID Connect authentication directly between GitHub Actions and the npm registry.
* **Build Provenance:** All builds generate a verifiable public provenance attestation, establishing an unalterable chain of custody mapping back to the open-source repository commit history.
* **Tag Protection Constraints:** Strict organizational rulesets are enforced on release tags (`v*`) to block arbitrary tag creation, history overrides, or force-deletion.
* **Runtime Sandboxing:** Media process tasks run inside isolated execution forks handled with exact runtime boundaries to mitigate algorithmic Denial of Service (DoS) exploits on malformed media structures.

## Installation and Quick Start

Install the production-ready build directly from the npm registry:

```bash
npm install @studioframes/condense
```

To run the standalone optimization server instance immediately:

```bash
npx @studioframes/condense
```
