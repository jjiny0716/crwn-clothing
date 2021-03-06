# 강의 노트

강의 링크: https://www.udemy.com/course/complete-react-developer-zero-to-mastery/

# 프로젝트 셋업

## npx create-react-app

- npx create-react-app으로 리액트 프로젝트를 설치할 수 있다.
- npx 명령어는 패키지를 다운받아 실행한 후 삭제함.
- 일회성 명령이므로 패키지 관리(위치, 버전)등을 신경쓸 필요가 없다.
  action = {} as CategoriesAction

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
- Fragment를 `<></>` 이렇게 써도 동일하게 동작한다.

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

# firebase database

## SQL database vs NoSQL database

- SQL database는 매우 엄격하다.
- 대표적인게 데이터가 특정 모양으로만 있도록 하는 것.
- 반면 NoSQL database는 매우 자유로움.
- 데이터의 구성이 특정 규칙이나 구조에 구애받지 않는다.
- firebase는 NoSQL database임.
- 데이터가 inconsistent할 수 있으니 주의해야한다.

## useEffect async

- useEffect에 사용되는 함수는 함수를 반환해야한다.
- async 함수는 Promise를 반환하므로 쓰면 안된다.
- 그렇다면 함수 내에서 async함수를 선언하고 바로 호출하면 된다.

```jsx
useEffect(() => {
  const getCategoryMap = async () => {
    setCategoriesMap(await getCategoriesAndDocuments());
  };
  getCategoryMap();
}, []);
```

## 중첩 라우팅

- 와일드카드(\*)을 링크에 붙이면 해당 위치에 어떤 링크가 대응되던지 해당 element를 렌더링한다.

```jsx
<Routes>
  <Route path="/" element={<Navigation />}>
    <Route index element={<Home />} />
    // shop뒤에 hats, jackets등 뭐가 오던간에 ShopPage를 렌더링한다.
    <Route path="shop/*" element={<ShopPage />} />
    <Route path="auth" element={<AuthenticationPage />} />
    <Route path="checkout" element={<CheckoutPage />} />
  </Route>
</Routes>
```

- 이후, 카테고리에 맞는 페이지를 렌더링하고 싶을 때, 카테고리 루트를 일일히 전부 만들어야 할까?
- 물론 그렇게도 가능하지만, url을 변수처럼 사용하는 방법이 있다.
- `<Route path=':category' element={<Category/>}></Route>` -> category를 변수처럼 사용할 수 있다.
- Category 컴포넌트에서 해당 category를 변수처럼 사용하려면, `useParams()`를 사용하자.
- 이후 받아온 url를 이용해 해당 컴포넌트의 UI를 렌더링하도록 하면 될 것이다.

```jsx
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/ProductCard";
import { CategoriesContext } from "../../Contexts/Categories";

import "./Category.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  // products && ~는 Category가 처음 마운트되었을 때, categoriesMap이 빈 객체일 수 있기 때문이다.
  // 왜냐면 비동기호출로 categoriesMap의 내용을 채우기 때문이다.
  // 그래서 products가 undefined인 타이밍이 생기기 때문에, safeguard코드를 작섣해야 한다.
  return <div className="category-container">{products && products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
};
```

# CSS in JS + Styled Components

- 프로젝트가 커질 수록, 스타일링이 다른 컴포넌트와 충돌할 가능성이 커진다.
- 왜냐하면 스타일링을 css에 의존하고 있기 때문이다.
- 조금더 신경쓰고, 선택자를 상세하게 쓰면서 충돌을 줄일 수도 있겠으나, 이보다 더 나은 방법이 존재한다.
- CSS in JS를 통해 특정 컴포넌트가 독점적으로 갖는 스타일링을 작성할 수 있다.

## 사용법

- styled-components에서 `styled`를 import해야 한다.
- `styled.tagname` 형식으로 사용한다.
- scss 문법을 지원하는 것으로 보인다.
- 결과물은 컴포넌트이다.

```jsx
export const BaseButton = styled.button`
  margin: 123px;
