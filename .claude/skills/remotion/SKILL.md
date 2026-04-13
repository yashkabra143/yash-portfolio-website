# Remotion Skill

You are an expert in Remotion — React-based programmatic video generation. Use this skill whenever the user asks to create, edit, or animate a Remotion video or composition.

---

## Remotion Basics

Remotion renders React components to video frames. Every component receives a `frame` prop (current frame number) and a `durationInFrames` + `fps` context via hooks.

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

export const MyScene = () => {
  const frame = useCurrentFrame();           // 0-indexed frame number
  const { fps, durationInFrames, width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: "black", color: "white" }}>
      Frame {frame} of {durationInFrames}
    </AbsoluteFill>
  );
};
```

Register compositions in the Root:

```tsx
import { Composition } from "remotion";
import { MyScene } from "./MyScene";

export const RemotionRoot = () => (
  <Composition
    id="MyScene"
    component={MyScene}
    durationInFrames={150}
    fps={30}
    width={1920}
    height={1080}
  />
);
```

---

## Component Structure

### Recommended file layout

```
src/
  Root.tsx            # registers all Compositions
  scenes/
    Intro.tsx
    Main.tsx
    Outro.tsx
  components/
    Title.tsx
    AnimatedText.tsx
  helpers/
    interpolations.ts
```

### Composition types

| Type | Use case |
|---|---|
| `<Composition>` | Full video entry point |
| `<Sequence>` | Time-shift a child by N frames |
| `<Series>` | Auto-stack sequences back-to-back |
| `<Loop>` | Repeat a child composition |
| `<OffthreadVideo>` / `<Video>` | Embed video assets |
| `<Audio>` | Embed audio |
| `<Img>` | Embed images (preload-aware) |

---

## Animation Techniques

### `interpolate` — the core primitive

```tsx
import { interpolate, useCurrentFrame } from "remotion";

const frame = useCurrentFrame();

// Fade in over first 30 frames
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

// Slide up from 40px to 0px
const translateY = interpolate(frame, [0, 30], [40, 0], {
  extrapolateRight: "clamp",
});
```

Always use `extrapolateLeft/Right: "clamp"` unless you intentionally want values outside the range.

### `spring` — physics-based motion

```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({
  frame,
  fps,
  config: { damping: 12, stiffness: 200, mass: 1 },
  from: 0,
  to: 1,
});
```

Prefer `spring` over linear `interpolate` for entrance animations — it feels natural.

### Combining transforms

```tsx
style={{
  transform: `translateY(${translateY}px) scale(${scale})`,
  opacity,
}}
```

### Easing

```tsx
import { interpolate, Easing } from "remotion";

const x = interpolate(frame, [0, 60], [0, 500], {
  easing: Easing.bezier(0.16, 1, 0.3, 1), // ease-out expo
  extrapolateRight: "clamp",
});
```

Common easings: `Easing.ease`, `Easing.linear`, `Easing.in(Easing.quad)`, `Easing.out(Easing.cubic)`, `Easing.bezier(...)`.

---

## Timeline Control

### `<Sequence>` — offset child in time

```tsx
import { Sequence } from "remotion";

// Title appears at frame 0, subtitle appears at frame 30
<AbsoluteFill>
  <Sequence from={0} durationInFrames={90}>
    <Title />
  </Sequence>
  <Sequence from={30} durationInFrames={60}>
    <Subtitle />
  </Sequence>
</AbsoluteFill>
```

Inside a `<Sequence>`, `useCurrentFrame()` resets to 0 at the sequence's `from` frame.

### `<Series>` — auto sequential layout

```tsx
import { Series } from "remotion";

<Series>
  <Series.Sequence durationInFrames={60}><SceneA /></Series.Sequence>
  <Series.Sequence durationInFrames={90}><SceneB /></Series.Sequence>
  <Series.Sequence durationInFrames={45}><SceneC /></Series.Sequence>
</Series>
```

### Calculating timing helpers

```ts
// helpers/timing.ts
export const sec = (s: number, fps: number) => Math.round(s * fps);

// Usage
const TITLE_START = sec(0, fps);
const TITLE_DURATION = sec(2, fps);
```

Always derive frame counts from seconds × fps, never hardcode raw frame numbers.

### `delayRender` / `continueRender` — async data

```tsx
import { delayRender, continueRender, useEffect, useState } from "remotion";

