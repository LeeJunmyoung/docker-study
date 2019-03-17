# Pull base image
FROM ubuntu:14.04

# apt-get으로 mysql설치시 비밀번호를 생략하기 위한 환경변수 설정
ENV DEBIAN_FRONTEND noniteractive

# Mysql install
RUN \
    apt-get update && \
    echo "mysql-server mysql-server/root_password password" | debconf-set-selections && \
    echo "mysql-server mysql-server/root_password_again password" | debconf-set-selections && \
    apt-get install -y mysql-server

# Mysql bind address 설정 
WORKDIR /etc/mysql
RUN sed -i "s/127.0.0.1/0.0.0.0/g" my.cnf

# volume 설정
# VOLUME ["/var/lib/mysql"]
# docker inspect [컨테이너 명]으로 연결된 볼륨디렉토리 경로를 찾을수 있음.

# entrypoint.sh 추가 후 실행
ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 3306

ENTRYPOINT /entrypoint.sh

## build
## docker build --tag mysql

## run
## docker run -it --name db -p 3306:3306 -e PASSWORD=1234 mysql