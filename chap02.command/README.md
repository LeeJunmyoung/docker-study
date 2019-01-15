# command
> Docker 는 docker run, docker push 와 같이 docker <명령> 형식이며, 항상 root 권한으로 실행해야합니다.

## search
> docker 는 docker hub을 통해 이미지를 공유하는 생태계  
```
# docker search <검색할 이미지명 (redis,nginx ...)>  
```
## pull
> dockerr hub 에서 이미지를 받아오는 명령어
```
# docker pull <이미지명>:<버전>
# docker pull centos:6.9  <latest:최신>
```
## images
> 받은 이미지의 목록을 출력  
```
# docker images <이미지명>
```

## run
> 새로운 컨테이너를 만드는 명령어
```
# docker run <옵션> <이미지 명> <실행할 파일>  
# docker run -i -t  --name centos centos /bin/bash  
// -i (interactive) : 입력을 받는  -t (pseudo-TTY) : terminal
```

## ps
> 컨테이너 목록 출력
```
# docker ps -a
```

## start,stop,restart
> 컨테이너  실행,정지,재실행
```
# docker <start,stop,restart> <컨테이너 이름, ID>
```

## attach
> 컨테이너를 접속하는 명령어
```
# docker attach <컨테이너 이름, ID>
```

## rm
> 생성된 컨테이너 삭제
```
# docker rm <컨테이너 이름, ID>
```

## rmi
> 이미지 삭제
```
# docker rmi <이미지 이름>:<태그>
```


