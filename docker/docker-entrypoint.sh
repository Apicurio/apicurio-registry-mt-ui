#!/bin/sh


echo "---"
echo "Generating config.js from template"
envsubst < config.template.js > /usr/share/nginx/html/config.js
echo "---"

echo "==="
find /usr/share/nginx/html
echo "==="

echo "___"
cat /usr/share/nginx/html/config.js
echo "___"

echo "Starting nginx"

nginx -g 'daemon off;'

