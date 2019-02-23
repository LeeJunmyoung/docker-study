# Dockerfile detail
> docker는 Dockerfile에 작성된 명령을 순서대로 처리함.  
> dockerfile 에서 명령은 항상 FROM으로 시작. 그렇지 않을 경우 이미지가 생성되지 않음.
> 이미지를 생성할때는 Dockerfile이 있는 디렉토리에서 docker build 명령을 사용.  

## FROM
> FROM에는 어떤 이미지를 기반으로 이미지를 생성할지 설정함.  
> Dockerfile로 이미지를 생성할때 항상 기존에 있는 이미지를 기반으로 생성하기에 설정해 주어야 함.
> 로컬에 이미지가 없으면 Docker Hub에서 받아옴.  
```
FROM <이미지> 또는 FROM <이미지>:<태그>
```

## MAINTAINER
> MAINTAINER는 이미지를 생성한 사람의 정보를 설정합니다. 형식은 자유.
```
MAINTAINER Lee, Junmyoung <leejm1@gbnet.kr>
```

## RUN
> RUN 은 FROM 에서 설정한 이미지 위엥서 스크립트 혹은 명령을 실행함.  
> RUN으로 실행한 결과가 새이미지로 생성되고, 실행 내역은 이미지의 히스토리에 기록됨.  
```
# 셀 출력
RUN apt-get install -y nginx
RUN echo "hello Docker" > /tmp/hello
```

```
#셀 미출력
RUN ["apt-get","install","-y","nginx"]
RUN ["echo","'hello Docker'",">","/tmp/hello"]
```

## CMD
> CMD는 컨테이너가 시작 되었을때 스크립트 혹은 명령을 실행함.  
> 즉 Docker run 명령으로 컨테이너를 생성하거나 docker start 명령으로 정지된 컨테이너를 시작할 때 실행됨.  
> CMD는 Dockerfile 에서 한 번만 사용할 수 있음.

```
CMD touch /home/hello/hello.txt
CMD <명령>
===================
CMD ["redis-server"]
CMD ["mysqld","--datador=/var/lib/mysql","--user=mysql"]
CMD ["<실행파일>","<매개변수1>","<매개변수2>"]
```

## ENTRYPOINT
> ENTRYPOINT 는 컨테이너가 시작되었을 때 스크립트 혹은 명령을 실행함  
> 즉, docker run으로 컨테이너를 생성하거나 docker start명령으로 정지된 컨테이너를 실행할때  
> ENTRYPOINT는 Dockerfile에서 단 한 번만 사용할 수 있습니다.  
```
ENTRYPOINT touch /home/hello/hello.txt
ENTRYPOINT <명령>
======================================
ENTRYPOINT ["/home/hello.sh","--hello=1","--world=2"]
ENTRYPOINT ["<실행파일>","<매개변수1>","<매개변수2>"]
```

## EXPOSE 
> EXPOSE 는 호스트와 연결할 포트 번호를 설정함.  
> docker run 명령의 --expose 옵션과 동일  
> EXPOSE 는 호슽와 연결만 할 뿐 외부에 노출은 되지 않음. 그러니 -p 옵션을 사용해야함.  
```
EXPOSE 80
EXPOSE 443
EXPOSE 80 443
```

## ENV
> ENV는 환경 변수를 설정함.  
> ENV로 설정한 환경변수는 RUN,CMD,ENTRYPOINT에 적용됨.
> -e <환경 변수>=<값>
```
ENV GOPATH /go
ENV PATH /go/bin:$PATH
ENV <환경변수> <값>
```

## ADD
> ADD는 파일을 이미지에 추가함.  
> ADD <복사할 파일 경로> <이미지에서 파일이 위치할 경로>  
> 컨테스트 아래를 기준으로 하여 컨테스트 바깥의 파일, 디렉토리에 절대 경로 사용 불가.
> <복사할 파일경로> 는 인터넷 URL사용가능  
> <이미지에서 파일이 위치할 경로>는 항상 절대경로  
```
ADD hello-entrypoint.sh /entrypoint.sh
ADD hello-dir /hello-dir
ADD http://example.com/hello.html /home/hello
```

## COPY
> COPY는 파일을 이미지에 추가함.   
> ADD와 달리 COPY는 압축파일을 추가할때 압축을 해제하지 않고 , 파일 URL도 사용할수 없음.    
> COPY <복사할 파일 경로> <이미지에서 파일이 위치할 경로>  
> <복사할 파일경로>는 폴더도 가능. 파일 URL불가능
```
COPY compress.tar.gz /compress.tar.gz
```

## USER
> USER는 명령을 실행할 사용자 계정을 설정.  
> RUN, CMD, ENTRYPOINT에 적용 됨.
```
USER nobody
RUN touch /tmp/hello.txt

USER root
RUN touch /hello.txt
```
