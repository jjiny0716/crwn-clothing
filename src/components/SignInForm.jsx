import { useState } from "react";

import FormInput from "./FormInput";
import Button from './Button';

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../util/firebase/firebase";

import "./SignInForm.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          break;
        default:
          console.error(error);
      }
    }
  };

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleOnSubmit}>
        <FormInput label="Email" type="email" required onChange={handleOnChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleOnChange} name="password" value={password} />
        <div className='buttons-container'>
          <Button type="submit">SIGN IN</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
