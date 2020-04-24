# #!/bin/bash

cd /home/ubuntu
if [ -f build.zip ]; then
  sleep 5 # wait to ensure the file transfer is complete
  unzip build
  rm build.zip
  cd screen-reader-adventures
  git fetch && git reset --hard origin/master && git pull
  sudo cp -R ./config/aws/errors /var/www/html/
  PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true npm ci
  pm2 stop all
  rm -rf build && mv ../build ./
  pm2 start all
else
  echo "No new version to deploy"
fi
