#!/usr/bin/env bash
cd scripts
docker build -t danger89/codespell:latest .
docker push danger89/codespell:latest
