import json, subprocess, pathlib
p=pathlib.Path('out/the-art-of-pizza.mp4')
data=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_streams','-show_format','-of','json',str(p)]))
v=next(s for s in data['streams'] if s['codec_type']=='video')
a=next(s for s in data['streams'] if s['codec_type']=='audio')
assert v['codec_name']=='h264', v
assert v['avg_frame_rate']=='30/1', v
assert abs(float(data['format']['duration'])-30)<0.15, data
assert a['codec_name']=='aac', a
assert v['pix_fmt']=='yuv420p', v
assert int(v['nb_frames'])==900, v
pathlib.Path('out/render-metadata.json').write_text(json.dumps(data,indent=2))
print('Verified: H.264 + AAC, 900 frames, 30 FPS, 30 seconds,',v['width'],'x',v['height'])
