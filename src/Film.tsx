import {AbsoluteFill,Audio,Sequence,staticFile,useCurrentFrame,useVideoConfig,interpolate} from 'remotion';
import {asset} from './assets';
import {film,scenes} from './config';
import {Scene} from './scenes/Scene';
import {Atmosphere} from './components/Atmosphere';
export const Film=()=>{
 const {width,height}=useVideoConfig(); const frame=useCurrentFrame();
 const fade=interpolate(frame,[0,18,875,899],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 return <AbsoluteFill style={{background:'#100e0c'}}>
 <Audio src={asset('audio/ritual.wav')} volume={f=>film.audioVolume*interpolate(f,[0,20,850,899],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}/>
 <AbsoluteFill style={{opacity:fade}}>
 <Atmosphere width={width} height={height} hot={frame>=570&&frame<690}/>
 {scenes.map(s=><Sequence key={s.id} name={s.id} from={s.from} durationInFrames={s.duration}><Scene id={s.id} width={width} height={height} duration={s.duration}/></Sequence>)}
 <AbsoluteFill style={{pointerEvents:'none',background:'linear-gradient(0deg,rgba(0,0,0,.25),transparent 24%,transparent 75%,rgba(0,0,0,.22))'}}/>
 </AbsoluteFill>
 </AbsoluteFill>;
};
