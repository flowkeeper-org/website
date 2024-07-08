#!/usr/bin/env bash

sitedir=$(pwd)
cd ~/projects/fk-desktop/test-results

for original in *.png; do
	filename="${original%.*}"
	full="$sitedir/static/images/gallery/fulls/$filename.jpg"
	convert "$original" -crop 1500x980+200+50 -quality 90 "$full"
	thumb="$sitedir/static/images/gallery/thumbs/$filename.jpg"
	convert "$original" -crop 1500x980+200+50 -resize 50% -quality 90 "$thumb"
done

