#!/bin/sh

echo "yarn install"
echo "------------"
yarn install

echo "yarn clean"
echo "------------"
yarn clean

echo "yarn build"
echo "------------"
yarn build

# Clean the .work directory and then do the apicurio-registry federated module build
rm -rf .work
mkdir .work
cd .work

echo "Checkout apicurio-registry"
echo "--------------------------"
pwd
git clone https://github.com/Apicurio/apicurio-registry.git
cd apicurio-registry/ui
yarn install
yarn run build-mtui
echo "Success!"

pwd
ls -al
ls -al dist

cd ../../..

# Copy federated module into dist
echo "Copying federated module to host 'dist'"
echo "---------------------------------------"
mkdir -p dist/modules/registry
pwd
find .
cp -rf .work/apicurio-registry/ui/dist/* dist/modules/registry


docker build -t="apicurio/apicurio-registry-mt-ui:latest" -t="quay.io/apicurio/apicurio-registry-mt-ui:latest" --rm .
