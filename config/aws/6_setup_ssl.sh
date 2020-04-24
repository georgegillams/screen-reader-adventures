sudo /usr/bin/certbot-auto certonly --nginx -d screen-reader-adventures.com -d www.screen-reader-adventures.com --debug

sudo mkdir -p /etc/pki/nginx
sudo openssl dhparam -out /etc/pki/nginx/dhparams.pem 2048
