# strongly-swagular-starter
starter for strongly js & angular

## Get starter
* run ```npm i``` to install all dependencies
* run ```start:server``` to run the server
* run ```start:client``` to run the client (you have to start the server first)
* login with admin@admin.com 123456


sudo rm -rf /srv/site
sudo mv ~/tador/strongly-swagular/client/dist/app /srv/site
sudo service nginx restart
sudo nano /etc/nginx/sites-enabled/default
