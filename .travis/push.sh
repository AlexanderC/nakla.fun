#!/bin/bash

setup_git() {
  git config --global user.email "alexander.cucer@titanium-soft.com"
  git config --global user.name "AlexanderC"
}

commit_website_files() {
  git add ./docs
  git commit -a -m "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  git remote add origin https://${GH_TOKEN}@github.com/AlexanderC/nakla.fun.git > /dev/null 2>&1
  git push --quiet --set-upstream origin master
}

setup_git
commit_website_files
upload_files
