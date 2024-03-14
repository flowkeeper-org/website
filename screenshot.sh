#!/usr/bin/env bash

sleep 1

cd ~/projects/website

type="jpg"

scrot -a 360,500,1200,850 -t 50 -z -o -q 90 "./temp.$type"

name=$(kdialog --inputbox "How shall we call this screenshot?")

if [[ -z "$name" ]]; then
  rm "./temp.$type"
  rm "./temp-thumb.$type"
else
  full="./static/images/gallery/fulls/fk-$name.$type"
  thumb="./static/images/gallery/thumbs/fk-$name.$type"
  mv "./temp.$type" $full
  mv "./temp-thumb.$type" $thumb
fi
