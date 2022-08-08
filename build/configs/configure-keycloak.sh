#!/bin/sh

if [ "x$AUTH_ENABLED" = "xtrue" ]
then

  if [ "x$KEYCLOAK_REALM" = "x" ]
  then
    KEYCLOAK_REALM="operate-first-apicurio"
  fi
  if [ "x$KEYCLOAK_URL" = "x" ]
  then
    KEYCLOAK_URL="https://auth.apicur.io/auth"
  fi
  if [ "x$KEYCLOAK_SSL_REQUIRED" = "x" ]
  then
    KEYCLOAK_SSL_REQUIRED="external"
  fi
  if [ "x$KEYCLOAK_RESOURCE" = "x" ]
  then
    KEYCLOAK_RESOURCE="sr-ui"
  fi

  echo "Generating keycloak.json"
  echo "{
    \"realm\": \"$KEYCLOAK_REALM\",
    \"auth-server-url\": \"$KEYCLOAK_URL\",
    \"resource\": \"$KEYCLOAK_RESOURCE\",
    \"public-client\": true,
    \"enable-cors\": true,
    \"ssl-required\": \"$KEYCLOAK_SSL_REQUIRED\",
    \"confidential-port\": 0,
    \"cors-max-age\" : 1000,
    \"cors-allowed-methods\" : \"POST, PUT, DELETE, GET\",
    \"cors-exposed-headers\" : \"WWW-Authenticate\"
  }" > /opt/app-root/src/keycloak.json

  echo "Authentication enabled. Generated keycloak.json successfully."
  #cat /opt/app-root/src/keycloak.json
else
  echo "Authentication disabled. Skipping Generation of keycloak.json"
fi
