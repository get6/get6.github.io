---
title: 저장소마다 user 설정
date: "2019-09-18"
description: "git config command로 변경하자"
tags: ["others", "git", "github"]
---

회사 PC에 gitlab계정과 git을 설치하고 내 github 레포지토리도 한 pc에 가져왔다.

점심시간마다 vue, python 공부를 하는데 github에 올릴 때 마다 회사계정으로 올라가 내 개인계정 히스토리에는 커밋을 안했다는 표시 때문에 이리저리 알아봤다.

[이 URL](https://www.freecodecamp.org/news/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca/)을 따라하는 와중에
ssh-keygen을 통해 개인용, 회사용을 따로 세팅한다고 하는데
나는 집에 ssh key가 있고 회사에는 없는데 4번째에서 따라갈 수가 없었다.

설정하는 와중에 git config user.name과 user.email이 git 서버에 등록된 내 계정들인가 생각이 들었고
전에 gitlab에는 회사 PC ssh key를 등록했고 github에도 내 ssh key를 등록한 기억이 있었다.

결국 포기해야하나 싶었는데 4번째에 막혀서 포기해야하나 싶었는데 [여기에서](https://help.github.com/en/github/setting-up-and-managing-your-github-user-account/setting-your-commit-email-address) 글로벌 계정과 각 repository에 계정 설정을 할 수 있었다.

먼저 저장소 디렉토리로 들어가 .git 폴더에 config파일을 vscode로 연다.

```git
[user]
name = get6
email = ittae.com@gmail.com
```

마지막에 추가했다.

그리고나서 github desktop 프로그램을 실행시키는 내 개인계정 이미지가 나오기 시작했다 야호!

설정 중에 알아낸건데

```git
git config --global user.name = get6
```

이렇게 하면 user.name에 = 이 등록된다

```git
git config --global user.name "get6
```

이렇게 하면 이미 설정된 이름이 있어

```git
More than one value for the key user.name Git
```

이렇게 경고가 뜨고 실행이 안된다. 그럴땐

```git
git config --global --replace-all user.name get6
```

이런 식으로 해주면된다.

---

2020-10-22일 블로그를 Gatsby로 바꾸면서 한 번씩 글을 살펴봤다가 추가할 내용이 있어 적는다.  
git 저장소별 user를 다르게 하려면 --global을 빼도 된다. 기본이 local..

```git
git config user.name get6
```
