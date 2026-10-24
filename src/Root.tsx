import {Composition} from 'remotion';
import {Film} from './Film';
import {film} from './config';
export const RemotionRoot = () => <>
  <Composition id="ArtOfPizza" component={Film} width={1920} height={1080} fps={film.fps} durationInFrames={film.duration}/>
  <Composition id="ArtOfPizzaVertical" component={Film} width={1080} height={1920} fps={film.fps} durationInFrames={film.duration}/>
  <Composition id="ArtOfPizza4K" component={Film} width={3840} height={2160} fps={film.fps} durationInFrames={film.duration}/>
</>;
