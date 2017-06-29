#!/bin/bash

date

echo "Installing webpack locally ..."
npm remove webpack -g
npm i webpack --save-dev

echo "Installing npm packages ..."
npm install

echo "Building project..."
ng build -e prod

echo "Starting Nginx ..."
nginx -g 'daemon off;'
