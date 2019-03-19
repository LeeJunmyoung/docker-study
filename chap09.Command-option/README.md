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
