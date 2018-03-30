#!/bin/bash

EMAIL="alexander.moldova@gmail.com"
USERNAME="AlexanderC"
REMOTE="https://${GH_TOKEN}@github.com/AlexanderC/nakla.fun.git"

setup_git() {
  echo "Setup git for $USERNAME"
  
  git config --global user.email "$EMAIL"
  git config --global user.name "$USERNAME"
}

commit_website_files() {
  echo "Add changes to git"

  git add ./docs
  git commit -a -m "Travis build: $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  echo "Push to remote $REMOTE"

  git remote add origin "$REMOTE" > /dev/null 2>&1
  git push --quiet --set-upstream origin master
}

setup_git
commit_website_files
upload_files
