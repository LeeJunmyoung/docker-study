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
* -a, --attach=[] : 컨테이너의 표준입력(stdin), 표준출력(stdout), 표준에러(stderr)를 연결함. ex) -a=[stdin]
* --add-host=[] : 컨테이너의 /etc/hosts에 호스트 이름과 IP주소를 추가함.
* -c, --cpu-shares=0 : CPU자원 분배를 설정. 설정의 기본값은 1024이며 각 값은 상대적으로 적용됨.
* --cap-add=[] : 컨테이너에서 cgroups의 특정 Capability를 사용함. ALL을 지정하면 모든 Capability를 사용
- https://linux.die.net/man/7/capabilities
* --cap-drop=[] : 컨테이너에서 cgroups의 특정 Capability를 제외함.
* cidfile="" : cid 파일 경로를 설정. cid 파일에는 생성된 컨테이너의 ID가 저장됨.
* cidset="" : 멀티코어 CPU에서 컨테이너가 실행될 코어를 설정
* --divice=[] : 호스트의 장치를 컨테이너에서 사용할 수 있도록 연결 . <호스트 장치>:<컨테이너장치>
* --dns=[] : 컨테이너에서 사용할 DNS서버를 설정
* --dns-search=[] : 컨테이너에서 사용할 DNS 검색 도메인을 설정
* -e, --env=[] : 컨테이너에 환경 변수를 설정. 보통 설정 값이나 비밀번호를 전달할때 사용.
* --entrypoint="" : Dockerfile의 ENTRYPOINT 설정을 무시하고 강제로 다른 값을 설정.
* --env-file : 컨테이너의 환경변수가 설정된 파일을 적용.
* --expose=[] : 컨테이너의 포트를 호스트와 연결만 하고 외부에는 노출하지 않음. ex) --expose="3306"
* -h, --hostname="" : 컨테이너의 호스트 이름을 설정
* -i, --interactive=flase : 표준 입력(stdin)을 활성화하며 컨테이너와 연결 되어 있지 않더라도 표준 입력을 유지함. 보통 이옵션을 사용하여 Bash에 명령을 입력.
* --link=[] : 컨테이너끼리 연결.
* --lxc-conf=[] : LXC드라이버를 사용한다면 LXC옵션을 설정 할 수 있음.
* -m, --memory="" : 메모리 한계를 설정. <숫자><단위> 형식이며 단위는 b, k, m, g를 사용함
* --name="" : 컨테이너에 이름을 설정.
* --net="bridge" : 컨테이너의 네트워크 모드를 설정.
- bridge : Docker 네트워크 브리지에 새 네트워크를 생성.
- none : 네트워크를 사용하지 않음.
- container:<컨테이너 이름 , ID> : 다른 컨테이너의 네트워크를 함께 사용함.
- host : 컨테이너 안에서 호스트의 네트워크를 그대로 사용함. 호스트 네트워크를 사용하면 D-Bus를 통하여 호스트의 모든 시스템 서비스에 접근할 수 있으므로 보안에 취약해짐.
* -P, --publish-all=false : 호스트의 연결된 컨테이너의 모든 포트를 외부에 노출함.
* -p, --publish=[] : 호스트에 연결된 컨테이너의 특정 포트를 외부에 노출. 보통 웹서버 포트를 노출할 때 주로 사용.
- <호스트포트>:<컨테이너 포트>
- <IP 주소>:<호스트 포트>:<컨테이너 포트>
- <IP 주소>::<컨테이너 포트> 호스트포트를 설정하지 않으면 호스트의 포트 번호가 무작위 설정.
- <컨테이너 포트> 컨테이너 포트만 설정하면 호스트의 포트 번호가 무작위로 설정.
* --privileged=false : 컨테이너 안에서 호스트의 리눅스 커널 기능을 모두 사용함.
* --restart="" : 컨테이너 안의 프로세스 종료 시 재시작 정책을 설정.
- no : 프로세스가 종료되더라도 컨테이너를 재시작하지 않음.
- on-failure : 프로세스의 Exit Code가 0이 아닐때만 재시작함. 재시도 횟수를 지정할수 있음. 횟수를 지정하지 않으면 계속 재시작. ex) --restart="on-failure:10"
- always : 프로세스의 Exit Code와 상관없이 재시작.
* --security-opt=[] : SELinux, AppArmor 옵션을 설정.
- --security-opt="label:level:TopSecret"
* -t, --tty=false : TTY모드(pseudo-TTY) 를 사용. Bash를 사용하려면 이 옵션을 설정해야함. 이옵션을 설정하지 않으면 명령을 입력할 수는 있지만 쉘이 표시 되지 않음.
* -u, --user="" : 컨테이너가 실행될 리눅스 사용자 계정 이름 또는 UID를 설정.
* -v, --volue=[] : 데이터 볼륨을 설정. 호스트와 공유할 디렉터리를 설정하여 파일을 컨테이너에 저장하지 않고 호스트에 바로저장. 호스트 디렉토리 뒤에 :ro, :rw 를 붙여서 읽기 쓰기 설정을 할수 있음.
* --volue-from=[] : 데이터 볼륨 컨테이너를 연결하며 <컨테이너 이름, ID>:<ro, rw>형식으로 설정.
```
# docker create -i -t --name hello ubuntu:14.04 /bin/bash
```

