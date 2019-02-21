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