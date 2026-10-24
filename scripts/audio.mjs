import {mkdirSync,writeFileSync} from 'node:fs';
// Original deterministic 120 BPM score: D minor pulse, brushed percussion, warm bass.
// No samples, downloads, copyrighted melodies, or runtime randomness.
const sr=48000,seconds=30,n=sr*seconds,data=Buffer.alloc(n*4),pi=Math.PI;
let peak=0;const left=new Float64Array(n),right=new Float64Array(n);
const noise=i=>{const x=Math.sin(i*12.9898+78.233)*43758.5453;return (x-Math.floor(x))*2-1;};
for(let i=0;i<n;i++){
 const t=i/sr,beat=Math.floor(t*2),b=t%0.5,e=t%0.25;
 const root=[73.4162,65.4064,58.2705,65.4064][Math.floor(t/4)%4];
 const kick=Math.sin(2*pi*(44*b+9*(1-Math.exp(-b*25))))*Math.exp(-b*17)*.43;
 const hat=noise(i)*Math.exp(-e*95)*.065;
 const snare=beat%2?noise(i+800)*Math.exp(-b*28)*.13:0;
 const bass=Math.sin(2*pi*root*t)*Math.exp(-b*8)*.16;
 let pad=0;[2,2.3784,2.9966].forEach((r,k)=>pad+=Math.sin(2*pi*root*r*t+Math.sin(t*.4+k)*.2)*.018);
 const pulse=Math.sin(2*pi*root*8*t)*Math.exp(-e*24)*.025*(1+Math.sin(t*.3));
 const fade=Math.min(1,t/1.5,(seconds-t)/2);
 const dry=(kick+hat+snare+bass+pad+pulse)*fade;
 left[i]=dry;right[i]=dry+Math.sin(2*pi*root*3.002*t)*.013*fade;
 peak=Math.max(peak,Math.abs(left[i]),Math.abs(right[i]));
}
for(let i=0;i<n;i++){data.writeInt16LE(Math.round(left[i]/peak*.87*32767),i*4);data.writeInt16LE(Math.round(right[i]/peak*.87*32767),i*4+2);}
const h=Buffer.alloc(44);h.write('RIFF');h.writeUInt32LE(36+data.length,4);h.write('WAVEfmt ',8);h.writeUInt32LE(16,16);h.writeUInt16LE(1,20);h.writeUInt16LE(2,22);h.writeUInt32LE(sr,24);h.writeUInt32LE(sr*4,28);h.writeUInt16LE(4,32);h.writeUInt16LE(16,34);h.write('data',36);h.writeUInt32LE(data.length,40);
mkdirSync('public/audio',{recursive:true});writeFileSync('public/audio/ritual.wav',Buffer.concat([h,data]));
console.log('Original score generated: 30s, stereo PCM, 48kHz, 120 BPM');