`;
```

- 이렇게 생성된 컴포넌트를 리액트 컴포넌트처럼 그냥 사용하면 된다.
- 해당 컴포넌트가 렌더링한 element는 유일한 class를 가지고, 해당 class를 이용해 스타일링을 하기 때문에, 다른 컴포넌트와 스타일링이 충돌하는 것을 막을 수 있다.

## 재사용

- styled-component는 재사용이 가능하다.

```jsx
// 태그를 전달하지 않고 BaseButton이라는 다른 styled-component를 전달하고 있다.
export const GoogleSignInButton = styled(BaseButton)`
  background-color: #4285f4;
`;
```

- 위의 `GoogleSignInButton`은 `BaseButton`의 스타일을 가지게 되고, 추가적인 스타일링을 할 수 있다.

## nested

- scss가 그랬던 것처럼, styled-component의 스타일링 안에 다른 styled-component를 선택할 수 있다.
- 이때, styled-component의 작성 순서를 주의하자.
- 제일 안쪽에 쓰이는 것부터 작성하면 오류날 일이 없다.

```jsx
export const DirectoryItemContainer = styled.div`
  &:hover {
    cursor: pointer;

    & ${BackgroundImage} {
      transform: scale(1.1);
      transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
    }

    & ${Body} {
      opacity: 0.9;
    }
  }
`;
```

- pseudo-element를 사용한 곳 내부에서 다른 element를 지정하고 싶을 때 사용할 수 있는 유일한 방법으로 보인다.

## svg 사용

- svg를 ReactComponent로 불러와 사용했던 것을 기억해보자.
- 결국 컴포넌트이므로 styled-components로 사용할 수 있다.

```jsx
import { ReactComponent as ShoppingSVG } from "../assets/shopping-bag.svg";

export const ShoppingIcon = styled(ShoppingSVG)`
  width: 24px;
  height: 24px;
`;
```

## props 사용

- styled-component에 props를 전달할 수 있다.
- 이를 이용해 다양한 스타일을 하나의 컴포넌트로 제공할 수 있다.

```jsx
export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  // destructuring을 이용해 props에서 shrink를 분리해내, shrink 유무에 따라 다른 스타일을 적용
  ${({ shrink }) => shrink && shrinkLabelStyles}
`;

// 사용하는 곳
<FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>;
```

## h2, p같은거도 따로 만들어?

- h2, p, span같은 것도 일일히 따로 styled-component로 만들어야 할까?
- 스타일을 모두 똑같이 적용할 생각이라면 굳이 그럴 필요가 없다.

## 변수, mixin, css

- scss에서 변수와 mixin을 사용했었다.
- styled-components는 JavaScript이므로, 이를 바로 사용할 수 없다.
- 그렇다면 그냥 js변수로 만들자.
- mixin은 css라는 것을 이용해야한다.

```scss
$sub-color: grey;
$main-color: black;

@mixin shrinkLabel {
  top: -14px;
  font-size: 12px;
  color: $main-color;
}
```

```jsx
// 위의 scss를 js로 변환한다면 아래와 같을 것이다.
import styled, { css } from "styled-components";

const subColor = "grey";
const mainColor = "black";

// css를 이용해 css코드를 변수로 만들자.
const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;
```

# Reducers

- Reducer는 상태관리의 하나의 패턴
- Reducer는 값들을 가지고 있고, Action을 받을 수 있다.
- Reducer는 정해진 Action들로만 내부의 상태를 바꿀 수 있다.

```jsx
// action type을 정의
export const USER_ACTION_TYPES = Object.freeze({
  SET_CURRENT_USER: Symbol("setCurrentUser"),
});

// 리듀서는 이전 state와 action을 받는 함수이다.
// state와 action을 이용해 새로운 상태를 만들어 반환한다.
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type of action ${type} in userReducer`);
  }
};

// 초기 상태
const INITIAL_STATE = {
  currnetUser: null,
};

export const UserProvider = ({ children }) => {
  // useReducer는 Reducer와 초기값을 받는다.
  // 상태와 dispatch 함수를 반환한다.
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const setCurrentUser = (user) => {
    // dispatch에 액션 타입과 payload를 전달하여 상태를 바꾼다.
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
  };
};
```

