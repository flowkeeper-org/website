#!/usr/bin/env bash

sitedir=$(pwd)
cd ~/projects/fk-desktop/test-results

for original in *-full.png; do
	filename="${original%.*}"
	echo "Processing $filename"

	full_png="$sitedir/static/images/gallery/fulls/$filename.png"
	magick "$original" -crop 3840x2160+320+180 -resize 50% -unsharp 0x1 "$full_png"
	full_jpg="$sitedir/static/images/gallery/fulls/$filename.jpg"
	magick "$full_png" -quality 90 "$full_jpg"
	rm "$full_png"

	thumb_png="$sitedir/static/images/gallery/thumbs/$filename.png"
	magick "$original" -crop 3840x2160+320+180 -resize 25% -unsharp 0x1 "$thumb_png"
	thumb_jpg="$sitedir/static/images/gallery/thumbs/$filename.jpg"
	magick "$thumb_png" -quality 90 "$thumb_jpg"
	rm "$thumb_png"
done

