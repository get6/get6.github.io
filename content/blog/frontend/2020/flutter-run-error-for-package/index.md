---
title: 플러터 project 위치 변경 후 에러
date: "2020-07-31"
tags: ["frontend", "flutter"]
---

맥에서 Flutter 프로젝트를 사용하고 있었는데 윈도우즈 workspace 폴더 만들듯이 Documents안에다가 폴더들을 만들어놨었다.

그러면 맥은 iCloud Drive에 항상 동기화하려고 해서 조금 느린거같기도 하고 아이폰에서 볼때마다 찝찝해서 \$HOME에 Development 폴더로 모두 옮겼다.

Flutter도 기존 Documents에 들어있어서 Android Studio에서 Flutter 프로젝트를 실행하려고 하니 기존 Path와 달라 에러가 나는거 같았다.

새로만든 프로젝트들은 괜찮았지만 기존 프로젝트들은 옛날 Flutter PATH를 기억하고 있는거 같았다.

결국 구글링을 통해 해결하였다.

Flutter SDK PATH를 Project structure에 등록합니다. (그러면 Dart SDK도 등록됨.)

문제가 되는 프로젝트에 최상위 루트에 .packages가 존재한다. .gitignore에 등록되어있는 그겁니다.

<img src="./images/flutter-pacakges.png" alt="flutter .packages" style="width:50%;" />

해당 파일을 지운 뒤 pubspec.yaml을 열어 상단에 pub get을 실행시킵니다.

이제 프로젝트를 run 하면 정상적으로 동작!