## diff
> 컨터에너에서 변경된 파일을 확인하는 명령어
> 변경된 파일을 비교하는 기준은 컨테이너를 생헝한 이미지 내용.
> A: 추가된 파일, C: 변경된 파일, D: 삭제된 파일
```
docker diff <컨테이너 이름, ID>
```

## events
> docker서버에서 일어난 이벤트를 실시간으로 출력하는 명령
```
docker events
```
* --since="" : 특정 timestamp 이후의 이벤트를 출력
* --until="" : 특정 timestamp까지 이벤트를 출력
  
## exec
> 외부에서 컨테이너 안의 명령을 실행하는 명령어
```
docker exec <옵션> <컨테이너이름, ID> <명령> <매게변수>
```
* -d, --detach=false : 명령을 백그라운드로 실행.
* -i, --interactive=flase : 표준 입력(stdin)을 활성화 하며 컨테이너와 연결(attach)되어 있지 않더라도 표준 입력을 유지.
* -t, --tty=false : tty모드(pseudo-TTY)를 사용. Bash를 사용하려면 이 옵션을 설정 해야함. 이 옵션을 설정하지 않으면 명령을 입력할수는 있지만 쉘이 표시 되지 않음.

## export
> 컨테이너의 파일시스템을 tar파일로 저장하는 명령.
```
docker export <컨테이너 이름, ID>
```

## history
> 이미지의 히스토리를 출력하는 명령. 
```
docker history <옵션> <이미지 이름, ID>
```
* --no-trunc=false : 내용이 길어서 생략된 부분을 모두 출력
* -q, --quiet=false : 이미지 ID만 출력.

## images
> 이미지 목록을 출력하는 명령
```
docker images <옵션> <이미지 이름>
```
* -a, --all=false : 부모 이미지까지 모두 표시함.
* -f, --filter=[] : 출력 결과 필터를 설정. "dangling=true"를 설정하면 이름이 없는 이미지만 출력함.
* --no-trunc=false : 내용이 길어서 생략된 부분을 모두 출력함.
* -q, --quite=false : 이미지 ID만 출력.
- 이름 없는 이미지를 모두 삭제 명령어 > docker rmi $(docker images -f "dangling=true" -q)

## import
> tar로 압축된 파일시스템으로부터 이미지를 생성하는 import 명령.
> tar 파일의 URL을 설정할수 잇고, -를 설정하면 표준입력으로 tar 파일의 내용을 받을수 있음.
```
docker import <tar 파일의 URL 또는 - > <저장소 이름>/<이미지 이름>:<태그>

# 해당 파일로 이미지를 생성하려면
cat hello.tar | docker import - hello

# 현재디렉토리에서 이미지로 생성하려면
tar -c . | docker import - hello
```

