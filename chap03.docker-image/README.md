# docker image

## dockerfile
> dockerfile 은 docker 이미지 설정 파일.  
> dockerfile에 설정된 내용대로 이미지를 생성.  

1. mkdir example
2. cd example
3. vi Dockerfile
```
#Dockerfile
FROM ubuntu:16.04
MAINTAINER FOO Bar <foo@bar.com>

RUN apt-get update
RUN apt-get install -y nginx
RUN echo '\n daemon off;' >> /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /var/lib/nginx

VOLUME ["/data","/etc/nginx/site-enabled","/varr/log/nginx"]

WORKDIR /etc/nginx

CMD ["nginx"]

EXPOSE 80
EXPOSE 443
```

1. FROM : 어떤 이미지를 기반으로 할지 설정합니다. Docker 이미지는 기존에 만들어진 이미지를 기반으로 생성 <이미지 이름>:<태그>    
2. MAINTAINER : 메인테이너 정보  
3. RUN : 쉘 스크립트 호은 명령을 실행합니다.  
   1. 이미지 생성 중에는 사용자 입력을 받을 수 없으므로 -y 옵션을 사용합니다.    
   2. 나머지는 nginx 설정정보입니다.    
   3. VOLYME : 호스트와 공유할 디렉터리 목록입니다. docker run 명령에서 -v 옵션으로 설정 할 수 있습니다.     
      ex) -v /root/data:/data는 호스트의 /root/data 디렉토리를 Docker 컨테이너의 /data 디렉터리에 연결합니다.  
4. CMD : 컨테이너가 시작 되었을 때 실행할 실행 파일 또는 셸 스크립트 입니다.
5. WORKDIR : CMD 에서 설정한 실행 파일이 실행될 디렉토리 입니다.
6. EXPOSE : 호스트와 연결할 포트 번호 입니다.

## Build 명령으로 이미지 생성
> ~/example$ docker build --tag hello:0.1 .  
> docker build <옵션> <Dockerfile 경로>


## 확인
> docker run --name hello-nginx -d -p 80:80 -v /root/data:/data hello:0.1

1. -d  옵션은 컨테이너를 백그라운드로 실행합니다.
2. -p 80:80 옵션으로 호스트의 80번포트와 컨테이너의 80번포트를 연결 하고 외부에 노출합니다. 이렇게 설정한뒤 localhost:80 으로 접속하면됌
3. -v /root/data:/data 옵션으로 호스트의 /root/data 디렉토리를 컨테이너의 /data 디렉토리에 연결합니다.

## history
> 이미지의 히스토리를 조회  
> docker history <이미지 이름>:<태그>  
```
# docker history hello:0.1
```

## cp
> 컨테이너의 파일을 이동  
> docker cp <컨테이너 이름>:<경로> <호스트 경로>  
```
# docekr cp hello-nginx:/etc/nginx/nginx.conf ./
```

## commit
> docker commit  명령은 컨테이너의 변경 사항을 이미지 파일로 생성함.  
> docker commit <옵션> <컨테이너 이름> <이미지 이름>:<태그>  
```
# docker commit -a "FOO Bar <foo@barr.com>" -m "add hello.txt" hello-nginx hello:0.2
```
*docker images 를 검색해보면 hello:0.2 이미지가 생성되어 있다.

## diff
> docker diff 명령은 컨테이너가 실행되면서 변경된 파일 목록을 출력  
> 비교 기준은 컨테이너를 생성한 이미지 내용.
```
# docker diff hello-nginx
```
1. A는 추가된 파일  
2. C는 변경된 파일  
3. D는 삭제된 파일  

