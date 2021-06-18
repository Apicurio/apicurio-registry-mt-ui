#!/bin/sh

yarn clean
yarn install
yarn build

pushd . # Push the root dir

# Clean the .work directory and then do the apicurio-registry federated module build
rm -rf .work
mkdir .work
cd .work
git clone git@github.com:Apicurio/apicurio-registry.git
cd apicurio-registry/ui
yarn install
yarn run build-mtui

popd # Back to root dir

# Copy federated module into dist
mkdir -p dist/modules/registry
cp -rf .work/apicurio-registry/ui/dist/* dist/modules/registry


docker build -t="apicurio/apicurio-registry-mt-ui:latest" -t="quay.io/apicurio/apicurio-registry-mt-ui:latest" --rm .
