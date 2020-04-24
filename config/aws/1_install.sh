curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 12.14.0

sudo apt-get update
sudo apt-get install redis
sudo apt-get install nginx
sudo apt-get install zip
sudo apt-get install unzip
npm install pm2 -g

wget https://dl.eff.org/certbot-auto
chmod a+x certbot-auto
sudo mv certbot-auto /usr/bin/
sudo chown root /usr/bin/certbot-auto
sudo chmod 0755 /usr/bin/certbot-auto
