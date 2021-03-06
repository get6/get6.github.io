---
title: EC2에서 NVM Permission Denied 해결
date: "2020-04-09"
tags: ["devops", "aws", "ec2"]
---

AWS 인프라 구축 가이드 책을 보면서 실습 중이었는데 오류가 나서 당황했던 상황을 올려봅니다.

nvm을 명령어로 설치합니다.

```bash
sudo curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.1/install.sh | bash
```

그 다음 명령어를 입력했으나 오류가 났습니다.

![nvm 에러](./images/ec2-nvm.png)

꼭 ~/ 앞에 . 을 붙여주셔야 합니다.

```bash
. ~/nvm/nvm.sh
```

ubuntu에서  
~/은 현재 홈 디렉토리입니다. 저의 경우는 /Users/sjhwang/ 입니다.

.은 커맨드를 읽고 실행시킵니다.  
source 명령어와 같은 역할을 합니다.

```bash
 . filename [arguments]
 source filename [arguments]
 두 개는 같습니다.
```
