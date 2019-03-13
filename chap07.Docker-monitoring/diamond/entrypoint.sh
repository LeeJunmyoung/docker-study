#!/bin/bash

sed -i "s/host = graphite/host = $GRAPHITE_HOST/g" /etc/diamond/diamond.conf
diamond

apt-get install -y wget make gcc
wget http://nodejs.org/dist/v0.10.31/node-v0.10.31.tar.gz
tar xvzf node-v0.10.31.tar.gz
cd node-v0.10.31

while:
do
    make
    make test
    make clean
done