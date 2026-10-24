export const film = {
  fps: 30, duration: 900, bpm: 120, beat: 15,
  title: 'THE ART OF PIZZA', closing: 'Simple ingredients. Extraordinary ritual.',
  cream: '#f4e7cc', ember: '#e97836',
  serif: 'Georgia, "Times New Roman", serif',
  sans: 'Arial, Helvetica, sans-serif',
  transitionFrames: 10, audioVolume: 0.72,
} as const;
export const scenes = [
  {id:'opening', from:0, duration:120, label:'A ritual, made by hand'},
  {id:'flour', from:120, duration:120, label:'01 / Flour. Water. Time.'},
  {id:'stretch', from:240, duration:120, label:'02 / A little patience.'},
  {id:'sauce', from:360, duration:90, label:'03 / The heart of it.'},
  {id:'toppings', from:450, duration:120, label:'04 / Nothing to hide.'},
  {id:'oven', from:570, duration:90, label:'05 / Into the fire.'},
  {id:'reveal', from:660, duration:150, label:'06 / Worth the wait.'},
  {id:'closing', from:810, duration:90, label:'Made with intention.'},
] as const;
export type SceneId = typeof scenes[number]['id'];