const handle = delayRender();
const [data, setData] = useState(null);

useEffect(() => {
  fetch("/api/data")
    .then(r => r.json())
    .then(d => { setData(d); continueRender(handle); });
}, []);
```

---

## Transitions

### Manual cross-fade between two scenes

```tsx
const progress = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });

<AbsoluteFill>
  <AbsoluteFill style={{ opacity: 1 - progress }}><SceneA /></AbsoluteFill>
  <AbsoluteFill style={{ opacity: progress }}><SceneB /></AbsoluteFill>
</AbsoluteFill>
```

### `@remotion/transitions` (built-in)

```tsx
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={60}>
    <SceneA />
  </TransitionSeries.Sequence>
  <TransitionSeries.Transition
    presentation={fade()}
    timing={{ type: "linear", durationInFrames: 20 }}
  />
  <TransitionSeries.Sequence durationInFrames={90}>
    <SceneB />
  </TransitionSeries.Sequence>
</TransitionSeries>
```

Available presentations: `fade`, `slide`, `wipe`, `flip`, `clockWipe`, `none`.

---

## Text Animation Patterns

### Word-by-word reveal

```tsx
const words = "Hello Remotion World".split(" ");

{words.map((word, i) => {
  const delay = i * 8; // 8 frames between each word
  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <span key={i} style={{ opacity, marginRight: 8 }}>{word}</span>;
})}
```

### Character stagger

```tsx
const chars = "Hello".split("");

{chars.map((char, i) => {
  const s = spring({ frame: frame - i * 3, fps, config: { damping: 10 } });
  return (
    <span key={i} style={{ display: "inline-block", transform: `translateY(${(1 - s) * 20}px)`, opacity: s }}>
      {char}
    </span>
  );
})}
```

---

## Performance Tips

1. **Avoid layout thrash** — compute all animation values at the top of the component, not inside JSX.
2. **Memoize static assets** — wrap heavy child components in `React.memo`.
3. **Use `staticFile()`** for local assets so Remotion bundles them correctly.
4. **Preload assets** — use `prefetch` / `prefetchAudio` from `remotion` for media.
5. **Keep compositions modular** — split long videos into multiple `<Sequence>` scenes to avoid re-rendering the full tree.
6. **Limit canvas/WebGL** — use `offthreadVideo` for video overlays to avoid GPU stalls.
7. **Test with `npx remotion preview`** before rendering — the preview renders at native speed using your browser.
8. **Render with `--concurrency`** — `npx remotion render --concurrency=4` parallelises frame rendering.

---

## Video Storytelling Principles

| Principle | Implementation |
|---|---|
| **Hook early** | Animate the most important element in the first 10–15 frames |
| **Breathing room** | Add 10–20 frame pauses between key beats |
| **Consistent timing** | Use a shared `fps` constant and derive all timings from seconds |
| **Visual hierarchy** | Use `z-index`, scale, and opacity to direct attention |
| **Audio sync** | Align visual beats to audio transients using `useAudioData` + `visualizeAudio` |
| **Outro** | Fade out or hold last frame for 15–30 frames before cut |
| **Aspect ratios** | 1920×1080 (YouTube), 1080×1920 (Reels/TikTok), 1080×1080 (Square) |

---

## Useful Packages

| Package | Purpose |
|---|---|
| `@remotion/transitions` | Built-in slide/fade/wipe transitions |
| `@remotion/media-utils` | Audio visualisation, video metadata |
| `@remotion/motion-blur` | Motion blur post-effect |
| `@remotion/noise` | Perlin noise for organic movement |
| `@remotion/shapes` | SVG shape primitives |
| `@remotion/google-fonts` | Load Google Fonts at render time |

---

## Quick Reference

```ts
// Frame → seconds
const secs = frame / fps;

// Seconds → frames
const frames = Math.round(secs * fps);

// Is frame within a window?
const active = frame >= start && frame < start + duration;

// Normalised progress [0, 1] within a window
const t = interpolate(frame, [start, start + duration], [0, 1], { extrapolateRight: "clamp" });
```
