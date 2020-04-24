sudo mkdir /etc/openssl

sudo openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out /etc/openssl/fullchain.crt \
            -keyout /etc/openssl/privkey.key

echo "Now point /etc/nginx/nginx.conf at /etc/openssl/..."
