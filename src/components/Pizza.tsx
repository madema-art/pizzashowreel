import React from 'react';
export const rand = (n:number) => {const x=Math.sin(n*127.1+311.7)*43758.5453; return x-Math.floor(x);};
const ring = Array.from({length:100},(_,i)=>{const a=i*Math.PI*2/100;const r=335+rand(i)*10;return [Math.cos(a)*r,Math.sin(a)*r].join(',');}).join(' ');
export const Pizza = ({stage,progress=1,baked=false,stretch=1,uid='pizza'}:{stage:number;progress?:number;baked?:boolean;stretch?:number;uid?:string}) => <g transform={'scale('+stretch+' '+(2-stretch)+')'}>
  <defs>
    <radialGradient id={uid+'-crust'} cx="38%" cy="30%"><stop stopColor={baked?'#eec77d':'#f3dfb7'}/><stop offset=".72" stopColor={baked?'#d58b3e':'#ddbf89'}/><stop offset=".93" stopColor={baked?'#9d4a1f':'#bea074'}/><stop offset="1" stopColor="#4a2615"/></radialGradient>
    <radialGradient id={uid+'-sauce'} cx="40%" cy="35%"><stop stopColor="#ce4a28"/><stop offset=".8" stopColor="#9c261d"/><stop offset="1" stopColor="#661b16"/></radialGradient>
    <radialGradient id={uid+'-cheese'}><stop stopColor="#fff0b8"/><stop offset="1" stopColor={baked?'#dba955':'#e3d4aa'}/></radialGradient>
  </defs>
  <ellipse cy="36" rx="355" ry="338" fill="#000" opacity=".5"/>
  <polygon points={ring} fill={'url(#'+uid+'-crust)'} stroke="#f4d99e" strokeWidth="2"/>
  <circle r="294" fill={stage<2?'#d9be8e':'url(#'+uid+'-sauce)'} opacity={stage===2?progress:1}/>
  {stage<2 && Array.from({length:80},(_,i)=><circle key={i} cx={(rand(i+5)-.5)*540} cy={(rand(i+8)-.5)*520} r={rand(i+9)*2+1} fill="#fff4d8" opacity=".24"/>)}
  {stage===2 && <path d="M 0 0 C 65 -80 135 30 40 90 S -170 30 -100 -95 S 170 -160 190 20 S -180 250 -225 30 S 155 -285 250 -70" fill="none" stroke="#ef7547" strokeWidth="25" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress} opacity=".7"/>}
  {stage>=3 && Array.from({length:34},(_,i)=>{
    const a=rand(i+80)*Math.PI*2,r=Math.sqrt(rand(i+90))*249;
    const p=Math.max(0,Math.min(1,(progress-i/48)*3));
    return <g key={i} opacity={p} transform={'translate('+Math.cos(a)*r+' '+(Math.sin(a)*r-(1-p)*300)+') rotate('+rand(i+3)*360+')'}>
      <ellipse rx={22+rand(i+4)*23} ry={15+rand(i+7)*15} fill={'url(#'+uid+'-cheese)'}/>
      {baked&&<ellipse cx="9" cy="-3" rx="9" ry="5" fill="#a65a28" opacity=".6"/>}
    </g>;
  })}
  {baked && Array.from({length:46},(_,i)=>{const a=i*2.399;return <ellipse key={i} cx={Math.cos(a)*(308+rand(i)*16)} cy={Math.sin(a)*(308+rand(i)*16)} rx={5+rand(i+8)*10} ry={3+rand(i+9)*6} fill="#47231a" opacity=".8" transform={'rotate('+i+' '+Math.cos(a)*315+' '+Math.sin(a)*315+')'}/>;})}
  {stage>=3 && [0,1,2,3,4,5,6].map(i=>{const a=i*2.4,r=80+rand(i+70)*145;const p=Math.max(0,Math.min(1,(progress-.35-i*.045)*5));return <g key={i} transform={'translate('+Math.cos(a)*r+' '+(Math.sin(a)*r-(1-p)*420)+') rotate('+i*55+') scale('+p+')'}><path d="M0 40 C-63 -8 -30 -58 0 -48 C42 -40 48 0 0 40" fill="#3e713c"/><path d="M0 33 L0 -39 M0 10 L-21 -11 M0 -8 L20 -27" stroke="#8d9d50" strokeWidth="2" fill="none"/></g>;})}
  {baked && <ellipse cx="-62" cy="-86" rx="220" ry="100" fill="#ffe1a1" opacity=".055" transform="rotate(-35)"/>}
</g>;
