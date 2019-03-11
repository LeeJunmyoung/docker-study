# Docker-monitoring - 모니터링 서버
> docker 로 서비스를 구축 했을때 서버의 cpu 메모리 사용량을 모니터링 할 필요성이 있음.
> Graphite는 서버의 자원을 모니터링 하고 그래프를 출력해주는 오픈소스 도구.
> * 이미지 생성하는데 오래걸린다. 인내심을 가지고 기다리자!!

```
#Dockerfile

FROM ubuntu:14.04

RUN apt-get update
RUN apt-get -y install curl

## 엘라스틱 서치 설치를 위해 apt-key와 echo로 공개키, 소스 리스트를 추가한다.
RUN curl -s http://packages.elasticsearch.org/GPG-KEY-elasticsearch | apt-key add -
RUN echo "deb http://packages.elasticsearch.org/elasticsearch/1.0/debian stable main" > /etc/apt/sources.list.d/elasticsearch.list
RUN apt-get update

## graphite-carbon패키지를 설치하고 carbon-cache를 사용할 수 있도록 설정함.
RUN apt-get install -y graphite-carbon
RUN echo "CARBON_CACHE_ENABLED=true" > /etc/default/graphite-carbon

## graphite-web과 apache설치
## graphite-manage로 sqlite db 파일 생성
## apache 설정을 삭제하고 graphite web용 설정파일을 복사
RUN apt-get install -y graphite-web apache2 apache2-mpm-worker libapache2-mod-wsgi
RUN sudo -u _graphite graphite-manage syncdb --noinput
RUN rm -f /etc/apache2/sites-enabled/000-default.conf
RUN cp /usr/share/graphite-web/apache2-graphite.conf /etc/apache2/sites-enabled/graphite.conf

## openjdk와 엘라스틱서치 설치 update-rc.d를 이용하여 서비스로 실행할 수 있도록 설정
RUN apt-get install -y elasticsearch openjdk-7-jre-headless
RUN update-rc.d elasticsearch defaults

## node,npm 설치 /usr/bin/nodejs 실행 파일을 /usr/local/bin/node로 심볼릭 링크
## node로 링크 안하면 중간에 에러 발생
RUN apt-get install -y nodejs npm
RUN ln -s /usr/bin/nodejs /usr/local/bin/node
## 이것도 다운.. 하다보니 에러남...
## PhantomJS(팬텀JS)는 웹 페이지 상호작용을 자동화하기 위해 사용되는 헤드리스 브라우저이다
RUN apt-get install phantomjs

## grafana소스를 받은 뒤 압축해제하고 /usr/share/grafana로 이동
RUN curl https://codeload.github.com/grafana/grafana/tar.gz/v1.7.0 | tar -xz
RUN mv grafana-1.7.0 /usr/share/grafana

## npm install 을 실행하여 grafana에 필요한 모듈 설치 , css를 생성하기 위해 grunt를 실행
WORKDIR /usr/share/grafana

# 아래와 같은 npm ssl 관련된 설정을 해줘야함. 둘중에 하나ㅊ
#npm config set strict-ssl false
#npm config set registry="http://registry.npmjs.org/" 
RUN npm install
RUN node_modules/grunt-cli/bin/grunt
RUN echo "alias /grafana /usr/share/grafana/src" > /etc/apache2/sites-enabled/grafana.conf
ADD config.js /usr/share/grafana/src/config.js

## 컨테이너가 실행 될때 entrypoint.sh가 실행되도록 설정
ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

```

```
# entrypoint.sh


#!/bin/bash

service carbon-cache start
service elasticsearch start

apachectl -DFOREGROUND

```

``` 
# config.js grafana 설정 파일
# ip는 localhost 와같은 루프백 주소는 설정하면 안된다.
# ip는 모니터링 서버ip주소이므로 서버의 도메인 또는 ip주소를 입력한다.
define(['settings'],
function (Settings) {
  "use strict";

  return new Settings({
    datasources: {
      graphite: {
        type: 'graphite',
        url: "http://ip",
      },
      elasticsearch: {
        type: 'elasticsearch',
        url: "http://ip:9200",
        index: 'grafana-dash',
        grafanaDB: true,
      }
    },
    search: {
      max_results: 20
    },
    default_route: '/dashboard/file/default.json',
    unsaved_changes_warning: true,
    playlist_timespan: "1m",
    admin: {
      password: ''
    },
    plugins: {
      panels: []
    }
  });
});
```
## 실행
```
## 이미지 생성
docker build --tag diamond .

## 시간 동기화
ntpdate time2.kriss.re.kr

## 컨테이너 실행
docker run -d --name app1 -p 80:80 -e GRAPHITE_HOST=<ip> diamond
```


# Docker-monitoring - 어플리케이션 서버
```
# Dockerfile

FROM ubuntu:14.04

RUN apt-get update
RUN apt-get install -y nginx \
    git make pbuilder python-mock python-configobj \
    python-support cdbs

RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data:www-data /var/lib/nginx

WORKDIR /tmp
RUN git clone https://github.com/BrightcoveOS/Diamond.git
RUN cd Diamond && git checkout v3.4 && make deb
RUN dpkg -i Diamond/build/diamond_3.4.0_all.deb
RUN cp /etc/diamond/diamond.conf.example /etc/diamond/diamond.conf

ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

EXPOSE 80
EXPOSE 443
```


```
# entrypoint.sh

#!/bin/bash

sed -i "s/host = graphite/host = $GRAPHITE_HOST/g" /etc/diamond/diamond.conf
diamond

cd /etc/nginx
nginx
```

