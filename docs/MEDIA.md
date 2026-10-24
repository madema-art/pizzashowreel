# Replacing illustrated shots
Upload files under public/media using GitHub's browser UI. In src/media.ts assign an entry by scene ID:
```ts
export const media: Partial<Record<SceneId, Shot>> = {
  stretch: {
    kind: 'video',
    src: 'media/stretch.mp4',
    trimBefore: 60,
    playbackRate: 0.5,
    objectPosition: '50% 40%',
    credit: 'Owner name — original commissioned footage'
  },
  reveal: {
    kind: 'image', src: 'media/finished.jpg',
    objectPosition: '55% 50%', credit: 'Owner name — owned photograph'
  }
};
```
Scene IDs: opening, flour, stretch, sauce, toppings, oven, reveal, closing.
trimBefore is source frames; playbackRate is a constant source speed. Animated camera/easing remains applied to replacement media. For complex speed ramps, ask Codex to prepare a conformed clip in the cloud first. Choose footage long enough for shot duration × playbackRate after trimming. Confirm source frame rate before calculating trims.
Use H.264 MP4 for clips, JPG/PNG for photos. Prefer 4K originals, 60/120 FPS for slow motion, clean highlights, and extra room around the food for portrait crops. Upload production copies rather than camera RAW files. Own or license all assets, including any audible music.
The demonstration labels describe the film as procedural. Once real media is substituted, ask Codex to update on-screen disclosure and the preview description to describe the mix accurately. Record filenames, author, license, original URL and any required attribution in MEDIA-LICENSES.md.
