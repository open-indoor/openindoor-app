#/bin/bash
### set domain names ###
for f in `find /data/www -type f -name "*.js"`; do
  sed -i 's/\(api\.openindoor\.io\)/'$API_DOMAIN_NAME'/g' $f
  sed -i 's/\(app\.openindoor\.io\)/'$APP_DOMAIN_NAME'/g' $f
done

### inject analytics code ###
sed 's/<!-- analytics -->/\$ANALYTICS/' /data/www/index.html > /data/www/index.html_ANALYTICS
cat /data/www/index.html_ANALYTICS | envsubst | tee /data/www/index.html

### Start web server ###
(caddy fmt /etc/caddy/Caddyfile & caddy run --watch --config /etc/caddy/Caddyfile)
