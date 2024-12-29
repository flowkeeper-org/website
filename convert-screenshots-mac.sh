#!/usr/bin/env bash

sitedir=$(pwd)
release=$1
os=$(uname)

if [ -z "$release" ]; then
	echo "Fatal: Specify a release, e.g. v0.9.0"
	exit 1
fi

outbase="$sitedir/static/images/releases/$release/$os"
echo "Will output screenshots to $outbase"

fulls="$outbase/fulls"
mkdir -p $fulls

thumbs="$outbase/thumbs"
mkdir -p $thumbs

cd ~/projects/fk-desktop/test-results

getcrop() {
	local original=$1
    if [ -x "$(command -v magick)" ]; then
		size=$(magick identify -ping -format "%[w]x%[h]" "$original")
	else
		size=$(identify -ping -format "%[w]x%[h]" "$original")
	fi
	if [ "$size" = "4480x2520" ]; then
		crop="3840x2160+320+180"
	elif [ "$size" = "1920x1080" ]; then
		crop="1500x980+200+50"
	else
		crop="$size+0+0"
	fi
	echo "   - Will crop from $size to $crop"
}

convert() {
	local original=$1
	local outfile=$2
	local resize=$3

	getcrop "$original"
	
	out_png="$outfile.png"
    if [ -x "$(command -v magick)" ]; then
		magick "$original" -crop "$crop" -resize "$resize" -unsharp 0x1 "$out_png"
		echo "   - Saved PNG using magick: $out_png"
		magick "$out_png" -quality 90 "$outfile"
		echo "   - Saved JPG using magick: $outfile"
	else
		convert "$original" -crop "$crop" -resize "$resize" -unsharp 0x1 "$out_png"
		echo "   - Saved PNG using convert: $out_png"
		convert "$out_png" -quality 90 "$outfile"
		echo "   - Saved JPG using convert: $outfile"
    fi
	rm "$out_png"
	echo "   - Deleted PNG"
}

for original in *-full.png; do
	filename="${original%.*}"
	echo "Processing $filename:"
	echo " - Full-sized screenshot"
	convert "$original" "$fulls/$filename.jpg" "1920x1080"
	echo " - Thumbnail screenshot"
	convert "$original" "$thumbs/$filename.jpg" "960x540"
done
