FROM nginx:1.21.0-alpine

ENV TENANT_MANAGER_API http://localhost:8585/api/v1
ENV MT_REGISTRY_API http://localhost:8080/t/:tenantId/apis/registry


# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html
RUN chgrp -R root /var/cache/nginx


COPY dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/config.template.js config.template.js
COPY docker/docker-entrypoint.sh docker-entrypoint.sh
COPY docker/nginx.conf /etc/nginx/conf.d

EXPOSE 8080

# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

RUN addgroup nginx root
USER nginx

CMD ["docker-entrypoint.sh"]
