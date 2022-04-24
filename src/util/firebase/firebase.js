import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBr4KvyKCYtJnzuw4SrRv_n46IF7ybqfOY",
  authDomain: "crwn-clothing-db-a8110.firebaseapp.com",
  projectId: "crwn-clothing-db-a8110",
  storageBucket: "crwn-clothing-db-a8110.appspot.com",
  messagingSenderId: "1073379506803",
  appId: "1:1073379506803:web:e8c3ba04b67146e1c24806",
};

const firebaseApp = initializeApp(firebaseConfig);
// provider는 로그인 방법(google, github, facebook등)을 제공하는 객체 정도로 생각하면 될 것 같다.
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// auth는 앱의 모든 authentication에 대한 데이터를 가지고있는 캐시? 정도로 생각하자.
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export async function createUserDocumentFromAuth(userAuth) {
  // google 팝업으로 부터 auth를 받아옴
  // auth에 있는 user에 있는 uid(unique id)를 document 이름으로 이용하자.
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
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}