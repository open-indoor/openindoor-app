#/bin/bash
for f in `find /data/www -type f -name "*.js"`; do
  sed -i 's/\(api\.openindoor\.io\)/'$API_DOMAIN_NAME'/g' $f
  sed -i 's/\(app\.openindoor\.io\)/'$APP_DOMAIN_NAME'/g' $f
done

(caddy fmt /etc/caddy/Caddyfile & caddy run --watch --config /etc/caddy/Caddyfile)