## reducer에 비즈니스 로직을 넣지 말자

- reducer는 단순히 state와 action을 받아 새 상태를 만들어내는 함수이다.
- 하지만 여기에 비즈니스 로직이 들어가면, 읽기 매우 힘든 코드가 된다.
- payload를 외부에서 적절하게 생성해 넘겨주는 식으로 코드를 구성하자.
- reducer에서 payload를 갖고 이것 저것 하지 말고, 단순히 값을 설정하기만 하는게 깔끔하다.

# Redux

## Redux vs Context: Access

- ContextProvider는 결국 컴포넌트이고, provider로 감싼 내부에서만 데이터에 접근할 수 있다.
- => 데이터에 접근할 컴포넌트를 지정해줄 수 있다. (특정 컴포넌트만 Provider로 감싸면 된다)
- 반면 Redux는 global state management라고 한다.
- 우리에게 선택권은 없다. 우리 앱의 모든 컴포넌트에서 Redux store에 접근할 수 있다.

## Redux vs Context: Data Flow

- Context는 각자 reducer를 가진다.
- Redux store는 여러개의 reducer를 하나로 합쳐 1개의 Root Reducer를 가지고, 하나의 dispatch 함수를 가진다.

## 설치

- `yarn add redux react-redux redux-logger`
- redux-logger는 필수는 아니지만, 스토어에서 어떤 일이 일어나는지 볼 수 있어 유용함.

## 파일 구조(보일러플레이트)

- store, root-reducer가 기본으로 깔린다.
- store는 createStore로 store를 생성해 export한다.
- root-reducer는 combineReducers를 이용해 우리가 작성할 reducer들을 하나로 묶는 역할을 한다.
- 그다음 리듀서를 담을 폴더를 생성한다.
- 폴더 안에는 reducer, action, type, selector가 들어간다.
- action은 dispatch와 사용되며 데이터 변경, selector는 useSelector와 사용되며 데이터 접근용.
- reducer는 초기 상태와 리듀서를 갖는다.
- type은 action과 reducer에서 사용되는 action의 타입을 정의한다.
- [소스코드](../src/store/)를 보면 더 자세히 알 수 있다.

## Context를 Redux로 전환하기

- action types, initial state, reducer를 그대로 가져올 수 있다.
- 하지만 useReducer훅을 이용하지 않기 때문에, state의 default parameter로 initial state를 설정하자.
- 또한 액션을 해당 리듀서에서 찾지 못했다면, 오류 대신 state를 그대로 반환하면 된다.
- context에서 useEffect를 이용해 데이터를 가져왔던 것은 해당 데이터에 처음으로 접근하는 컴포넌트로 옮겨주면 된다.

## useSelect가 하는 것

- useSelect를 사용한 컴포넌트는, store(root reducer)가 업데이트될 때 리렌더링된다.
- 그러면, 해당 컴포넌트와 관계없는 데이터가 변경되어도 리렌더링된다.

## 미들웨어

- 컴포넌트가 dispatch를 했을 때 redux store 대신 middleware에 먼저 도착함.
- middleware중 대표적인게 redux-logger이다.

## Reselect 라이브러리

- `yarn add reselect`로 설치
- React는 상태가 변경될 때 리렌더링을 한다.
- 상태 변경은 `Object.is()` 메서드로 감지한다고 한다.
- 문제는, 객체는 내용물이 아니라 메모리 주소를 이용해서 동등비교를 하게 된다.
- 그렇다면 내용물이 동일하더라도 새로운 메모리 주소를 사용했을 때 리렌더링을 하게 된다.
- 또, 리렌더링을 할 때 selector가 다시 호출된다.
- selector내부 로직의 비용이 높은 경우에 성능 문제가 생길 수 있다.
- reselector는 인자가 하나이상 변경되었을 때, 내부 로직을 다시 실행한다.
- 인자가 변경되지 않았다면, 이전에 기억해두었던 값을 그대로 반환한다.
- 그렇다면 selector의 복잡한 로직을 다시 실행할 필요가 없고, 값도 이전과 동일하므로 리렌더링도 되지 않는다.

