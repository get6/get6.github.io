---
title: 새롭게 단장한 블로그를 소개합니다!
date: "2020-12-10"
description: "Jekyll에서 GatsbyJS로 넘어오면서 고민했던 것들"
tags: ["frontend", "react",]
---

Jekyll로 쭉 사용해오다가 나는 루비를 잘 모르는데 입맛대로 바꾸고 싶었는데 러닝커브가 있어서 내 맘대로 안됬다.

그러던 어느 날, GatsbyJS로 정적 사이트를 만들어주는 프레임워크가 있는데 이게 블로그용으로 좋다는 글을 보게 되었다.

호기심이 생겨 Gatsby 튜토리얼을 해보고 블로그를 통으로 바꿀 계획을 했다.

이전에 Bootstrap을 사용해봣을 때, col로 요소의 크기를 제어하는 것이 마음에 들어 Reactstrap을 사용하다가 index.js 화면에 꾸밀 용도로 Jumbotron을 사용했다.

Junboton border를 랜덤함수로 게시글 마다 색깔을 다양하게 적용하고 만족하고 있었는데 나중에 다크모드를 적용해보니 Reactstrap은 다크모드를 설정을 편하게 바꾸는 방법을 찾지못했다.

값을 일일히 바꾸는게 꽤나 힘들어서 이보다 더 쉬운 방법을 제공하는 Material-UI를 사용하기로 결정했었다.

(지금 생각해보면 어디엔가 방법이 있었을 텐데 Reactrap을 사용하면서 불편함이 쌓여갔던것 같다)

Material은 Flutter를 만지면서 Google의 디자인 철학으로 여러 언어에서 지원해줬기 때문에 이번에 알아두면 두고두고 써먹을 것 같아서 좋을 것 같았다.

Material-UI로 바꾸면서 Card의 사요이 생각보다 많고 Typography도 자주 사용하게 되는 걸 알게되었다.

또 gatsby-plugin-typography를 사용하니 background-image가 margin이 적용되어 하단에 붙질 않아 background-image css에 아래처럼 지정해서 해결했다.

```css
marginBottom: 0,
```

> 다크모드

Redux가 유명해서 Redux로 알아보고있었는데 true, false인 값만 바꾸면되는데 이게 여러 파일을 만들고 붙여주는게 과한 느낌이었다.
검색을 해보니 MobX는 조금 더 쉽게 직관적으로 만들어졌다고 해서 MobX로 해보기로 결정했다.(개인적으로 MobX 가이드 사이트는 불친절한 것 같았다)

MobX를 사용해서 다크모드를 구현하고 싶었으나 MobX + GatsbyJS + Material-UI 조합이 구현을 어렵게 만들었다.
결국 내가 아직 react + 상태 관리 + Material-UI 이해가 부족한 것 같아서 상태 관리 라이브러리를 사용하지 않았다.
나는 createContext 함수를 이용하는 [이 링크](https://www.gatsbyjs.com/blog/2019-01-31-using-react-context-api-with-gatsby/)에 나와있는 방법을 통해 다크모드 기능을 구현했다.

> 스크롤 기능

Material-UI 컴포넌트와 gatsby-plugin-smoothscroll 기능을 이용해 애니메이션 효과를 구현했다.

> Atomic Design

나는 Flutter도 그렇고 React 등 모든 프로젝트에서 프로젝트 구조가 굉장히 단순하면서도 쉽게 찾아갔으면 좋겠다고 생각했다.

스프링으로 프로젝트를 할 때도, Domain별로 Controller, Service, Repository, Model 같은 폴더를 각각 만들어 활용하는 걸 좋아했다.

[이 디자인](https://bradfrost.com/blog/post/atomic-web-design/)은 내가 잘 모르는 화학에서 유래한 방법으로 작은 단위가 모여 점점 큰 단위로 만들어 하나의 완성을 만들어가는 All for one, one for All 같은 느낌을 주었다.

---
GatsbyJS로 옮겨가면서 꽤 오랜시간 부딪혀가며 많은 에러를 부딪히며 만들어갔다.

다 끝내고 글을 쫙 써봐야지 했지만, 이거보다 더 많은 일들이 있었지만 잊어버려서 쓸게 적어져서 슬프다ㅜㅜ

앞으로도 블로그 생활을 더 열심히해야겠다.
