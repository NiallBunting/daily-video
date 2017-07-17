# daily-video
Allow queuing and release of a video playlist.

## Building in docker
docker build -t dailyvideo .
docker run -p 3000:3000 -e DAILY_VIDEO_DATABASE_URI="mongodb://ip:27017" dailyvideo