## info
> 현재 시스템 정보와 docker 컨테이너, 이미지 개수 , 설정 등을 출력하는 명령어
```
docker info
```

## inspect
> 컨테이너와 이미지의 세부 정보를 JSON형태로 출력하는 명령.
```
docker inspect <옵션> <컨테이너 또는 이미지 이름, ID>

# 컨테이너의 ip주소를 출력
docker inspect -f "{{ .NetworkSettings.IPAddress }}" hello
```
* -f, --format="" : 지정한 정보만 출력.

## kill
> 컨테이너에 KILL시그널을 보내 컨테이너를 종료하는 명령
```
docker kill <옵션> <컨테이너 이름, ID>
```
* -s, --signal="KILL" : 특정 시그널을 보냄.

## load
> tar 파일로 이미지를 생성하는 load 명령.
```
docker load <옵션>
```
* -i, --input="" : 표준 입력을 사용하지 않고 파일 경로를 설정하여 이미지를 생성.

## login
> Docker 레지스트리에 로그인 하는 명령
```
docker login <옵션> <도커 레지스트리 URL>
```
* -e, --email="" : 로그인 할때 사용할 이메일설정.
* -p, --password="" : 로그인할때 사용할 비밀번호를 설정.
* -u, --username="" : 로그인할때 사용할 도커 레지스트리 계정을 설정.

## logout
> 도커 레지스트리에서 로그아웃하는 명령
```
docker logout <docker 레지스트리 서버 URL>
```

## logs
> 컨테이너 로그를 출력하는 명령
```
docker logs <컨테이너 이름, ID>
```
* -f, --follow=false : 로그를 실시간으로 계속 출력함
* -t, --timestamps=false : 로그 앞에 시간 값을 표시함
* --tail="all" : 숫자를 지정하여 최종 로그에서 일정 개수만 출력

## port
> 컨테이너에서 포트가 열려 있는지 확인하는 명령어
```
docker port <컨테이너 이름, ID> <포트>
```

## pause
> 컨테이너에서 실행되고 있는 모든 프로세스를 일시 정지하는 명령어
```
docker pause <컨테이너 이름, ID>
```

## ps
> 컨테이너 목록을 출력하는 ps 명령.
```
docker ps <옵션>
```
* -a, --all=false : 모든 컨테이너를 출력함. 도커 ps 명령은 기본적으로 시작된 컨테이너만 출력
* --before="" : 특정 컨테이너가 생성되기 전에 생성된 컨테이너를 출력. 정지된 컨테이너도 포함.
* -f, --filter=[] : 출력필터를 설정
* -l, --latest=false : 가장 마지막에 생성된 컨테이너를 출력. 정지된 컨테이너 포함.
* -n=-1 : 숫자를 지정하여 최근에 생성된 컨테이너를 일정개수만 출력 정지된 컨테이너 포함.
* --no-trunc=false : 내용이 길어서 생략된 부분을 모두 출력
* -q, --quite=false : 컨테이너 ID만 출력.
* -s, --size=false : 컨테이너에서 변경된 데이터의 크기를 출력.
* --since="" : 특정 컨테이너가 생성된 후에 생성된 컨테이너를 출력. 정지된 컨테이너도 포함.

## pull
> 도커 레지스트리에서 이미지를 받아오는 명령
> 저장소 이름에는 도커 허브 사용자명을 지정 할 수도 있고, 저장소 주소를 지정할수 있음.
> 공식 이미지는 도커허브 사용자명을 생략하고 이미지 이름만 지정
> 태그를 지정하지 않으면 태그가 붙은 모든 이미지를 받음.
```
docker pull <옵션> <저장소이름>/<이미지 이름>:<태그>
```
* -a, --all-tags=false : 이미지의 모든 태그를 받아옴.