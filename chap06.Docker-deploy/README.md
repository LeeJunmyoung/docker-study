# Docker Deploy

## 서버 한 대에 배포하기.
> 1. 개발자 pc 에서 어플 개발  
> 2. git push 명령으로 소스를 서버에 올림.
> 3. 서버에서 저장소에 git push 명령이 발생하면 git hook을 실행.
> 4. git hook에서 docker이미지를 생성, 이미지를 컨테이너로 실행

## Docekr file 작성
```
FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y nodejs npm

ADD app.js /var/www/app.js
ADD package.json /var /www/package.json

WORKDIR /var/www

RUN npm install

CMD nodejs app.js
```