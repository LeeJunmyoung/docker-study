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

npm config set strict-ssl false # npm install error 제거 ssl관련 설정.
RUN npm install

CMD nodejs app.js
```

## SSH 키 생성
```
ssh-keygen
```

## 서버 설정
```
# git 설치
# apt-get install git

# 개발자 pc 에서 puch 한 소스를 받을 수 있도록 receive.denycurrentbranch를 ignore로 설정
# git init exampleapp
# cd exampleapp && git config receive.denycurrentbranch ignore
# pwd 해서 나온 경로를 나중에 git remote add origin ssh://<계정>@<IP>:<PORT>/<pwd 경로> 

# docker 설치

# ssh 키 설정
# cd /home/<서버 사용자 계정>
# mkdir .ssh
# chmod 700 .ssh
# vi authorized_keys
# 기존에 만든 ssh-keygen에 공개키를 넣어준다.
# chmod 600 authorized_keys

# git hooks 설정
#######################
.git/hooks/post-receive
#!/bin/bash

APP_NAME=exampleapp
APP_DIR=$HOME/$APP_NAME
REVISION=$(expr substr $(git rev-parse --verify HEAD) 1 7)

GIT_WORK_TREE=$APP_DIR git checkout -f

cd $APP_DIR
docker build --tag $APP_NAME:$REVISION .
docker stop $APP_NAME
docker rm $APP_NAME
docker run -d --name $APP_NAME -p 80:80 $APP_NAME:$REVISION
#######################
# chmod +x post-receive
```

## push 하기(개발자 PC)
```
# 원격 저장소 확인
# git remote -v

# push 하기
# git push origin master

# 이러면 docker가 뜨는걸 확인할수 있다.
```
