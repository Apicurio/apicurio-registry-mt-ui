#!/bin/sh

echo "---"
find /usr/share/nginx/html
echo "---"

nginx -g 'daemon off;'
