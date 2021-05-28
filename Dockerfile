FROM nginx:1.21.0-alpine

ENV TENANT_MANAGER_API http://localhost:8585

COPY build /usr/share/nginx/html
COPY docker/config.template.js config.template.js
COPY docker/docker-entrypoint.sh docker-entrypoint.sh

EXPOSE 80

CMD ["docker-entrypoint.sh"]
