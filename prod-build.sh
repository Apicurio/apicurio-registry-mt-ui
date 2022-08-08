#!/bin/sh

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

echo "yarn install"
echo "------------"
yarn install

echo "yarn clean"
echo "------------"
yarn clean

echo "yarn build"
echo "------------"
yarn build

pushd .

# Clean the .work directory and then do the apicurio-registry federated module build
rm -rf .work
mkdir .work

(
  cd .work

  echo "Checkout apicurio-registry"
  echo "--------------------------"
  git clone --depth 1 --single-branch https://github.com/Apicurio/apicurio-registry.git

  (
    cd apicurio-registry/ui
    yarn install
    yarn run build-mtui
    echo "Success!"
  )
)

cd ${SCRIPT_DIR}

# Copy federated module into dist
echo "Copying federated module to host 'dist'"
echo "---------------------------------------"
mkdir -p dist/modules/registry
cp -rf .work/apicurio-registry/ui/dist/* dist/modules/registry

# Build the docker image
docker build -t="apicurio/apicurio-registry-mt-ui:latest" -t="quay.io/apicurio/apicurio-registry-mt-ui:latest" --rm .
