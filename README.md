## 실행 명령어

```bash
yarn dev # 개발 모드 실행
yarn build # 빌드 실행
npx http-server out # out 폴더 참조해서 스태틱 사이트 실행
```

## VS Code 설정
패키지 매니저로 yarn berry 사용하고 있습니다.

만약 import에서 모듈을 찾을 수 없다는 에러가 나는 경우 아래 방법을 시도합니다.

```bash
yarn dlx @yarnpkg/sdks vscode
```

1. Press `ctrl+shift+p` in a TypeScript file
2. Choose "Select TypeScript Version"
3. Pick "Use Workspace Version"

## copy-image.ts 사용시 주의사항
`yarn install`을 하게되면 install-state.gz에 ts-node가 들어있는 것 같습니다.

copy-dir 명령어대로 사용하기 위해선 unplug 명령어를 통해 ts-node가 `.yarn/unplugged` 위치로 옮겨야 합니다.

```bash
yarn install
yarn unplug ts-node
yarn copy-dir # 이걸로 테스트했을 때 성공하면 "Images copied successfully! 🎉" 메시지를 볼 수 있습니다.
```

## 블로그 개발 환경

초기 세팅이 어떻게 설정되어 있는지 알려드립니다. 큰 틀에서 봤을 때 아래와 같이 구성되어 있습니다.

yarn과 next.js 명령어를 통해 빌드, 개발용 또는 프로덕션용으로 실행이 가능합니다.\
react를 통해 만들고 싶은 화면과 이벤트를 구현할 수 있고 tailwind css로 원하는 대로 스타일을 줄 수 있습니다.\
ESLint와 Prettier는 개발을 할 때 코드 퀄리티를 높이고 가독성이 좋은 코드를 만들 수 있도록 도와줍니다.

- 패키지 매니저: [yarn](https://yarnpkg.com/)
- 풀스택 웹 애플리케이션: [Next.js](https://nextjs.org/)
- 프론트앤드 라이브러리: [React](https://react.dev/)
- 개발 언어: [TypeScript](https://www.typescriptlang.org/)
- CSS 스타일: [Tailwind CSS](https://tailwindcss.com/)
- 코드 정적 분석: [ESLint](https://eslint.org/)
- 코드 포맷터: [Prettier](https://prettier.io/)
- 게시글 서식 언어: [Markdown](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4)

Next.js를 yarn 명령을 통해 설치했고 설치 과정 중에 옵션으로 Typescript, ESLint, Tailwind CSS를 사용하겠다고 설정했습니다.\
VS Code에서 개발을 할 때, 저장 시 Prettier가 적용되면 코드 라인을 통일할 수 있어서 Prettier를 추가했습니다.\
그래서 VS Code를 사용하실 때는 아래에 나온 Extension을 설치하시길 바랍니다. 이 extensions을 설치하면 개발을 할 때 많은 도움을 줍니다.

- Tailwind CSS IntelliSense
- Prettier - Code formatter
- PostCSS Language Support
- ESLint

### settings.json

VS Code에서 커맨드 팔레트(command + shift + p)를 통해 `Preferences: Open User Settings (JSON)`를 입력하면 파일이 하나 열립니다.\
저장할때마다 Prettier가 동작할 수 있도록 formatter 지정과 저장 시 foramt을 한다는 옵션을 설정하기 위해 아래 내용을 복사합니다.

```json
{
    // ...[기존 설정들에서 추가],
    "typescript.preferences.importModuleSpecifier": "non-relative",
    "editor.codeActionsOnSave": {
        "source.organizeImports": true
    },
    "[typescriptreact]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode",
    },
    "[typescript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```
