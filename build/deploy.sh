#!/bin/bash

VERSION=$1

(cd dist/em2m/surveyor && npm-snapshot ${VERSION} && npm publish .)

