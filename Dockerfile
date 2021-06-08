FROM nginx:1.21.0-alpine

ENV TENANT_MANAGER_API http://localhost:8585
ENV MT_REGISTRY_API http://localhost:8080/t/:tenantId/apis/registry

COPY dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/config.template.js config.template.js
COPY docker/docker-entrypoint.sh docker-entrypoint.sh
COPY docker/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["docker-entrypoint.sh"]

