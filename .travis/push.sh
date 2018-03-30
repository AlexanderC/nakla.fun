#!/bin/bash

EMAIL="alexander.moldova@gmail.com"
USERNAME="AlexanderC"
REMOTE="https://${USERNAME}:${GH_TOKEN}@github.com/AlexanderC/nakla.fun.git"
MARK="[autobuild]"

setup_git() {
  echo "Setup git for ${USERNAME} <${EMAIL}>"
  
  git config --global user.email "${EMAIL}" || exit 1
  git config --global user.name "${USERNAME}" || exit 1
}

commit_website_files() {
  echo "Add changes to git"

  git add ./docs || exit 1
  git commit -a -m "${MARK} ${TRAVIS_BUILD_NUMBER}" || exit 1
}

upload_files() {
  echo "Push to remote ${REMOTE}"

  git remote add origin-pages "${REMOTE}" || exit 1
  git push --quiet --set-upstream origin-pages master || exit 1
}

[ ! -z "$(echo "${TRAVIS_COMMIT_MESSAGE}" | grep "${MARK}")" ] && echo "Skipping..." && exit 0

setup_git
commit_website_files
upload_files
