#!/bin/sh

DOCKER=docker

if command -v winpty &> /dev/null
then
    echo "Found 'winpty', using it via:  'winpty docker'"
    DOCKER="winpty docker"
fi

if [ "x$DOCKER_CMD" != "x" ]
then
    echo "Override for 'docker' detected.  Using: '$DOCKER_CMD'"
    DOCKER=$DOCKER_CMD
fi

$DOCKER run -it -p 7777:8080 \
    --env AUTH_ENABLED=true \
    --env REGISTRY_UI_URL=http://localhost:7777/modules/registry \
    --env SRS_API_URL=https://fleet-manager-mt-apicurio-apicurio-registry.apps.smaug.na.operate-first.cloud \
    --env AUTH_ENABLED=true \
    --env NAV_ENABLED=true \
    --env NAV_DESIGNER_URL=https://api-designer-poc.apps.smaug.na.operate-first.cloud/ \
    apicurio/apicurio-registry-mt-ui:latest

