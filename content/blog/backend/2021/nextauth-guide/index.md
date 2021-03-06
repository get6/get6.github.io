---
title: Next.js로 Admin 만들기
date: "2021-01-16"
description: "간단한 Admin 사이트 만드는 용도"
tags: ["backend", "next.js"]
---

# Next.js를 활용해보자!

인원이 10명인 정도인 회사 직원들의 휴가 사용내역을 보여주는 휴가 관련 페이지를 만들게 됐습니다.

제가 해야될 것은 처음에는 프로토타입이라 단순히 구글 캘린더 API를 호출해 직원별로 사용 휴가를 보여주는 것이었습니다.

혼자서 다해야하기 때문에 이왕 할 거 Node.js가 서버 구성해 본 적은 없어서 배워보면서 해보자고 시작했습니다.

저는 VSCODE + Typescript + React + Next.js를 구성으로 시작해 Material-UI + NextAuth.js + Prisma + MySQL 조합으로 진행했습니다.

그러나 캘린더 API를 가져오기 위해선 구글 accessToken이 필요했고 Next.js로 서버를 구성했기 때문에 Next.js에서 추천하는 NextAuth.js라는 솔루션을 사용해보기로 했습니다.

## NextAuth.js

인증을 쉽게 구현할 수 있도록 도와주는 솔루션입니다. [링크](https://next-auth.js.org/)

저는 구글인증만을 필요로 했기 때문에 Google API console에 OAuth 2.0 클라이언트 ID를 만들고 .env.local에 GOOGLE_ID, GOOGLE_PASSWORD에 값을 넣으면 기본적으로 끝이납니다.

이후 추가적인 동작을 위해선 진행방식을 알아야 하지만 간단하게 돌아가는데에는 문제가 없습니다요.

## 이슈

다만 몇가지 이슈가 있었습니다..

1. 서버 내에 새로운 Access Token이 발급되지만 Google Access Token을 받아오기 위해선 커스텀 또는 DB 호출이 필요함.
2. 로그인 페이지에서 로그인 후 로그인 페이지로 이동(해결)
3. refresh_token이 만료되는 경우 refresh 핸들링(대체방안)

### Google Access Token 얻어오기

NextAuth.js로 쉽게 인증 부분을 마쳐서 사용이 쉬울거라 생각했지만, Session 객체를 가져와도 객체 내에선 Google Access Token은 없었습니다.

결국 가져오려면 DB 통신을 해야하거나, 우리가 만든 access_token 값을 로그인 후 구글 토큰이랑 교환해야하면 됬습니다.

이 방법은 한가지의 간편 로그인을 쓴다면 할 수 있겠지만 다수인 경우는 애매하기 때문에 그렇지 않았습니다.

저는 Server-side에서 캘린더 목록을 가져오고 화면진입을 하면 로딩없이 바로 보여주고싶었기 때문에 Next.js의 getServerSideProps 함수를 사용해 API 요청을 하려고 했습니다.

문제는 DB통신을 어떻게 하냐인데 사실 Node.js는 express 예제로 DB 커넥션을 db.js 이런 파일로 만들어 커넥션 풀을 가져와서 CRUD 작업을 하는 방법말고는 몰랐어요.

분명 Next.js에서는 DB 통신 방법이 있을거라 생각했는데(SSR 프로젝트니깐..) 공식 문서에서 관련된 자료를 찾기 어려웠습니다.(제가 못찾은 것일수도..ㅠㅠ)

NextAuth.js는 연결된 DB에 자동으로 테이블을 생성해주는 편하지만 왜 되는지 모르는 기능을 제공하고있어요.

TypeORM을 사용해 처리를 한다곤 하는데 Spring JPA마냥 러닝커브가 깊어보여 아직 배우진 못했어요.

또 추천으로 Prisma라는 멋진 ORM 오픈 소스 프로젝트를 알려줘서 이것을 사용하기로 했어요.(TypeORM 보다 확실히 쉬워보였습니다.)

### 로그인 페이지 이동 해결

로그인 페이지에서 로그인이 완료되면 저는 /login -> / 페이지로 와야합니다.

그러기 위해선 [...nextauth].ts 파일에서 json 구조에 redirect를 추가해야합니다.

```typescript
const options = {
    ...다른 코드들 ex) providers, database

    callbacks: {
        redirect: async (_url: string, baseUrl: string) => {
            return Promise.resolve(baseUrl);
        },
  },
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
```

이 baseUrl은 .env.local에 있는 NEXTAUTH_URL 값입니다.

### Refresh_token 핸들링 방법

저는 Caneldar API KEY로 데이터를 받아왔기 때문에 refresh_token이 필요없어졌지만 Google Drive같이 사용자가 직접 접근하려면 사용자의 권한이 필요한 경우가 있습니다.

refresh_token이 만료되면 재갱신해야하기 때문에 NextAuth.js 이슈에 누군가가 해결 해 놓은 방법을 알려드립니다. [해결방안](https://github.com/nextauthjs/next-auth/issues/1162#issuecomment-768204595)

## Prisma

Prisma는 ORM 오픈소스로 DB연동을 매우 편하게 해줘요! [링크](https://www.prisma.io/)

.prisma라는 확장자를 사용하고 VSCODE에 Extension에도 있어요.

### Prisma 이슈

1. vscode에서 Format Document 이슈

    저만 그런지 몰라도, 현재 Prettier가 .prisma에도 적용이되는데 지원 format이 없어서 제대로 안되요.

    Prettier를 ignore하는 방법이 있다고 하던데 .prettierignore를 만들어봐도 잘 안됩니다.

    저는 settings.json에서 아래 코드를 주석처리하니 format은 되더라구요.

    `// "editor.defaultFormatter": "esbenp.prettier-vscode",`

2. Linux 2.18 이전 버전에서 사용이 불가

    2021-01-26에 확인했을 때, `npx prisma generate` 명령 실행 시 오류가 발생했습니다.

    `ldd --version`를 입력했을 때 `ldd (GNU libc) 2.17`이어서 glibc 2.18 이전버전인 경우는 Pisma를 사용할 수 없었던 이슈였습니다.

    aws ec2 spot instance를 사용 중인 리눅스가 저런 버전이어서 Prisma를 위해 ubuntu instance를 새로 생성했습니다.

### 러닝커브

Prisma 역시 학습이 필요하기 때문에 공식 홈페이지를 보면 공부가 필요합니다.

그렇지만 생각보다 많이 어렵지 않고 DB connection도 엄청 쉬워서 CRUD를 편하게 할 수 있을거 같습니다.

프로젝트가 커지면 schema 분배나 이런 것도 잘 고려해야할 것 같습니다.
