#!/usr/bin/env bash
codespell ./content/about.md &&
  codespell ./content/_index.md &&
  codespell ./content/posts/{2018,2019,202*,203*,204*,205*,206*,207*,208*}-*
