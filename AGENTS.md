# PIZZA SHOWREEL production guidance
Work in Codex Cloud or GitHub Actions. Do not install or run software on the owner's Windows PC.
Read the official remotion-best-practices skill installed by .codex/setup.sh; follow its relevant references.
All animation must be deterministic and driven by useCurrentFrame. Do not use CSS animation, Math.random, or network-dependent fonts.
Keep the narrative continuous: flour, dough, stretch, sauce, toppings, fire, reveal, close.
Use src/config.ts for timing and typography; src/media.ts for replacement media.
Keep shots on musical beats. Maintain the exact 900-frame total unless directed otherwise.
Run npm run typecheck, npm test, npm run build, and the browser review. Render and verify the MP4.
Review frame PNGs in out/review and revise visual defects before delivering.
Preserve original source footage; record rights in docs/MEDIA-LICENSES.md.
Open a PR for future changes. Link the successful Actions run and downloadable artifact in the handoff.
Do not claim Codex Cloud is configured until its environment actually exists. GitHub Actions is the working cloud render backend.