## 패턴

- reducer, action, types, selector파일을 분리하여 사용하자.
- reducer에 비즈니스 로직을 넣지 않는다.
- reducer엔 기본적인 데이터만 저장한다. ex) cartItems
- action, selector쪽에 비즈니스 로직을 작성한다.
- 추가적인 데이터를 사용해야 한다면, selector에서 reducer의 데이터를 변형해서 제공하는 식이다.
- action 생성 함수를 제공함으로써 안전하게 dispatch하자.

## Redux-Persist

- `yarn add redux-persist`로 설치
- reducer state를 localStorage 또는 session에 저장
- 저장된 정보를 로딩하여 사용하기 때문에 새로고침해도 이전 상태를 활용할 수 있음.

```jsx
import { persistStore, persistReducer } from "redux-persist";
// localStorage 사용
import storage from "redux-persist/lib/storage";

// 설정
const persistConfig = {
  key: "root",
  storage,
  // blacklist나, whitelist를 사용 가능.
  blacklist: ["user"],
};

// 해당 리듀서를 이용해 store를 만들자.
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, undefined, componsedEnhancers);

export const persistor = persistStore(store);

// index.js
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";

// PersistGate로 App 컴포넌트를 감싸줘야 한다.
// 이렇게 함으로써 APP의 렌더링을 데이터를 얻을 때 까지 지연시킬 수 있다.
// loading은 아마 APP렌더링 전 보여줄 컴포넌트를 전달하는 것으로 추측된다.
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
```

## Redux-Devtools

- 앱의 상태가 바뀔때를 기록해주고, 이를 돌려볼 수 있게 해준다.
- 이외에도 유용한 기능이 아주 많아보인다.
- Chrome extension으로 설치해야한다. [링크](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=ko)
- 그다음 간단한 코드가 필요하다.

```js
// enhancer를 compose하는 함수를 골라아한다.
// 아래 코드는 개발환경에서만 동작하도록 하는 코드가 포함되어 있는데, 다양한 곳에서 응용해볼 수 있겠다.
const composeEnhancer = (process.env.NODE_ENV !== "production" && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
```

- 이후 앱을 동작시키면, chrome extension에 있는 Redux DevTools를 사용해볼 수 있다.

## Redux-Thunk

- 비동기 작업을 위한 미들웨어
- 함수를 디스패치 해서 사용
- 비동기 관련 로직을 컴포넌트에서 분리해낼 수 있음

### 예시

```jsx
const CATEGORIES_INITIAL_STATE = {
  categories: [],
  // isLoading과 error가 중요
  isLoading: false,
  error: null,
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  // 3개의 type과 어떤 형태로 데이터를 반환하는지를 기억하자.
  switch (type) {
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_START:
      return { ...state, isLoading: true };
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_SUCCESS:
      return { ...state, categories: payload, isLoading: false };
    case CATEGORIES_ACTION_TYPE.FETCH_CATEGOIRES_FAILED:
      return { ...state, error: payload, isLoading: false };
    default:
      return state;
  }
};

// 함수를 리턴하는 함수인데, dispath를 받아 비동기 함수에서 어떻게 사용하는지
// 형태를 기억해보자.
export const fetchCategoriesAsync = () => async (dispatch) => {
  // isLoading이 true로 바뀌겠지?
  dispatch(fetchCategoiresStart());

  // 비동기 작업의 결과에 따라 다른 action을 dispatch를 하는 것
  try {
    const categories = await getCategoriesAndDocuments();
    dispatch(fetchCategoiresSuccess(categories));
  } catch (error) {
    dispatch(fetchCategoiresFailed(error));
  }
};
```

