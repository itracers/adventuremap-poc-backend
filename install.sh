unzip -o build.zip -d /srv/adventuremap-poc-backend
rm -rf build.zip
rm -rf install.sh
pm2 reload adventuremap-poc-backend