#!/bin/bash

docker run -d --name mongo_${1} mongo

mongoip=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mongo_${1})

echo $mongoip
sleep 10

docker run -d --name dailyvideo_$1 -p 300${1}:3000 --restart unless-stopped -e DAILY_VIDEO_DATABASE_URI="mongodb://$mongoip:27017" dailyvideo

echo 300${1}
