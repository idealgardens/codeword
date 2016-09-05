#!/usr/bin/env bash
set -e

firebase --version

if [[ "$TRAVIS_BRANCH" == "master" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
  firebase deploy --token $FIREBASE_TOKEN
fi