## Redux-Saga

- 비동기 작업을 위한 미들웨어
- 제너레이터 함수 사용
- reducer와 비슷하게 saga를 셋팅해줘야함.
- 액션 객체를 모니터링하며, 바뀌면 액션 타입에 맞는 함수를 실행시킨다.
- 비동기 처리등의 작업을 사가 함수에 위임해줄 수 있다.
- 그렇게 실행된 함수에서 또 action을 디스패치해서 또 사가함수가 실행되고... 이게 좋은듯
- 보일러플레이트 함수가 너무나 많지만, 추후에 테스트하기 용이하다고 한다.

## Thunk vs Saga

- [좋은 블로그 글](https://dev-recruiting.ringleplus.com/4850db36-7f98-4b27-8112-e152a1a2ab5b)
- thunk는 간단하지만 테스트가 쉽지 않음.
- saga는 복잡하지만 Action을 깔끔하게 디자인할 수 있고, 테스트에 용이함.
- 둘다 장단점이 있으므로, 잘 선택해서 서비스에 적용해보자.
- saga 너무 어려웠다... 나중에 필요할 때 다시 공부해야 잘 들어올 것 같다.

## redux를 타입스크립트로 전환하기

- 기존의 type들을 담은 object를 enum으로 전환하면, 해당 타입안에 있는 속성만 사용하도록 강제 가능
- 기존에 주고받던 데이터(object)와 reducer의 상태 등의 형태를 type으로 만들어 사용하자.
- actionCreator이 반환하는 Action도 정확한 type으로 만들어 명시할 것.

### reducer의 action type을 무엇으로 설정할 것인가

- 해당 reducer가 받는 action들의 union type을 받아오면 일단은 성공.
- `action = {} as CategoriesAction` 이런 식으로 하는 것인데, 문제가 있다.
- 생각해보면, reducer는 어떠한 action이던지 받을 수 있고, 해당 reducer가 처리할 수 있는 action type이 아닌 경우에는 state를 그대로 반환한다.
- 그렇다면, action을 일단 AnyAction으로 type narrowing을 이용해 특정 타입으로 좁혀보자.

```ts
// action creator 받는 함수
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}
```

- 핵심은, actionCreator에 자신이 반환하는 타입과 전달받은 action의 타입이 일치하는지 검사할 수 있는 `match`라는 함수를 추가하는 것.
- 이제 actionCreator를 만들 땐 `withMatcher()`로 감싸 생성하자.
- 이후 reducer에서 actionCreator들의 `match()`를 이용해 검사 및 type narrowing을 할 수 있다.

```ts
export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {} as AnyAction): CategoriesState => {
  // 기존의 switch를 if문들로 바꿔주었다.
  if (fetchCategoiresStart.match(action)) {
    return { ...state, isLoading: true };
  }

  if (fetchCategoiresSuccess.match(action)) {
    // type narrowing이 되었기 때문에, action내부의 payload를 사용할 수 있다.
    return { ...state, categories: action.payload, isLoading: false };
  }

  if (fetchCategoiresFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false };
  }

  return state;
};
```

- enum, overloading, union type, type narrowing 키워드를 기억하자.

# firebase util을 ts로 전환하기

- 라이브러리에서 제공된 함수에 마우스를 갖다 대면 어떤 타입을 받고 어떤 타입을 리턴하는지 상세히 나와있다.
- 라이브러리에서 제공하는 기본 type들이 있는지 잘 살펴보고 활용할 것.
- 너무 명시적으로 타입들을 전부 작성하려 하지 않아도, 타입 추론이 되어서 오류가 나지 않는 상황이라면, 그것을 활용해도 좋다.

# react typescript로 전환하기

- 이미 있는 react 컴포넌트(버튼 같은 것)을 이용한 컴포넌트를 작성할 때, `ButtonHTMLAttributes<HTMLButtonElement>`같은 기본 props를 intersection type으로 같이 사용해야 한다.
- styled components에 generic으로 props를 전달 가능
