#!/bin/bash

EMAIL="alexander.moldova@gmail.com"
USERNAME="AlexanderC"
REMOTE="https://${GH_TOKEN}@github.com/AlexanderC/nakla.fun.git"
MARK="[autobuild]"

setup_git() {
  echo "Setup git for $USERNAME"
  
  git config --global user.email "$EMAIL"
  git config --global user.name "$USERNAME"
}

commit_website_files() {
  echo "Add changes to git"

  git add ./docs
  git commit -a -m "$MARK $TRAVIS_BUILD_NUMBER"
}

upload_files() {
  echo "Push to remote $REMOTE"

  git remote add origin "$REMOTE" > /dev/null 2>&1
  git push --quiet --set-upstream origin master || exit 1
}

if [ echo "$TRAVIS_COMMIT_MESSAGE" | grep "$MARK" ]; then
  echo "Skipping..."
  exit 0
fi

setup_git
commit_website_files
upload_files
