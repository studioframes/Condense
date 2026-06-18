# Condense Roadmap

This document outlines the planned evolution of Condense from current release through v1.0 and beyond.

## Current Release: v0.2.0

**Status:** Production-ready with core features complete
**Released:** June 2026

### Features
- In-memory Buffer & Stream processing (no temporary disk writes except when explicitly invoking `faststart`)
- Image (including AVIF & GIF), audio, video, and code/markup (including SVG) optimization
- Intelligent Dynamic Resizing via `width`, `height`, and `fit` API parameters
- Video Thumbnail Extraction and Standard MP4 Faststart utilities
- Express middleware and standalone CLI options
- Ignore directives to opt-out specific regions or files from minification
- System Health Diagnostics API (`/health`)

## v0.3.0 (Sep/Oct 2026)

### Performance & Optimization
- **Streaming Improvements**
  - Implement adaptive chunk sizing for large files
  - Add memory pool reuse for buffer allocation
  - Benchmark against competing libraries

- **Compression Tuning**
  - New method: `balanced` (between quality and extreme)
  - Per-format compression level configuration
  - Dynamic optimization based on file metadata

### Developer Experience
- **Documentation**
  - API reference documentation (JSDoc → HTML)
  - Performance benchmarks vs. alternatives
  - Real-world integration examples
  
- **Tooling**
  - GitHub Actions CI/CD workflow
  - Automated dependency updates
  - Performance regression testing

## v0.5.0 (Nov/Dec 2026)

### Extended Format Support
- **Additional Image Formats**
  - AVIF codec support
  - GIF frame optimization
  - SVG minification and validation

- **Media Enhancements**
  - Subtitle track extraction (SRT, VTT)
  - Thumbnail generation from video
  - Multi-bitrate DASH/HLS preparation

- **Code Processing**
  - JSON schema validation
  - GraphQL query minification
  - YAML/TOML formatting

### Advanced Features
- **Batch Processing**
  - Directory scanning and recursive optimization
  - Parallel processing with worker threads
  - Progress callbacks for UI integration

- **Caching Layer**
  - Optional in-memory LRU cache
  - Deterministic hash-based cache keys
  - Invalidation strategies

## v1.0.0 (Early 2027)

### Stability & Maturity
- **API Stability**
  - Semantic versioning guarantees
  - Deprecation warnings for future breaking changes
  - Long-term support policy documentation

- **Security & Compliance**
  - Formal security audit
  - SBOM (Software Bill of Materials) generation
  - Vulnerability disclosure policy
  - Code coverage benchmarks (>85%)

### Enterprise Features
- **Scaling Support**
  - AWS Lambda layer packaging
  - Docker image with ffmpeg included
  - Kubernetes deployment manifests
  - Cloud provider integration guides (Google Cloud, Azure)

- **Advanced Monitoring**
  - Health check endpoint standardization
  - Metrics export (Prometheus-compatible)
  - Structured logging with log levels
  - Request/response timing telemetry

### Production Hardening
- **Reliability**
  - Enhanced error messages with recovery suggestions
  - Timeout configuration per operation type
  - Graceful degradation strategies
  - Input validation best practices documentation

- **Performance Certifications**
  - Minimum throughput benchmarks published
  - Memory usage guarantees documented
  - Concurrent request scalability tested

## Beyond v1.0

### v2.0+ Considerations
- **WebAssembly Support**
  - WASM encoders for image optimization
  - WASM video codec support investigation

- **Stream Processing**
  - Chainable transform pipeline API
  - Custom plugin system for processors
  - Hot-reloading handler registration

- **Alternative Runtimes**
  - Deno compatibility assessment
  - Bun runtime support investigation
  - Edge runtime (Cloudflare Workers, Vercel Edge)

## Community & Contribution

### Opportunities for Contributors
- Format-specific optimization improvements
- Platform-specific binary distribution
- Documentation translations
- Example applications in different frameworks
- Performance optimization proposals

### Governance
- Maintain Apache 2.0 licensing
- Transparent decision-making via issues
- Regular community feedback sessions
- Release schedule published quarterly

See [SECURITY.md](./SECURITY.md) for detailed security update information.

## Feedback & Discussion

Have ideas for the roadmap? Open an issue on GitHub or review [CONTRIBUTING.md](./CONTRIBUTING.md) for details on proposing features.
