import React from 'react';
import {AbsoluteFill,Img,OffthreadVideo,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';
import {asset} from '../assets';
import {film,scenes,type SceneId} from '../config';
import {media} from '../media';
import {Pizza,rand} from '../components/Pizza';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
export const Scene=({id,width,height,duration}:{id:SceneId;width:number;height:number;duration:number})=>{
 const frame=useCurrentFrame(); const portrait=height>width;
 const unit=width/(portrait?1080:1920); const w=width/unit,h=height/unit;
 const p=interpolate(frame,[0,duration-1],[0,1],clamp);
 const enter=interpolate(frame,[0,24],[0,1],{...clamp,easing:Easing.bezier(.16,1,.3,1)});
 const exit=interpolate(frame,[duration-film.transitionFrames,duration-1],[1,0],clamp);
 const shot=media[id]; const centerX=portrait?w*.5:w*.64, centerY=portrait?h*.55:h*.52;
 const stage=id==='sauce'?2:['toppings','oven','reveal','closing'].includes(id)?3:1;
 const baked=['reveal','closing'].includes(id);
 const size=portrait?1.16:id==='reveal'?1.36:id==='closing'?.84:id==='flour'?.65:1.12;
 const camera= id==='oven'?interpolate(p,[0,.6,1],[1,.64,.2],clamp):id==='stretch'?1+Math.sin(p*Math.PI)*.09:1+p*.075;
 const isTitle=id==='opening'||id==='closing';
 const label=scenes.find(s=>s.id===id)!.label;
 return <AbsoluteFill style={{opacity:exit,overflow:'hidden'}}>
 <div style={{position:'absolute',width:w,height:h,transform:'scale('+unit+')',transformOrigin:'top left'}}>
 {shot ? <AbsoluteFill style={{transform:'scale('+(1+p*.06)+')'}}>
 {shot.kind==='image'?<Img src={asset(shot.src)} style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:shot.objectPosition??'50% 50%'}}/>:<OffthreadVideo src={asset(shot.src)} startFrom={shot.trimBefore??0} playbackRate={shot.playbackRate??1} muted style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:shot.objectPosition??'50% 50%'}}/>}
 <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(0,0,0,.82),transparent 85%)'}}/>
 </AbsoluteFill> :
 <svg width={w} height={h} viewBox={'0 0 '+w+' '+h} style={{position:'absolute'}}>
 <defs><radialGradient id={'oven-'+id}><stop stopColor="#ffbc62"/><stop offset=".45" stopColor="#d45120"/><stop offset="1" stopColor="#240d08"/></radialGradient></defs>
 {id==='oven'&&<g opacity={enter}><path d={'M '+(centerX-530)+' '+(centerY+260)+' V '+(centerY-40)+' A 530 420 0 0 1 '+(centerX+530)+' '+(centerY-40)+' V '+(centerY+260)+' Z'} fill={'url(#oven-'+id+')'} stroke="#493025" strokeWidth="38"/>
 {Array.from({length:15},(_,i)=><path key={i} d={'M '+(centerX-430+i*62)+' '+(centerY+200)+' Q '+(centerX-490+i*62)+' '+(centerY-120-Math.sin(frame*.16+i)*80)+' '+(centerX-385+i*62)+' '+(centerY+170)} fill="#ffb64d" opacity=".22"/> )}
 </g>}
 {id!=='opening'&&<g transform={'translate('+centerX+' '+(centerY+(id==='oven'?p*70:0))+') rotate('+(-18+p*(id==='reveal'?15:6))+') scale('+size*camera+')'}>
 {(id==='oven'||baked)&&<ellipse cy="155" rx="530" ry="270" fill="#211a13" stroke="#4e3b28" strokeWidth="3" opacity=".9"/>}
 <Pizza uid={id} stage={stage} progress={id==='sauce'?enter:id==='toppings'?Math.min(1,p*2):1} baked={baked} stretch={id==='stretch'?1+Math.sin(p*Math.PI)*.17:1}/>
 </g>}
 {(id==='flour'||id==='opening')&&Array.from({length:160},(_,i)=>{const spread=id==='opening'?w:800;const x=(id==='opening'?w/2:centerX)+(rand(i+10)-.5)*spread;const y=(rand(i+20)*h+frame*(id==='flour'?2.8:.4))%h;return <circle key={i} cx={x} cy={y} r={rand(i+30)*3+.5} fill="#f6e8cc" opacity={rand(i+40)*.55*enter}/>;})}
 {baked&&[0,1,2,3].map(i=><path key={i} d={'M '+(centerX-180+i*110)+' '+(centerY-150)+' Q '+(centerX-240+i*110+Math.sin(frame/30+i)*30)+' '+(centerY-330)+' '+(centerX-140+i*110)+' '+(centerY-460)} stroke="#ead6ab" strokeWidth="4" fill="none" opacity={.035+.02*Math.sin(frame/25+i)}/>)}
 {id==='opening'&&<g transform={'translate('+w*.5+' '+h*.5+') rotate('+(-35+p*25)+')'}><ellipse rx={portrait?330:580} ry={portrait?330:410} fill="none" stroke="#9c7045" strokeWidth="1" opacity=".4"/><ellipse rx={portrait?350:605} ry={portrait?350:430} fill="none" stroke="#9c7045" strokeWidth=".6" opacity=".2"/></g>}
 </svg>}
 <div style={{position:'absolute',left:portrait?90:135,right:portrait?90:undefined,top:isTitle?(id==='opening'?h*.28:h*.16):portrait?h*.15:h*.27,color:film.cream,textAlign:portrait?'center':'left',opacity:enter,transform:'translateY('+((1-enter)*32)+'px)'}}>
 <div style={{fontFamily:film.sans,fontSize:portrait?23:20,letterSpacing:6,textTransform:'uppercase',color:film.ember,marginBottom:34}}>{isTitle?'PIZZA SHOWREEL':label.split(' / ')[0]+' / THE RITUAL'}</div>
 {id==='opening'?<><div style={{fontFamily:film.serif,fontSize:portrait?92:126,lineHeight:.95,letterSpacing:-5}}>THE ART<br/><span style={{fontStyle:'italic',fontWeight:400}}>of</span> PIZZA<span style={{color:film.ember}}>.</span></div><div style={{marginTop:40,fontFamily:film.sans,fontSize:portrait?24:22,letterSpacing:3}}>FLOUR · FIRE · FEELING</div></>:
 id==='closing'?<><div style={{fontFamily:film.serif,fontSize:portrait?78:94,lineHeight:1.05}}>Made with<br/><i>intention.</i></div><div style={{fontFamily:film.sans,fontSize:portrait?25:23,lineHeight:1.6,marginTop:30,maxWidth:portrait?850:500}}>{film.closing}</div></>:
 <div style={{fontFamily:film.serif,fontSize:portrait?79:83,lineHeight:1.03,maxWidth:portrait?900:490}}>{label.split(' / ')[1]}</div>}
 {!isTitle&&<div style={{width:80,height:1,background:film.ember,marginTop:38,marginLeft:portrait?'auto':0,marginRight:portrait?'auto':0,transform:'scaleX('+enter+')',transformOrigin:'left'}}/>}
 </div>
 {isTitle&&<div style={{position:'absolute',bottom:portrait?180:112,left:portrait?90:135,right:90,fontFamily:film.sans,fontSize:portrait?22:18,letterSpacing:4,color:'#b7a58a',textAlign:portrait?'center':'left'}}>A PROCEDURAL FILM · VOLUME 01</div>}
 </div>
 </AbsoluteFill>;
};
