for i in q32*.svg ; do
  inkscape --export-png="${i%.svg}.png"  --export-area=0:180:720:540 --export-width=720 --export-height=360 "${i}"
done
