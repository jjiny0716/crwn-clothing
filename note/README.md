# 강의 노트

강의 링크: https://www.udemy.com/course/complete-react-developer-zero-to-mastery/

# 프로젝트 셋업

## npx create-react-app

- npx create-react-app으로 리액트 프로젝트를 설치할 수 있다.
- npx 명령어는 패키지를 다운받아 실행한 후 삭제함.
- 일회성 명령이므로 패키지 관리(위치, 버전)등을 신경쓸 필요가 없다.

## sass

- yarn add sass로 설치
- 리액트 앱에서 sass 스타일링을 렌더링할 수 있게 해줌.
- scss는 sass의 타입중 하나.
- css를 중첩된 구조로 작성할 수 있게 해준다.

## 스타일 전달하기

style에 object를 전달하여 인라인 스타일 구현 가능

```js
<div
  className="background-image"
  style={{
    backgroundImage: `url(${imageUrl})`,
  }}
></div>
```
