# Use the Alpine-based NGINX image
FROM nginx:1.27.4-alpine

# Copy the NGINX appConfiguration file
RUN mkdir -p /etc/nginx/templates
RUN rm /etc/nginx/conf.d/default.conf
COPY ./container/nginx-http.template.conf /etc/nginx/templates/nginx-http.template.conf
COPY ./container/nginx-tls.template.conf /etc/nginx/templates/nginx-tls.template.conf
COPY ./container/nginx-startup-script.sh /nginx-startup-script.sh


# Copy the JSON files from the local 'results' directory to the container
COPY ./dist /app

# Expose HTTPS port
EXPOSE 443 80

# Expects TLS certificates to be mounted to
#  - /etc/nginx/tls.combined-chain   for the CA certificate chain and
#  - /etc/nginx/tls.key              for the TLS key

CMD ["/nginx-startup-script.sh"]

