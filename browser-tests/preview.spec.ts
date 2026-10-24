import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';
test('all eight shots and vertical preview load with original audio',async({page,request})=>{
 const errors:string[]=[]; page.on('pageerror',e=>errors.push(e.message));
 const audio=await request.get('/pizzashowreel/audio/ritual.wav');expect(audio.ok()).toBeTruthy();expect((await audio.body()).subarray(0,4).toString()).toBe('RIFF');
 mkdirSync('out/review',{recursive:true});
 for(const frame of [60,180,300,405,510,615,735,850]){
 await page.goto('/pizzashowreel/?frame='+frame);
 await expect(page.getByRole('heading',{name:'The art of pizza.'})).toBeVisible();
 await expect(page.locator('section.screen svg').first()).toBeVisible();
 await page.screenshot({path:'out/review/frame-'+frame+'.png'});
 }
 await page.getByRole('button',{name:'9:16',exact:true}).click();
 await expect(page.locator('.screen')).toHaveClass(/portrait/);
 await page.screenshot({path:'out/review/vertical.png'});
 expect(errors).toEqual([]);
});
