# NOOSCOPE — Transformer Observatory

A redesigned presentation layer for an interactive 3D visualization of a GPT-style
transformer running a real forward pass.

---

## Attribution

**This is a derivative work.** It is based on
[`bbycroft/llm-viz`](https://github.com/bbycroft/llm-viz) by
**Brendan Bycroft**, used under the MIT License (see [`LICENSE`](LICENSE),
copyright notice preserved in full).

The upstream project is the origin of the inference engine, the WebGL2 renderer,
the WASM model runtime, and the original walkthrough content. What this repository
adds is a complete rebuild of the presentation layer and a re-tune of the render
palette — described in detail below.

If you are looking for the original, unmodified project, go to
[`bbycroft/llm-viz`](https://github.com/bbycroft/llm-viz).

---

## What was rebuilt here

The upstream version is a light, tool-like interface. This work re-approaches it as
a **dark-field scientific instrument** — the kind of display you'd expect in an
observatory, not a dashboard.

### Visual system

- **Design token layer.** Replaced ad-hoc colors with a named token set
  (`--ink-950` … `--amber` / `--amber-bright` / `--cyan` / `--text` /
  `--text-muted` / `--text-dim`), mirrored into both CSS custom properties and an
  SCSS variable map so untouched upstream modules still compile against legacy
  alias names (`$color-highlight` → amber, etc.).
- **Typography.** Fraunces (display serif) for headings, Inter for body,
  IBM Plex Mono for all labels, coordinates and numeric readouts — loaded with
  `display=swap`.
- **Chrome.** Wordmark header with an amber breathing sigil and a hairline
  gradient rule; floating dock toolbar with mono uppercase subject tabs and an
  amber active pill; "Observation Log" sidebar; single-pixel-hairline phase
  timeline with an amber playhead and glow.

### Renderer re-tune (WebGL2)

The engine is untouched; the palette and lighting model were rebuilt.

- **Three-point light rig.** Upstream used a single red-tinted light. This uses a
  cold-white key `(1.15, 1.10, 1.02)`, an amber fill `(0.95, 0.62, 0.26)` and a
  cyan rim `(0.30, 0.72, 0.80)` — giving the tensor blocks separation from the
  background and a readable material response.
- **Block palette.** Weights are cool slate-cyan `(0.42, 0.60, 0.68)`,
  intermediates amber `(0.91, 0.64, 0.24)`, aggregates warm bone `(0.85, 0.80, 0.72)`.
  Ambient shading lifted from `base * 0.7` to `base * 0.92` so blocks read on a
  dark field instead of crushing to black.
- **Grid-line hierarchy.** Recolored the three LOD levels — edge `(0.96, 0.94, 0.90)`,
  16-cell `(0.95, 0.74, 0.42) × 0.85`, 256-cell `(0.55, 0.88, 0.95)` — with a warm
  coarse-grid accent `(1.0, 0.72, 0.34)`.
- **Architecture diagram.** Every hardcoded fill/stroke in the ToC diagram moved
  onto the token palette, plus a dark `.menuEntry` with an amber left-border
  active state.

### Verification

- `npx tsc --noEmit` — clean.
- Pixel smoke test (`smoke.mjs`) samples the canvas region, computes the modal
  background luminance, and asserts: off-background pixel ratio > 3%, distinct
  colors > 120, luminance spread (p95 − p05) > 40. This exists because a dark
  theme makes "is it actually rendering?" genuinely ambiguous by eye.

---

## Running it

```bash
npm install --legacy-peer-deps   # peer dep conflict in upstream lockfile
npm run dev                      # http://localhost:3002
```

Open `/` for the index page, `/llm` for the visualization itself.

Requires a WebGL2-capable browser. First load pulls the WASM model, so give it a
few seconds before the scene appears.

### Smoke test

```bash
# with the dev server running and /llm open in a browser
node smoke.mjs path/to/screenshot.png
```

Exit code 0 means the canvas is genuinely rendering geometry.

---

## Upstream structure (retained)

| Path | Purpose |
|---|---|
| `src/llm/` | the visualization — renderer, walkthrough, sidebar (redesigned) |
| `src/llm/render/` | WebGL2 renderer, shaders, block/model render passes (palette retuned) |
| `src/utils/` | shared GL helpers, math, resizing |
| `src/homepage/` | index page (rewritten) |
| `minGPT/` | git submodule — [karpathy/minGPT](https://github.com/karpathy/minGPT) |

Upstream also shipped several unrelated sub-apps in this repo (`src/cpu`,
`src/fluid-sim`, `src/codec`). They are untouched and out of scope for this work.

---

## License

MIT — see [`LICENSE`](LICENSE). Original copyright © 2023–2026 Brendan Bycroft.
