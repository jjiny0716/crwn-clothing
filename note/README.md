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

## 폰트 설정하기

- google font에서 원하는 폰트 추가하고, index.html, css에 설정하기
- 해당 링크가 하는 일은 css를 추가하고, 폰트를 가져오는 것.
- index.html파일은 public에 있음.

## package-lock.json, yarn.lock

- 의존성 버전들을 관리하는 파일임.
- 남들과 협업할 때 우리가 사용하는 모든 라이브러리들의 버전을 같은 버전으로 동기화? 해준다고 보면 됨.
- package-lock.json은 create-react-app에서 npm을 사용하기 때문에 생긴 것.
- yarn을 사용하고 있다면 yarn.lock만 있어도 됨.

# 라우팅, React-Router

- 라우팅이란 URL에 따라 페이지(특정 컴포넌트)를 렌더링 하는 것
- 링크 클릭, URL 입력, 앞으로가기, 뒤로가기에 따라 해당 루트에 맞는 화면을 보여준다.
- 이를 구현할 수 있게 해주는 것이 React-Router
- [공식 문서](https://reactrouter.com/)

## React-Router 설치, 업데이트

- yarn add react-router-dom@6 으로 설치
- 현재 버전 6까지 나옴.
- 이전 버전(5 이하)와 호환이 되지 않음.
- 라이브러리가 업데이트 되었는데 이전 버전과 호환이 되지 않는 경우가 있음.
- 이럴땐 공식문서를 참고해서 하나씩 바꿔가면 된다.

## 기본 설정

- BrowserRouter는 history API를 이용해 URL과 UI를 동기화하는 라우터이다.
- App 컴포넌트를 BrowserRouter로 감싸면 내부에서 라우팅을 이용할 수 있다.

```jsx
import { BrowserRouter } from "react-router-dom";

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

## Routes, Route

- Routes에 여러개의 Route가 들어감
- Route는 path, element를 받는다.
- path가 해당 Route와 같을때 element를 렌더링함.
- Route를 열고 내부에 Route를 넣음으로써 중첩 라우팅이 가능하다.
- path에 index를 줘서 중첩 라우팅 구조에서 기본적으로 렌더링할 컴포넌트를 정할 수 있다.

```jsx
import { Routes, Route } from "react-router-dom";

return (
  <Routes>
    <Route path="/" element={<Navigation />}>
      <Route index element={<Home />} />
      <Route path="shop" element={<Shop />} />
    </Route>
  </Routes>
);
```

## Outlet, Link, Fragment

- Outlet으로 Route를 중첩했을 때 자식 컴포넌트를 특정 위치에 렌더링시킬 수 있다.
- Link는 기본적으로 anchor(a) 태그이나, 라우팅을 위한 기능을 수행하며, to = href라고 생각하면 됨.
- 컴포넌트는 기본적으로 최상위에 하나의 엘리먼트만 있을 수 있고, 여러개를 놓고 싶을 때 최상위에 Fragment를 사용.
- Fragment는 실제 렌더링될 때 사라진다.

```jsx
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

return (
  <Fragment>
    <div className="navigation">
      <Link className="logo-container" to="/">
        <CrwnLogo />
      </Link>
      <div className="nav-links-container">
        <Link className="nav-link" to="/shop">
          SHOP
        </Link>
      </div>
    </div>
    <Outlet />
  </Fragment>
);
```

## svg 사용하기

- ReactComponent as svg를 이용해 svg를 리액트 컴포넌트처럼 사용할 수 있다.

```jsx
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
<CrwnLogo />;
```

## 디폴트 스타일링

- \*를 이용한다거나, 전체 a태그에 스타일링을 하고 싶을 때, index.css에 써주자.
- 이외에도 디폴트 스타일링은 index.css에 써주자.
- 물론 다른 css 파일에 써도 되지만 작동은 하나, 의미적으로 봤을 때 디폴트 스타일링은 index.css에 써주는게 맞다.

# 인증 + firebase

## firebase

- 구글이 제공하는 데이터베이스 관련 서비스
- 공식 사이트에서 프로젝트를 만들어야 함
- yarn add firebase로 설치

## 인증

### CRUD

- Create - 데이터 생성
- Read - 데이터 읽기
- Update - 데이터 업데이트하기
- Delete - 데이터 제거하기

### 구글계정을 이용한 로그인 과정

1. 구글 로그인을 하고, auth token을 받아옴.
2. 로그인시 서버에 구글에게 받은 auth token을 전달함.
3. 서버는 구글에게 auth token을 전달하여 해당 auth token이 유효한 값인지 확인함.
4. 확인후 서버는 클라이언트에게 access token을 보내줌.
5. 클라이언트가 access token과 특정 명령(read, delete등)을 서버에 보냄.
6. 서버는 해당 access token이 명령에 대한 권한을 가지고 있는지 확인 후, 해당 명령 실행

## firestore 구조

기본적으로, schemaless라고 하는데, 사실상 json이라고 생각하면 될 것 같다.

- collection
  - 폴더
  - ex) Shoes
- document
  - 파일 이름
  - unique string
  - ex) NikeAirMax, AdidasNMD
- data
  - document 내부의 실제 데이터
  - json이라고 생각하자.

## firebase 이용

- [소스코드](../src/util/firebase/firebase.js)로 보자.
