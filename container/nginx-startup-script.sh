#!/bin/sh

# Default values
export SERVER_NAME=${SERVER_NAME:-"ecfr.protobull.com"}
echo "SERVER_NAME set to ${SERVER_NAME}"

export TLS_ENABLED=${TLS_ENABLED:-"false"}

# NGINX template directory
TEMPLATE_DIR="/etc/nginx/templates"

# Output directory for the final NGINX config
CONFIG_DIR="/etc/nginx/conf.d"
ASSETS_DIR="/app"

# Check if the required templates exist
if [ ! -f "${TEMPLATE_DIR}/nginx-tls.template.conf" ] || [ ! -f "${TEMPLATE_DIR}/nginx-http.template.conf" ]; then
    echo "NGINX configuration templates not found in ${TEMPLATE_DIR}"
    exit 1
fi

# Function to process and generate NGINX config
generate_nginx_config() {
    local nginx_template_file
    if [ "${TLS_ENABLED}" = "true" ]; then
        nginx_template_file="${TEMPLATE_DIR}/nginx-tls.template.conf"
    else
        nginx_template_file="${TEMPLATE_DIR}/nginx-http.template.conf"
    fi

    echo "rendering server template file"
    # Use environment substitution for the SERVER_NAME
    envsubst '$SERVER_NAME' < "${nginx_template_file}" > "${CONFIG_DIR}/ecfr.conf"

    local config_template="${ASSETS_DIR}/config_template.json"

    echo "rendering config template file"
    envsubst '$ECFR_API_URL' < "${config_template}" > "${ASSETS_DIR}/config.json"
    echo "Rendered config template to" "${ASSETS_DIR}/config.json"
}

# Generate NGINX configuration
generate_nginx_config

# Start NGINX in the foreground
# Note: NGINX is typically started in the foreground in Docker containers
if [ "${TLS_ENABLED}" = "true" ]; then
    echo "Starting eCFR Webapp with TLS enabled"
else
    echo "Starting eCFR Webapp with TLS disabled"
fi
nginx -g 'daemon off;'
