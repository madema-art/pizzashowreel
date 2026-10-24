import {useCurrentFrame} from 'remotion';
import {rand} from './Pizza';
export const Atmosphere=({width,height,hot=false}:{width:number;height:number;hot?:boolean})=>{
 const frame=useCurrentFrame();
 return <svg width="100%" height="100%" viewBox={'0 0 '+width+' '+height} style={{position:'absolute',inset:0,pointerEvents:'none'}}>
 <defs><radialGradient id="light"><stop stopColor={hot?'#ad421b':'#65513a'} stopOpacity=".42"/><stop offset="1" stopColor="#100e0c" stopOpacity="0"/></radialGradient><radialGradient id="vignette"><stop offset=".3" stopColor="#000" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".7"/></radialGradient></defs>
 <ellipse cx={width*.65} cy={height*.38} rx={width*.7} ry={height*.85} fill="url(#light)"/>
 {Array.from({length:65},(_,i)=><circle key={i} cx={(rand(i+100)*width+Math.sin(frame/100+i)*25)} cy={(rand(i+200)*height-frame*(hot?1.7:.22)+height*2)%height} r={rand(i+300)*(hot?2.8:1.8)+.5} fill={hot?'#f29c50':'#efdcb9'} opacity={rand(i+400)*.3}/>)}
 <rect width={width} height={height} fill="url(#vignette)"/>
 </svg>;
};
