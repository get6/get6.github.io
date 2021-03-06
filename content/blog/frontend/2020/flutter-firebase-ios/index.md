---
title: Flutter Firebase ios 연동
date: "2020-08-10"
tags: ["frontend", "flutter", "firebase", "ios"]
---

Flutter Firebase IOS 연동 설명입니다.

Android 연동은 [Flutter Firebase Android](https://get6.github.io/2020/08/10/flutter-firebase-android.html)을 참고해주세요.

#### 1. 앱 등록

IOS 번들 ID는 필수로 입력해야 합니다.

쉽게하기 위해선 Xcode로 flutter 루트 디렉토리/ios를 엽니다.

Runner 최상위 루트를 두번 클릭하면 Identity - Bundle Identifier에 지정되어 있는 이름을 넣습니다.

#### 2. 구성 파일 다운로드

GoogleService-Info.plist을 다운로드하고,

Runner/Runner안에 위치에 파일을 옮깁니다.

#### 3. Firebase SDK 추가

이 부분은 다 뛰어넘어가도 됩니다.

저는 여기에 있는 부분을 추가하니 자꾸 안되서 구글링을 했었습니다.

[Flutter 연동 가이드 영문](https://codelabs.developers.google.com/codelabs/flutter-firebase/index.html#6)을 참고 하시면 더 도움이 됩니다.
