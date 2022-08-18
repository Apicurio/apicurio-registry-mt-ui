#!/bin/sh

if [ "x$REGISTRY_UI_URL" = "x" ]
then
  REGISTRY_UI_URL="http://localhost:8888"
fi

if [ "x$SRS_API_URL" = "x" ]
then
  SRS_API_URL="http://localhost:8081"
fi

if [ "x$AUTH_ENABLED" = "x" ]
then
  AUTH_ENABLED="false"
fi

if [ "x$NAV_ENABLED" = "x" ]
then
  NAV_ENABLED="false"
fi

if [ "x$NAV_DESIGNER_URL" = "x" ]
then
  NAV_DESIGNER_URL=""
fi

echo "Generating config.js"

echo "const RegistryMtConfig = {
    \"apis\": {
        \"srs\": \"$SRS_API_URL\"
    },
    \"federatedModules\": {
        \"registry\": \"$REGISTRY_UI_URL\",
    },
    \"auth\": {
        \"enabled\": $AUTH_ENABLED
    },
    \"apps\": {
        \"showNav\": $NAV_ENABLED,
        \"designer\": \"$NAV_DESIGNER_URL\"
    }
}" > /opt/app-root/src/config.js

echo "Generated config.js successfully."
cat /opt/app-root/src/config.js

