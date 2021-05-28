FROM nginx:1.21.0-alpine

COPY build /usr/share/nginx/html

ADD docker-entrypoint.sh docker-entrypoint.sh

EXPOSE 80

CMD ["docker-entrypoint.sh"]
