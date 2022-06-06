import { useState } from "react";
import { useDispatch } from 'react-redux';

import FormInput from "./FormInput";
import Button, { BUTTON_TYPE_CLASSES } from "./Button";

import { emailSignInStart, googleSignInStart } from '../store/user/user.action';

import { SignInContainer } from "./SignInForm.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
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
    dispatch(googleSignInStart());
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(emailSignInStart());
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.error(error);
      }
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleOnSubmit}>
        <FormInput label="Email" type="email" required onChange={handleOnChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleOnChange} name="password" value={password} />
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.google} type="button" onClick={signInWithGoogle}>
            GOOGLE SIGN IN
          </Button>
        </div>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
