import {test} from 'node:test';
import assert from 'node:assert/strict';
import {film,scenes} from '../src/config';
import {media} from '../src/media';
import {existsSync} from 'node:fs';
test('timeline covers exactly 900 frames with beat-aligned contiguous cuts',()=>{
 let end=0;
 for(const scene of scenes){assert.equal(scene.from,end);assert.equal(scene.from%film.beat,0);assert.ok(scene.duration>film.transitionFrames);end+=scene.duration;}
 assert.equal(end,film.duration);assert.equal(film.duration/film.fps,30);assert.equal(60/film.bpm*film.fps,film.beat);
});
test('all configured replacement media are local, credited and present',()=>{
 for(const shot of Object.values(media)){
 assert.ok(shot.credit.trim());assert.ok(!shot.src.includes('..'));assert.ok(existsSync('public/'+shot.src));
 assert.ok((shot.playbackRate??1)>0);assert.ok((shot.trimBefore??0)>=0);
 }
});
