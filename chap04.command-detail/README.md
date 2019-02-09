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

## DB
> mysql 연결
```
#  docker run --name mysql  -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 mysql:5.7
```
