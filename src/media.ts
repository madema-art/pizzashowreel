import type {SceneId} from './config';
// Paths are relative to public/. Cropping is preserved independently for each shot.
export type Shot = {kind:'image'|'video'; src:string; trimBefore?:number; playbackRate?:number; objectPosition?:string; credit:string};
export const media: Partial<Record<SceneId, Shot>> = {};
// Example: media.flour = {kind:'video',src:'media/flour.mp4',trimBefore:30,playbackRate:0.5,objectPosition:'50% 45%',credit:'Your name / owned footage'};
// trimBefore is in source frames. Supply slow-motion source footage for best results.
