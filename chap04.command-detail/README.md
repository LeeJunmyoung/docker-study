# command detail
> docker 명령은 기본저긍로 docker hub 를 사용함.    
> docker 저장소 서버는 docker 레지스트리 서버함.    
> docker push 명령으로 레지스트리 서버에 이미지를 올리고 , docker pull 명령으로 받으수 있음.  

## 로컬에 이미지 데이터 저장
```
# 도커 레지스트리 이미지를 받음
# docker pull registry:latest
```

```
# registry:latest이미지를 컨테이너로 실행
# docker run -d -p 5000:5000 --name hello-registry \
  -v /tmp/registry:/tmp/registry\
  registry
```
* 이미지 파일은 /tmp/registry 디레터리에 저장됌.

## push 명령으로 이미지 올리기
> hello:0.1 이미지를 개인 저장소에 올리기.
```
# docker tag hello:0.1 localhost:5000/hello:0.1
# docker push localhost:5000/hello:0.1
```
태그를 생성하는 명령은 docker tag <이미지 이름>:<태그> <docker 레지스트리 url>/<이미지 이름>:<태그>    
이미지를 올리는 명령은 docker push <docker 레지스트리 url>/<이미지 이름>:<태그>    

1. 개인 저장소에 이미지를 올릴때는 태그를 먼저 생성해야 함.    
2. docker tag 명령으로 태그를 생성함.    
3. docker push 명령으로 이미지를 개인 저장소에 올림.  
4. 이제 다른 서버에서 개인 저장소에 접속하여 이미지를 받아올수 있음.  

```
# docker pull 192.168.0.111:5000/hello:0.1
```

## 컨테이너 연결하기 
> docker 컨테이너끼리 연결할 때는 docker run 명령에서 --link 옵션을 사용함.  
```
# 몽고 디비 생성
# docker run --name db -d mongo
# web 컨테이너르 생성하면서 db 컨테이너와 연결. nginx 생성
# docker run --name web -d -p 80:80 --link db:db nginx
```
> link 옵션은 추후 사라질 예정. 1.9.0 버전 이후 --network 라는 옵션이 추가됨.
```
# 네트워크 생성
# docker network create hello-network

# 몽고디비 네트워크 설정 후 실행
# docker run --name db -d --network hello-network mongo

# nginx 네트워크 설정후 실행
# docker run --name web -d -p 80:80 --network hello-network nginx

# nginx 접속
# docker exec -it web bash

# ping 설치
# apt-get update
# apt-get install iputils-ping
 
# ping db 연결 확인
# ping db 
```

## 데이터 볼륨 컨테이너 사용하기.
> 일반 컨테이너에서 데이터 볼륨 컨테이너를 연결하면 데이터 볼륨 컨테이너 안의 데이터 볼륨 디렉토리에 접근할수 있다.
```
# 서버의 /root/data를 hello-volume /data와 volume을 연결하는 옵션 사용 
# docker run -it --name hello-volume -v /root/data:/data ubuntu /bin/bash
# hello-volume에 /data 를 hello에 /data로 연결 --volumes-from 옵션을 사용해 데이터 볼륨 컨테이너에 볼륨을 공유할수 있다.
# docker run -it --volumes-from hello-volume -name hello ubuntu /bin/bash
```



## DB
> mysql 연결
```
#  docker run --name mysql  -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 mysql:5.7
```


