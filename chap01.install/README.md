# install
> Docker 는 리눅스 배포판 종류를 자동으로 인식하여 docker 패키지를 설치해주는 스크립트를 제공한다.  
> wget -O- https://get.docker.com/ | sh   

## ubuntu
> apt-get update  
> apt-get install docker.io  
> ln -sf /usr/bin/docker.io /usr/local/bin/docker  

## centos
> yum install docker-io

## start
> service docker [start,status,stop,restart]
