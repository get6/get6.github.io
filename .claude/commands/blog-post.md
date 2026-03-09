# /blog-post - 블로그 글 작성

사용자가 제공한 내용(붙여넣은 글, 주제, 키워드 등)을 토대로 블로그 게시글을 작성하는 스킬이에요.

## 사용법

```
/blog-post <주제 또는 붙여넣은 글>
```

## 실행 순서

### Step 1: 파일 생성

`blog/posts/` 폴더에 새 마크다운 파일을 생성해요.

**파일명 규칙**: `YYYYMMDDHHmm.md` (현재 시간 기준, zettelkasten ID)

예시: `202603092230.md`

현재 시간은 `date +%Y%m%d%H%M` 명령으로 확인해요.

### Step 2: Frontmatter 작성

```yaml
---
title: <글 제목>
date: YYYY-MM-DD HH:mm
tags:
  - <태그1>
  - <태그2>
---
```

- `title`: 글의 핵심을 담은 간결한 한국어 제목
- `date`: 파일 생성 시점 (`YYYY-MM-DD HH:mm` 형식)
- `tags`: 글의 주제를 나타내는 소문자 영어 태그 (1~3개)

### Step 3: 대표 이미지

Frontmatter 바로 아래에 Unsplash 랜덤 이미지를 넣어요.

```markdown
![photo by {작가명}({작가 Unsplash URL}) on Unsplash]({이미지 URL})
```

이미지 URL 형식:

```
https://images.unsplash.com/photo-{ID}?crop=entropy&cs=srgb&fm=jpg&ixid={ixid}&ixlib=rb-4.1.0&q=85&w=800&h=460
```

> **중요**: Unsplash API 또는 `https://source.unsplash.com/random/800x460/?landscape` 를 활용해서 실제 이미지 URL을 가져와요. API 접근이 안 되면 이미지 부분은 비워두고 사용자에게 Obsidian에서 Templater로 이미지를 추가하도록 안내해요.

### Step 4: 본문 작성

사용자가 제공한 내용을 토대로 블로그 글을 작성해요.

#### 문체 규칙

- **"~요" 체**를 사용해요 (존댓말이되 부드럽고 친근하게)
- 읽기 쉬운 형태로 친절하게 쓴 글로 느껴져야 해요
- 독자에게 말을 거는 듯한 톤을 유지해요

#### 구조 규칙

- `##` (h2)로 주요 섹션 구분
- `###` (h3)로 세부 내용 구분
- 코드 블록은 언어 지정 (`kotlin, `typescript 등)
- 표(table)는 필요할 때만 사용
- **굵은 글씨**로 핵심 키워드 강조
- 적절한 줄바꿈으로 가독성 확보 (한 문단은 2~3문장)

#### 내용 규칙

- 붙여넣은 원문의 핵심 정보를 빠짐없이 포함
- 원문이 기술 문서라면 실용적인 예제 코드 포함
- 원문이 에세이/칼럼이라면 자연스러운 흐름으로 재구성
- 단순 번역이 아니라 **독자가 이해하기 쉽게 재작성**
- 도입부에서 글의 맥락을 간결하게 설명
- 마무리에서 핵심을 요약하거나 다음 행동을 제안

### Step 5: 마무리 인용문

글 본문 끝에 구분선과 명언 인용을 넣어요.

```markdown
---

> [!quote] {영어 명언}
> — {저자}
```

글의 주제와 관련된 영감을 주는 영어 명언을 선택해요.

## 예시 출력

```markdown
---
title: 좋은 작업 흐름의 선순환
date: 2026-02-17 10:28
tags:
  - zettelkasten
  - methodology
---

![photo by Roma R(https://unsplash.com/@n3moy) on Unsplash](https://images.unsplash.com/photo-...)

좋은 작업 흐름은 선순환으로 쉽게 바뀌어요.
마치 운동에 중독된 것처럼 **하루라도 운동을 하지 않으면 개운하지 않은 느낌**이 들 때가 있잖아요.

## 몰입이 만들어내는 자연스러운 동기부여

처음에는 단지 해야 할 일이었는데, 어느 순간 그 일이 **나를 성장시키는 루틴**이 되기도 해요.

### '다시 하고 싶은 경험'을 찾아야 해요

사람마다 그 **무언가**는 달라요.
누군가에게는 글쓰기일 수 있고, 또 다른 사람에게는 개발일 수도 있어요.

---

> [!quote] The only way to do great work is to love what you do.
> — Steve Jobs
```

## 주의사항

- 파일은 반드시 `blog/posts/` 폴더에 생성
- 파일명은 반드시 `YYYYMMDDHHmm.md` 형식
- 이미 같은 파일명이 존재하면 분 단위를 +1 해서 충돌 회피
- 기존 게시글의 톤과 형식을 일관되게 유지
- 사용자가 제공하지 않은 내용을 임의로 추가하지 않기

$ARGUMENTS
