#!/usr/bin/env bash

sitedir=$(pwd)
release=$1
os=$2

find "../fk-desktop/test-results" -name "*.png" -exec basename {} \; | xargs -t -I % -P 16 ./convert-one-screenshot.sh % $release $os
