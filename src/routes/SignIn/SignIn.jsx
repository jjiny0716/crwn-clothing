import SignUpForm from '../../components/SignUpForm';

import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../util/firebase/firebase";

const SignIn = () => {
  const loginGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  }
  return (
    <div>
      <h2>Sign in</h2>
      <button onClick={loginGoogleUser}>Sign in with google popup</button>
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
