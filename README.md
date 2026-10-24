# PIZZA SHOWREEL
## THE ART OF PIZZA
A 30-second, music-led procedural film built with Remotion, React and TypeScript.
Original illustrated food imagery: **this demonstration is not real food footage**.

**[Watch the screening room](https://madema-art.github.io/pizzashowreel/)** · **[Render / download](https://github.com/madema-art/pizzashowreel/actions/workflows/production.yml)**

### Watch and download — entirely in your browser
1. Open Actions → **Produce PIZZA SHOWREEL** → the latest successful run.
2. Under Artifacts, download **pizza-showreel-ArtOfPizza**. Unzip it in your browser/OS to retrieve `out/the-art-of-pizza.mp4`, render metadata and review images. Artifacts are retained for 30 days; rerun whenever needed.
3. The screening room, when Pages is enabled, streams an interactive Remotion Player and offers a direct MP4 download. It uses no local server. The finished MP4 is also hosted there.
4. For another export, choose **Run workflow**, branch main, and ArtOfPizza (1080p), ArtOfPizzaVertical (1080×1920), or ArtOfPizza4K (3840×2160). All are 30 FPS / 900 frames / H.264 + AAC.
5. If Pages deployment is red but the film job passed, the MP4 artifact is still available. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**, then rerun the workflow. Pages initial enablement can require a repository administrator; the workflow attempts it.

### Direct the next cut with Codex
Connect this repository in **Codex Cloud**, create/select its cloud environment, and use `bash .codex/setup.sh` as its setup command. Allow npm and GitHub network access during setup. This script installs project dependencies and official Remotion skills in that cloud environment.
The current chat cannot create the separate Codex Cloud environment for you. All installation, tests and renders in this repository run on GitHub's Ubuntu cloud runners. Nothing needs installing on Windows.

Example instructions:
> Open madema-art/pizzashowreel. Make the oven shot moodier, move the reveal two beats earlier, and use my uploaded stretching clip. Preserve the 30-second duration. Open a PR and link the verified render.

Codex should read AGENTS.md, load the installed official Remotion skill, edit components, and let Actions validate/render the PR. Review the artifact; merge to publish the new main screening room. The Player is a preview, not a hosted editable Studio. For full Studio, a cloud developer session can run `npm run studio -- --host=0.0.0.0` with the port forwarded by that cloud platform; no Windows server is needed. No cloud Studio session is provisioned by this project.

### Supply your own media
Use GitHub's **Add file → Upload files** to place owned photos/clips under `public/media/`, or attach them to your next Codex Cloud request. For files over GitHub's browser upload limit, give Codex a downloadable source link and have it add suitably compressed production copies.
State which shot each asset replaces, preferred crop, source frame rate, whether source audio should be used, and your rights/credit. Do not upload confidential assets to this **public** repository.
See [media instructions](docs/MEDIA.md). Change only `src/media.ts` to substitute a shot; timing and typography remain intact. Original source audio is muted by default.

### Production design
| Time | Shot |
|---|---|
| 0–4s | Opening title / flour constellation |
| 4–8s | Flour and dough |
| 8–12s | Stretch |
| 12–15s | Sauce spiral |
| 15–19s | Cheese and basil |
| 19–22s | Oven push |
| 22–27s | Finished pizza / slow orbit |
| 27–30s | Closing signature |

The original 120 BPM soundtrack has 15-frame beats. Scene cuts land on beats. Ten-frame dissolves through the charcoal background keep transitions restrained; easing, animated scaling, ingredient motion and steam provide depth. The procedural dough deformation and oven push demonstrate speed changes; real high-frame-rate footage can later provide photographic slow motion.

### Architecture
- `src/config.ts`: timing, palette, typography, audio level, transition duration.
- `src/Film.tsx`: timeline, global fade, audio, atmosphere.
- `src/scenes/Scene.tsx`: shot direction and media routing.
- `src/components/`: deterministic pizza illustration and particles.
- `src/media.ts`: swappable, credited shot assets.
- `src/Root.tsx`: 1080p, vertical and 4K compositions; portrait layout rearranges text and subject.
- `src/preview.tsx`: static screening room using the same Film component.
- `scripts/audio.mjs`: deterministic stereo PCM synthesis with no samples.
- `.github/workflows/production.yml`: dependency installation, validation, browser screenshots, rendering, ffprobe verification, artifacts, Pages.
- `.codex/setup.sh`: cloud editor setup and official skills installation.

Dependencies use exact versions. The first cloud run creates and commits package-lock.json; subsequent runs use npm ci. Node is pinned to 22.15.0. Official agent skill updates are fetched by the installer; they do not affect rendering dependencies. Remotion is pinned to 4.0.366, with stable APIs. Upgrade all Remotion packages together after reviewing current official guidance.

### Licenses and costs
All demo visuals and audio are generated by this project's code; no stock footage, font downloads, samples or commercial recordings are used. See [asset rights](docs/MEDIA-LICENSES.md).
Remotion has its own [license](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md), separate from this project's code. Individuals, eligible small organizations and evaluation use may qualify for free use; other organizations require a Company License. Check the current terms before commercial deployment. This repository neither grants nor bypasses that license.
No paid rendering vendor or AI API is required. GitHub-hosted runner, storage, Pages and Codex availability remain subject to your account's quotas and terms. This project is a directed editing environment; it does not include an autonomous generative-video API or paid AI service.

### Validation
Actions produces review PNGs for all eight shots plus a portrait shot, catches browser errors, checks timeline coverage/media presence, compiles TypeScript, builds the static app and verifies the actual MP4 has H.264 video, AAC audio, 900 frames, 30 FPS and 30 seconds. Inspect those PNGs and play the MP4 before judging photographic realism or final creative quality.
