---
tags:
  - ebs
  - 위대한 수업
---

```javascript
function getSubtitleSrc() {
	var subtitleUrl = ''
	for (var i = 0; i < source.length; i++) {
		if (source[i].subtitle) {
			for (var j = 0; j < source[i].subtitle.length; j++) {
				if (source[i].subtitle[j].code === 'KO') {
					subtitleUrl = source[i].subtitle[j].src
				}
			}
		}
	}
	var downloadUrl = window.location.origin + subtitleUrl
	window.open(downloadUrl, '_blank')
	window.open('https://gotranscript.com/subtitle-converter', '_blank')
}
getSubtitleSrc()
```

## 영상 보러 가기
강의자 - 제목
- 1강 
- 2강 
- 3강 
- 4강 
- 5강 
## 1강 
> 


### 1강 강의 정리


## 2강 
> 


### 2강 강의 정리


## 3강 
> 


### 3강 강의 정리


## 4강 
> 


### 4강 강의 정리


## 5강 
> 


### 5강 강의 정리