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