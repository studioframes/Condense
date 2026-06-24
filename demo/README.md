# Condense Benchmark and Demonstration Suite

This directory contains the standardized benchmarking suite used to demonstrate and validate the optimization capabilities of the Condense engine. It includes sample files across all primary supported MIME types (Text, Code, Data, Vectors, Images, and Video Streams) to showcase performance metrics under both the `quality` and `extreme` compression pipelines.

## Directory Structure

```text
demo/
├── original/   # Unoptimized source files containing code bloat, metadata, and heavy formatting.
├── quality/    # Standard production-ready optimization preserving high visual/structural fidelity.
└── extreme/    # Aggressive optimization (extreme mode) targeting maximum byte reduction.

```

## Performance Metrics Comparison

The following table tracks the exact byte-level and kilobyte-level sizes across the unoptimized source assets, the standard `quality` pipeline, and the aggressive `extreme` pipeline.

| File Type | Original Size | Quality Size | Extreme Size | Max Reduction |
| --- | --- | --- | --- | --- |
| **JavaScript** (`app.js`) | 5.07 KB *(5,071 B)* | 1.75 KB *(1,794 B)* | 1.39 KB *(1,393 B)* | -72.5% |
| **JSON Data** (`data.json`) | 0.48 KB *(490 B)* | 0.36 KB *(364 B)* | 0.36 KB *(364 B)* | -25.7% |
| **HTML Page** (`index.html`) | 2.36 KB *(2,421 B)* | 1.60 KB *(1,637 B)* | 1.52 KB *(1,552 B)* | -35.9% |
| **CSS Styles** (`styles.css`) | 1.00 KB *(1,020 B)* | 0.68 KB *(698 B)* | 0.63 KB *(649 B)* | -36.4% |
| **SVG Graphic** (`demo.svg`) | 216.99 KB *(222,198 B)* | 119.52 KB *(122,388 B)* | 119.30 KB *(122,162 B)* | -45.0% |
| **PNG Image** (`demo.png`) | 116.00 KB | 34.00 KB *(WebP)* | 28.00 KB *(WebP)* | -75.8% |
| **MP4 Video** (`demo.mp4`) | 32.00 KB | 30.00 KB | 28.00 KB | -12.5% |

## Pipeline Optimization Analysis

### Quality vs. Extreme Modes

* **Text / Code Execution:** `quality` mode strips whitespace, multi-line comments, and redundant structural blocks to deliver highly readable, safe production deployments. `extreme` mode layer-applies Abstract Syntax Tree (AST) token mangling and aggressive scope tree-shaking, shrinking the script footprints down by up to 72.5%.
* **Structured Serialization:** For highly rigid text notation formats like JSON, structural tokens leave less variance between compression passes, leading to uniform reduction rates across both processing strategies.
* **Binary Media Allocation:** Transitioning raw assets through modern Next-Gen container translations (like WebP transcoding) saves over 70% of network data payloads on initial pass (`quality`), while `extreme` mode tightens variable bitrates further to reclaim remaining overhead.