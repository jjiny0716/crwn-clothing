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

## useNavigate

버튼을 클릭했을 때 경로를 바꾸기 위해 다음과 같이 작성했었다.

```jsx
<Link to="/checkout">
  <Button>GO TO CHECKOUT</Button>
</Link>
```

- 링크를 이용하지 않고 경로를 바꿀 수 있다.
- react-router-dom에서 `useNavigate`를 가져와 사용하자.
- useNavigate가 반환하는 함수는 Link의 기능을 수행하는 함수라고 생각하면 된다.

```jsx
const navigate = useNavigate();
const goToCheckout = () => {
  navigate("/checkout");
};
<Button onClick={goToCheckout}>GO TO CHECKOUT</Button>;
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

## firebase를 이용한 인증, 회원가입, 로그인

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

### firestore 구조

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

### firebase 이용

- [소스코드](../src/util/firebase/firebase.js)로 보자.
- firebase에서 제공하는 auth나 firestore같은 기능들을 firebase.js로 추상화함.
- 이렇게 함으로써 내 앱 상황에 맞게 커스텀해서 사용이 가능하며, firebase의 어떤 기능의 사용법이 바뀌더라도 firebase.js만 수정하게될 확률이 높다.
- 앞으로 firebase의 데이터의 접근한다거나 하는 동작은 거의 모두 비동기 함수임을 유의하자.

### sign up(회원가입)

- firebase authentication에서 sign in method(구글, 페이스북, 이메일 등)을 설정하자.
- 인증을 생성하는 방법은 크게 3가지가 있다(더 있지만 강의에서 배운것만)

#### 인증 생성 방법

- 이메일, 비밀번호을 이용하는 방법

  - `createUserWithEmailAndPassword(auth, email, password)`
  - UserCredential을 반환받아, 해당 내용으로 user document를 만들 수 있음.

- popup을 이용하는 방법

  - `signInWithPopup(auth, provider)`
  - 해당 함수를 실행하면 팝업창이 뜨고, 거기서 유저가 소셜 계정을 로그인해서 인증 되면 auth가 생성됨.
  - provider는 소셜 로그인(google, github등)을 제공하는 객체라고 보면 될 것 같다.
  - `new GoogleAuthProvider()` 이런식으로 provider를 생성하고, 함수에 제공하면 된다.
  - 마찬가지로 UserCredential을 반환받아, 해당 내용으로 user document를 만들 수 있음.

- redirection을 이용하는 방법

  - 자세히 설명하진 않겠으나, redirection은 새로운 페이지로 가서 인증하고 오는 방식이라고 보면 된다.
  - 사용하는 방법이 꽤 달라서, 필요하면 95. Sign In With Redirect를 보자.

- 생성된 auth는 firebase 콘솔의 authentication탭에서 확인 가능하다.

#### collection, document 생성 방법

- 유저 auth를 생성했다면, 해당 정보를 가지고 해당 유저의 데이터(찜 목록, 결제 내역)같은 것들을 생성해야한다.
- users 컬렉션에 user의 uid를 이름으로 갖는 document와 data를 생성하면 된다.

```js
export async function createUserDocumentFromAuth(userAuth, additionalInformation = {}) {
  if (!userAuth) return;
  // google 팝업으로 부터 auth를 받아옴
  // auth에 있는 user에 있는 uid(user identifier, unique id)를 document 이름으로 이용하자.
  // doc은 document 포인터라고 생각하자.
  const userDocRef = doc(db, "users", userAuth.uid);
  // userDocRef를 이용하면 해당 document에 읽기, 쓰기등을 할 수 있다.
  const userSnapshot = await getDoc(userDocRef);

  // 데이터가 존재하지 않는 경우 생성
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      // setDoc을 이용해 데이터 쓰기를 하자!
      await setDoc(userDocRef, {
        displayName,
        email,
        createdDate,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
}
```

- 생성된 collection, document, data는 firebase 콘솔의 Firestore Database에서 확인할 수 있다.

### sign up(로그인)

- 유저가 access token을 받기위한 과정이다.
- 해당 앱에선 2가지의 방법을 사용했다.

#### sign in 방법

- 이메일, 비밀번호

  - `signInWithEmailAndPassword(auth, email, password)`
  - 유저생성과 상당히 비슷한 모양새이다.

- popup(구글)

  - `signInWithPopup(auth, googleProvider)`
  - 사실 이건 회원가입할 때와 똑같다.
  - 유저 입장에서 보면, 구글 로그인으로 따로 회원가입을 하지 않고, 그냥 로그인하던 것을 생각해보자.

- 성공적으로 로그인을 마치면, 여러 정보를 받을 수 있는데, access token이 그중 하나이다.

### sign out(로그아웃)

- `signOut(auth)`
- 반환값은 없다. (Promise를 반환)

## 생각할 점

- firebase에 종속적인 메서드들을 억지로 외우기보단, 원리를 이해하자.
- auth token, access token같은 키워드들, 인증, 회원가입, 로그인의 과정들.
- firebase가 아니더라도 다른 서비스를 이용하거나 직접 구현할 때 도움이 될 것이다.

## 코딩 테크닉

- firebase같은 서비스 추상화하여 일종의 인터페이스로 만들기
- form 필드의 value를 state에 저장하고, 그 state를 기준으로 form 필드를 렌더링 하는 것.
- button같은 기본적인 컴포넌트를 만들고, props로 타입을 받아 스타일링 적용하기(클래스 이용).

# 상태관리를 위한 React Context

- SignIn 컴포넌트에서 얻은 유저 정보를 다른 컴포넌트(세팅, 주문 내역 등)에서 사용하려면?
- App(최상위) 컴포넌트에 유저 정보를 얻는 함수를 작성하고, SignIn까지 콜백으로 전달.
- 다른 유저 정보를 필요로하는 컴포넌트에 props에 내려주면 가능하긴 하다.
- 그런데 유저 정보를 필요로 하지 않는 컴포넌트까지 props로 유저 정보를 받아야함 = props drilling
- 그냥 모든 컴포넌트에서 접근가능한 전역적인 외부 저장소를 하나 만들면 어떨까? -> Context

## 사용법

- [소스코드](../src/Contexts/User.jsx)
- createContext를 이용해 저장하고자 하는 값을 생성
- Provider로 감싼 자식 컴포넌트들에서 useContext를 이용해 값에 접근 가능
- useContext와 useState는 비슷하게 동작하는데, setter로 데이터를 바꾸면, 해당 데이터를 이용하는 컴포넌트가 다시 렌더링된다.
- 이 앱에선 index.js에서 App을 provider로 감쌌음
- 단순히 값만 저장할 수 있는게 아니라, 컴포넌트이기 때문에, 다양한 동작을 구현할 수 있다.

# firebase 옵저버 패턴

- `onAuthStateChanged(auth, callback)`으로 firebase에서 auth에 대한 옵저버 패턴을 사용할 수 있다.
- 이를 이용해 auth관련된 로직을 UserContext에 몰아줘 깔끔한 관심사 분리를 할 수 있다.

# React Context 활용

## goToNa
