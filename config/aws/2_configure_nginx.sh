sudo mkdir -p /var/www/html
sudo cp -R ./config/aws/errors /var/www/html/

sudo cp ./config/aws/nginx.conf /etc/nginx/nginx.conf
sudo service nginx restart
sudo update-rc.d nginx defaults

