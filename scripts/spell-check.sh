#!/usr/bin/env bash
# This script checks for spelling errors in the content.
#
# -----------------------------------------
# If you are using zsh set to ignore files,
# that aren't there yet, using:
#    unsetopt nomatch
# And later turn it back on again: 
#    setopt nomatch
# -----------------------------------------

if [ $# -ge 1 ] && [[ $1 == "docker" ]]; then
  docker run -v $(pwd):/app -t --rm danger89/codespell:latest ./content/*.md &&
  docker run -v $(pwd):/app -t --rm danger89/codespell:latest \
    ./content/posts/{2018,2019,202*,203*,204*,205*,206*,207*,208*}-*
else
  codespell ./content/*.md &&
    codespell ./content/posts/{2018,2019,202*,203*,204*,205*,206*,207*,208*}-*
fi
