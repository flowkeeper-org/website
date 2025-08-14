#!/usr/bin/env bash

sitedir=$(pwd)
release=$1
os=$2

for full in ../fk-desktop/test-results/*.png; do
	filename=$(basename "$full")
	./convert-one-screenshot.sh "$filename" "$release" "$os"
done
