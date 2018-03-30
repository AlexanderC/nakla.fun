#!/bin/bash

if [ -z ${1} ]; then
  echo "Please provider GitHub token."
  echo "Ref: https://github.com/settings/tokens"
  exit 1
fi

if [ -z ${2} ]; then
  echo "Please provider Travis API token."
  echo "Ref: https://travis-ci.org/profile/AlexanderC"
  exit 1
fi

if [ -z $(which travis) ]; then
  echo "Please install travis binary."
  exit 1
fi

echo GH_TOKEN="$1" | travis encrypt --add --no-interactive --override --org --token "$2"
