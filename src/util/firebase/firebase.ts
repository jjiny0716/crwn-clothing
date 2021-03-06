import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signOut, onAuthStateChanged, UserCredential, User, NextOrObserver } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from "firebase/firestore";
import { Category } from '../../store/categories/categories.types';

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

export type ObjectToAdd = {
  title: string;
}

// firestore에 JSON넣는 함수
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
}

export type AdditionalInformation = {
  displayName?: string;
}

export type UserData = {
  createdAt: string;
  displayName: string;
  email: string;
}

export async function createUserDocumentFromAuth(userAuth: User, additionalInformation = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<UserData>> {
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
      console.log("error creating the user", error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
}

// email과 password를 이용해 user를 생성하고 로그인할 수 있다.
export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// 로그아웃
export const signOutUser = async () => {
  return await signOut(auth);
}

// auth 상태가 바뀔 때 호출할 callback을 등록할 수 있다.
export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  onAuthStateChanged(auth, callback);
}

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth, 
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  })
}