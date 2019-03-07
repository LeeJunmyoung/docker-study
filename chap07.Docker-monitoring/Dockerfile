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

## grafana소스를 받은 뒤 압축해제하고 /usr/share/grafana로 이동
RUN curl https://codeload.github.com/grafana/grafana/tar.gz/v1.7.0 | tar -xz
RUN mv grafana-1.7.0 /usr/share/grafana

## npm install 을 실행하여 grafana에 필요한 모듈 설치 , css를 생성하기 위해 grunt를 실행
WORKDIR /usr/share/grafana
RUN npm install
RUN node_modules/grunt-cli/bin/grunt
RUN echo "alias /grafana /usr/share/grafana/src" > /etc/apache2/sites-enabled/grafana.conf
ADD config.js /usr/share/grafana/src/config.js

## 컨테이너가 실행 될때 entrypoint.sh가 실행되도록 설정
ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
