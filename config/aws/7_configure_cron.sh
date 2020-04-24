sudo service cron start
sudo chmod g+s /usr/bin/crontab
sudo crontab ./config/aws/cron
