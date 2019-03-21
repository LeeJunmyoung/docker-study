# Command-option
> docker 옵션은 버전 1.3.1기준임.

## Docker 명령어 기본형식
```
docker <옵션> <명령> <매개변수>
```

* --api-enable-cors=false : API를 사용할때 CORS를 활성화 합니다.
* -b, --bridge="" : 미리 만들어 놓은 네트워크 브리지 인터페이스를 사용함. none을 설정하면 컨테이너에서 네트워크를 사용하지 않음.
* --bip="" : CIDR 표기법으로 docker0의 IP대역을 설정. -b 옵션과는 함께 사용 할 수 없음. ex) --bip="192.168.0.0/24"
* -D, --debug=false : 디버그 모드를 활성화
* --dns=[] : docker 가 사용할 DNS서버를 설정함.
* --dns-search=[] : docker가 사용할 DNS검색 도메인을 설정함. example.com을 설정하면 DNS서버에 hello를 질의하면 hello.example.com을 먼저 찾는다
* -e, --exec-driver="native" : docker 실행 드라이버를 설정. native와 lxc를 설정할 수 있음
* --fixed-cidr="" : IPv4 주소를 할당하는 대역을 고정. 이 IP대역은 -b옵셔느로 설정한 브리지 네트워크 또는 --bip로 설정한 IP대역 안에 있어야 함.
* -G, --group="docker" : 데몬 모드로 실행하면서 -H 옵션으로 유닉스 소켓을 생성했을 때 유닉스 소켓의 그룹을 설정함. "" 빈 문자열을 지정하면 그룹을 설정하지 않음.
* -H, --host=[] : 데몬 모드로 실행할 때 소켓 경로를 설정.
* --icc=true : 컨테이너 간의 통신을 활성화
* --insecure-registry=[] : 사설 인증서를 사용하여 Docker 레지스트리 서버를 구축했을 때 Docker레지스트리 서버의 도메인을 설정.
* --ip=0.0.0.0 : docker run 명령의 -p 옵션으로 포트를 외부에 노출할 때 바인딩할 기본 ip주소를 설정.
* --ip-forward=true: net.ipv4.ip_forward 활성화
* --iptables=true : 방화벽 규칙을 활성화.
* --mtu=0 : 컨테이너의 네트워크 mtu 설정
* -p, --pidfile="/var/run/docker.pid" : pid파일 경로를 설정
* --registry-mirror=[] : docker 레지스트리 미러 주소를 설정
* -s, --storage-driver="" : 스토리지 드라이버를 설정함. aufs가 기본 값이며 devicemapper, 를 사용할 수 있음.
* --selinux-enabled=false : SELinux를 활성화.
* --storage-opt=[] : 스토리지 드라이버 옵션을 설정
* --tls=false : tls를 사용.
* --tlscacert="/home/exampleuser/.docker/ca.pem" : 원격 인증에 사용할 CA 인증서 파일 경로를 설정.
* --tlscert="/home/exampleuser/.docker/cert.pem" : 인증서 파일 경로를 설정.
* --tlskey="/home/exampleuser/.docker/key.pem" : 키 파일 경로를 설정
* --tlsverify=false : tls 원격 인증을 사용. 데몬과 클라이언트 모두 인증서로 검증.
* -v, --version=false : 버전정보를 

## build
```
docker build <옵션> <docker 경로>
```
> Dockerfile 경로는 로컬 경로와 URL을 사용할 수 있고 -를 설정하면 표준 입력으로 Dockerfile내용을 받을 수 있다.

* --force-rm=false : 이미지 생성에 실패했을 때도 임시 컨테이너를 삭제
* --no-cache=false : 이전 빌드에서 생성된 캐시를 사용하지 않습니다. Docker는 이미지 생성 시간을 줄이기 위해서 Dockerfile의 각 과정을 캐시하는데, 이캐시를 사용하지 않고 처음부터 다시 이미지를 생성
* -q, --quiet=false : Dockerfile의 RUN이 샐행한 출력 결과를 표시 하지 않습니다.
* --rm=true : 이미지 생성에 성공했을 때 임시 컨테이너를 삭제.
* -t, --tag="" : 저장소 이름, 이미지 이름, 태그를 설정. <저장소이름>/<이미지 이름>:<태그>

## commit
> 컨터에너의 변경 사항을 이미지로 생성하는 commit 명령어
```
docker commit <옵션> <컨테이너이름,ID> <저장소이름>/<이미지이름>:태그
```
* -a, --author="" : "Foo Bar<foo@bar.com>"처럼 이미지를 생성한 사람의 정보를 설정.
* -m, --message="" : 변경사항에 대한 로그 메시지 설정
* -p, --pause=true : 이미지를 생성하는 동안 컨테이너를 일시 정지.

## cp
> 컨테이너의 디렉터리나 파일을 호스트로 복사하는 명령
```
docker cp <컨테이너 이름>:<경로> <호스트경로>
```

## create
> 이미지로 컨테이너를 생성하는 create명령. run 명령과는 달리 컨테이너를 생성만 할뿐 시작하지 않음.
